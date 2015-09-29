var isBrowser = typeof window !== 'undefined';

class Browser {
    constructor() {
        console.log('--->  Browser Browser Browser Browser Browser Browser');
        this.document = isBrowser ? document : {};
        this.window = isBrowser ? window : {};
    }

    appendToWindow(attributeName, obj) {
        
        if (isBrowser) {
            window[attributeName] = obj;
            return true;
        }
        return false;
    }

    getFromWindow(attributeName) {
console.log('--->  Browser getFromWindow getFromWindow getFromWindow getFromWindow getFromWindow');
        if (isBrowser) {
            return window[attributeName];
        }
        return {tools: []};
    }
}
export default Browser;