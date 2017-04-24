class Trigger {
	constructor(element, options) {
		this.element = element;
		this.surfaceVisible = 1;

		if (options) {
			Object.assign(this, options);
		}
	}
	destroy() {
		this.element = null;
		this.isDestroyed = true;
	}
}

export default Trigger;