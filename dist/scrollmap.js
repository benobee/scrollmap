"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _trigger = require("./trigger");

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
     * Publish method of the pubsub pattern.
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
         * Subscribe method of pubsub pattern
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