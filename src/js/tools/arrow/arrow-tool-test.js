import ArrowTool from './arrow-tool';

describe('Arrow tool', () => {
  let subscribeToSpy;
  beforeEach(() => {
    const fabric = {};
    subscribeToSpy = jasmine.createSpy();

    const eventAggregator = {
      subscribeTo: subscribeToSpy
    };

    new ArrowTool({
      canvas: {}
    }, eventAggregator, {}, fabric);
  });

  it('should register for event', () => {
    expect(subscribeToSpy).toHaveBeenCalled();
    expect(subscribeToSpy).toHaveBeenCalledWith('arrow', 'ArrowTool', jasmine.any(Function));
  });
});
