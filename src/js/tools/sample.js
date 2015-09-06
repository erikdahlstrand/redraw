var FabricJs = require('fabric').fabric;

var isTest = false;


class FabricProvider {
    constructor() {
        this.fabric = isTest ? {} : FabricJs;
    }

}
export default FabricProvider;