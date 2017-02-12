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
   * @param {Object} invokationScope - scope to be used when invoking callback, optional.
   */
  subscribeTo(topic, subscriberId, onNotifyFn, invokationScope) {
    if (!this.subscriptionsByTopic[topic]) {
      this.subscriptionsByTopic[topic] = [];
    }

    this.subscriptionsByTopic[topic].push({
      subscriber: subscriberId,
      callbackFn: onNotifyFn,
      invokationScope
    });
  }

  // ToDo needs test
  /**
   * Unregisters a subscriber from a specific event topic.
   * @param {string} topic - name of the event type / topic.
   * @param {string} subscriber - id the unique subscriber.
   */
  unsubscribeTo(topic, subscriber) {
    Object.keys(this.subscriptionsByTopic[topic]).forEach((j) => {
      if (this.subscriptionsByTopic[topic][j].subscriber === subscriber) {
        this.subscriptionsByTopic[topic].splice(j, 1);
      }
    });
  }

  /**
   * Called to notify all subscribers of this topic
   * @param {string} topic - name of the event type / topic.
   * @param {string} sender - address of the sender.
   * @param {Object} payload - any data to pass to the subscriber.
   */
  notify(topic, sender, payload) {
    if (!this.subscriptionsByTopic[topic]) {
      return;
    }
    Object.keys(this.subscriptionsByTopic[topic]).forEach((s2) => {
      let scope;

      if (this.subscriptionsByTopic[topic][s2].invokationScope) {
        scope = this.subscriptionsByTopic[topic][s2].invokationScope;
      }
      this.subscriptionsByTopic[topic][s2].callbackFn.apply(scope, [topic, sender, payload]);
    });
  }
}
