class Trigger {
    constructor (element, options, callback) {
        this.element = element;
        this.surfaceVisible = 0.5;
        this.treshold = 0;
        this.callback = callback;
        this.triggeredIn = false;
        this.triggeredOut = false;
        this.runOnScroll = false;
        this.alwaysRunOnTrigger = false;
        if (options) {
            Object.assign(this, options);
        }
    }

    onTriggerIn () {
        this.callback(this.element);
        return this;
    }

    destroy () {
        this.element = null;
    }
}

export default Trigger;
