import PixelateTool from './pixelate-tool';

describe('Pixelate tool', () => {
  let subscribeToSpy;
  beforeEach(() => {
    const fabric = {};
    subscribeToSpy = jasmine.createSpy();

    const eventAggregator = {
      subscribeTo: subscribeToSpy
    };

    new PixelateTool({
      canvas: {}
    }, eventAggregator, {}, fabric);
  });

  it('should register for tool activation event', () => {
    expect(subscribeToSpy.calls.count())
      .toEqual(1);
    expect(subscribeToSpy.calls.argsFor(0)[0])
      .toEqual('pixelate');
    expect(subscribeToSpy.calls.argsFor(0)[1])
      .toEqual('PixelateTool');
  });
});
