import TextTool from './text-tool';
console.log('TextTool', TextTool);

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
    /*expect(setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 1000);
    expect(subscribeToSpy.callCount)
      .to.equal(2);
    expect(subscribeToSpy.args[0][0])
      .to.equal('text');
    expect(subscribeToSpy.args[0][1])
      .to.equal('TextTool');
    expect(subscribeToSpy.args[0][2])
      .to.be.a('function');*/
  });

});

