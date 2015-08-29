var isBrowser = typeof window !== 'undefined';

class Browser {
    constructor() {
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
}
export default Browser;