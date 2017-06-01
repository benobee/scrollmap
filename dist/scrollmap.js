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
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _trigger = __webpack_require__(1);\n\nvar _trigger2 = _interopRequireDefault(_trigger);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\r\n *\r\n * @namespace scrollMap\r\n * @description store element points and check if\r\n * elements are visible\r\n *\r\n*/\n\nvar Scroll_Event_Trigger = function () {\n    function Scroll_Event_Trigger() {\n        _classCallCheck(this, Scroll_Event_Trigger);\n\n        this.lastScrollTop = 0;\n        this.points = [];\n        this.events();\n    }\n\n    _createClass(Scroll_Event_Trigger, [{\n        key: \"sequence\",\n        value: function sequence(array, options, func) {\n            array.forEach(function (item, i) {\n                setTimeout(function () {\n                    func(array[i]);\n                }, options.interval * i);\n            });\n\n            return this;\n        }\n    }, {\n        key: \"add\",\n        value: function add(el, callback) {\n            var _this = this;\n\n            /* \r\n             * @desc add classname indicating element is intialized\r\n            */\n\n            var type = typeof el === \"undefined\" ? \"undefined\" : _typeof(el);\n\n            if (type === \"string\") {\n                el = document.querySelectorAll(el);\n            } else if (type === \"object\") {\n                el = [el];\n            }\n\n            el.forEach(function (node) {\n                node.setAttribute(\"data-scrollmap-loaded\", true);\n\n                var point = new _trigger2.default(node, callback);\n\n                _this.points.push(point);\n            });\n\n            return this;\n        }\n    }, {\n        key: \"remove\",\n        value: function remove(trigger) {\n\n            trigger = null;\n\n            return this;\n        }\n    }, {\n        key: \"elementInViewport\",\n        value: function elementInViewport(el, percetageOfElement) {\n\n            /*\r\n             * @desc check if element is in viewport\r\n            */\n\n            /*\r\n             * look for direction of scroll and base element visible\r\n             * percentage off of either top bottom when scrolling\r\n             * down, or the top when scrolling up. This may not be\r\n             * the perfect method but is cross browser compatible.\r\n            */\n\n            var rect = el.getBoundingClientRect();\n\n            var stats = {\n                top: rect.top - window.innerHeight,\n                bottom: rect.bottom + rect.height,\n                height: rect.height\n            };\n\n            var amount = stats.height * percetageOfElement;\n\n            if (stats.bottom - amount > stats.height && stats.top + amount < 0) {\n                return true;\n            }\n\n            return false;\n        }\n    }, {\n        key: \"checkVisible\",\n        value: function checkVisible(point) {\n            var targetElement = point.element;\n\n            var viewport = this.elementInViewport(targetElement, point.surfaceVisible);\n\n            if (viewport) {\n                targetElement.setAttribute(\"data-is-visible\", true);\n\n                if (point.onTriggerIn) {\n                    point.onTriggerIn();\n                }\n            } else {\n                targetElement.setAttribute(\"data-is-visible\", false);\n\n                if (point.onTriggerOut) {\n                    point.onTriggerOut();\n                }\n            }\n        }\n    }, {\n        key: \"on\",\n        value: function on(string, callback) {\n\n            /*\r\n             * methods for creating various listeners\r\n            */\n\n            var direction = this.scrollOrient;\n\n            if (direction === \"Up\" && string === \"scrollUp\") {\n                callback();\n            }\n\n            if (direction === \"Down\" && string === \"scrollDown\") {\n                callback();\n            }\n\n            return this;\n        }\n    }, {\n        key: \"scrollDirection\",\n        value: function scrollDirection() {\n\n            /*\r\n             * return the scroll direction via a string value\r\n            */\n\n            var direction = \"\";\n\n            var st = window.pageYOffset || document.documentElement.scrollTop;\n\n            if (st > this.lastScrollTop) {\n                direction = \"Down\";\n            } else {\n                direction = \"Up\";\n            }\n\n            this.lastScrollTop = st;\n\n            return direction;\n        }\n    }, {\n        key: \"extend\",\n        value: function extend(obj) {\n\n            Object.assign(this, obj);\n        }\n    }, {\n        key: \"events\",\n        value: function events() {\n            var _this2 = this;\n\n            //initial check on page load to see if elements are visible\n            window.onload = function () {\n                _this2.points.forEach(function (point) {\n                    _this2.checkVisible(point);\n                });\n            };\n\n            //check for visible elements on scroll\n            window.addEventListener(\"scroll\", function () {\n                _this2.scrollOrient = _this2.scrollDirection();\n\n                _this2.points.forEach(function (point) {\n                    _this2.checkVisible(point);\n                });\n            });\n        }\n    }]);\n\n    return Scroll_Event_Trigger;\n}();\n\n;\n\nvar Scrollmap = new Scroll_Event_Trigger();\n\nwindow.Scrollmap = Scrollmap;\n\nexports.default = Scrollmap;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/scrollmap.js\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/scrollmap.js?");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Trigger = function () {\n\tfunction Trigger(element, options) {\n\t\t_classCallCheck(this, Trigger);\n\n\t\tthis.element = element;\n\t\tthis.surfaceVisible = 0.5;\n\n\t\tif (options) {\n\t\t\tObject.assign(this, options);\n\t\t}\n\t}\n\n\t_createClass(Trigger, [{\n\t\tkey: \"destroy\",\n\t\tvalue: function destroy() {\n\t\t\tthis.element = null;\n\t\t\tthis.isDestroyed = true;\n\t\t}\n\t}]);\n\n\treturn Trigger;\n}();\n\nexports.default = Trigger;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/trigger.js\n// module id = 1\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/trigger.js?");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(0);\n\n\n//////////////////\n// WEBPACK FOOTER\n// multi ./src/scrollmap.js\n// module id = 2\n// module chunks = 0\n\n//# sourceURL=webpack:///multi_./src/scrollmap.js?");

/***/ })
/******/ ]);