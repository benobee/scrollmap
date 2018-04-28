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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n      value: true\n});\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _trigger = __webpack_require__(2);\n\nvar _trigger2 = _interopRequireDefault(_trigger);\n\nvar _transition = __webpack_require__(1);\n\nvar _transition2 = _interopRequireDefault(_transition);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\r\n * @namespace ScrollMap\r\n * @description: A module for testing if a DOM element is visible in the viewport, then triggers callbacks on execution. \r\n*/\n\nvar Scroll_Event_Trigger = function () {\n      function Scroll_Event_Trigger() {\n            _classCallCheck(this, Scroll_Event_Trigger);\n\n            this.lastScrollTop = 0;\n            this.points = [];\n            this.events();\n\n            console.log(this);\n      }\n\n      _createClass(Scroll_Event_Trigger, [{\n            key: \"out\",\n            value: function out(args) {\n\n                  /*\r\n                    @desc: When the trigger is has been executed and the element is no longer in the viewport, the out method\r\n                    can be chained to the trigger to execute the specified function.\r\n                  */\n\n                  this.onTriggerOut = args;\n                  return this;\n            }\n      }, {\n            key: \"sequence\",\n            value: function sequence(array, options, func) {\n\n                  /*\r\n                    @desc: A method for staggering an array of triggers. \r\n                      Properties for options config object:**\r\n                      interval: (number) :\r\n                    changes the interval speed of the sequence\r\n                      order: (string) :\r\n                    changes the order of the sequence. Order options are \"random\", and \"reverse\".\r\n                      callback (item, index):\r\n                    can get the item and index of the array as arguments\r\n                  */\n\n                  array = Array.prototype.slice.call(array);\n\n                  var delay = 0;\n\n                  if (options.order) {\n                        this.sequenceOrder(array, options.order);\n                  }\n\n                  if (options.delay) {\n                        delay = options.delay;\n                  }\n\n                  var run = array.forEach(function (item, i) {\n                        setTimeout(function () {\n                              func(array[i], i);\n                        }, options.interval * i);\n                  });\n\n                  setTimeout(run, delay);\n\n                  return this;\n            }\n      }, {\n            key: \"sequenceOrder\",\n            value: function sequenceOrder(array, order) {\n\n                  /*\r\n                    @desc: sequence options\r\n                  */\n\n                  switch (order) {\n                        case \"random\":\n                              array = array.sort(function () {\n                                    return 0.5 - Math.random();\n                              });\n                              break;\n                        case \"reverse\":\n                              array = array.reverse();\n                              break;\n                        default:\n\n                  }\n                  return array;\n            }\n      }, {\n            key: \"transition\",\n            value: function transition(type, options) {\n\n                  /*\r\n                    @desc: a method for creating an amiated transition\r\n                    type (string) : the transition name\r\n                    options (object) : options for speed, delay, callbacks etc.\r\n                  */\n\n                  var transition = new _transition2.default({ type: type }, { options: options });\n\n                  return this;\n            }\n      }, {\n            key: \"trigger\",\n            value: function trigger(args, callback) {\n                  var _this = this;\n\n                  /*\r\n                    @desc: A method for adding triggers when element is visible in the viewport. \r\n                      Properties for options config object:\r\n                    target (string or element): Using querySelectorAll a target string selector \r\n                    is needed, or you can specify an actual element.\r\n                      surfaceVisible (number): the percentage area, which is represented as a \r\n                    number from 0 - 1 is the area of the which is visible in the viewport.\r\n                      runOnScroll (boolean) : by default the callback is run only one time whent \r\n                    the element is visible. By changing to true, the callback will be run \r\n                    as long as the scroll event is happening.\r\n                      alwaysRunOnTrigger (boolean): by default the triggered element callback\r\n                    will only be executed one time. Setting to true will re-trigger thcallback \r\n                    everytime the element has been in and out of the viewport.\r\n                      callback (object):\r\n                    This is the function which will be exectued when the element is detected\r\n                    in the viewport. To reference the node, pass it into the callback as an argument.\r\n                  */\n\n                  //handle DOM or string selector\n                  var el = args.target;\n\n                  var triggerElementSelector = args.triggerElement;\n\n                  if (args.triggerElement) {\n                        args.triggerElement = this.checkSelector(args.triggerElement);\n                  }\n\n                  el = this.checkSelector(el);\n\n                  function _id(i) {\n                        return '_' + (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)) + '_' + i;\n                  }\n\n                  var id = _id();\n\n                  el.forEach(function (node, i) {\n                        node.setAttribute(\"data-scrollmap-id\", _id(i));\n                        args.triggerElement ? node.setAttribute(\"data-scrollmap-trigger-element\", triggerElementSelector) : false;\n                        args.transition ? node.setAttribute(\"data-scrollmap-transition\", args.transition) : false;\n                        node.setAttribute(\"data-scrollmap-loaded\", true);\n                        node.setAttribute(\"data-scrollmap-triggered-in\", false);\n                        node.setAttribute(\"data-scrollmap-triggered-out\", false);\n                        var point = new _trigger2.default(node, args, callback);\n\n                        _this.points.push(point);\n                  });\n                  return this;\n            }\n      }, {\n            key: \"checkSelector\",\n            value: function checkSelector(target) {\n                  switch (typeof target === \"undefined\" ? \"undefined\" : _typeof(target)) {\n                        case \"string\":\n                              target = this.toArray(document.querySelectorAll(target));\n                              break;\n                        case \"object\":\n                              target = [target];\n                              break;\n                        default:\n                              target = this.toArray(document.querySelectorAll(target));\n                  }\n\n                  return target;\n            }\n      }, {\n            key: \"toArray\",\n            value: function toArray(collection) {\n\n                  /*\r\n                    @desc: create a true array from collection of elements\r\n                  */\n\n                  return Array.prototype.slice.call(collection);\n            }\n      }, {\n            key: \"setTriggerIn\",\n            value: function setTriggerIn(point) {\n\n                  /*\r\n                    @desc: sets points with data hooks and runs callback method  \r\n                  */\n\n                  point.element.setAttribute(\"data-scrollmap-is-visible\", true);\n                  point.element.setAttribute(\"data-scrollmap-triggered-in\", true);\n\n                  if (!point.triggeredIn) {\n                        if (point.callback) {\n                              point.onTriggerIn();\n                        }\n                        if (point.runOnScroll === false) {\n                              point.triggeredIn = true;\n                        }\n                  }\n            }\n      }, {\n            key: \"setTriggerOut\",\n            value: function setTriggerOut(point) {\n\n                  /*\r\n                    @desc: sets points with data hooks\r\n                  */\n\n                  point.element.setAttribute(\"data-scrollmap-is-visible\", false);\n                  point.element.setAttribute(\"data-scrollmap-triggered-out\", true);\n                  if (point.alwaysRunOnTrigger === true) {\n                        point.triggeredIn = false;\n                        point.element.setAttribute(\"data-scrollmap-triggered-in\", false);\n                  }\n                  if (this.onTriggerOut && !point.triggeredOut && point.triggeredIn) {\n                        this.onTriggerOut(point);\n                        point.triggeredOut = true;\n                  }\n            }\n      }, {\n            key: \"elementInViewport\",\n            value: function elementInViewport(el, percetageOfElement) {\n\n                  /*\r\n                   * @desc check if element is in viewport\r\n                  */\n\n                  /*\r\n                   * look for direction of scroll and base element visible\r\n                   * percentage off of either top bottom when scrolling\r\n                   * down, or the top when scrolling up. This may not be\r\n                   * the perfect method but is cross browser compatible.\r\n                  */\n\n                  var rect = el.getBoundingClientRect();\n\n                  var stats = {\n                        top: rect.top - window.innerHeight,\n                        bottom: rect.bottom + rect.height,\n                        height: rect.height\n                  };\n\n                  var amount = stats.height * percetageOfElement;\n\n                  if (stats.bottom - amount > stats.height && stats.top + amount < 0) {\n                        return true;\n                  }\n                  return false;\n            }\n      }, {\n            key: \"checkVisible\",\n            value: function checkVisible(point) {\n                  var viewport = this.elementInViewport(point.element, point.surfaceVisible);\n\n                  if (viewport) {\n                        this.setTriggerIn(point);\n                  } else {\n                        this.setTriggerOut(point);\n                  }\n            }\n      }, {\n            key: \"on\",\n            value: function on(string, callback) {\n\n                  /*\r\n                   * methods for creating various listeners\r\n                  */\n\n                  var direction = this.scrollOrient;\n\n                  if (direction === \"Up\" && string === \"scrollUp\") {\n                        callback();\n                  }\n                  if (direction === \"Down\" && string === \"scrollDown\") {\n                        callback();\n                  }\n                  return this;\n            }\n      }, {\n            key: \"scrollDirection\",\n            value: function scrollDirection() {\n\n                  /*\r\n                   * return the scroll direction via a string value\r\n                  */\n\n                  var direction = \"\";\n                  var st = window.pageYOffset || document.documentElement.scrollTop;\n\n                  if (st > this.lastScrollTop) {\n                        direction = \"Down\";\n                  } else {\n                        direction = \"Up\";\n                  }\n                  this.lastScrollTop = st;\n                  return direction;\n            }\n      }, {\n            key: \"events\",\n            value: function events() {\n                  var _this2 = this;\n\n                  // initial check on page load to see if elements are visible\n\n                  window.addEventListener('load', function () {\n                        _this2.points.forEach(function (point) {\n                              _this2.checkVisible(point);\n                        });\n                  }, false);\n\n                  // check for visible elements on scroll\n\n                  window.addEventListener(\"scroll\", function () {\n                        _this2.scrollOrient = _this2.scrollDirection();\n                        _this2.points.forEach(function (point) {\n                              _this2.checkVisible(point);\n                        });\n                  });\n            }\n      }]);\n\n      return Scroll_Event_Trigger;\n}();\n\n;\n\nvar Scrollmap = new Scroll_Event_Trigger();\n\nwindow.Scrollmap = Scrollmap;\n\nexports.default = Scrollmap;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/scrollmap.js\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/scrollmap.js?");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Transition = function Transition() {\n\t_classCallCheck(this, Transition);\n\n\tfor (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n\t\targs[_key] = arguments[_key];\n\t}\n\n\tObject.assign.apply(Object, [this].concat(args));\n\n\tconsole.log(this);\n};\n\n;\n\nexports.default = Transition;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/transition.js\n// module id = 1\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/transition.js?");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Trigger = function () {\n\tfunction Trigger(element, options, callback) {\n\t\t_classCallCheck(this, Trigger);\n\n\t\tthis.element = element;\n\t\tthis.callback = callback;\n\t\tthis.triggeredIn = false;\n\t\tthis.triggeredOut = false;\n\t\tthis.surfaceVisible = 0.5;\n\t\tthis.runOnScroll = false;\n\t\tthis.delay = 0;\n\t\tthis.alwaysRunOnTrigger = false;\n\n\t\tif (options) {\n\t\t\tObject.assign(this, options);\n\t\t}\n\t}\n\n\t_createClass(Trigger, [{\n\t\tkey: \"onTriggerIn\",\n\t\tvalue: function onTriggerIn() {\n\t\t\tvar _this = this;\n\n\t\t\tif (this.triggerElement) {\n\t\t\t\tthis.triggerElement.forEach(function (node) {\n\t\t\t\t\t_this.transition ? node.setAttribute(\"data-scrollmap-transition\", _this.transition) : false;\n\t\t\t\t\t_this.callback(node);\n\t\t\t\t});\n\t\t\t}\n\t\t\tthis.callback(this.element);\n\n\t\t\treturn this;\n\t\t}\n\t}, {\n\t\tkey: \"destroy\",\n\t\tvalue: function destroy() {\n\t\t\tthis.element = null;\n\t\t\tthis.isDestroyed = true;\n\t\t}\n\t}]);\n\n\treturn Trigger;\n}();\n\nexports.default = Trigger;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/trigger.js\n// module id = 2\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/trigger.js?");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(0);\n\n\n//////////////////\n// WEBPACK FOOTER\n// multi ./src/scrollmap.js\n// module id = 3\n// module chunks = 0\n\n//# sourceURL=webpack:///multi_./src/scrollmap.js?");

/***/ })
/******/ ]);