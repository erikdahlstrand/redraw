import ArrowTool from './arrow-tool';

describe('Tools', () => {
  describe('Arrow', () => {
    let arrowTool, eventAggregatorInvocationCount, subscribeToSpy;
    beforeEach(() => {
      var fabric = {};
      subscribeToSpy = sinon.spy();
      // var triangleSpy = spy(fabric, 'Triangle')
      eventAggregatorInvocationCount = 0;
      var eventAggregator = {
        subscribeTo: subscribeToSpy
      };

      arrowTool = new ArrowTool({canvas:{}}, eventAggregator, {}, fabric);
    });

    it('should register for event', () => {
      expect(subscribeToSpy.calledOnce).to.equal(true);
      expect(subscribeToSpy.args[0][0]).to.equal('arrow');
      expect(subscribeToSpy.args[0][1]).to.equal('ArrowTool');
      expect(subscribeToSpy.args[0][2]).to.be.a('function');
    });

  });
});
