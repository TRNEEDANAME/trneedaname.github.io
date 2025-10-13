(function () {
    /********************************************************************
     * Config
     ********************************************************************/
    const RUN_LABEL_IDLE        = 'Run Python';
    const RUN_LABEL_LOADING_RT  = 'Loading…';
    const RUN_LABEL_RUNNING     = 'Running…';

    /* Set to 'code' for plain [!CODE] label, or any other string (e.g. 'output'). */
    const RESULT_CALLOUT_LABEL  = 'Result';

    const PYODIDE_VERSION       = '0.24.1';
    const SHOW_SPINNER_IN_BUTTON = true;
    const PLACE_BUTTON_IN_HEADER = true;
    const STDOUT_EMPTY_TEXT     = '(no output)';
    const RETURN_TO_IDLE_DELAY  = 800;

    /********************************************************************
     * Internal state
     ********************************************************************/
    let pyodidePromise = null;
    let pyodideState   = 'idle';   // idle | loading | ready
    const queuedRuns   = [];

    const CODE_SELECTOR = [
        '.admonition.code code.language-python',
        'div.highlight div.chroma table code.language-python',
        'div.highlight div.chroma pre code.language-python'
    ].join(',');

    /********************************************************************
     * Input() Transformation
     *
     * Goal: transparently turn Python's input(...) calls in the user's
     * code into a call that ultimately invokes the browser's prompt().
     *
     * Strategy:
     * 1. JS side: transform textual occurrences of input( ... ) that are
     *    NOT part of a larger identifier into __py_prompt__( ... )
     *    using a conservative regex.
     * 2. Prepend a Python prelude that defines __py_prompt__ by importing
     *    the JavaScript prompt via Pyodide (from js import prompt).
     * 3. Execution uses (prelude + transformedCode).
     *
     * Notes:
     * - This avoids shadowing a user-defined input variable/function.
     * - Regex is heuristic: it won’t modify occurrences inside strings or
     *   comments; it does not attempt full parsing, but false positives
     *   are minimized by requiring a non-identifier char (or start) before
     *   'input('.
     ********************************************************************/
    function transformInputCalls(code) {
        // Replace occurrences of input( not preceded by identifier char.
        // Captures the prefix (start or non-word) to preserve it.
        return code.replace(/(^|[^0-9A-Za-z_])input\s*\(/g, (match, prefix) => {
            return prefix + '__py_prompt__(';
        });
    }

    function buildPythonPrelude() {
        return [
            'from js import prompt as __js_prompt',
            'def __py_prompt__(msg=""):',
            '    # Browser prompt returns a JS string (or null); coerce None if canceled',
            '    res = __js_prompt(msg)',
            '    return "" if res is None else res',
            ''
        ].join('\n');
    }

    /********************************************************************
     * Pyodide Loader
     ********************************************************************/
    function ensurePyodide() {
        if (pyodidePromise) return pyodidePromise;
        pyodideState = 'loading';
        pyodidePromise = (async () => {
            if (!window.loadPyodide) {
                const s = document.createElement('script');
                s.src = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/pyodide.js`;
                document.head.appendChild(s);
                await new Promise(r => s.onload = r);
            }
            return await loadPyodide({
                indexURL: `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`
            });
        })().then(py => {
            pyodideState = 'ready';
            queuedRuns.splice(0).forEach(fn => fn(py));
            return py;
        }).catch(err => {
            pyodideState = 'idle';
            console.error('[py-runner] Pyodide load failed:', err);
            alert('Python runtime failed to load: ' + err);
            throw err;
        });
        return pyodidePromise;
    }

    /********************************************************************
     * Execution
     ********************************************************************/
    function captureAndRun(py, userCode) {
        // Transform input() calls before execution
        const transformedBody = transformInputCalls(userCode);
        const fullCode = buildPythonPrelude() + '\n' + transformedBody;

        const setup = `
import sys, io
_buf = io.StringIO()
_old_stdout = sys.stdout
sys.stdout = _buf
`;
        const teardown = `
sys.stdout = _old_stdout
_buf.getvalue()
`;
        py.runPython(setup);
        let error = null;
        try {
            py.runPython(fullCode);
        } catch (e) {
            error = e;
        }
        const stdout = py.runPython(teardown);
        return { stdout, error };
    }

    /********************************************************************
     * Result Callout Creation
     ********************************************************************/
    function findOrCreateResultCallout(codeEl) {
        const originalAdmon = codeEl.closest('.admonition.code');
        if (!originalAdmon) {
            return createResultCalloutAfter(codeEl.closest('.highlight') || codeEl.parentElement, null);
        }
        const next = originalAdmon.nextElementSibling;
        if (next && next.classList.contains('admonition') &&
            next.classList.contains('code') &&
            next.classList.contains('py-run-result')) {
            return next;
        }
        return createResultCalloutAfter(originalAdmon, originalAdmon);
    }

    function createResultCalloutAfter(anchor, originalAdmon) {
        const wrapper = document.createElement('div');
        wrapper.className = 'admonition code py-run-result';

        let iconHTML = '';
        if (originalAdmon) {
            const srcIcon = originalAdmon.querySelector('.admonition-header svg');
            if (srcIcon) iconHTML = srcIcon.outerHTML;
        }
        if (!iconHTML) iconHTML = defaultCodeIconSVG();

        const header = document.createElement('div');
        header.className = 'admonition-header';
        header.innerHTML = `${iconHTML}<span>${RESULT_CALLOUT_LABEL}</span>`;

        const content = document.createElement('div');
        content.className = 'admonition-content';

        const pre = document.createElement('pre');
        pre.className = 'py-run-stdout';
        pre.textContent = '';

        content.appendChild(pre);
        wrapper.appendChild(header);
        wrapper.appendChild(content);

        anchor.insertAdjacentElement('afterend', wrapper);
        return wrapper;
    }

    function defaultCodeIconSVG() {
        return `<svg class="admon-icon" xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 640 512" width="16" height="16" fill="currentColor"
aria-hidden="true">
<path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"></path>
</svg>`;
    }

    /********************************************************************
     * Button / UI
     ********************************************************************/
    function addRunButton(codeEl) {
        if (codeEl.dataset.pyRunnerAttached === '1') return;
        codeEl.dataset.pyRunnerAttached = '1';

        const highlight = codeEl.closest('.highlight');
        const originalAdmon = codeEl.closest('.admonition.code');
        const targetHeader = (PLACE_BUTTON_IN_HEADER && originalAdmon)
            ? originalAdmon.querySelector('.admonition-header')
            : null;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'pm-run-btn py-run-btn';
        btn.dataset.state = 'idle';
        btn.innerHTML = RUN_LABEL_IDLE;

        function setState(state) {
            btn.dataset.state = state;
            switch (state) {
                case 'idle':
                case 'done':
                case 'error':
                    btn.disabled = false;
                    btn.innerHTML = RUN_LABEL_IDLE;
                    break;
                case 'loading':
                    btn.disabled = true;
                    btn.innerHTML = (SHOW_SPINNER_IN_BUTTON ? spinnerHTML() : '') + RUN_LABEL_LOADING_RT;
                    break;
                case 'running':
                    btn.disabled = true;
                    btn.innerHTML = (SHOW_SPINNER_IN_BUTTON ? spinnerHTML() : '') + RUN_LABEL_RUNNING;
                    break;
            }
        }

        btn.addEventListener('click', () => {
            const rawCode = codeEl.innerText;
            const callout = findOrCreateResultCallout(codeEl);
            const pre = callout.querySelector('pre.py-run-stdout');

            const scheduleRun = (py) => {
                setState('running');
                try {
                    const { stdout, error } = captureAndRun(py, rawCode);
                    if (error) {
                        pre.textContent = (stdout ? stdout + '\n' : '') + 'Error: ' + error;
                        setState('error');
                    } else {
                        pre.textContent = stdout.trim() ? stdout : STDOUT_EMPTY_TEXT;
                        setState('done');
                    }
                } catch (e) {
                    pre.textContent = 'Runtime Error: ' + e;
                    setState('error');
                } finally {
                    setTimeout(() => setState('idle'), RETURN_TO_IDLE_DELAY);
                }
            };

            if (pyodideState === 'ready') {
                ensurePyodide().then(py => scheduleRun(py));
            } else if (pyodideState === 'loading') {
                setState('loading');
                queuedRuns.push(py => scheduleRun(py));
            } else { // idle
                setState('loading');
                ensurePyodide();
                queuedRuns.push(py => scheduleRun(py));
            }
        });

        // Placement
        if (targetHeader) {
            const labelSpan = targetHeader.querySelector('span');
            if (labelSpan) {
                labelSpan.insertAdjacentElement('afterend', btn);
            } else {
                targetHeader.appendChild(btn);
            }
        } else if (highlight) {
            const copyBtn = highlight.querySelector('button.copy-code');
            if (copyBtn) {
                copyBtn.insertAdjacentElement('beforebegin', btn);
            } else {
                highlight.insertAdjacentElement('afterend', btn);
            }
        } else {
            codeEl.parentElement.insertAdjacentElement('afterend', btn);
        }
    }

    function spinnerHTML() {
        return `<span class="pm-run-spinner" aria-hidden="true"></span>`;
    }

    /********************************************************************
     * Scanning & Lazy Warm
     ********************************************************************/
    function scan() {
        document.querySelectorAll(CODE_SELECTOR).forEach(addRunButton);
    }

    function setupLazyWarm() {
        const first = document.querySelector(CODE_SELECTOR);
        if (!first) return;
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting && pyodideState === 'idle') {
                    ensurePyodide();
                    io.disconnect();
                }
            });
        }, { rootMargin: '250px' });
        io.observe(first);
    }

    window.addEventListener('load', () => {
        scan();
        setupLazyWarm();
    });

    const mutationObserver = new MutationObserver((muts) => {
        for (const m of muts) {
            if (m.addedNodes && m.addedNodes.length) {
                scan();
                break;
            }
        }
    });
    mutationObserver.observe(document.documentElement, { childList: true, subtree: true });

})();
