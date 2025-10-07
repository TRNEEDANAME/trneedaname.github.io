(function () {
    const SELECTOR = 'div.highlight div.chroma code.language-javascript, div.highlight div.chroma code.language-js';

    function extractCode(codeEl) {
        return codeEl.innerText;
    }

    function runJS(code) {
        const logs = [];
        const originalLog = console.log;
        console.log = (...args) => logs.push(args.join(' '));
        try {
            // eslint-disable-next-line no-eval
            eval(code);
        } catch (e) {
            logs.push('Error: ' + e);
        }
        console.log = originalLog;
        return logs.join('\n');
    }

    function addRunner(codeEl, idx) {
        if (codeEl.dataset.runnerAttached) return;
        codeEl.dataset.runnerAttached = "true";

        const wrapper = codeEl.closest('.highlight');
        if (!wrapper) return;

        const runBtn = document.createElement('button');
        runBtn.className = 'lang-run-btn js-run-btn';
        runBtn.type = 'button';
        runBtn.innerHTML = 'Run JS';

        const out = document.createElement('pre');
        out.className = 'code-run-output js-output';
        out.id = `js-output-${idx}`;

        runBtn.addEventListener('click', () => {
            out.textContent = '(running...)';
            out.textContent = runJS(extractCode(codeEl));
        });

        wrapper.insertAdjacentElement('afterend', out);
        wrapper.insertAdjacentElement('afterend', runBtn);
    }

    function init() {
        document.querySelectorAll(SELECTOR).forEach(addRunner);
    }
    window.addEventListener('load', init);
})();
