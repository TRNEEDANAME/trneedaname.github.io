(function () {
    const SELECTOR = 'div.highlight div.chroma code.language-sql';
    let dbPromise = null;

    function ensureDB() {
        if (!dbPromise) {
            dbPromise = (async () => {
                if (!window.initSqlJs) {
                    const s = document.createElement('script');
                    s.src = 'https://sql.js.org/dist/sql-wasm.js';
                    document.head.appendChild(s);
                    await new Promise(r => s.onload = r);
                }
                const SQL = await initSqlJs({ locateFile: f => `https://sql.js.org/dist/${f}` });
                return new SQL.Database();
            })();
        }
        return dbPromise;
    }

    function extractCode(codeEl) {
        return codeEl.innerText;
    }

    function formatResult(resultSets) {
        if (!resultSets.length) return '(no rows / statements executed)';
        return resultSets.map(r => {
            const header = r.columns.join('\t');
            const rows = r.values.map(v => v.join('\t')).join('\n');
            return header + '\n' + rows;
        }).join('\n\n');
    }

    function addRunner(codeEl, idx) {
        if (codeEl.dataset.runnerAttached) return;
        codeEl.dataset.runnerAttached = "true";
        const wrapper = codeEl.closest('.highlight');
        if (!wrapper) return;

        const runBtn = document.createElement('button');
        runBtn.className = 'lang-run-btn sql-run-btn';
        runBtn.type = 'button';
        runBtn.textContent = 'Run SQL';

        const out = document.createElement('pre');
        out.className = 'code-run-output sql-output';
        out.id = `sql-output-${idx}`;

        runBtn.addEventListener('click', async () => {
            out.textContent = '(running...)';
            try {
                const db = await ensureDB();
                const code = extractCode(codeEl);
                const queries = code.split(/;[\n\r]+/).map(q => q.trim()).filter(Boolean);
                let lastResult = '';
                for (const q of queries) {
                    try {
                        const res = db.exec(q);
                        lastResult = formatResult(res);
                    } catch (err) {
                        lastResult = 'SQL Error: ' + err;
                        break;
                    }
                }
                out.textContent = lastResult || '(done)';
            } catch (e) {
                out.textContent = 'SQL Init Error: ' + e;
            }
        });

        wrapper.insertAdjacentElement('afterend', out);
        wrapper.insertAdjacentElement('afterend', runBtn);
    }

    function init() {
        document.querySelectorAll(SELECTOR).forEach(addRunner);
    }
    window.addEventListener('load', init);
})();
