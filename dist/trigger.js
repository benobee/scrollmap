"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Trigger = function () {
	function Trigger(element, options, callback) {
		_classCallCheck(this, Trigger);

		this.element = element; // the DOM node to trigger
		this.callback = callback; // function to execute on visible
		this.isVisible = false; // is visible in the viewport
		this.hasBeenVisible = false; // has been in and out of the viewport
		this.surfaceVisible = 0.5; // the area of the element that will trigger the callback "default is 50%"
		this.runOnScroll = false; // for setting the callback to execute when the element is visible
		this.delay = 0;
		this.alwaysRunOnTrigger = false; // toggle to always execute the callback after element has been visible.

		if (options) {
			_extends(this, options);
		}
	}

	_createClass(Trigger, [{
		key: "onTriggerIn",
		value: function onTriggerIn() {
			var _this = this;

			if (this.triggerElement) {
				this.triggerElement.forEach(function (node) {
					if (_this.transition) {
						node.setAttribute("data-scrollmap-transition", _this.transition);
					}
					_this.callback(node);
				});
			}
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