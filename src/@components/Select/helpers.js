let globalCallback = null;
let globalName = null;

const getOffset = (el) => {
    const rect = el.getBoundingClientRect();
    if(el){
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop  = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    return {top: 0, left: 0}
};

const generateId = () => { return (Math.floor(Math.random()*9999) + 1) + '-' + (Math.floor(Math.random()*9999) + 1); };

const documentClick = (evt) => {
    let flyoutElement = document.getElementById(globalName);
    let targetElement = evt.target;
    let hasFound = false;

    do {
        if (targetElement === flyoutElement) {
            hasFound = true;
            globalCallback(hasFound);
            return;
        }
        targetElement = targetElement.parentNode;
    } while (targetElement);

    globalCallback(hasFound);
};

const addBlurElem = (name, cb) => {
    globalName = name;
    globalCallback = cb;
    // sanitize if has id=#
    globalName = globalName.trim().replace('#', '');
    // sanitize if has class=.
    globalName = globalName.trim().replace('.', '');
    document.addEventListener("click", documentClick);
};

const removeBlurElem = () => {
    // document.removeEventListener("click", documentClick);
};

export {
    getOffset,
    generateId,
    addBlurElem,
    removeBlurElem,
};