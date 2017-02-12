import RectangleTool from './rectangle-tool';

describe('Rectangle tool', () => {
  let subscribeToSpy;
  beforeEach(() => {
    const fabric = {};
    subscribeToSpy = jasmine.createSpy();

    const eventAggregator = {
      subscribeTo: subscribeToSpy
    };

    new RectangleTool({
      canvas: {}
    }, eventAggregator, {}, fabric);
  });

  it('should register for tool activation event', () => {
    expect(subscribeToSpy).toHaveBeenCalledWith('rectangle',
      'RectangleTool', jasmine.any(Function));
  });
});
