(function () {
    const SELECTOR = 'div.highlight div.chroma code.language-python';
    let pyodideReady = null;

    function ensurePyodide() {
        if (!pyodideReady) {
            pyodideReady = (async () => {
                if (!window.loadPyodide) {
                    const s = document.createElement('script');
                    s.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
                    document.head.appendChild(s);
                    await new Promise(r => s.onload = r);
                }
                return await loadPyodide({
                    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
                });
            })();
        }
        return pyodideReady;
    }

    function extractCode(codeEl) {
        // The inner text preserves line breaks because of <span class="line"><span class="cl"> pattern.
        return codeEl.innerText;
    }

    function addRunner(codeEl, index) {
        if (codeEl.dataset.runnerAttached) return;
        codeEl.dataset.runnerAttached = "true";

        const wrapper = codeEl.closest('.highlight');
        if (!wrapper) return;

        const runBtn = document.createElement('button');
        runBtn.className = 'lang-run-btn py-run-btn';
        runBtn.type = 'button';
        runBtn.textContent = 'Run Python';

        const out = document.createElement('pre');
        out.className = 'code-run-output python-output';
        out.id = `py-output-${index}`;
        out.textContent = '';

        runBtn.addEventListener('click', async () => {
            out.textContent = '(running...)';
            try {
                const py = await ensurePyodide();
                const code = extractCode(codeEl);
                let result = py.runPython(code);
                if (result === undefined || result === null) {
                    result = '(no result)';
                }
                out.textContent = String(result);
            } catch (e) {
                out.textContent = 'Error: ' + e;
            }
        });

        wrapper.insertAdjacentElement('afterend', out);
        wrapper.insertAdjacentElement('afterend', runBtn);
    }

    function init() {
        const nodes = document.querySelectorAll(SELECTOR);
        nodes.forEach((c, i) => addRunner(c, i));
    }

    window.addEventListener('load', init);
})();
