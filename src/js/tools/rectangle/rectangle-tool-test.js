import RectangleTool from './rectangle-tool';

describe('Rectangle tool', () => {
    let subscribeToSpy;
    beforeEach(() => {
        let fabric = {};
        subscribeToSpy = sinon.spy();

        let eventAggregator = {
            subscribeTo: subscribeToSpy
        };

        new RectangleTool({ canvas: {} }, eventAggregator, {}, fabric);
    });

    it('should register for tool activation event', () => {
        expect(subscribeToSpy.calledOnce).to.equal(true);
        expect(subscribeToSpy.args[0][0]).to.equal('rectangle');
        expect(subscribeToSpy.args[0][1]).to.equal('RectangleTool');
        expect(subscribeToSpy.args[0][2]).to.be.a('function');
    });

});
