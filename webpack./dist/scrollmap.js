/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../src/scrollmap.js":
/*!***************************!*\
  !*** ../src/scrollmap.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _trigger = __webpack_require__(/*! ./trigger */ "../src/trigger.js");

var _trigger2 = _interopRequireDefault(_trigger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A module for testing if a DOM element is visible in the
 * viewport, then triggers callbacks on execution.
 * @namespace ScrollMap
 */

var Scroll_Event_Trigger = function () {
    function Scroll_Event_Trigger() {
        _classCallCheck(this, Scroll_Event_Trigger);

        this.lastScrollTop = 0;
        this.points = [];
        this.topics = {};
    }

    /**
     * Publish part of pubsub pattern.
     * @param  {String} topic
     * @param  {Object} data
     */


    _createClass(Scroll_Event_Trigger, [{
        key: "emit",
        value: function emit(topic, data) {
            // return if the topic doesn't exist, or there are no listeners
            if (!this.topics[topic] || this.topics[topic].length < 1) {
                return;
            }

            // send the event to all listeners
            this.topics[topic].forEach(function (listener) {
                return listener(data || {});
            });
        }

        /**
         * Subscribe part of pubsub pattern
         * @param  {String} topic
         * @param  {Function} listener
         */

    }, {
        key: "on",
        value: function on(topic, listener) {
            // create the topic if not yet created
            if (!this.topics[topic]) {
                this.topics[topic] = [];
            }

            // add the listener
            this.topics[topic].push(listener);
        }

        /**
         * A method for staggering an array of triggers.
         *
         * Properties for options config object:
         *
         * interval: (number) :
         * changes the interval speed of the sequence
         *
         * order: (string) :
         * changes the order of the sequence. Order options are "random", and "reverse".
         *
         * callback (item, index):
         * can get the item and index of the array as arguments
         *
         * @param  {Array} array
         * @param  {Object} options
         * @param  {Function} func
         * @memberOf Scrollmap
         * @return {Object}
         */

    }, {
        key: "sequence",
        value: function sequence(array, options, func) {
            array = Array.prototype.slice.call(array);

            var delay = 0;

            if (options.order) {
                this.sequenceOrder(array, options.order);
            }

            if (options.delay) {
                delay = options.delay;
            }

            var run = array.forEach(function (item, i) {
                setTimeout(function () {
                    func(array[i], i);
                }, options.interval * i);
            });

            setTimeout(run, delay);

            return this;
        }

        /**
         * The method which executes the the desired
         * sequence method based on the arguments
         * @param  {Array} array
         * @param  {String} order
         * @memberOf Scrollmap
         * @return {Array}
         */

    }, {
        key: "sequenceOrder",
        value: function sequenceOrder(array, order) {
            switch (order) {
                case "random":
                    array = array.sort(function () {
                        return 0.5 - Math.random();
                    });
                    break;
                case "reverse":
                    array = array.reverse();
                    break;
                default:
            }
            return array;
        }

        /**
         * A method for adding triggers when element is visible in the viewport.
         *
         * Properties for options config object:
         * target (string or element): Using querySelectorAll a target string selector
         * is needed, or you can specify an actual element.
         *
         * surfaceVisible (number): the percentage area, which is represented as a
         * number from 0 - 1 is the area of the which is visible in the viewport.
         *
         * runOnScroll (boolean) : by default the callback is run only one time whent
         * the element is visible. By changing to true, the callback will be run
         * as long as the scroll event is happening.
         *
         * alwaysRunOnTrigger (boolean): by default the triggered element callback
         * will only be executed one time. Setting to true will re-trigger thcallback
         * everytime the element has been in and out of the viewport.
         *
         * callback (object):
         * This is the function which will be exectued when the element is detected
         * in the viewport. To reference the node, pass it into the callback as an argument.
         *
         * @param  {Object}   args     options for callback triggering
         * @param  {Function} callback the method executed based on the argments
         * @memberOf Scrollmap
         */

    }, {
        key: "trigger",
        value: function trigger(args, callback) {
            var _this = this;

            var el = args.target;
            var triggerElementSelector = args.triggerElement;

            if (triggerElementSelector) {
                triggerElementSelector = this.checkSelector(triggerElementSelector);
            }

            el = this.checkSelector(el);

            var _id = function _id(i) {
                return "_" + (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)) + "_" + i;
            };

            el.forEach(function (node, i) {
                node.setAttribute("data-scrollmap-id", _id(i));
                if (triggerElementSelector) {
                    node.setAttribute("data-scrollmap-trigger-element", triggerElementSelector);
                }
                if (args.transition) {
                    node.setAttribute("data-scrollmap-transition", args.transition);
                }
                node.setAttribute("data-scrollmap-loaded", true);
                node.setAttribute("data-scrollmap-triggered-in", false);
                node.setAttribute("data-scrollmap-triggered-out", false);
                var point = new _trigger2.default(node, args, callback);

                _this.points.push(point);
            });
            return this;
        }

        /**
         * The target element can either be a string query selector
         * or a DOM element. This determines which method is being
         * used and retuns the element into an array.
         *
         * @param  {String, HTMLElement} target the desired target DOM element.
         * @return {Array}
         * @memberOf Scrollmap
         */

    }, {
        key: "checkSelector",
        value: function checkSelector(target) {
            switch (typeof target === "undefined" ? "undefined" : _typeof(target)) {
                case "string":
                    target = this.toArray(document.querySelectorAll(target));
                    break;
                case "object":
                    target = [target];
                    break;
                default:
                    target = this.toArray(document.querySelectorAll(target));
            }

            return target;
        }

        /**
         * creates a true array from collection of elements
         * @param  {HTMLElement} collection
         * @memberOf Scrollmap
         * @return {Array}            returns the converted node list.
         */

    }, {
        key: "toArray",
        value: function toArray(collection) {
            return Array.prototype.slice.call(collection);
        }

        /**
         * sets points with data hooks and runs callback method
         * @memberOf Scrollmap
         * @param {Object} point
         */

    }, {
        key: "setTriggerIn",
        value: function setTriggerIn(point) {
            point.element.setAttribute("data-scrollmap-is-visible", true);
            point.element.setAttribute("data-scrollmap-triggered-in", true);
            if (!point.isVisible && !point.hasBeenVisible) {
                if (point.callback) {
                    if (!point.alwaysRunOnTrigger) {
                        point.hasBeenVisible = true;
                    }
                    point.onTriggerIn();
                }
                if (!point.runOnScroll) {
                    point.isVisible = true;
                }
            }
        }

        /**
         * Attaches various data attributes to the initailized
         * DOM element. This is useful for doing CSS hooks.
         * @param {Object} point the point in the index to be mututated.
         * @memberOf Scrollmap
         */

    }, {
        key: "setTriggerOut",
        value: function setTriggerOut(point) {
            point.element.setAttribute("data-scrollmap-is-visible", false);
            point.element.setAttribute("data-scrollmap-triggered-out", true);
            point.isVisible = false;
            if (point.alwaysRunOnTrigger) {
                point.element.setAttribute("data-scrollmap-triggered-in", false);
            }
        }

        /**
         * look for direction of scroll and base element visible
         * percentage off of either top bottom when scrolling
         * down, or the top when scrolling up.
         *
         * @param  {DOM} el                 the trigger element
         * @param  {Number} percetageOfElement the option value for percent of element viewable in the viewport
         * @return {Bool}                    if element is not in the viewport we return false
         * @memberOf Scrollmap
         */

    }, {
        key: "elementInViewport",
        value: function elementInViewport(el, percetageOfElement) {
            var rect = el.getBoundingClientRect();
            var stats = {
                top: rect.top - window.innerHeight,
                bottom: rect.bottom + rect.height,
                height: rect.height
            };
            var amount = stats.height * percetageOfElement;

            if (stats.bottom - amount > stats.height && stats.top + amount < 0) {
                return true;
            }

            return false;
        }

        /**
         * Created a separate method for readability in what
         * happens after the element in in the viewport.
         *
         * @param  {[type]} point [description]
         * @returns {[type]}       [description]
         * @memberOf Scrollmap
         */

    }, {
        key: "checkVisible",
        value: function checkVisible(point) {
            var elementInviewport = this.elementInViewport(point.element, point.surfaceVisible);

            if (elementInviewport) {
                this.setTriggerIn(point);
            } else {
                this.setTriggerOut(point);
            }
        }

        /**
         * return the scroll direction via a string value
         * @return {String}
         * @memberOf Scrollmap
         */

    }, {
        key: "scrollDirection",
        value: function scrollDirection() {
            var direction = "";
            var st = window.pageYOffset || document.documentElement.scrollTop;

            if (st > this.lastScrollTop) {
                direction = "scrollDown";
            } else {
                direction = "scrollUp";
            }
            this.lastScrollTop = st;

            return direction;
        }

        /**
         * bind event listeners to to enable the execution
         * of all desired functions.
         */

    }, {
        key: "bindEventListeners",
        value: function bindEventListeners() {
            var _this2 = this;

            // initial check on page load to see if elements are visible
            window.addEventListener("load", function () {
                console.log(_this2);
                _this2.points.forEach(function (point) {
                    _this2.checkVisible(point);
                });
            }, false);

            // check for visible elements on scroll
            window.addEventListener("scroll", function () {
                _this2.scrollOrient = _this2.scrollDirection();
                _this2.emit(_this2.scrollOrient);
                _this2.points.forEach(function (point) {
                    _this2.checkVisible(point);
                });
            });
        }
    }, {
        key: "remove",
        value: function remove(trigger) {
            var index = this.points.indexOf(trigger);

            if (index > -1) {
                this.points.splice(index, 1);
            }
        }
    }]);

    return Scroll_Event_Trigger;
}();

var Scrollmap = new Scroll_Event_Trigger();

Scrollmap.bindEventListeners();

window.Scrollmap = Scrollmap;

exports.default = Scrollmap;

/***/ }),

/***/ "../src/trigger.js":
/*!*************************!*\
  !*** ../src/trigger.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),

/***/ "../test/test.js":
/*!***********************!*\
  !*** ../test/test.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _scrollmap = __webpack_require__(/*! ../src/scrollmap */ "../src/scrollmap.js");

var _scrollmap2 = _interopRequireDefault(_scrollmap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var App = {
    init: function init() {
      _scrollmap2.default.trigger({
        target: ".boxes",
        surfaceVisible: 0.5,
        expandSurfaceArea: "50px"
      }, function () {
        console.log("triggered");
      });
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    App.init();
  });
})();

console.log("loaded");

/***/ }),

/***/ 0:
/*!*****************************!*\
  !*** multi ../test/test.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ../test/test.js */"../test/test.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9zY3JvbGxtYXAuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy90cmlnZ2VyLmpzIiwid2VicGFjazovLy8uLi90ZXN0L3Rlc3QuanMiXSwibmFtZXMiOlsiU2Nyb2xsX0V2ZW50X1RyaWdnZXIiLCJsYXN0U2Nyb2xsVG9wIiwicG9pbnRzIiwidG9waWNzIiwidG9waWMiLCJkYXRhIiwibGVuZ3RoIiwiZm9yRWFjaCIsImxpc3RlbmVyIiwicHVzaCIsImFycmF5Iiwib3B0aW9ucyIsImZ1bmMiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImRlbGF5Iiwib3JkZXIiLCJzZXF1ZW5jZU9yZGVyIiwicnVuIiwiaXRlbSIsImkiLCJzZXRUaW1lb3V0IiwiaW50ZXJ2YWwiLCJzb3J0IiwiTWF0aCIsInJhbmRvbSIsInJldmVyc2UiLCJhcmdzIiwiY2FsbGJhY2siLCJlbCIsInRhcmdldCIsInRyaWdnZXJFbGVtZW50U2VsZWN0b3IiLCJ0cmlnZ2VyRWxlbWVudCIsImNoZWNrU2VsZWN0b3IiLCJfaWQiLCJEYXRlIiwibm93IiwidG9TdHJpbmciLCJzdWJzdHIiLCJub2RlIiwic2V0QXR0cmlidXRlIiwidHJhbnNpdGlvbiIsInBvaW50IiwiVHJpZ2dlciIsInRvQXJyYXkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjb2xsZWN0aW9uIiwiZWxlbWVudCIsImlzVmlzaWJsZSIsImhhc0JlZW5WaXNpYmxlIiwiYWx3YXlzUnVuT25UcmlnZ2VyIiwib25UcmlnZ2VySW4iLCJydW5PblNjcm9sbCIsInBlcmNldGFnZU9mRWxlbWVudCIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJzdGF0cyIsInRvcCIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwiYm90dG9tIiwiaGVpZ2h0IiwiYW1vdW50IiwiZWxlbWVudEludmlld3BvcnQiLCJlbGVtZW50SW5WaWV3cG9ydCIsInN1cmZhY2VWaXNpYmxlIiwic2V0VHJpZ2dlckluIiwic2V0VHJpZ2dlck91dCIsImRpcmVjdGlvbiIsInN0IiwicGFnZVlPZmZzZXQiLCJkb2N1bWVudEVsZW1lbnQiLCJzY3JvbGxUb3AiLCJhZGRFdmVudExpc3RlbmVyIiwiY29uc29sZSIsImxvZyIsImNoZWNrVmlzaWJsZSIsInNjcm9sbE9yaWVudCIsInNjcm9sbERpcmVjdGlvbiIsImVtaXQiLCJ0cmlnZ2VyIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwiU2Nyb2xsbWFwIiwiYmluZEV2ZW50TGlzdGVuZXJzIiwiaXNEZXN0cm95ZWQiLCJBcHAiLCJpbml0IiwiZXhwYW5kU3VyZmFjZUFyZWEiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBOzs7Ozs7OztBQUVBOzs7Ozs7SUFNTUEsb0I7QUFDRixvQ0FBZTtBQUFBOztBQUNYLGFBQUtDLGFBQUwsR0FBcUIsQ0FBckI7QUFDQSxhQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLGFBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs2QkFLTUMsSyxFQUFPQyxJLEVBQU07QUFDZjtBQUNBLGdCQUFJLENBQUMsS0FBS0YsTUFBTCxDQUFhQyxLQUFiLENBQUQsSUFBeUIsS0FBS0QsTUFBTCxDQUFhQyxLQUFiLEVBQXFCRSxNQUFyQixHQUE4QixDQUEzRCxFQUE4RDtBQUMxRDtBQUNIOztBQUVEO0FBQ0EsaUJBQUtILE1BQUwsQ0FBYUMsS0FBYixFQUFxQkcsT0FBckIsQ0FBNkIsVUFBQ0MsUUFBRDtBQUFBLHVCQUFjQSxTQUFTSCxRQUFRLEVBQWpCLENBQWQ7QUFBQSxhQUE3QjtBQUNIOztBQUVEOzs7Ozs7OzsyQkFLSUQsSyxFQUFPSSxRLEVBQVU7QUFDakI7QUFDQSxnQkFBSSxDQUFDLEtBQUtMLE1BQUwsQ0FBYUMsS0FBYixDQUFMLEVBQTJCO0FBQ3ZCLHFCQUFLRCxNQUFMLENBQWFDLEtBQWIsSUFBdUIsRUFBdkI7QUFDSDs7QUFFRDtBQUNBLGlCQUFLRCxNQUFMLENBQWFDLEtBQWIsRUFBcUJLLElBQXJCLENBQTBCRCxRQUExQjtBQUNIOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQ0FxQlVFLEssRUFBT0MsTyxFQUFTQyxJLEVBQU07QUFDNUJGLG9CQUFRRyxNQUFNQyxTQUFOLENBQWdCQyxLQUFoQixDQUFzQkMsSUFBdEIsQ0FBMkJOLEtBQTNCLENBQVI7O0FBRUEsZ0JBQUlPLFFBQVEsQ0FBWjs7QUFFQSxnQkFBSU4sUUFBUU8sS0FBWixFQUFtQjtBQUNmLHFCQUFLQyxhQUFMLENBQW1CVCxLQUFuQixFQUEwQkMsUUFBUU8sS0FBbEM7QUFDSDs7QUFFRCxnQkFBSVAsUUFBUU0sS0FBWixFQUFtQjtBQUNmQSx3QkFBUU4sUUFBUU0sS0FBaEI7QUFDSDs7QUFFRCxnQkFBTUcsTUFBTVYsTUFBTUgsT0FBTixDQUFjLFVBQUNjLElBQUQsRUFBT0MsQ0FBUCxFQUFhO0FBQ25DQywyQkFBVyxZQUFNO0FBQ2JYLHlCQUFLRixNQUFPWSxDQUFQLENBQUwsRUFBaUJBLENBQWpCO0FBQ0gsaUJBRkQsRUFFR1gsUUFBUWEsUUFBUixHQUFtQkYsQ0FGdEI7QUFHSCxhQUpXLENBQVo7O0FBTUFDLHVCQUFXSCxHQUFYLEVBQWdCSCxLQUFoQjs7QUFFQSxtQkFBTyxJQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7O3NDQVNlUCxLLEVBQU9RLEssRUFBTztBQUN6QixvQkFBUUEsS0FBUjtBQUNJLHFCQUFLLFFBQUw7QUFDSVIsNEJBQVFBLE1BQU1lLElBQU4sQ0FBVyxZQUFNO0FBQ3JCLCtCQUFPLE1BQU1DLEtBQUtDLE1BQUwsRUFBYjtBQUNILHFCQUZPLENBQVI7QUFHQTtBQUNKLHFCQUFLLFNBQUw7QUFDSWpCLDRCQUFRQSxNQUFNa0IsT0FBTixFQUFSO0FBQ0E7QUFDSjtBQVRKO0FBV0EsbUJBQU9sQixLQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dDQTJCU21CLEksRUFBTUMsUSxFQUFVO0FBQUE7O0FBQ3JCLGdCQUFJQyxLQUFLRixLQUFLRyxNQUFkO0FBQ0EsZ0JBQUlDLHlCQUF5QkosS0FBS0ssY0FBbEM7O0FBRUEsZ0JBQUlELHNCQUFKLEVBQTRCO0FBQ3hCQSx5Q0FBeUIsS0FBS0UsYUFBTCxDQUFtQkYsc0JBQW5CLENBQXpCO0FBQ0g7O0FBRURGLGlCQUFLLEtBQUtJLGFBQUwsQ0FBbUJKLEVBQW5CLENBQUw7O0FBRUEsZ0JBQU1LLE1BQU0sU0FBTkEsR0FBTSxDQUFDZCxDQUFELEVBQU87QUFDZiw4QkFBV2UsS0FBS0MsR0FBTCxHQUFXQyxRQUFYLENBQW9CLEVBQXBCLElBQTBCYixLQUFLQyxNQUFMLEdBQWNZLFFBQWQsQ0FBdUIsRUFBdkIsRUFBMkJDLE1BQTNCLENBQWtDLENBQWxDLEVBQXFDLENBQXJDLENBQXJDLFVBQWdGbEIsQ0FBaEY7QUFDSCxhQUZEOztBQUlBUyxlQUFHeEIsT0FBSCxDQUFXLFVBQUNrQyxJQUFELEVBQU9uQixDQUFQLEVBQWE7QUFDcEJtQixxQkFBS0MsWUFBTCxDQUFrQixtQkFBbEIsRUFBdUNOLElBQUlkLENBQUosQ0FBdkM7QUFDQSxvQkFBSVcsc0JBQUosRUFBNEI7QUFDeEJRLHlCQUFLQyxZQUFMLENBQWtCLGdDQUFsQixFQUFvRFQsc0JBQXBEO0FBQ0g7QUFDRCxvQkFBSUosS0FBS2MsVUFBVCxFQUFxQjtBQUNqQkYseUJBQUtDLFlBQUwsQ0FBa0IsMkJBQWxCLEVBQStDYixLQUFLYyxVQUFwRDtBQUNIO0FBQ0RGLHFCQUFLQyxZQUFMLENBQWtCLHVCQUFsQixFQUEyQyxJQUEzQztBQUNBRCxxQkFBS0MsWUFBTCxDQUFrQiw2QkFBbEIsRUFBaUQsS0FBakQ7QUFDQUQscUJBQUtDLFlBQUwsQ0FBa0IsOEJBQWxCLEVBQWtELEtBQWxEO0FBQ0Esb0JBQU1FLFFBQVEsSUFBSUMsaUJBQUosQ0FBWUosSUFBWixFQUFrQlosSUFBbEIsRUFBd0JDLFFBQXhCLENBQWQ7O0FBRUEsc0JBQUs1QixNQUFMLENBQVlPLElBQVosQ0FBaUJtQyxLQUFqQjtBQUNILGFBZEQ7QUFlQSxtQkFBTyxJQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7OztzQ0FVZVosTSxFQUFRO0FBQ25CLDJCQUFlQSxNQUFmLHlDQUFlQSxNQUFmO0FBQ0kscUJBQUssUUFBTDtBQUNJQSw2QkFBUyxLQUFLYyxPQUFMLENBQWFDLFNBQVNDLGdCQUFULENBQTBCaEIsTUFBMUIsQ0FBYixDQUFUO0FBQ0E7QUFDSixxQkFBSyxRQUFMO0FBQ0lBLDZCQUFTLENBQUNBLE1BQUQsQ0FBVDtBQUNBO0FBQ0o7QUFDSUEsNkJBQVMsS0FBS2MsT0FBTCxDQUFhQyxTQUFTQyxnQkFBVCxDQUEwQmhCLE1BQTFCLENBQWIsQ0FBVDtBQVJSOztBQVdBLG1CQUFPQSxNQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7OztnQ0FPU2lCLFUsRUFBWTtBQUNqQixtQkFBT3BDLE1BQU1DLFNBQU4sQ0FBZ0JDLEtBQWhCLENBQXNCQyxJQUF0QixDQUEyQmlDLFVBQTNCLENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7cUNBTWNMLEssRUFBTztBQUNqQkEsa0JBQU1NLE9BQU4sQ0FBY1IsWUFBZCxDQUEyQiwyQkFBM0IsRUFBd0QsSUFBeEQ7QUFDQUUsa0JBQU1NLE9BQU4sQ0FBY1IsWUFBZCxDQUEyQiw2QkFBM0IsRUFBMEQsSUFBMUQ7QUFDQSxnQkFBSSxDQUFDRSxNQUFNTyxTQUFQLElBQW9CLENBQUNQLE1BQU1RLGNBQS9CLEVBQStDO0FBQzNDLG9CQUFJUixNQUFNZCxRQUFWLEVBQW9CO0FBQ2hCLHdCQUFJLENBQUNjLE1BQU1TLGtCQUFYLEVBQStCO0FBQzNCVCw4QkFBTVEsY0FBTixHQUF1QixJQUF2QjtBQUNIO0FBQ0RSLDBCQUFNVSxXQUFOO0FBQ0g7QUFDRCxvQkFBSSxDQUFDVixNQUFNVyxXQUFYLEVBQXdCO0FBQ3BCWCwwQkFBTU8sU0FBTixHQUFrQixJQUFsQjtBQUNIO0FBQ0o7QUFDSjs7QUFFRDs7Ozs7Ozs7O3NDQU9lUCxLLEVBQU87QUFDbEJBLGtCQUFNTSxPQUFOLENBQWNSLFlBQWQsQ0FBMkIsMkJBQTNCLEVBQXdELEtBQXhEO0FBQ0FFLGtCQUFNTSxPQUFOLENBQWNSLFlBQWQsQ0FBMkIsOEJBQTNCLEVBQTJELElBQTNEO0FBQ0FFLGtCQUFNTyxTQUFOLEdBQWtCLEtBQWxCO0FBQ0EsZ0JBQUlQLE1BQU1TLGtCQUFWLEVBQThCO0FBQzFCVCxzQkFBTU0sT0FBTixDQUFjUixZQUFkLENBQTJCLDZCQUEzQixFQUEwRCxLQUExRDtBQUNIO0FBQ0o7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7MENBV21CWCxFLEVBQUl5QixrQixFQUFvQjtBQUN2QyxnQkFBTUMsT0FBTzFCLEdBQUcyQixxQkFBSCxFQUFiO0FBQ0EsZ0JBQU1DLFFBQVE7QUFDVkMscUJBQUtILEtBQUtHLEdBQUwsR0FBV0MsT0FBT0MsV0FEYjtBQUVWQyx3QkFBUU4sS0FBS00sTUFBTCxHQUFjTixLQUFLTyxNQUZqQjtBQUdWQSx3QkFBUVAsS0FBS087QUFISCxhQUFkO0FBS0EsZ0JBQU1DLFNBQVNOLE1BQU1LLE1BQU4sR0FBZVIsa0JBQTlCOztBQUVBLGdCQUFLRyxNQUFNSSxNQUFOLEdBQWVFLE1BQWYsR0FBd0JOLE1BQU1LLE1BQS9CLElBQTJDTCxNQUFNQyxHQUFOLEdBQVlLLE1BQVosR0FBcUIsQ0FBcEUsRUFBd0U7QUFDcEUsdUJBQU8sSUFBUDtBQUNIOztBQUVELG1CQUFPLEtBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7Ozs7cUNBUWNyQixLLEVBQU87QUFDakIsZ0JBQU1zQixvQkFBb0IsS0FBS0MsaUJBQUwsQ0FBdUJ2QixNQUFNTSxPQUE3QixFQUFzQ04sTUFBTXdCLGNBQTVDLENBQTFCOztBQUVBLGdCQUFJRixpQkFBSixFQUF1QjtBQUNuQixxQkFBS0csWUFBTCxDQUFrQnpCLEtBQWxCO0FBQ0gsYUFGRCxNQUVPO0FBQ0gscUJBQUswQixhQUFMLENBQW1CMUIsS0FBbkI7QUFDSDtBQUNKOztBQUVEOzs7Ozs7OzswQ0FNbUI7QUFDZixnQkFBSTJCLFlBQVksRUFBaEI7QUFDQSxnQkFBTUMsS0FBS1gsT0FBT1ksV0FBUCxJQUFzQjFCLFNBQVMyQixlQUFULENBQXlCQyxTQUExRDs7QUFFQSxnQkFBSUgsS0FBSyxLQUFLdkUsYUFBZCxFQUE2QjtBQUN6QnNFLDRCQUFZLFlBQVo7QUFDSCxhQUZELE1BRU87QUFDSEEsNEJBQVksVUFBWjtBQUNIO0FBQ0QsaUJBQUt0RSxhQUFMLEdBQXFCdUUsRUFBckI7O0FBRUEsbUJBQU9ELFNBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs2Q0FLc0I7QUFBQTs7QUFDbEI7QUFDQVYsbUJBQU9lLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLFlBQU07QUFDbENDLHdCQUFRQyxHQUFSLENBQVksTUFBWjtBQUNBLHVCQUFLNUUsTUFBTCxDQUFZSyxPQUFaLENBQW9CLFVBQUNxQyxLQUFELEVBQVc7QUFDM0IsMkJBQUttQyxZQUFMLENBQWtCbkMsS0FBbEI7QUFDSCxpQkFGRDtBQUdILGFBTEQsRUFLRyxLQUxIOztBQU9BO0FBQ0FpQixtQkFBT2UsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsWUFBTTtBQUNwQyx1QkFBS0ksWUFBTCxHQUFvQixPQUFLQyxlQUFMLEVBQXBCO0FBQ0EsdUJBQUtDLElBQUwsQ0FBVSxPQUFLRixZQUFmO0FBQ0EsdUJBQUs5RSxNQUFMLENBQVlLLE9BQVosQ0FBb0IsVUFBQ3FDLEtBQUQsRUFBVztBQUMzQiwyQkFBS21DLFlBQUwsQ0FBa0JuQyxLQUFsQjtBQUNILGlCQUZEO0FBR0gsYUFORDtBQU9IOzs7K0JBRU91QyxPLEVBQVM7QUFDYixnQkFBTUMsUUFBUSxLQUFLbEYsTUFBTCxDQUFZbUYsT0FBWixDQUFvQkYsT0FBcEIsQ0FBZDs7QUFFQSxnQkFBSUMsUUFBUSxDQUFDLENBQWIsRUFBZ0I7QUFDWixxQkFBS2xGLE1BQUwsQ0FBWW9GLE1BQVosQ0FBbUJGLEtBQW5CLEVBQTBCLENBQTFCO0FBQ0g7QUFDSjs7Ozs7O0FBR0wsSUFBTUcsWUFBWSxJQUFJdkYsb0JBQUosRUFBbEI7O0FBRUF1RixVQUFVQyxrQkFBVjs7QUFFQTNCLE9BQU8wQixTQUFQLEdBQW1CQSxTQUFuQjs7a0JBRWVBLFM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQy9WVDFDLE87QUFDTCxrQkFBYUssT0FBYixFQUFzQnZDLE9BQXRCLEVBQStCbUIsUUFBL0IsRUFBeUM7QUFBQTs7QUFDeEMsT0FBS29CLE9BQUwsR0FBZUEsT0FBZixDQUR3QyxDQUNoQjtBQUN4QixPQUFLcEIsUUFBTCxHQUFnQkEsUUFBaEIsQ0FGd0MsQ0FFZDtBQUMxQixPQUFLcUIsU0FBTCxHQUFpQixLQUFqQixDQUh3QyxDQUdoQjtBQUN4QixPQUFLQyxjQUFMLEdBQXNCLEtBQXRCLENBSndDLENBSVg7QUFDN0IsT0FBS2dCLGNBQUwsR0FBc0IsR0FBdEIsQ0FMd0MsQ0FLYjtBQUMzQixPQUFLYixXQUFMLEdBQW1CLEtBQW5CLENBTndDLENBTWQ7QUFDMUIsT0FBS3RDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsT0FBS29DLGtCQUFMLEdBQTBCLEtBQTFCLENBUndDLENBUVA7O0FBRWpDLE1BQUkxQyxPQUFKLEVBQWE7QUFDWixZQUFjLElBQWQsRUFBb0JBLE9BQXBCO0FBQ0E7QUFDRDs7OztnQ0FDYztBQUFBOztBQUNkLE9BQUksS0FBS3VCLGNBQVQsRUFBeUI7QUFDeEIsU0FBS0EsY0FBTCxDQUFvQjNCLE9BQXBCLENBQTRCLFVBQUNrQyxJQUFELEVBQVU7QUFDckMsU0FBSSxNQUFLRSxVQUFULEVBQXFCO0FBQ3BCRixXQUFLQyxZQUFMLENBQWtCLDJCQUFsQixFQUErQyxNQUFLQyxVQUFwRDtBQUNBO0FBQ0QsV0FBS2IsUUFBTCxDQUFjVyxJQUFkO0FBQ0EsS0FMRDtBQU1BO0FBQ0QsUUFBS1gsUUFBTCxDQUFjLEtBQUtvQixPQUFuQjs7QUFFQSxVQUFPLElBQVA7QUFDQTs7OzRCQUNVO0FBQ1YsUUFBS0EsT0FBTCxHQUFlLElBQWY7QUFDQSxRQUFLdUMsV0FBTCxHQUFtQixJQUFuQjtBQUNBOzs7Ozs7a0JBR2E1QyxPOzs7Ozs7Ozs7Ozs7OztBQ2xDZjs7Ozs7O0FBRUEsQ0FBQyxZQUFNO0FBQ0wsTUFBTTZDLE1BQU07QUFDVkMsUUFEVSxrQkFDRjtBQUNOSiwwQkFBVUosT0FBVixDQUFrQjtBQUNoQm5ELGdCQUFRLFFBRFE7QUFFaEJvQyx3QkFBZ0IsR0FGQTtBQUdoQndCLDJCQUFtQjtBQUhILE9BQWxCLEVBSUcsWUFBTTtBQUNQZixnQkFBUUMsR0FBUixDQUFZLFdBQVo7QUFDRCxPQU5EO0FBT0Q7QUFUUyxHQUFaOztBQVlBL0IsV0FBUzZCLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNO0FBQ2xEYyxRQUFJQyxJQUFKO0FBQ0QsR0FGRDtBQUlELENBakJEOztBQW1CQWQsUUFBUUMsR0FBUixDQUFZLFFBQVosRSIsImZpbGUiOiJzY3JvbGxtYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiaW1wb3J0IFRyaWdnZXIgZnJvbSBcIi4vdHJpZ2dlclwiO1xyXG5cclxuLyoqXHJcbiAqIEEgbW9kdWxlIGZvciB0ZXN0aW5nIGlmIGEgRE9NIGVsZW1lbnQgaXMgdmlzaWJsZSBpbiB0aGVcclxuICogdmlld3BvcnQsIHRoZW4gdHJpZ2dlcnMgY2FsbGJhY2tzIG9uIGV4ZWN1dGlvbi5cclxuICogQG5hbWVzcGFjZSBTY3JvbGxNYXBcclxuICovXHJcblxyXG5jbGFzcyBTY3JvbGxfRXZlbnRfVHJpZ2dlciB7XHJcbiAgICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICAgICAgdGhpcy5sYXN0U2Nyb2xsVG9wID0gMDtcclxuICAgICAgICB0aGlzLnBvaW50cyA9IFtdO1xyXG4gICAgICAgIHRoaXMudG9waWNzID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQdWJsaXNoIHBhcnQgb2YgcHVic3ViIHBhdHRlcm4uXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHRvcGljXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGFcclxuICAgICAqL1xyXG4gICAgZW1pdCAodG9waWMsIGRhdGEpIHtcclxuICAgICAgICAvLyByZXR1cm4gaWYgdGhlIHRvcGljIGRvZXNuJ3QgZXhpc3QsIG9yIHRoZXJlIGFyZSBubyBsaXN0ZW5lcnNcclxuICAgICAgICBpZiAoIXRoaXMudG9waWNzWyB0b3BpYyBdIHx8IHRoaXMudG9waWNzWyB0b3BpYyBdLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc2VuZCB0aGUgZXZlbnQgdG8gYWxsIGxpc3RlbmVyc1xyXG4gICAgICAgIHRoaXMudG9waWNzWyB0b3BpYyBdLmZvckVhY2goKGxpc3RlbmVyKSA9PiBsaXN0ZW5lcihkYXRhIHx8IHt9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdWJzY3JpYmUgcGFydCBvZiBwdWJzdWIgcGF0dGVyblxyXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB0b3BpY1xyXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGxpc3RlbmVyXHJcbiAgICAgKi9cclxuICAgIG9uICh0b3BpYywgbGlzdGVuZXIpIHtcclxuICAgICAgICAvLyBjcmVhdGUgdGhlIHRvcGljIGlmIG5vdCB5ZXQgY3JlYXRlZFxyXG4gICAgICAgIGlmICghdGhpcy50b3BpY3NbIHRvcGljIF0pIHtcclxuICAgICAgICAgICAgdGhpcy50b3BpY3NbIHRvcGljIF0gPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGFkZCB0aGUgbGlzdGVuZXJcclxuICAgICAgICB0aGlzLnRvcGljc1sgdG9waWMgXS5wdXNoKGxpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEEgbWV0aG9kIGZvciBzdGFnZ2VyaW5nIGFuIGFycmF5IG9mIHRyaWdnZXJzLlxyXG4gICAgICpcclxuICAgICAqIFByb3BlcnRpZXMgZm9yIG9wdGlvbnMgY29uZmlnIG9iamVjdDpcclxuICAgICAqXHJcbiAgICAgKiBpbnRlcnZhbDogKG51bWJlcikgOlxyXG4gICAgICogY2hhbmdlcyB0aGUgaW50ZXJ2YWwgc3BlZWQgb2YgdGhlIHNlcXVlbmNlXHJcbiAgICAgKlxyXG4gICAgICogb3JkZXI6IChzdHJpbmcpIDpcclxuICAgICAqIGNoYW5nZXMgdGhlIG9yZGVyIG9mIHRoZSBzZXF1ZW5jZS4gT3JkZXIgb3B0aW9ucyBhcmUgXCJyYW5kb21cIiwgYW5kIFwicmV2ZXJzZVwiLlxyXG4gICAgICpcclxuICAgICAqIGNhbGxiYWNrIChpdGVtLCBpbmRleCk6XHJcbiAgICAgKiBjYW4gZ2V0IHRoZSBpdGVtIGFuZCBpbmRleCBvZiB0aGUgYXJyYXkgYXMgYXJndW1lbnRzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7QXJyYXl9IGFycmF5XHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnNcclxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmdW5jXHJcbiAgICAgKiBAbWVtYmVyT2YgU2Nyb2xsbWFwXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAgICAgKi9cclxuXHJcbiAgICBzZXF1ZW5jZSAoYXJyYXksIG9wdGlvbnMsIGZ1bmMpIHtcclxuICAgICAgICBhcnJheSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycmF5KTtcclxuXHJcbiAgICAgICAgbGV0IGRlbGF5ID0gMDtcclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMub3JkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXF1ZW5jZU9yZGVyKGFycmF5LCBvcHRpb25zLm9yZGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLmRlbGF5KSB7XHJcbiAgICAgICAgICAgIGRlbGF5ID0gb3B0aW9ucy5kZWxheTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJ1biA9IGFycmF5LmZvckVhY2goKGl0ZW0sIGkpID0+IHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmdW5jKGFycmF5WyBpIF0sIGkpO1xyXG4gICAgICAgICAgICB9LCBvcHRpb25zLmludGVydmFsICogaSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQocnVuLCBkZWxheSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG1ldGhvZCB3aGljaCBleGVjdXRlcyB0aGUgdGhlIGRlc2lyZWRcclxuICAgICAqIHNlcXVlbmNlIG1ldGhvZCBiYXNlZCBvbiB0aGUgYXJndW1lbnRzXHJcbiAgICAgKiBAcGFyYW0gIHtBcnJheX0gYXJyYXlcclxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gb3JkZXJcclxuICAgICAqIEBtZW1iZXJPZiBTY3JvbGxtYXBcclxuICAgICAqIEByZXR1cm4ge0FycmF5fVxyXG4gICAgICovXHJcblxyXG4gICAgc2VxdWVuY2VPcmRlciAoYXJyYXksIG9yZGVyKSB7XHJcbiAgICAgICAgc3dpdGNoIChvcmRlcikge1xyXG4gICAgICAgICAgICBjYXNlIFwicmFuZG9tXCI6XHJcbiAgICAgICAgICAgICAgICBhcnJheSA9IGFycmF5LnNvcnQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwLjUgLSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInJldmVyc2VcIjpcclxuICAgICAgICAgICAgICAgIGFycmF5ID0gYXJyYXkucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEEgbWV0aG9kIGZvciBhZGRpbmcgdHJpZ2dlcnMgd2hlbiBlbGVtZW50IGlzIHZpc2libGUgaW4gdGhlIHZpZXdwb3J0LlxyXG4gICAgICpcclxuICAgICAqIFByb3BlcnRpZXMgZm9yIG9wdGlvbnMgY29uZmlnIG9iamVjdDpcclxuICAgICAqIHRhcmdldCAoc3RyaW5nIG9yIGVsZW1lbnQpOiBVc2luZyBxdWVyeVNlbGVjdG9yQWxsIGEgdGFyZ2V0IHN0cmluZyBzZWxlY3RvclxyXG4gICAgICogaXMgbmVlZGVkLCBvciB5b3UgY2FuIHNwZWNpZnkgYW4gYWN0dWFsIGVsZW1lbnQuXHJcbiAgICAgKlxyXG4gICAgICogc3VyZmFjZVZpc2libGUgKG51bWJlcik6IHRoZSBwZXJjZW50YWdlIGFyZWEsIHdoaWNoIGlzIHJlcHJlc2VudGVkIGFzIGFcclxuICAgICAqIG51bWJlciBmcm9tIDAgLSAxIGlzIHRoZSBhcmVhIG9mIHRoZSB3aGljaCBpcyB2aXNpYmxlIGluIHRoZSB2aWV3cG9ydC5cclxuICAgICAqXHJcbiAgICAgKiBydW5PblNjcm9sbCAoYm9vbGVhbikgOiBieSBkZWZhdWx0IHRoZSBjYWxsYmFjayBpcyBydW4gb25seSBvbmUgdGltZSB3aGVudFxyXG4gICAgICogdGhlIGVsZW1lbnQgaXMgdmlzaWJsZS4gQnkgY2hhbmdpbmcgdG8gdHJ1ZSwgdGhlIGNhbGxiYWNrIHdpbGwgYmUgcnVuXHJcbiAgICAgKiBhcyBsb25nIGFzIHRoZSBzY3JvbGwgZXZlbnQgaXMgaGFwcGVuaW5nLlxyXG4gICAgICpcclxuICAgICAqIGFsd2F5c1J1bk9uVHJpZ2dlciAoYm9vbGVhbik6IGJ5IGRlZmF1bHQgdGhlIHRyaWdnZXJlZCBlbGVtZW50IGNhbGxiYWNrXHJcbiAgICAgKiB3aWxsIG9ubHkgYmUgZXhlY3V0ZWQgb25lIHRpbWUuIFNldHRpbmcgdG8gdHJ1ZSB3aWxsIHJlLXRyaWdnZXIgdGhjYWxsYmFja1xyXG4gICAgICogZXZlcnl0aW1lIHRoZSBlbGVtZW50IGhhcyBiZWVuIGluIGFuZCBvdXQgb2YgdGhlIHZpZXdwb3J0LlxyXG4gICAgICpcclxuICAgICAqIGNhbGxiYWNrIChvYmplY3QpOlxyXG4gICAgICogVGhpcyBpcyB0aGUgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSBleGVjdHVlZCB3aGVuIHRoZSBlbGVtZW50IGlzIGRldGVjdGVkXHJcbiAgICAgKiBpbiB0aGUgdmlld3BvcnQuIFRvIHJlZmVyZW5jZSB0aGUgbm9kZSwgcGFzcyBpdCBpbnRvIHRoZSBjYWxsYmFjayBhcyBhbiBhcmd1bWVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9ICAgYXJncyAgICAgb3B0aW9ucyBmb3IgY2FsbGJhY2sgdHJpZ2dlcmluZ1xyXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIHRoZSBtZXRob2QgZXhlY3V0ZWQgYmFzZWQgb24gdGhlIGFyZ21lbnRzXHJcbiAgICAgKiBAbWVtYmVyT2YgU2Nyb2xsbWFwXHJcbiAgICAgKi9cclxuXHJcbiAgICB0cmlnZ2VyIChhcmdzLCBjYWxsYmFjaykge1xyXG4gICAgICAgIGxldCBlbCA9IGFyZ3MudGFyZ2V0O1xyXG4gICAgICAgIGxldCB0cmlnZ2VyRWxlbWVudFNlbGVjdG9yID0gYXJncy50cmlnZ2VyRWxlbWVudDtcclxuXHJcbiAgICAgICAgaWYgKHRyaWdnZXJFbGVtZW50U2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgdHJpZ2dlckVsZW1lbnRTZWxlY3RvciA9IHRoaXMuY2hlY2tTZWxlY3Rvcih0cmlnZ2VyRWxlbWVudFNlbGVjdG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsID0gdGhpcy5jaGVja1NlbGVjdG9yKGVsKTtcclxuXHJcbiAgICAgICAgY29uc3QgX2lkID0gKGkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGBfJHtEYXRlLm5vdygpLnRvU3RyaW5nKDM2KSArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA1KX1fJHtpfWA7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZWwuZm9yRWFjaCgobm9kZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShcImRhdGEtc2Nyb2xsbWFwLWlkXCIsIF9pZChpKSk7XHJcbiAgICAgICAgICAgIGlmICh0cmlnZ2VyRWxlbWVudFNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShcImRhdGEtc2Nyb2xsbWFwLXRyaWdnZXItZWxlbWVudFwiLCB0cmlnZ2VyRWxlbWVudFNlbGVjdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYXJncy50cmFuc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShcImRhdGEtc2Nyb2xsbWFwLXRyYW5zaXRpb25cIiwgYXJncy50cmFuc2l0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShcImRhdGEtc2Nyb2xsbWFwLWxvYWRlZFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNjcm9sbG1hcC10cmlnZ2VyZWQtaW5cIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShcImRhdGEtc2Nyb2xsbWFwLXRyaWdnZXJlZC1vdXRcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICBjb25zdCBwb2ludCA9IG5ldyBUcmlnZ2VyKG5vZGUsIGFyZ3MsIGNhbGxiYWNrKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucG9pbnRzLnB1c2gocG9pbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHRhcmdldCBlbGVtZW50IGNhbiBlaXRoZXIgYmUgYSBzdHJpbmcgcXVlcnkgc2VsZWN0b3JcclxuICAgICAqIG9yIGEgRE9NIGVsZW1lbnQuIFRoaXMgZGV0ZXJtaW5lcyB3aGljaCBtZXRob2QgaXMgYmVpbmdcclxuICAgICAqIHVzZWQgYW5kIHJldHVucyB0aGUgZWxlbWVudCBpbnRvIGFuIGFycmF5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge1N0cmluZywgSFRNTEVsZW1lbnR9IHRhcmdldCB0aGUgZGVzaXJlZCB0YXJnZXQgRE9NIGVsZW1lbnQuXHJcbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cclxuICAgICAqIEBtZW1iZXJPZiBTY3JvbGxtYXBcclxuICAgICAqL1xyXG5cclxuICAgIGNoZWNrU2VsZWN0b3IgKHRhcmdldCkge1xyXG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHRhcmdldCkge1xyXG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSB0aGlzLnRvQXJyYXkoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0YXJnZXQpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSBbdGFyZ2V0XTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gdGhpcy50b0FycmF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGFyZ2V0KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlcyBhIHRydWUgYXJyYXkgZnJvbSBjb2xsZWN0aW9uIG9mIGVsZW1lbnRzXHJcbiAgICAgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gY29sbGVjdGlvblxyXG4gICAgICogQG1lbWJlck9mIFNjcm9sbG1hcFxyXG4gICAgICogQHJldHVybiB7QXJyYXl9ICAgICAgICAgICAgcmV0dXJucyB0aGUgY29udmVydGVkIG5vZGUgbGlzdC5cclxuICAgICAqL1xyXG5cclxuICAgIHRvQXJyYXkgKGNvbGxlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoY29sbGVjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXRzIHBvaW50cyB3aXRoIGRhdGEgaG9va3MgYW5kIHJ1bnMgY2FsbGJhY2sgbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyT2YgU2Nyb2xsbWFwXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcG9pbnRcclxuICAgICAqL1xyXG5cclxuICAgIHNldFRyaWdnZXJJbiAocG9pbnQpIHtcclxuICAgICAgICBwb2ludC5lbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtc2Nyb2xsbWFwLWlzLXZpc2libGVcIiwgdHJ1ZSk7XHJcbiAgICAgICAgcG9pbnQuZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNjcm9sbG1hcC10cmlnZ2VyZWQtaW5cIiwgdHJ1ZSk7XHJcbiAgICAgICAgaWYgKCFwb2ludC5pc1Zpc2libGUgJiYgIXBvaW50Lmhhc0JlZW5WaXNpYmxlKSB7XHJcbiAgICAgICAgICAgIGlmIChwb2ludC5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFwb2ludC5hbHdheXNSdW5PblRyaWdnZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBwb2ludC5oYXNCZWVuVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwb2ludC5vblRyaWdnZXJJbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghcG9pbnQucnVuT25TY3JvbGwpIHtcclxuICAgICAgICAgICAgICAgIHBvaW50LmlzVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2hlcyB2YXJpb3VzIGRhdGEgYXR0cmlidXRlcyB0byB0aGUgaW5pdGFpbGl6ZWRcclxuICAgICAqIERPTSBlbGVtZW50LiBUaGlzIGlzIHVzZWZ1bCBmb3IgZG9pbmcgQ1NTIGhvb2tzLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBvaW50IHRoZSBwb2ludCBpbiB0aGUgaW5kZXggdG8gYmUgbXV0dXRhdGVkLlxyXG4gICAgICogQG1lbWJlck9mIFNjcm9sbG1hcFxyXG4gICAgICovXHJcblxyXG4gICAgc2V0VHJpZ2dlck91dCAocG9pbnQpIHtcclxuICAgICAgICBwb2ludC5lbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtc2Nyb2xsbWFwLWlzLXZpc2libGVcIiwgZmFsc2UpO1xyXG4gICAgICAgIHBvaW50LmVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1zY3JvbGxtYXAtdHJpZ2dlcmVkLW91dFwiLCB0cnVlKTtcclxuICAgICAgICBwb2ludC5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICBpZiAocG9pbnQuYWx3YXlzUnVuT25UcmlnZ2VyKSB7XHJcbiAgICAgICAgICAgIHBvaW50LmVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1zY3JvbGxtYXAtdHJpZ2dlcmVkLWluXCIsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBsb29rIGZvciBkaXJlY3Rpb24gb2Ygc2Nyb2xsIGFuZCBiYXNlIGVsZW1lbnQgdmlzaWJsZVxyXG4gICAgICogcGVyY2VudGFnZSBvZmYgb2YgZWl0aGVyIHRvcCBib3R0b20gd2hlbiBzY3JvbGxpbmdcclxuICAgICAqIGRvd24sIG9yIHRoZSB0b3Agd2hlbiBzY3JvbGxpbmcgdXAuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7RE9NfSBlbCAgICAgICAgICAgICAgICAgdGhlIHRyaWdnZXIgZWxlbWVudFxyXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBwZXJjZXRhZ2VPZkVsZW1lbnQgdGhlIG9wdGlvbiB2YWx1ZSBmb3IgcGVyY2VudCBvZiBlbGVtZW50IHZpZXdhYmxlIGluIHRoZSB2aWV3cG9ydFxyXG4gICAgICogQHJldHVybiB7Qm9vbH0gICAgICAgICAgICAgICAgICAgIGlmIGVsZW1lbnQgaXMgbm90IGluIHRoZSB2aWV3cG9ydCB3ZSByZXR1cm4gZmFsc2VcclxuICAgICAqIEBtZW1iZXJPZiBTY3JvbGxtYXBcclxuICAgICAqL1xyXG5cclxuICAgIGVsZW1lbnRJblZpZXdwb3J0IChlbCwgcGVyY2V0YWdlT2ZFbGVtZW50KSB7XHJcbiAgICAgICAgY29uc3QgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGNvbnN0IHN0YXRzID0ge1xyXG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wIC0gd2luZG93LmlubmVySGVpZ2h0LFxyXG4gICAgICAgICAgICBib3R0b206IHJlY3QuYm90dG9tICsgcmVjdC5oZWlnaHQsXHJcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5oZWlnaHRcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGFtb3VudCA9IHN0YXRzLmhlaWdodCAqIHBlcmNldGFnZU9mRWxlbWVudDtcclxuXHJcbiAgICAgICAgaWYgKChzdGF0cy5ib3R0b20gLSBhbW91bnQgPiBzdGF0cy5oZWlnaHQpICYmIChzdGF0cy50b3AgKyBhbW91bnQgPCAwKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZWQgYSBzZXBhcmF0ZSBtZXRob2QgZm9yIHJlYWRhYmlsaXR5IGluIHdoYXRcclxuICAgICAqIGhhcHBlbnMgYWZ0ZXIgdGhlIGVsZW1lbnQgaW4gaW4gdGhlIHZpZXdwb3J0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge1t0eXBlXX0gcG9pbnQgW2Rlc2NyaXB0aW9uXVxyXG4gICAgICogQHJldHVybnMge1t0eXBlXX0gICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAgICogQG1lbWJlck9mIFNjcm9sbG1hcFxyXG4gICAgICovXHJcbiAgICBjaGVja1Zpc2libGUgKHBvaW50KSB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudEludmlld3BvcnQgPSB0aGlzLmVsZW1lbnRJblZpZXdwb3J0KHBvaW50LmVsZW1lbnQsIHBvaW50LnN1cmZhY2VWaXNpYmxlKTtcclxuXHJcbiAgICAgICAgaWYgKGVsZW1lbnRJbnZpZXdwb3J0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VHJpZ2dlckluKHBvaW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRyaWdnZXJPdXQocG9pbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybiB0aGUgc2Nyb2xsIGRpcmVjdGlvbiB2aWEgYSBzdHJpbmcgdmFsdWVcclxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cclxuICAgICAqIEBtZW1iZXJPZiBTY3JvbGxtYXBcclxuICAgICAqL1xyXG5cclxuICAgIHNjcm9sbERpcmVjdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9IFwiXCI7XHJcbiAgICAgICAgY29uc3Qgc3QgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuXHJcbiAgICAgICAgaWYgKHN0ID4gdGhpcy5sYXN0U2Nyb2xsVG9wKSB7XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9IFwic2Nyb2xsRG93blwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9IFwic2Nyb2xsVXBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXN0U2Nyb2xsVG9wID0gc3Q7XHJcblxyXG4gICAgICAgIHJldHVybiBkaXJlY3Rpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBiaW5kIGV2ZW50IGxpc3RlbmVycyB0byB0byBlbmFibGUgdGhlIGV4ZWN1dGlvblxyXG4gICAgICogb2YgYWxsIGRlc2lyZWQgZnVuY3Rpb25zLlxyXG4gICAgICovXHJcblxyXG4gICAgYmluZEV2ZW50TGlzdGVuZXJzICgpIHtcclxuICAgICAgICAvLyBpbml0aWFsIGNoZWNrIG9uIHBhZ2UgbG9hZCB0byBzZWUgaWYgZWxlbWVudHMgYXJlIHZpc2libGVcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5wb2ludHMuZm9yRWFjaCgocG9pbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tWaXNpYmxlKHBvaW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgZmFsc2UpO1xyXG5cclxuICAgICAgICAvLyBjaGVjayBmb3IgdmlzaWJsZSBlbGVtZW50cyBvbiBzY3JvbGxcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsT3JpZW50ID0gdGhpcy5zY3JvbGxEaXJlY3Rpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KHRoaXMuc2Nyb2xsT3JpZW50KTtcclxuICAgICAgICAgICAgdGhpcy5wb2ludHMuZm9yRWFjaCgocG9pbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tWaXNpYmxlKHBvaW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlICh0cmlnZ2VyKSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnBvaW50cy5pbmRleE9mKHRyaWdnZXIpO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLnBvaW50cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgU2Nyb2xsbWFwID0gbmV3IFNjcm9sbF9FdmVudF9UcmlnZ2VyKCk7XHJcblxyXG5TY3JvbGxtYXAuYmluZEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG53aW5kb3cuU2Nyb2xsbWFwID0gU2Nyb2xsbWFwO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2Nyb2xsbWFwOyIsImNsYXNzIFRyaWdnZXIge1xyXG5cdGNvbnN0cnVjdG9yIChlbGVtZW50LCBvcHRpb25zLCBjYWxsYmFjaykge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudDsgLy8gdGhlIERPTSBub2RlIHRvIHRyaWdnZXJcclxuXHRcdHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjazsgLy8gZnVuY3Rpb24gdG8gZXhlY3V0ZSBvbiB2aXNpYmxlXHJcblx0XHR0aGlzLmlzVmlzaWJsZSA9IGZhbHNlOyAvLyBpcyB2aXNpYmxlIGluIHRoZSB2aWV3cG9ydFxyXG5cdFx0dGhpcy5oYXNCZWVuVmlzaWJsZSA9IGZhbHNlOyAvLyBoYXMgYmVlbiBpbiBhbmQgb3V0IG9mIHRoZSB2aWV3cG9ydFxyXG5cdFx0dGhpcy5zdXJmYWNlVmlzaWJsZSA9IDAuNTsgLy8gdGhlIGFyZWEgb2YgdGhlIGVsZW1lbnQgdGhhdCB3aWxsIHRyaWdnZXIgdGhlIGNhbGxiYWNrIFwiZGVmYXVsdCBpcyA1MCVcIlxyXG5cdFx0dGhpcy5ydW5PblNjcm9sbCA9IGZhbHNlOyAvLyBmb3Igc2V0dGluZyB0aGUgY2FsbGJhY2sgdG8gZXhlY3V0ZSB3aGVuIHRoZSBlbGVtZW50IGlzIHZpc2libGVcclxuXHRcdHRoaXMuZGVsYXkgPSAwO1xyXG5cdFx0dGhpcy5hbHdheXNSdW5PblRyaWdnZXIgPSBmYWxzZTsgLy8gdG9nZ2xlIHRvIGFsd2F5cyBleGVjdXRlIHRoZSBjYWxsYmFjayBhZnRlciBlbGVtZW50IGhhcyBiZWVuIHZpc2libGUuXHJcblxyXG5cdFx0aWYgKG9wdGlvbnMpIHtcclxuXHRcdFx0T2JqZWN0LmFzc2lnbih0aGlzLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHR9XHJcblx0b25UcmlnZ2VySW4gKCkge1xyXG5cdFx0aWYgKHRoaXMudHJpZ2dlckVsZW1lbnQpIHtcclxuXHRcdFx0dGhpcy50cmlnZ2VyRWxlbWVudC5mb3JFYWNoKChub2RlKSA9PiB7XHJcblx0XHRcdFx0aWYgKHRoaXMudHJhbnNpdGlvbikge1xyXG5cdFx0XHRcdFx0bm9kZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNjcm9sbG1hcC10cmFuc2l0aW9uXCIsIHRoaXMudHJhbnNpdGlvbik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuY2FsbGJhY2sobm9kZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5jYWxsYmFjayh0aGlzLmVsZW1lbnQpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHRkZXN0cm95ICgpIHtcclxuXHRcdHRoaXMuZWxlbWVudCA9IG51bGw7XHJcblx0XHR0aGlzLmlzRGVzdHJveWVkID0gdHJ1ZTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRyaWdnZXI7IiwiaW1wb3J0IFNjcm9sbG1hcCBmcm9tIFwiLi4vc3JjL3Njcm9sbG1hcFwiO1xyXG5cclxuKCgpID0+IHtcclxuICBjb25zdCBBcHAgPSB7XHJcbiAgICBpbml0ICgpIHtcclxuICAgICAgU2Nyb2xsbWFwLnRyaWdnZXIoe1xyXG4gICAgICAgIHRhcmdldDogXCIuYm94ZXNcIixcclxuICAgICAgICBzdXJmYWNlVmlzaWJsZTogMC41LFxyXG4gICAgICAgIGV4cGFuZFN1cmZhY2VBcmVhOiBcIjUwcHhcIlxyXG4gICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0cmlnZ2VyZWRcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAgIEFwcC5pbml0KCk7XHJcbiAgfSk7XHJcblxyXG59KSgpO1xyXG5cclxuY29uc29sZS5sb2coXCJsb2FkZWRcIik7XHJcblxyXG5cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=