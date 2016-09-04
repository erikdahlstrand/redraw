import PixelateTool from './pixelate-tool';

describe('Pixelate tool', () => {
    let subscribeToSpy;
    beforeEach(() => {
        let fabric = {};
        subscribeToSpy = sinon.spy();

        let eventAggregator = {
            subscribeTo: subscribeToSpy
        };

        new PixelateTool({ canvas: {} }, eventAggregator, {}, fabric);
    });

    it('should register for tool activation event', () => {
        expect(subscribeToSpy.calledOnce).to.equal(true);
        expect(subscribeToSpy.args[0][0]).to.equal('pixelate');
        expect(subscribeToSpy.args[0][1]).to.equal('PixelateTool');
        expect(subscribeToSpy.args[0][2]).to.be.a('function');
    });

});
