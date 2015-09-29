var __path__ = '../src/js/tools/arrow.js';

jest.dontMock(__path__);

describe('ArrowTool', function() {

	let canvasWrapper = {
		registerTool: function() {},
		enableSelection:function() {},
		canvas: {
			add:function() {},
			on:function() {}},
		},
		eventAggregator = {};

	let Browser, subscriptionTopic, subscriberId, toolbarSubscriptionFn, arrowTool, notificationTopic, ArrowTool;

	beforeEach(function() {
		var Browser = require('../src/js/browser-api.js');

		Browser.mockImplementation(function() {
			return {
				getFromWindow:function () {
					return {registerTool:function() {}};
				}
			};
		});

		ArrowTool = require(__path__);
	});

	eventAggregator.subscribeTo = function(topic, _subscriberId, callback) {
		subscriptionTopic = topic;
		subscriberId = _subscriberId;
		toolbarSubscriptionFn = callback;
	};

	eventAggregator.notify = function(_topic, originId, message) {
		notificationTopic = _topic;
	};	

	describe('should register for toolbar event', function () {
		it('with parameter topicName "arrow"', function () {

			arrowTool = new ArrowTool(canvasWrapper, eventAggregator);
			expect(subscriptionTopic).toBe('arrow');
		});
	

		it('with parameter subscriber "ArrowTool"', function () {
			
			arrowTool = new ArrowTool(canvasWrapper, eventAggregator);
			expect(subscriberId).toBe('ArrowTool');

		});
	});

	describe('upon toolbar activation', function () {

		beforeEach(function() {
			var sampleProvider = require.requireActual('../src/js/tools/sample.js');
			arrowTool = new ArrowTool(canvasWrapper, eventAggregator);
			toolbarSubscriptionFn.apply(toolbarSubscriptionFn, []);

		});

		it('should register for keydown event', function () {

			expect(subscriptionTopic).toBe('keydown');
			expect(subscriberId).toBe('ArrowTool');
		});

	});
});