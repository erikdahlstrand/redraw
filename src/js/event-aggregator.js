class EventAggregator {
    constructor() {
        this.subscriptions = {};
        this.subscriptionsByTopic = {};
    }

    subscribe(subscriber, onNotifyFn) {
        this.subscriptions[subscriber] = onNotifyFn;
    }
    subscribeTo(topic, subscriberId, onNotifyFn, _invokationScope) {
        if (!this.subscriptionsByTopic[topic]) {
            this.subscriptionsByTopic[topic] = [];
        }

        this.subscriptionsByTopic[topic].push({subscriber: subscriberId, callbackFn: onNotifyFn, invokationScope: _invokationScope});
        console.log('subscribeTo', topic, subscriberId, this.subscriptionsByTopic[topic], _invokationScope);
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

        // for (var s1 in this.subscriptions) {
        //     this.subscriptions[s1].apply(undefined, [topic, sender, payload]);
        //     console.log('any', s1);
        // }
        for (var s2 in this.subscriptionsByTopic[topic]) {
            var scope = undefined;
            console.log('topical', this.subscriptionsByTopic[topic][s2]);
            if (this.subscriptionsByTopic[topic][s2].invokationScope) {
                
                console.log('invoking with scope');
                scope = this.subscriptionsByTopic[topic][s2].invokationScope;
            }
            this.subscriptionsByTopic[topic][s2].callbackFn.apply(scope, [topic, sender, payload]);
        }
    }

}

export default EventAggregator;