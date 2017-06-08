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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__trigger__ = __webpack_require__(1);\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n\n\n/**\r\n * @namespace scrollMap\r\n * @description store element points and check if\r\n * elements are visible\r\n*/\n\nvar Scroll_Event_Trigger = function () {\n    function Scroll_Event_Trigger() {\n        _classCallCheck(this, Scroll_Event_Trigger);\n\n        this.lastScrollTop = 0;\n        this.points = [];\n        this.events();\n    }\n\n    _createClass(Scroll_Event_Trigger, [{\n        key: \"out\",\n        value: function out(args) {\n            this.onTriggerOut = args;\n            return this;\n        }\n    }, {\n        key: \"sequence\",\n        value: function sequence(array, options, func) {\n\n            /*\r\n             * @desc run through an array of elements and apply a\r\n             * staggered sequence delay\r\n            */\n            array = Array.prototype.slice.call(array);\n\n            if (options.order) {\n                this.sequenceOrder(array, options.order);\n            }\n\n            array.forEach(function (item, i) {\n                setTimeout(function () {\n                    func(array[i]);\n                }, options.interval * i);\n            });\n            return this;\n        }\n    }, {\n        key: \"sequenceOrder\",\n        value: function sequenceOrder(array, order) {\n\n            /*\r\n             * @desc randomize an array for a trigger sequence\r\n            */\n\n            switch (order) {\n                case \"random\":\n                    array = array.sort(function () {\n                        return 0.5 - Math.random();\n                    });\n                    break;\n                case \"reverse\":\n                    array = array.reverse();\n                    break;\n                default:\n\n            }\n            return array;\n        }\n    }, {\n        key: \"trigger\",\n        value: function trigger(args, callback) {\n            var _this = this;\n\n            /*\r\n             * @desc add classname indicating element is intialized\r\n            */\n\n            var el = args.target;\n\n            switch (typeof el === \"undefined\" ? \"undefined\" : _typeof(el)) {\n                case \"string\":\n                    el = document.querySelectorAll(el);\n                    break;\n                case \"object\":\n                    el = [el];\n                    break;\n                default:\n                    el = document.querySelectorAll(el);\n            }\n            el.forEach(function (node) {\n                node.setAttribute(\"data-scrollmap-loaded\", true);\n                node.setAttribute(\"data-scrollmap-triggered-in\", false);\n                node.setAttribute(\"data-scrollmap-triggered-out\", false);\n                var point = new __WEBPACK_IMPORTED_MODULE_0__trigger__[\"a\" /* default */](node, args, callback);\n\n                _this.points.push(point);\n            });\n            return this;\n        }\n    }, {\n        key: \"elementInViewport\",\n        value: function elementInViewport(el, percetageOfElement) {\n\n            /*\r\n             * @desc check if element is in viewport\r\n            */\n\n            /*\r\n             * look for direction of scroll and base element visible\r\n             * percentage off of either top bottom when scrolling\r\n             * down, or the top when scrolling up. This may not be\r\n             * the perfect method but is cross browser compatible.\r\n            */\n\n            var rect = el.getBoundingClientRect();\n\n            var stats = {\n                top: rect.top - window.innerHeight,\n                bottom: rect.bottom + rect.height,\n                height: rect.height\n            };\n\n            var amount = stats.height * percetageOfElement;\n\n            if (stats.bottom - amount > stats.height && stats.top + amount < 0) {\n                return true;\n            }\n            return false;\n        }\n    }, {\n        key: \"checkVisible\",\n        value: function checkVisible(point) {\n            var viewport = this.elementInViewport(point.element, point.surfaceVisible);\n\n            if (viewport) {\n                this.setTriggerIn(point);\n            } else {\n                this.setTriggerOut(point);\n            }\n        }\n    }, {\n        key: \"setTriggerIn\",\n        value: function setTriggerIn(point) {\n            point.element.setAttribute(\"data-scrollmap-is-visible\", true);\n            point.element.setAttribute(\"data-scrollmap-triggered-in\", true);\n\n            if (!point.triggeredIn) {\n                point.onTriggerIn();\n                if (point.runOnScroll === false) {\n                    point.triggeredIn = true;\n                }\n            }\n        }\n    }, {\n        key: \"setTriggerOut\",\n        value: function setTriggerOut(point) {\n            point.element.setAttribute(\"data-scrollmap-is-visible\", false);\n            point.element.setAttribute(\"data-scrollmap-triggered-out\", true);\n            if (point.alwaysRunOnTrigger === true) {\n                point.triggeredIn = false;\n                point.element.setAttribute(\"data-scrollmap-triggered-in\", false);\n            }\n            if (this.onTriggerOut && !point.triggeredOut && point.triggeredIn) {\n                this.onTriggerOut(point);\n                point.triggeredOut = true;\n            }\n        }\n    }, {\n        key: \"on\",\n        value: function on(string, callback) {\n            /*\r\n             * methods for creating various listeners\r\n            */\n            var direction = this.scrollOrient;\n\n            if (direction === \"Up\" && string === \"scrollUp\") {\n                callback();\n            }\n            if (direction === \"Down\" && string === \"scrollDown\") {\n                callback();\n            }\n            return this;\n        }\n    }, {\n        key: \"scrollDirection\",\n        value: function scrollDirection() {\n            /*\r\n             * return the scroll direction via a string value\r\n            */\n            var direction = \"\";\n            var st = window.pageYOffset || document.documentElement.scrollTop;\n\n            if (st > this.lastScrollTop) {\n                direction = \"Down\";\n            } else {\n                direction = \"Up\";\n            }\n            this.lastScrollTop = st;\n            return direction;\n        }\n    }, {\n        key: \"events\",\n        value: function events() {\n            var _this2 = this;\n\n            // initial check on page load to see if elements are visible\n            window.onload = function () {\n                _this2.points.forEach(function (point) {\n                    _this2.checkVisible(point);\n                });\n            };\n            // check for visible elements on scroll\n            window.addEventListener(\"scroll\", function () {\n                _this2.scrollOrient = _this2.scrollDirection();\n                _this2.points.forEach(function (point) {\n                    _this2.checkVisible(point);\n                });\n            });\n        }\n    }]);\n\n    return Scroll_Event_Trigger;\n}();\n\nvar Scrollmap = new Scroll_Event_Trigger();\n\nwindow.Scrollmap = Scrollmap;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Scrollmap);\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/scrollmap.js\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/scrollmap.js?");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Trigger = function () {\n\tfunction Trigger(element, options, callback) {\n\t\t_classCallCheck(this, Trigger);\n\n\t\tthis.element = element;\n\t\tthis.surfaceVisible = 0.5;\n\t\tthis.callback = callback;\n\t\tthis.triggeredIn = false;\n\t\tthis.triggeredOut = false;\n\t\tthis.runOnScroll = false;\n\t\tthis.alwaysRunOnTrigger = false;\n\t\tif (options) {\n\t\t\tObject.assign(this, options);\n\t\t}\n\t}\n\n\t_createClass(Trigger, [{\n\t\tkey: \"onTriggerIn\",\n\t\tvalue: function onTriggerIn() {\n\t\t\tthis.callback(this.element);\n\t\t\treturn this;\n\t\t}\n\t}, {\n\t\tkey: \"destroy\",\n\t\tvalue: function destroy() {\n\t\t\tthis.element = null;\n\t\t\tthis.isDestroyed = true;\n\t\t}\n\t}]);\n\n\treturn Trigger;\n}();\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (Trigger);\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/trigger.js\n// module id = 1\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/trigger.js?");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(0);\n\n\n//////////////////\n// WEBPACK FOOTER\n// multi ./src/scrollmap.js\n// module id = 2\n// module chunks = 0\n\n//# sourceURL=webpack:///multi_./src/scrollmap.js?");

/***/ })
/******/ ]);