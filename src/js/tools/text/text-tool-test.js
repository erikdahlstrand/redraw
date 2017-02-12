import TextTool from './text-tool';

describe('Text tool', () => {
  let subscribeToSpy;
  beforeEach(() => {
    const fabric = {};
    subscribeToSpy = jasmine.createSpy();
    const eventAggregator = {
      subscribeTo: subscribeToSpy
    };

    new TextTool({
      canvas: {}
    }, eventAggregator, {}, fabric);
  });

  it('should register for tool activation event', () => {
    expect(subscribeToSpy).toHaveBeenCalled();
    expect(subscribeToSpy.calls.count()).toEqual(2);
    expect(subscribeToSpy).toHaveBeenCalledWith('text', 'TextTool', jasmine.any(Function));
  });
});

