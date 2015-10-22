var isBrowser = typeof window !== 'undefined';

/**
 * Facade of the browser apis. The main purpose id to facilitate testing.
 */
export default class Browser {
    /**
     * Contructor that determines if there is a browser present.
     * @constructor
     */
    constructor() {
        this.document = isBrowser ? document : {};
        this.window = isBrowser ? window : {};
    }

    /**
     * Appends property to the browser window object.
     * @param {string} attributeName - Name of the property to create/assign.
     * @param {Object} obj - value to set.
     */
    appendToWindow(attributeName, obj) {
        
        if (isBrowser) {
            window[attributeName] = obj;
            return true;
        }
        return false;
    }

    /**
     * Use to retrieve property from the browser window object.
     * @param {string} attributeName - Name of the property to create/assign.
     * @returns {Object} obj - retrieved value, or mock if not browser.
     */
    getFromWindow(attributeName) {
        if (isBrowser) {
            return window[attributeName];
        }
        return {tools: []};
    }
}