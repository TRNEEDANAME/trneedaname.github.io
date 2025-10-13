(function () {
    const RUN_LABEL_IDLE        = 'Run JS';
    const RUN_LABEL_RUNNING     = 'Running…';
    const SHOW_SPINNER_IN_BUTTON = true;
    const RESULT_CALLOUT_LABEL  = 'Result';
    const PLACE_BUTTON_IN_HEADER = true;
    const RETURN_TO_IDLE_DELAY  = 600;
    const LOG_EMPTY_TEXT        = '(no output)';
    const CODE_SELECTOR = [
        '.admonition.code code.language-javascript',
        '.admonition.code code.language-js',
        'div.highlight div.chroma table code.language-javascript',
        'div.highlight div.chroma pre code.language-javascript',
        'div.highlight div.chroma table code.language-js',
        'div.highlight div.chroma pre code.language-js'
    ].join(',');

    function spinnerHTML() {
        return `<span class="pm-run-spinner" aria-hidden="true"></span>`;
    }
    function defaultCodeIconSVG() {
        return `<svg class="admon-icon" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"></path>
        </svg>`;
    }

    function getOriginalAdmon(codeEl) {
        return codeEl.closest('.admonition.code');
    }

    function resultCallout(codeEl) {
        const original = getOriginalAdmon(codeEl);
        if (!original)
            return createResultCallout(codeEl.closest('.highlight') || codeEl.parentElement, null);
        const next = original.nextElementSibling;
        if (next && next.classList.contains('admonition') &&
            next.classList.contains('code') &&
            next.classList.contains('js-run-result')) {
            return next;
            }
            return createResultCallout(original, original);
    }

    function createResultCallout(anchor, originalAdmon) {
        const wrap = document.createElement('div');
        wrap.className = 'admonition code js-run-result';
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
        pre.className = 'js-run-stdout';
        content.appendChild(pre);
        wrap.appendChild(header);
        wrap.appendChild(content);
        anchor.insertAdjacentElement('afterend', wrap);
        return wrap;
    }

    function addRunButton(codeEl) {
        if (codeEl.dataset.jsRunnerAttached === '1') return;
        codeEl.dataset.jsRunnerAttached = '1';

        const originalAdmon = getOriginalAdmon(codeEl);
        const header = (PLACE_BUTTON_IN_HEADER && originalAdmon)
        ? originalAdmon.querySelector('.admonition-header')
        : null;
        const highlight = codeEl.closest('.highlight');

        const btn = document.createElement('button');
        btn.className = 'pm-run-btn js-run-btn';
        btn.type = 'button';
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
                case 'running':
                    btn.disabled = true;
                    btn.innerHTML = (SHOW_SPINNER_IN_BUTTON ? spinnerHTML() : '') + RUN_LABEL_RUNNING;
                    break;
            }
        }

        btn.addEventListener('click', async () => {
            const code = codeEl.innerText;
            const callout = resultCallout(codeEl);
            const pre = callout.querySelector('pre.js-run-stdout');
            setState('running');

            const logs = [];
            const originalLog = console.log;
            console.log = (...args) => logs.push(args.join(' '));

            let finalValue;
            try {
                // eslint-disable-next-line no-eval
                const ret = eval(code);
                if (ret instanceof Promise) {
                    try {
                        finalValue = await ret;
                    } catch (perr) {
                        logs.push('Promise rejection: ' + perr);
                    }
                } else if (ret !== undefined) {
                    finalValue = ret;
                }
            } catch (err) {
                logs.push('Error: ' + err);
            } finally {
                console.log = originalLog;
            }
            pre.textContent = logs.length ? logs.join('\n') : LOG_EMPTY_TEXT;
            setState(logs.some(l => l.startsWith('Error:') || l.startsWith('Promise rejection')) ? 'error' : 'done');
            setTimeout(() => setState('idle'), RETURN_TO_IDLE_DELAY);
        });

        if (header) {
            const span = header.querySelector('span');
            span ? span.insertAdjacentElement('afterend', btn) : header.appendChild(btn);
        } else if (highlight) {
            const copyBtn = highlight.querySelector('button.copy-code');
            copyBtn ? copyBtn.insertAdjacentElement('beforebegin', btn)
            : highlight.insertAdjacentElement('afterend', btn);
        } else {
            codeEl.parentElement.insertAdjacentElement('afterend', btn);
        }
    }

    function scan() {
        document.querySelectorAll(CODE_SELECTOR).forEach(addRunButton);
    }

    window.addEventListener('load', scan);
    new MutationObserver(m => {
        if (m.some(x => x.addedNodes && x.addedNodes.length)) scan();
    }).observe(document.documentElement, { childList: true, subtree: true });

})();
