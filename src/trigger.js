class Trigger {
	constructor (element, options, callback) {
		this.element = element;
		this.callback = callback;
		this.triggeredIn = false;
		this.triggeredOut = false;
		this.surfaceVisible = 0.5;
		this.runOnScroll = false;
		this.delay = 0;
		this.alwaysRunOnTrigger = false;

		if (options) {
			Object.assign(this, options);
		}
	}
	onTriggerIn () {
		if (this.triggerElement) {
			this.triggerElement.forEach((node) => {
				this.transition ? node.setAttribute("data-scrollmap-transition", this.transition) : false;
				this.callback(node);
			});
		}
		this.callback(this.element);

		return this;
	}
	destroy () {
		this.element = null;
		this.isDestroyed = true;
	}
}

export default Trigger;