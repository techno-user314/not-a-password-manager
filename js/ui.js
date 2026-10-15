export function initializeInfoDialogs() {
    const helpButton = document.getElementById("loginHelpButton");
    const dialogue = document.getElementById("loginDialogue");
    const aboutButton = document.getElementById("aboutButton");
    const aboutDialogue = document.getElementById("aboutDialogue");

    helpButton.addEventListener("click", () => {
        dialogue.classList.toggle("visible");
    });

    aboutButton.addEventListener("click", () => {
        aboutDialogue.classList.toggle("visible");
    });

    return { helpButton, dialogue };
}

export function initializeLoginFlow({ helpButton, dialogue }) {
    const loginForm = document.getElementById("loginForm");
    const platformForm = document.getElementById("platformForm");
    const loginInput = loginForm.querySelector("input");
    let login = "";

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        login = loginInput.value;
        loginForm.classList.add("hidden");
        platformForm.classList.add("visible");
        helpButton.textContent = "How do I use this?";
        dialogue.querySelector(".dialogue-content").innerHTML = `
            <span>
                Enter a platform code to generate the password for that platform code. E.g. "jungle" to get the password for your Amazon.com account.
                Note that this is case sensitive. Also note that platform codes are arbitrary and decided by you - so make sure you will remember it later.
                Increment the number to get a new password for the same platform code.
                Reload the page to login for a different user.
            </span>
            <span style="font-size:16px; color: var(--muted)">
                Your account credentials are never stored. See ABOUT for more information.
            </span>
        `;
    });

    return { loginForm, platformForm, getLogin: () => login };
}

export function initializeNumberControl() {
    const numberValue = document.getElementById("numberValue");
    let number = 1;

    document.getElementById("numberUp").addEventListener("click", () => {
        numberValue.textContent = ++number;
    });

    document.getElementById("numberDown").addEventListener("click", () => {
        if (number > 1) numberValue.textContent = --number;
    });

    return () => number;
}
