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
 * @namespace scrollMap
 * @description store element points and check if
 * elements are visible
*/

var Scroll_Event_Trigger = function () {
    function Scroll_Event_Trigger() {
        _classCallCheck(this, Scroll_Event_Trigger);

        this.lastScrollTop = 0;
        this.points = [];
        this.events();
    }

    _createClass(Scroll_Event_Trigger, [{
        key: "out",
        value: function out(args) {
            this.onTriggerOut = args;
            return this;
        }
    }, {
        key: "sequence",
        value: function sequence(array, options, func) {

            /*
             * @desc run through an array of elements and apply a
             * staggered sequence delay
            */
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
    }, {
        key: "sequenceOrder",
        value: function sequenceOrder(array, order) {

            /*
             * @desc randomize an array for a trigger sequence
            */

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
    }, {
        key: "trigger",
        value: function trigger(args, callback) {
            var _this = this;

            /*
             * @desc add classname indicating element is intialized
            */

            var el = args.target;

            switch (typeof el === "undefined" ? "undefined" : _typeof(el)) {
                case "string":
                    el = document.querySelectorAll(el);
                    break;
                case "object":
                    el = [el];
                    break;
                default:
                    el = document.querySelectorAll(el);
            }

            el = this.toArray(el);

            el.forEach(function (node) {
                node.setAttribute("data-scrollmap-loaded", true);
                node.setAttribute("data-scrollmap-triggered-in", false);
                node.setAttribute("data-scrollmap-triggered-out", false);
                var point = new _trigger2.default(node, args, callback);

                _this.points.push(point);
            });
            return this;
        }
    }, {
        key: "toArray",
        value: function toArray(collection) {
            return Array.prototype.slice.call(collection);
        }
    }, {
        key: "setTriggerIn",
        value: function setTriggerIn(point) {
            point.element.setAttribute("data-scrollmap-is-visible", true);
            point.element.setAttribute("data-scrollmap-triggered-in", true);

            if (!point.triggeredIn) {

                if (point.callback) {
                    point.onTriggerIn();
                }

                if (point.runOnScroll === false) {
                    point.triggeredIn = true;
                }
            }
        }
    }, {
        key: "setTriggerOut",
        value: function setTriggerOut(point) {
            point.element.setAttribute("data-scrollmap-is-visible", false);
            point.element.setAttribute("data-scrollmap-triggered-out", true);
            if (point.alwaysRunOnTrigger === true) {
                point.triggeredIn = false;
                point.element.setAttribute("data-scrollmap-triggered-in", false);
            }
            if (this.onTriggerOut && !point.triggeredOut && point.triggeredIn) {
                this.onTriggerOut(point);
                point.triggeredOut = true;
            }
        }
    }, {
        key: "elementInViewport",
        value: function elementInViewport(el, percetageOfElement) {

            /*
             * @desc check if element is in viewport
            */

            /*
             * look for direction of scroll and base element visible
             * percentage off of either top bottom when scrolling
             * down, or the top when scrolling up. This may not be
             * the perfect method but is cross browser compatible.
            */

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
    }, {
        key: "checkVisible",
        value: function checkVisible(point) {
            var viewport = this.elementInViewport(point.element, point.surfaceVisible);

            if (viewport) {
                this.setTriggerIn(point);
            } else {
                this.setTriggerOut(point);
            }
        }
    }, {
        key: "on",
        value: function on(string, callback) {
            /*
             * methods for creating various listeners
            */
            var direction = this.scrollOrient;

            if (direction === "Up" && string === "scrollUp") {
                callback();
            }
            if (direction === "Down" && string === "scrollDown") {
                callback();
            }
            return this;
        }
    }, {
        key: "scrollDirection",
        value: function scrollDirection() {
            /*
             * return the scroll direction via a string value
            */
            var direction = "";
            var st = window.pageYOffset || document.documentElement.scrollTop;

            if (st > this.lastScrollTop) {
                direction = "Down";
            } else {
                direction = "Up";
            }
            this.lastScrollTop = st;
            return direction;
        }
    }, {
        key: "events",
        value: function events() {
            var _this2 = this;

            // initial check on page load to see if elements are visible
            window.addEventListener('load', function () {
                _this2.points.forEach(function (point) {
                    _this2.checkVisible(point);
                });
            }, false);

            // check for visible elements on scroll
            window.addEventListener("scroll", function () {
                _this2.scrollOrient = _this2.scrollDirection();
                _this2.points.forEach(function (point) {
                    _this2.checkVisible(point);
                });
            });
        }
    }]);

    return Scroll_Event_Trigger;
}();

;

var Scrollmap = new Scroll_Event_Trigger();

window.Scrollmap = Scrollmap;

exports.default = Scrollmap;