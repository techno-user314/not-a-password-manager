import { initializeInfoDialogs, initializeLoginFlow, initializeNumberControl } from "./ui.js";
import { initializePasswordFlow } from "./password.js";

const infoDialogs = initializeInfoDialogs();
const { platformForm, getLogin } = initializeLoginFlow(infoDialogs);
const getNumber = initializeNumberControl();

initializePasswordFlow({
    platformForm,
    getLogin,
    getNumber,
});
