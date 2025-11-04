/* Style Editor v1.0
   A small, dependency-free script to let a user edit CSS for a specific
   element on the page live, persist it to localStorage, and scope rules
   automatically so it can be safely used inside Hugo-generated pages.

   Usage:
   1) Put this file in Hugo's `static/js/` (so it is served at /js/style-editor.js)
   2) In your Org file (exported by ox-hugo), include a raw HTML export block
      that has a target element and an editor container, then load and call:
        <script src="/js/style-editor.js"></script>
        <script>StyleEditor.init({ targetSelector: '#editable-target', containerSelector: '#style-editor-container' });</script>
   3) The editor will create a live preview, save to localStorage keyed per-page+selector,
      and offers Apply / Save / Reset actions.
*/
(function (global) {
  "use strict";

  var DEFAULTS = {
    targetSelector: "#editable-target",
    containerSelector: "#style-editor-container",
    storagePrefix: "style-editor:",
    uiClass: "style-editor-ui",
    initialCSS: ""
  };

  function makeId(seed) {
    // simple (not cryptographic) hash to create a short scope class
    var h = 2166136261 >>> 0;
    for (var i = 0; i < seed.length; i++) {
      h ^= seed.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return "se-" + (h >>> 0).toString(36);
  }

  function prefixSelectors(css, prefix) {
    // Prefix top-level selectors in rules with prefix.
    // Handles comma-separated selectors. For property-only input (no braces),
    // wrap with prefix { ... }.
    if (!css.match(/\{/)) {
      // property-only; wrap
      return prefix + " {\n" + css + "\n}\n";
    }
    // Add prefix to each selector before '{'
    return css.replace(/(^|\})\s*([^{}]+)\s*\{/g, function (m, p1, sel) {
      // sel can be "p, span.foo"
      var parts = sel.split(",").map(function (s) {
        s = s.trim();
        // if the selector already contains the prefix, leave it
        if (s.indexOf(prefix) === 0 || s.indexOf("." + prefix) === 0 || s.indexOf("#" + prefix) === 0) {
          return s;
        }
        return prefix + " " + s;
      });
      return p1 + " " + parts.join(", ") + " {";
    });
  }

  function createUI(container, initialCss, options, savedScopeClass) {
    container.classList.add(options.uiClass);
    container.innerHTML = "";

    var info = document.createElement("div");
    info.style.marginBottom = "6px";
    info.innerHTML = "<strong>Style editor</strong> — write CSS here to style the selected block. " +
      "Rules can be written relative to the block (e.g. <code>p { color: red; }</code>) or use full selectors.";

    var textarea = document.createElement("textarea");
    textarea.style.width = "100%";
    textarea.style.minHeight = "160px";
    textarea.style.fontFamily = "monospace";
    textarea.style.boxSizing = "border-box";
    textarea.value = initialCss || "";

    var optsRow = document.createElement("div");
    optsRow.style.margin = "6px 0";
    optsRow.style.display = "flex";
    optsRow.style.gap = "10px";
    optsRow.style.alignItems = "center";

    var scopeLabel = document.createElement("label");
    var scopeCheckbox = document.createElement("input");
    scopeCheckbox.type = "checkbox";
    scopeCheckbox.checked = true;
    scopeLabel.appendChild(scopeCheckbox);
    scopeLabel.appendChild(document.createTextNode(" Scope to target"));
    optsRow.appendChild(scopeLabel);

    var liveLabel = document.createElement("label");
    var liveCheckbox = document.createElement("input");
    liveCheckbox.type = "checkbox";
    liveCheckbox.checked = true;
    liveLabel.appendChild(liveCheckbox);
    liveLabel.appendChild(document.createTextNode(" Live preview"));
    optsRow.appendChild(liveLabel);

    var actions = document.createElement("div");
    actions.style.marginTop = "6px";

    function makeButton(text, handler) {
      var b = document.createElement("button");
      b.type = "button";
      b.style.marginRight = "6px";
      b.textContent = text;
      b.addEventListener("click", handler);
      return b;
    }

    var applyBtn = makeButton("Apply", function () {
      var css = textarea.value;
      var scope = scopeCheckbox.checked;
      global.StyleEditor.applyCSSToTarget(savedScopeClass, css, scope);
    });

    var saveBtn = makeButton("Save", function () {
      var css = textarea.value;
      var scope = scopeCheckbox.checked;
      global.StyleEditor.saveCSS(savedScopeClass, css, scope);
      // also apply after save
      global.StyleEditor.applyCSSToTarget(savedScopeClass, css, scope);
      // provide a small flash
      var t = document.createElement("span");
      t.textContent = " Saved";
      t.style.color = "green";
      actions.appendChild(t);
      setTimeout(function () { actions.removeChild(t); }, 1500);
    });

    var resetBtn = makeButton("Reset", function () {
      if (!confirm("Reset saved styles for this target?")) return;
      global.StyleEditor.resetCSS(savedScopeClass);
      textarea.value = options.initialCSS || "";
      global.StyleEditor.removeInjectedStyle(savedScopeClass);
    });

    actions.appendChild(applyBtn);
    actions.appendChild(saveBtn);
    actions.appendChild(resetBtn);

    container.appendChild(info);
    container.appendChild(textarea);
    container.appendChild(optsRow);
    container.appendChild(actions);

    return {
      textarea: textarea,
      scopeCheckbox: scopeCheckbox,
      liveCheckbox: liveCheckbox,
      applyBtn: applyBtn,
      saveBtn: saveBtn,
      resetBtn: resetBtn
    };
  }

  function injectStyleElement(id, css) {
    var existing = document.getElementById(id);
    if (existing) {
      existing.textContent = css;
      return existing;
    }
    var style = document.createElement("style");
    style.id = id;
    style.type = "text/css";
    style.textContent = css;
    document.head.appendChild(style);
    return style;
  }

  // Public API object
  var StyleEditor = {
    init: function (opts) {
      var options = {};
      for (var k in DEFAULTS) { options[k] = DEFAULTS[k]; }
      if (opts) {
        for (var p in opts) { options[p] = opts[p]; }
      }

      var container = document.querySelector(options.containerSelector);
      var target = document.querySelector(options.targetSelector);
      if (!container) {
        console.warn("StyleEditor: container not found:", options.containerSelector);
        return null;
      }
      if (!target) {
        console.warn("StyleEditor: target not found:", options.targetSelector);
        return null;
      }

      // create a unique scope class per page + selector
      var pageKeySeed = (location.pathname || "") + "::" + options.targetSelector;
      var scopeClass = makeId(pageKeySeed);

      // ensure target has the class
      if (!target.classList.contains(scopeClass)) {
        target.classList.add(scopeClass);
      }

      // storage key
      var storageKey = options.storagePrefix + pageKeySeed;

      var saved = localStorage.getItem(storageKey);
      var savedJson = null;
      if (saved) {
        try { savedJson = JSON.parse(saved); } catch (e) { savedJson = null; }
      }

      var initialCSS = (savedJson && savedJson.css) ? savedJson.css : options.initialCSS;

      var ui = createUI(container, initialCSS, options, scopeClass);

      // Apply initial saved CSS automatically
      if (savedJson && savedJson.css) {
        var scope = ('scope' in savedJson) ? savedJson.scope : true;
        StyleEditor.applyCSSToTarget(scopeClass, savedJson.css, scope);
      }

      // Wiring for live preview (debounced)
      var timer = null;
      ui.textarea.addEventListener("input", function () {
        if (!ui.liveCheckbox.checked) return;
        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
          var css = ui.textarea.value;
          var scope = ui.scopeCheckbox.checked;
          StyleEditor.applyCSSToTarget(scopeClass, css, scope);
        }, 250);
      });

      // Save on Ctrl/Cmd+S inside the textarea
      ui.textarea.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "s") {
          e.preventDefault();
          ui.saveBtn.click();
        }
      });

      return {
        container: container,
        target: target,
        scopeClass: scopeClass,
        storageKey: storageKey,
        ui: ui
      };
    },

    applyCSSToTarget: function (scopeClass, css, scope) {
      var id = "style-editor-inject-" + scopeClass;
      var applied = css || "";
      if (scope) {
        // prefix selectors with .scopeClass where needed
        applied = prefixSelectors(applied, "." + scopeClass);
      }
      injectStyleElement(id, applied);
    },

    saveCSS: function (scopeClass, css, scope) {
      var keySeed = (location.pathname || "") + "::" + "." + scopeClass;
      var storageKey = DEFAULTS.storagePrefix + keySeed;
      var obj = { css: css, scope: !!scope, ts: Date.now() };
      try {
        localStorage.setItem(storageKey, JSON.stringify(obj));
      } catch (e) {
        console.warn("StyleEditor: failed to save to localStorage", e);
      }
    },

    resetCSS: function (scopeClass) {
      var keySeed = (location.pathname || "") + "::" + "." + scopeClass;
      var storageKey = DEFAULTS.storagePrefix + keySeed;
      try {
        localStorage.removeItem(storageKey);
      } catch (e) { /* ignore */ }
      this.removeInjectedStyle(scopeClass);
    },

    removeInjectedStyle: function (scopeClass) {
      var id = "style-editor-inject-" + scopeClass;
      var el = document.getElementById(id);
      if (el) el.parentNode.removeChild(el);
    }
  };

  // Expose to global
  global.StyleEditor = StyleEditor;

  // Auto-initialize convenience: if script tag has data-init attributes,
  // e.g. <script src="/js/style-editor.js" data-target="#x" data-container="#y"></script>
  if (document.currentScript) {
    var s = document.currentScript;
    var t = s.getAttribute("data-target");
    var c = s.getAttribute("data-container");
    if (t && c) {
      // defer until DOM ready
      document.addEventListener("DOMContentLoaded", function () {
        StyleEditor.init({ targetSelector: t, containerSelector: c });
      });
    }
  }

})(window);
