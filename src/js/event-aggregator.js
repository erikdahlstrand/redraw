class EventAggregator {
    constructor() {
        this.subscriptions = {};
        this.subscriptionsByTopic = {};
    }

    subscribe(subscriber, onNotifyFn) {
        this.subscriptions[subscriber] = onNotifyFn;
    }
    subscribeTo(topic, subscriberId, onNotifyFn) {
        console.log('subscribeTo', topic, subscriberId, onNotifyFn);
        if (!this.subscriptionsByTopic[topic]) {
            this.subscriptionsByTopic[topic] = [];
        }
        this.subscriptionsByTopic[topic].push({subscriber: subscriberId, callbackFn: onNotifyFn});
    }

    // ToDo needs test
    unsubscribe(_subscriber) {
        delete this.subscriptions[_subscriber];
        for (var i in this.subscriptionsByTopic) {
            
            for (var j in this.subscriptionsByTopic[i]) {
                if (this.subscriptionsByTopic[i][j].subscriber === _subscriber) {
                    this.subscriptionsByTopic[i].splice(j, 1);
                }
            }
        }
    }

    // ToDo needs test
    unsubscribeTo(topic, _subscriber) {
        for (var j in this.subscriptionsByTopic[topic]) {
            if (this.subscriptionsByTopic[topic][j].subscriber === _subscriber) {
                this.subscriptionsByTopic[topic].splice(j, 1);
            }
        }
    }

    notify(topic, sender, payload) {
        console.log('ev', topic, sender, payload);
        for (var s1 in this.subscriptions) {
            this.subscriptions[s1].apply(undefined, [topic, sender, payload]);
        }
        for (var s2 in this.subscriptionsByTopic[topic]) {
            this.subscriptionsByTopic[topic][s2].callbackFn.apply(undefined, [topic, sender, payload]);
        }
    }

}

export default EventAggregator;