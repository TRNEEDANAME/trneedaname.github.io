(function () {
    const RUN_LABEL_IDLE         = 'Run SQL';
    const RUN_LABEL_LOADING_RT   = 'Loading…';
    const RUN_LABEL_RUNNING      = 'Running…';
    const RESULT_CALLOUT_LABEL   = 'Result';
    const SHOW_SPINNER_IN_BUTTON = true;
    const PLACE_BUTTON_IN_HEADER = true;
    const RETURN_TO_IDLE_DELAY   = 700;
    const NO_ROWS_TEXT           = '(no rows)';
    const DB_INIT_TEXT           = '(db initialized)';
    const CODE_SELECTOR = [
        '.admonition.code code.language-sql',
        'div.highlight div.chroma table code.language-sql',
        'div.highlight div.chroma pre code.language-sql'
    ].join(',');

    let dbPromise = null;
    let dbState   = 'idle'; // idle | loading | ready

    function spinnerHTML() {
        return `<span class="pm-run-spinner" aria-hidden="true"></span>`;
    }
    function defaultCodeIconSVG() {
        return `<svg class="admon-icon" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"></path>
        </svg>`;
    }

function ensureDB() {
    // Always create a new in-memory database
    dbState = 'loading';
    dbPromise = (async () => {
        if (!window.initSqlJs) {
            const s = document.createElement('script');
            s.src = 'https://sql.js.org/dist/sql-wasm.js';
            document.head.appendChild(s);
            await new Promise(r => s.onload = r);
        }
        const SQL = await initSqlJs({ locateFile: f => `https://sql.js.org/dist/${f}` });
        return new SQL.Database();
    })().then(db => {
        dbState = 'ready';
        return db;
    }).catch(err => {
        dbState = 'idle';
        console.error('[sql-runner] load failed', err);
        alert('SQL engine load failed: ' + err);
        throw err;
    });
    return dbPromise;
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
            next.classList.contains('sql-run-result')) {
            return next;
            }
            return createResultCallout(original, original);
    }

    function createResultCallout(anchor, originalAdmon) {
        const wrap = document.createElement('div');
        wrap.className = 'admonition code sql-run-result';
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
        pre.className = 'sql-run-stdout';
        content.appendChild(pre);
        wrap.appendChild(header);
        wrap.appendChild(content);
        anchor.insertAdjacentElement('afterend', wrap);
        return wrap;
    }

    function formatResultSets(sets) {
        if (!sets.length) return NO_ROWS_TEXT;
        return sets.map(r => {
            const header = r.columns.join('\t');
            const rows   = r.values.map(v => v.join('\t')).join('\n');
            return header + '\n' + rows;
        }).join('\n\n');
    }

    // Converts <pre class="sql-run-stdout"> to an HTML <table>
    function preToTable(pre) {
        const lines = pre.textContent.trim().split('\n');
        // Only convert if at least header and one row, and first line contains tabs (otherwise it's a message like (no rows))
        if (!lines.length || lines.length < 1 || lines[0].indexOf('\t') === -1) return;
        const table = document.createElement('table');
        table.className = 'sql-run-table';
        // Create table header
        const header = table.insertRow();
        lines[0].split('\t').forEach(cell => {
            const th = document.createElement('th');
            th.textContent = cell;
            header.appendChild(th);
        });
        // Create table rows
        lines.slice(1).forEach(line => {
            const row = table.insertRow();
            line.split('\t').forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                row.appendChild(td);
            });
        });
        pre.parentNode.replaceChild(table, pre);
    }

    function addRunButton(codeEl) {
        if (codeEl.dataset.sqlRunnerAttached === '1') return;
        codeEl.dataset.sqlRunnerAttached = '1';

        const originalAdmon = getOriginalAdmon(codeEl);
        const header = (PLACE_BUTTON_IN_HEADER && originalAdmon)
        ? originalAdmon.querySelector('.admonition-header')
        : null;
        const highlight = codeEl.closest('.highlight');

        const btn = document.createElement('button');
        btn.className = 'pm-run-btn sql-run-btn';
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

        btn.addEventListener('click', async () => {
            const code = codeEl.innerText;
            const callout = resultCallout(codeEl);
            let pre = callout.querySelector('pre.sql-run-stdout');
            let resultWasTable = false;

            if (dbState === 'idle') {
                setState('loading');
                try {
                    await ensureDB();
                } catch {
                    setState('error');
                    return;
                }
            } else if (dbState === 'loading') {
                setState('loading');
                await ensureDB().catch(() => { setState('error'); });
            }

            if (dbState !== 'ready') {
                pre.textContent = 'DB not ready';
                return;
            }
            setState('running');
            const db = await ensureDB();

            try {
                const statements = code.split(/;[\r\n]+/).map(s => s.trim()).filter(Boolean);
                let lastSets = null;
                if (!statements.length) {
                    pre.textContent = NO_ROWS_TEXT;
                    setState('done');
                    setTimeout(()=>setState('idle'), RETURN_TO_IDLE_DELAY);
                    return;
                }
                for (const stmt of statements) {
                    try {
                        lastSets = db.exec(stmt);
                    } catch (err) {
                        pre.textContent = 'SQL Error: ' + err;
                        setState('error');
                        setTimeout(()=>setState('idle'), RETURN_TO_IDLE_DELAY);
                        return;
                    }
                }
                if (!lastSets || !lastSets.length) {
                    pre.textContent = DB_INIT_TEXT;
                } else {
                    pre.textContent = formatResultSets(lastSets);
                    // Convert <pre> to <table> if possible
                    preToTable(pre);
                    resultWasTable = true;
                }
                setState('done');
            } catch (e) {
                pre.textContent = 'Runtime Error: ' + e;
                setState('error');
            } finally {
                setTimeout(()=>setState('idle'), RETURN_TO_IDLE_DELAY);
            }
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
