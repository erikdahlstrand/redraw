/**
 * Mediator for events.
 */
export default class EventAggregator {
  /**
   * Contructor that initializes internal stuff.
   * @constructor
   */
  constructor() {
    this.subscriptionsByTopic = {};
  }

  /**
   * Registers a subscriber for a specific event topic.
   * @param {string} topic - name of the event type / topic.
   * @param {string} subscriberId - id the subscriber, must be unique.
   * @param {function(topic: string, sender: string, payload: Object)} onNotifyFn - callback
   * invoked upon when upon notification.
   * @param {Object} [_invokationScope] - scope to be used when invoking callback.
   */
  subscribeTo(topic, subscriberId, onNotifyFn, _invokationScope) {
    if (!this.subscriptionsByTopic[topic]) {
      this.subscriptionsByTopic[topic] = [];
    }

    this.subscriptionsByTopic[topic].push({
      subscriber: subscriberId,
      callbackFn: onNotifyFn,
      invokationScope: _invokationScope
    });
  }

  // ToDo needs test
  /**
   * Unregisters a subscriber from a specific event topic.
   * @param {string} topic - name of the event type / topic.
   * @param {string} _subscriber - id the unique subscriber.
   */
  unsubscribeTo(topic, _subscriber) {
    for (var j in this.subscriptionsByTopic[topic]) {
      if (this.subscriptionsByTopic[topic][j].subscriber === _subscriber) {
        this.subscriptionsByTopic[topic].splice(j, 1);
      }
    }
  }

  /**
   * Called to notify all subscribers of this topic
   * @param {string} topic - name of the event type / topic.
   * @param {string} sender - address of the sender.
   * @param {Object} payload - any data to pass to the subscriber.
   */
  notify(topic, sender, payload) {
    for (var s2 in this.subscriptionsByTopic[topic]) {
      let scope = undefined;
      if (this.subscriptionsByTopic[topic][s2].invokationScope) {
        scope = this.subscriptionsByTopic[topic][s2].invokationScope;
      }

      this.subscriptionsByTopic[topic][s2].callbackFn.apply(scope, [topic, sender, payload]);
    }
  }
}

