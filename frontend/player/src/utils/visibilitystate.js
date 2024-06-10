export const getNameListenVisibilityState = () => {
    let name;

    if (document.visibilityState) {
        name = "visibilitychange";
    }
    return name;
};
export const addEventListenerVisibilityStateChange = callback => {
    const name = getNameListenVisibilityState();
    if (name) {
        document.addEventListener(name, callback, !1);
    }
};
export const removeEventListenerVisibilityStateChange = callback => {
    const name = getNameListenVisibilityState();
    if (name) {
        document.removeEventListener(name, callback, !1);
    }
};
