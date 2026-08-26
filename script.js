const firstString = document.getElementById("firstString");
const secondString = document.getElementById("secondString");
const numberInput = document.getElementById("number");
const resultArea = document.getElementById("resultArea");

let generateButton;

function showGenerateButton() {
  resultArea.innerHTML = "";

  generateButton = document.createElement("button");
  generateButton.type = "button";
  generateButton.textContent = "Get Password";
  generateButton.addEventListener("click", generateResult);

  resultArea.appendChild(generateButton);
}

function getPositiveInteger() {
  let value = Number.parseInt(numberInput.value, 10);

  if (!Number.isInteger(value) || value < 1) {
    value = 1;
    numberInput.value = "1";
  }

  return value;
}

async function generateResult() {
  const combined =
    firstString.value +
    secondString.value +
    String(getPositiveInteger());

  const encoder = new TextEncoder();
  const data = encoder.encode(combined);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashBytes = new Uint8Array(hashBuffer);

  // Convert the SHA-256 bytes to Base64.
  let binary = "";
  for (const byte of hashBytes) {
    binary += String.fromCharCode(byte);
  }

  const base64 = btoa(binary);

  // Prefix, then truncate the complete result to 20 characters.
  const output = ("B0x:" + base64).substring(0, 20);

  showOutput(output);
}

function showOutput(output) {
  resultArea.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "output-wrapper";

  const outputInput = document.createElement("input");
  outputInput.className = "output";
  outputInput.type = "text";
  outputInput.value = output;
  outputInput.readOnly = true;
  outputInput.setAttribute("aria-label", "Generated output");

  const copyButton = document.createElement("button");
  copyButton.className = "copy-button";
  copyButton.type = "button";
  copyButton.textContent = "Copy";

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(output);
      copyButton.textContent = "Copied!";

      setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 1500);
    } catch {
      // Fallback for browsers where Clipboard API is unavailable.
      outputInput.select();
      document.execCommand("copy");

      copyButton.textContent = "Copied!";
      setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 1500);
    }
  });

  wrapper.appendChild(outputInput);
  wrapper.appendChild(copyButton);
  resultArea.appendChild(wrapper);
}

// Any input change returns the UI to the Generate state.
[firstString, secondString, numberInput].forEach((input) => {
  input.addEventListener("input", showGenerateButton);
  input.addEventListener("change", showGenerateButton);
});

// The button is visible when the page first loads.
showGenerateButton();
