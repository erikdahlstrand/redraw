import ResetTool from './reset-tool';

describe('Reset tool', () => {
  let subscribeToSpy;
  beforeEach(() => {
    const fabric = {};
    subscribeToSpy = jasmine.createSpy();

    const eventAggregator = {
      subscribeTo: subscribeToSpy
    };

    new ResetTool({
      canvas: {}
    }, eventAggregator, {}, fabric);
  });

  it('should register for tool activation event', () => {
    expect(subscribeToSpy).toHaveBeenCalledWith('reset', 'ResetTool', jasmine.any(Function));
  });
});
