import DeleteTool from './delete-tool';

describe('Rectangle tool', () => {
  let subscribeToSpy, canvasOnSpy, eaNotifySpy;
  beforeEach(() => {
    let fabric = {};
    subscribeToSpy = sinon.spy();
    canvasOnSpy = sinon.spy();
    eaNotifySpy = sinon.spy();

    let eventAggregator = {
      subscribeTo: subscribeToSpy,
      notify: eaNotifySpy
    };

    new DeleteTool({
      canvas: {
        on: canvasOnSpy
      }
    }, eventAggregator, {}, fabric);
  });

  it('should register for tool activation event', () => {
    expect(subscribeToSpy.args[0][0])
      .to.equal('delete');
    expect(subscribeToSpy.args[0][1])
      .to.equal('DeleteTool');
    expect(subscribeToSpy.args[0][2])
      .to.be.a('function');
  });

  it('should register for keydown event', () => {
    expect(subscribeToSpy.args[1][0])
      .to.equal('keydown');
    expect(subscribeToSpy.args[1][1])
      .to.equal('DeleteTool');
    expect(subscribeToSpy.args[1][2])
      .to.be.a('function');
  });

  it('should register for "object:selected" event', () => {
    expect(canvasOnSpy.args[0][0])
      .to.equal('object:selected');
    expect(canvasOnSpy.args[0][1])
      .to.be.a('function');
  });

  it('should notify "tool-enabled=false" upon initialization (but there may not be anyone out there listening)', () => {
    expect(eaNotifySpy.args[0][0])
      .to.equal('tool-enabled');
    expect(eaNotifySpy.args[0][2])
      .to.equal(false);
  });

  it('should notify "tool-enabled=true" when an object is eligible for deletion', () => {
    let callsBefore = eaNotifySpy.callCount;
    canvasOnSpy.args[0][1].apply(this, {});
    expect(eaNotifySpy.args[callsBefore][0])
      .to.equal('tool-enabled');
    expect(eaNotifySpy.args[callsBefore][2])
      .to.equal(true);
  });

});
