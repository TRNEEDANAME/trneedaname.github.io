
import BashWasm from "https://unpkg.com/bash-wasm@latest/dist/bash-wasm.js";

let bashInstance = null;

async function initBash() {
  if (!bashInstance) {
    bashInstance = await BashWasm.create();
  }
  return bashInstance;
}

async function runBash(codeBlock, outputBlock) {
  const bash = await initBash();
  const code = codeBlock.textContent.trim();
  try {
    const output = await bash.runCommand(code);
    outputBlock.textContent = output;
  } catch (err) {
    outputBlock.textContent = `Erreur : ${err}`;
  }
}

function setupBashBlocks() {
  document.querySelectorAll('pre code.language-bash').forEach(block => {
    const container = document.createElement('div');
    const output = document.createElement('pre');
    const runBtn = document.createElement('button');

    runBtn.textContent = "▶ Exécuter";
    runBtn.style.margin = "0.5em 0";
    output.classList.add("bash-output");
    output.style.background = "#111";
    output.style.color = "#0f0";
    output.style.padding = "0.5em";

    const parent = block.parentNode;
    parent.parentNode.insertBefore(container, parent);
    container.appendChild(parent);
    container.appendChild(runBtn);
    container.appendChild(output);

    runBtn.addEventListener("click", () => runBash(block, output));
  });
}

// Initialisation automatique
document.addEventListener("DOMContentLoaded", setupBashBlocks);
