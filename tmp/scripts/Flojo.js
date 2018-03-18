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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/scripts/Flojo.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/scripts/F.js":
/*!**************************!*\
  !*** ./app/scripts/F.js ***!
  \**************************/
/*! exports provided: F */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"F\", function() { return F; });\n//F functions\nfunction F(arg) {\n  var el,\n  getEls = function(arg) {\n    //console.log('what: ' + arg.indexOf('#'))\n\n    //need to be able to mix and match these\n    if(arg.indexOf('#') !== -1) {\n      return [document.getElementById(arg.substr(1))];\n    } else if(arg.indexOf('.') !== -1) {\n      return document.querySelectorAll(arg);\n    } else {\n      return document.getElementsByTagName(arg);\n    }\n  };\n\n  return {\n    addClass: function(c) {\n      var els = getEls(arg);\n      //els.forEach(function(element) {\n      for(var k = 0; k < els.length; k++) {\n        var element = els[k];\n        if (element.classList) {\n          element.classList.add(c);\n        } else {\n          element.className += ' ' + c;\n        }\n      }\n      //});\n    },\n    removeClass: function(c) {\n      var els = getEls(arg);\n      //els.forEach(function(element) {\n      for(var k = 0; k < els.length; k++) {\n        var element = els[k];\n        if (element.classList) {\n          element.classList.remove(c);\n        } else {\n          element.classList = element.classList.replace(new RegExp('(^|\\\\b)' + c.split(' ').join('|') + '(\\\\b|$)', 'gi'), ' ');\n        }\n      //});\n      }\n    },\n    hide: function() {\n      el.style.display = 'none';\n    },\n    show: function() {\n      el.style.display = '';\n    },\n    remove: function() {\n      el.parentNode.removeChild(el);\n    },\n    hasClass: function(c) {\n      if (el.classList) {\n        el.classList.contains(c);\n      } else {\n        new RegExp('(^| )' + c + '( |$)', 'gi').test(el.c);\n      }\n    },\n\n    opacity: function(o) {\n      var els = getEls(arg);\n      els.forEach(function(element) {\n        element.style.opacity = o;\n      });\n    },\n    fadeOut: function(time) {\n      var els = getEls(arg);\n      var loops = Math.round(time / 60);\n\n      //this still needs work for sure\n      for(var k = 0; k < loops; k++) {\n        FLOJO.timed(100, function(){\n          console.log('k ' + (k / loops));\n          //els.forEach(function(element) {\n          //  element.style.opacity = k/loops;\n          //});\n        });\n      }\n    },\n    fadeIn: function(time) {\n      let t = time;\n    }\n    //to give programmtic control that which doesn't have it\n    //color\n    //each\n    //animate\n    //randomNum?\n  };\n\n};\n\n//# sourceURL=webpack:///./app/scripts/F.js?");

/***/ }),

/***/ "./app/scripts/Flojo.js":
/*!******************************!*\
  !*** ./app/scripts/Flojo.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test */ \"./app/scripts/test.js\");\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core */ \"./app/scripts/core.js\");\n/* harmony import */ var _F__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./F */ \"./app/scripts/F.js\");\n// FLOJO\n// pronounced 'flo-ho'\n\n\n\n\n\n\n\nObject(_test__WEBPACK_IMPORTED_MODULE_0__[\"hello\"])();\n//FLOJO();\n\n\n//window.FLOJO = FLOJO;\nwindow.F = _F__WEBPACK_IMPORTED_MODULE_2__[\"F\"];\n\n\n\n\n//# sourceURL=webpack:///./app/scripts/Flojo.js?");

/***/ }),

/***/ "./app/scripts/core.js":
/*!*****************************!*\
  !*** ./app/scripts/core.js ***!
  \*****************************/
/*! exports provided: FLOJO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FLOJO\", function() { return FLOJO; });\n\n\nfunction FLOJO() {\n  \n\n  const APP_VERSION = 4.0;\n\n  const TYPE_TIMED = 1;\n  const TYPE_COUNTED = 2;\n  const TYPE_INFINITE = 3;\n\n  //Class Definitions\n\n  class Task {\n    constructor(id, type, start, when, func, param) {\n      this.id = id;\n      this.type = type;\n      this.start = start;\n      this.when = when;\n      this.func = func;\n      this.param = param;\n    }\n  }\n\n  class Counted extends Task {\n    constructor(id, type, interval, start, when, count, func, param) {\n      super(id, type, start, when, func, param);\n      this.interval = interval;\n      this.count = count;\n    }\n  }\n\n  class Infinite extends Task {\n    constructor(id, type, interval, start, when, func, param) {\n      super(id, type, start, when, func, param);\n      this.interval = interval;\n    }\n  }\n\n  //Private variables and methods\n\n  var tasks = [],\n\n      currentTaskId = 0,\n\n      //tracking\n      isRunning = false,\n      intervalID = null,\n      _debug = false;\n\n  var init = () => {\n        if(intervalID === null) {\n          intervalID = requestAnimationFrame(update);\n          isRunning = true;\n        }\n      },\n      getNewWhen = (interval) => {\n        return new Date().getTime() + interval;\n      },\n      findTime = () => {\n\n        tasks.forEach(function(task, index) {\n\n          if(task === null) { return; }\n\n          if((task.when - new Date().getTime()) < 0)\n          {\n            task.func(task.param);\n\n            switch(task.type)\n            {\n              case TYPE_TIMED:      //timed\n                tasks[index] = null;\n                break;\n\n              case TYPE_COUNTED:    //count\n                task.count--;\n                if(task.count > 0) {\n                  task.when = getNewWhen(task.interval);\n                } else {\n                  tasks[index] = null;\n                }\n                break;\n\n              case TYPE_INFINITE:   //infinite\n                task.when = getNewWhen(task.interval);\n                break;\n\n              default:\n                break;\n\n            }\n          }\n        });\n      },\n      cleanList = () => {\n        var newArray = [];\n        for(var q = 0; q < tasks.length; q++) {\n          if(tasks[q] != null) { newArray.push(tasks[q]); }\n        }\n        tasks = newArray;\n      },\n      kill = (id) => {\n        if(tasks.length === 0) { return false; }\n\n        tasks.forEach(function(task, index) {\n          if(task != null) {\n            if(task.id === id)\n            {\n              tasks[index] = null;\n              if(_debug) { console.log('task killed: ' + id); }\n                return true;\n            }\n          }\n        });\n\n        cleanList();\n      },\n      getTaskFromId = (id) => {\n        return tasks.find(function(t) {\n          if(t != null) {\n            return t.id === id;\n          }\n        });\n      },\n      update = () => {\n\n        findTime();\n\n        cleanList();\n\n        if(tasks.length) {\n          requestAnimationFrame(update);\n        } else {\n          intervalID = null;\n          currentTaskId = 0;\n          isRunning = false;\n        }\n      },\n      getNewTaskId = function() {\n        //console.log('currentTaskId: ' + currentTaskId)\n        init();\n        return currentTaskId++;\n      };\n      /// PUBLIC FUNCTIONS\n\n  //Public\n  return {\n\n    timed: function(when, myFunc, myParam) {\n      if(when < 0) { throw new Error('\"when\" needs to be positive for timed'); }\n\n      var task = new Task(\n        getNewTaskId(),               //ID\n        TYPE_TIMED,                   //type\n        new Date().getTime(),         //start time\n        new Date().getTime() + when,  //end time\n        myFunc,                       //function\n        myParam);                     //parameter\n\n      tasks.push(task);\n\n      if(_debug) { console.log('added timed: ' + when); }\n\n      //console.log('timed Id: ' + myId)\n      return task.id;\n    },\n    after: (id, when, myFunc, myParam) => {\n      if(when < 0) { throw new Error('\"when\" needs to be positive for after'); }\n\n      var myWhen;\n      if(getTaskFromId(id) != null) {\n        myWhen = getTaskFromId(id).when + when;\n      } else {\n        myWhen = new Date().getTime() + when;\n      }\n\n      var task = new Task(\n        getNewTaskId(),\n        TYPE_TIMED,\n        new Date().getTime(),             //start time\n        myWhen,                           //end time\n        myFunc,                           //function\n        myParam);                         //parameter\n\n      tasks.push(task);\n\n      return task.id;\n    },\n    // then: function(w, f, p) {\n    //   this.timed(w, f, p, currentTaskId);\n    //   return this;\n    // },\n\n    counted: (when, count, myFunc, myParam) => {\n      if(when < 0) { throw new Error('\"when\" needs to be positive for counted'); }\n      if(count < 0) { throw new Error('\"count\" needs to be positive'); }\n\n      var task = new Counted(\n          getNewTaskId(),                 //ID\n          TYPE_COUNTED,                   //type\n          when,                           //when\n          new Date().getTime(),           //start time\n          new Date().getTime() + when,    //end time\n          count,\n          myFunc,                         //function\n          myParam);                       //parameter\n\n      tasks.push(task);\n\n      if(_debug) { console.log('added Counted: ' + when + ' f: ' + myFunc + ' C: ' + count); }\n\n      return task.id;\n    },\n\n    infinite: (when, myFunc, myParam) => {\n      if(when < 0) { throw new Error('\"when\" needs to be positive for infinite'); }\n\n      var task = new Infinite(\n          getNewTaskId(),                 //ID\n          TYPE_INFINITE,                  //type\n          when,                           //when\n          new Date().getTime(),           //start time\n          new Date().getTime() + when,    //end time\n          myFunc,                         //function\n          myParam);                       //parameter\n\n      tasks.push(task);\n\n      if(_debug) { console.log('added Infinite: ' + when + ' f: ' + myFunc); }\n\n      return task.id;\n    },\n    remove: (id) => {\n      if(_debug) { console.log('Killing task ' + id); }\n      var dead = kill(id);\n      if(dead === false){\n        throw new Error('task id: ' + id + ' cannot be found');\n      }\n    },\n    //removeAll\n    //pause\n    //stop\n    //watchElement? MutationObserver\n    waitFor: (obj, prop, value, myFunc) => {\n      var f = myFunc;\n      //console.log(\"wait for \" + obj + \" = \" + value )\n      var k = FLOJO.infinite(1000, function() {\n        if(obj[prop] === value) {\n          //console.log(\"is \" + value)\n          f();\n          FLOJO.remove(k);\n        }\n      });\n    }\n  };\n};\n\n//# sourceURL=webpack:///./app/scripts/core.js?");

/***/ }),

/***/ "./app/scripts/test.js":
/*!*****************************!*\
  !*** ./app/scripts/test.js ***!
  \*****************************/
/*! exports provided: hello */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hello\", function() { return hello; });\n\nfunction hello() {\n\tconsole.log('hello world')\n}\n\n//# sourceURL=webpack:///./app/scripts/test.js?");

/***/ })

/******/ });