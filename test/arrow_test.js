
import ArrowTool from '../src/js/tools/arrow.js';
var chai = require('chai');
var expect = chai.expect;

var expect = chai.expect;

describe('ArrowTool', function () {
	let canvasWrapper = {}, eventAggregator = {};
	let subscriptionTopic, arrowTool;

	eventAggregator.subscribeTo = function(topic, f) {
		console.log('mocked subscribeTo', topic);
		subscriptionTopic = topic;
	};

	it('should register for event "arr_t"', function () {
		arrowTool = new ArrowTool(canvasWrapper, eventAggregator);
		expect(subscriptionTopic).to.equal('arr_t');
	});
});