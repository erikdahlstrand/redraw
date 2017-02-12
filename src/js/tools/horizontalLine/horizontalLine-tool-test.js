import HorizontalLineTool from './horizontalLine-tool';

describe('HorizontalLineTool', () => {
  let subscribeToSpy;
  beforeEach(() => {
    const fabric = {};
    subscribeToSpy = jasmine.createSpy();

    const eventAggregator = {
      subscribeTo: subscribeToSpy
    };

    new HorizontalLineTool({
      canvas: {}
    }, eventAggregator, {}, fabric);
  });

  it('should register for tool activation event', () => {
    expect(subscribeToSpy).toHaveBeenCalledWith('horizontalLine',
      'HorizontalLineTool', jasmine.any(Function));
  });
});
