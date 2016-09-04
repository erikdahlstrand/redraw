import TextTool from './text-tool';

describe('Text tool', () => {
    let subscribeToSpy;
    beforeEach(() => {
        let fabric = {};
        subscribeToSpy = sinon.spy();

        let eventAggregator = {
            subscribeTo: subscribeToSpy
        };

        new TextTool({ canvas: {} }, eventAggregator, {}, fabric);
    });

    it('should register for tool activation event', () => {
        expect(subscribeToSpy.callCount).to.equal(2);
        expect(subscribeToSpy.args[0][0]).to.equal('text');
        expect(subscribeToSpy.args[0][1]).to.equal('TextTool');
        expect(subscribeToSpy.args[0][2]).to.be.a('function');
    });

});
