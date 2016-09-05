import DeleteTool from './delete-tool';

describe('Rectangle tool', () => {
  let subscribeToSpy;
  beforeEach(() => {
    let fabric = {};
    subscribeToSpy = sinon.spy();

    let eventAggregator = {
      subscribeTo: subscribeToSpy,
      notify: function () {}
    };

    new DeleteTool({
      canvas: {
        on: function () {}
      }
    }, eventAggregator, {}, fabric);
  });

  it('should register for tool activation event', () => {
    expect(subscribeToSpy.callCount)
      .to.equal(2);
    expect(subscribeToSpy.args[0][0])
      .to.equal('delete');
    expect(subscribeToSpy.args[0][1])
      .to.equal('DeleteTool');
    expect(subscribeToSpy.args[0][2])
      .to.be.a('function');
  });

});

