class Trigger {
	constructor (element, options, callback) {
		this.element = element; // the DOM node to trigger
		this.callback = callback; // function to execute on visible
		this.isVisible = false; // is visible in the viewport
		this.hasBeenVisible = false; // has been in and out of the viewport
		this.surfaceVisible = 0.5; // the area of the element that will trigger the callback "default is 50%"
		this.runOnScroll = false; // for setting the callback to execute when the element is visible
		this.delay = 0;
		this.alwaysRunOnTrigger = false; // toggle to always execute the callback after element has been visible.

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