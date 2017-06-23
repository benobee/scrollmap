"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Trigger = function () {
	function Trigger(element, options, callback) {
		_classCallCheck(this, Trigger);

		this.element = element;
		this.surfaceVisible = 0.5;
		this.callback = callback;
		this.triggeredIn = false;
		this.triggeredOut = false;
		this.runOnScroll = false;
		this.delay = this.alwaysRunOnTrigger = false;
		if (options) {
			Object.assign(this, options);
		}
	}

	_createClass(Trigger, [{
		key: "onTriggerIn",
		value: function onTriggerIn() {
			this.callback(this.element);

			return this;
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.element = null;
			this.isDestroyed = true;
		}
	}]);

	return Trigger;
}();

exports.default = Trigger;