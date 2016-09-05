import ResetTool from './reset-tool';

describe('Reset tool', () => {
  let subscribeToSpy;
  beforeEach(() => {
    let fabric = {};
    subscribeToSpy = sinon.spy();

    let eventAggregator = {
      subscribeTo: subscribeToSpy
    };

    new ResetTool({
      canvas: {}
    }, eventAggregator, {}, fabric);
  });

  it('should register for tool activation event', () => {
    expect(subscribeToSpy.calledOnce)
      .to.equal(true);
    expect(subscribeToSpy.args[0][0])
      .to.equal('reset');
    expect(subscribeToSpy.args[0][1])
      .to.equal('ResetTool');
    expect(subscribeToSpy.args[0][2])
      .to.be.a('function');
  });

});

