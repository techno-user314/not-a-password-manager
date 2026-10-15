async function generatePassword(platform, login, number) {
    const data = new TextEncoder().encode(platform + login + String(number));
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashBytes = new Uint8Array(hashBuffer);
    let binary = "";

    for (const byte of hashBytes) binary += String.fromCharCode(byte);

    return ("B0x:" + btoa(binary)).substring(0, 20);
}

export function initializePasswordFlow({ platformForm, getLogin, getNumber }) {
    const platformInput = platformForm.querySelector("input");
    const passwordModal = document.getElementById("passwordModal");
    const passwordOutput = document.getElementById("passwordOutput");
    const visibilityButton = document.getElementById("visibilityButton");
    const copyButton = document.getElementById("copyButton");
    const passwordBox = document.querySelector(".password-box");

    platformForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        passwordOutput.value = await generatePassword(
            platformInput.value,
            getLogin(),
            getNumber()
        );
        passwordOutput.type = "password";
        visibilityButton.textContent = "◉";
        copyButton.textContent = "COPY";
        passwordModal.classList.add("visible");
    });

    visibilityButton.addEventListener("click", () => {
        const visible = passwordOutput.type === "text";
        passwordOutput.type = visible ? "password" : "text";
        visibilityButton.textContent = visible ? "◉" : "○";
    });

    copyButton.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(passwordOutput.value);
        } catch {
            passwordOutput.select();
            document.execCommand("copy");
        }
        copyButton.textContent = "COPIED";
        setTimeout(() => { copyButton.textContent = "COPY"; }, 1200);
    });

    passwordModal.addEventListener("click", (event) => {
        if (!passwordBox.contains(event.target)) {
            passwordModal.classList.remove("visible");
        }
    });
}
