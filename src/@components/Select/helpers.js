const getOffset = (el) => {
    const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop  = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
};

const generateId = () => { return (Math.floor(Math.random()*9999) + 1) + '-' + (Math.floor(Math.random()*9999) + 1); };

const blurElem = (name, cb) => {
    // sanitize if has id=#
    name = name.trim().replace('#', '');
    // sanitize if has class=.
    name = name.trim().replace('.', '');
    document.addEventListener("click", function(evt) {
        let flyoutElement = document.getElementById(name);
        let targetElement = evt.target;
        let isInside = false;
        do {
            if (targetElement == flyoutElement) {
                isInside = true;
                cb(isInside);
                return;
            }
            targetElement = targetElement.parentNode;
        } while (targetElement);
        cb(isInside);
    });
};

export {
    getOffset,
    generateId,
    blurElem,
};
