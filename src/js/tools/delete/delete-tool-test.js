import DeleteTool from './delete-tool';

describe('DeleteTool', () => {
  let subscribeToSpy;
  let canvasOnSpy;
  let eaNotifySpy;
  beforeEach(() => {
    const fabric = {};
    subscribeToSpy = jasmine.createSpy();
    canvasOnSpy = jasmine.createSpy();
    eaNotifySpy = jasmine.createSpy();

    const eventAggregator = {
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
    expect(subscribeToSpy.calls.argsFor(0)[0])
      .toEqual('delete');
    expect(subscribeToSpy.calls.argsFor(0)[1])
      .toEqual('DeleteTool');
    expect(subscribeToSpy.calls.argsFor(0)[2])
      .toEqual(jasmine.any(Function));
  });

  it('should register for keydown event', () => {
    expect(subscribeToSpy.calls.argsFor(1)[0])
      .toEqual('keydown');
    expect(subscribeToSpy.calls.argsFor(1)[1])
      .toEqual('DeleteTool');
    expect(subscribeToSpy.calls.argsFor(1)[2])
      .toEqual(jasmine.any(Function));
  });

  it('should register for "object:selected" event', () => {
    expect(canvasOnSpy.calls.argsFor(0)[0])
      .toEqual('object:selected');
    expect(canvasOnSpy.calls.argsFor(0)[1])
      .toEqual(jasmine.any(Function));
  });

  it('should notify "tool-enabled=false" upon initialization (but there may not be anyone '
    + 'out there listening)', () => {
    expect(eaNotifySpy.calls.argsFor(0)[0])
      .toEqual('tool-enabled');
    expect(eaNotifySpy.calls.argsFor(0)[2])
      .toEqual(false);
  });

  it('should notify "tool-enabled=true" when an object is eligible for deletion', () => {
    const callsBefore = eaNotifySpy.calls.count();
    canvasOnSpy.calls.argsFor(0)[1].apply(this, {});
    expect(eaNotifySpy.calls.argsFor(callsBefore)[0])
      .toEqual('tool-enabled');
    expect(eaNotifySpy.calls.argsFor(callsBefore)[2])
      .toEqual(true);
  });
});
