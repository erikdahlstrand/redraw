import ArrowTool from './arrow-tool';

describe('Arrow tool', () => {
  let subscribeToSpy;
  beforeEach(() => {
    let fabric = {};
    subscribeToSpy = sinon.spy();

    let eventAggregator = {
      subscribeTo: subscribeToSpy
    };

    let arrowTool = new ArrowTool({
      canvas: {}
    }, eventAggregator, {}, fabric);
  });

  it('should register for event', () => {
    expect(subscribeToSpy.calledOnce).to.equal(true);
    expect(subscribeToSpy.args[0][0]).to.equal('arrow');
    expect(subscribeToSpy.args[0][1]).to.equal('ArrowTool');
    expect(subscribeToSpy.args[0][2]).to.be.a('function');
  });

});

