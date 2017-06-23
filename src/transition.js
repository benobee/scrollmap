class Transition {
	constructor(...args) {
		Object.assign(this, ...args);

		console.log(this);
	}
};

export default Transition;
