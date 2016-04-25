import ArrowTool from '../../src/js/tools/arrow';
import Browser from '../../src/js/browser-api';


describe('rechart', () => {
  describe('Greet function', () => {
    let arrowTool, eventAggregatorInvocationCount;
    beforeEach(() => {
      var fabric = {};
      // var triangleSpy = spy(fabric, 'Triangle')
      eventAggregatorInvocationCount = 0;
      var eventAggregator = {
        subscribeTo: function () {
          eventAggregatorInvocationCount++;
        }
      };

      arrowTool = new ArrowTool({canvas:{}}, eventAggregator, {}, fabric);
    });

    it('should register for event', () => {
      expect(eventAggregatorInvocationCount ).to.equal(1);
    });

  });
});
