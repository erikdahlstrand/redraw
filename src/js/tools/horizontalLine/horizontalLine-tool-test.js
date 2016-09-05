import HorizontalLineTool from './horizontalLine-tool';

describe('Rectangle tool', () => {
  let subscribeToSpy;
  beforeEach(() => {
    let fabric = {};
    subscribeToSpy = sinon.spy();

    let eventAggregator = {
      subscribeTo: subscribeToSpy
    };

    new HorizontalLineTool({
      canvas: {}
    }, eventAggregator, {}, fabric);
  });

  it('should register for tool activation event', () => {
    expect(subscribeToSpy.calledOnce)
      .to.equal(true);
    expect(subscribeToSpy.args[0][0])
      .to.equal('horizontalLine');
    expect(subscribeToSpy.args[0][1])
      .to.equal('HorizontalLineTool');
    expect(subscribeToSpy.args[0][2])
      .to.be.a('function');
  });

});

