// FLOJO
// pronounced 'flo-ho'
"use strict";

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FLOJO = function () {

  var _VERSION = 3.5;

  var TYPE_TIMED = 1;
  var TYPE_COUNTED = 2;
  var TYPE_INFINITE = 3;

  //Class Definitions

  var Task = function Task(id, type, start, when, func, param) {
    _classCallCheck(this, Task);

    this.id = id;
    this.type = type;
    this.start = start;
    this.when = when;
    this.func = func;
    this.param = param;
  };

  var Counted = function (_Task) {
    _inherits(Counted, _Task);

    function Counted(id, type, interval, start, when, count, func, param) {
      _classCallCheck(this, Counted);

      var _this = _possibleConstructorReturn(this, (Counted.__proto__ || Object.getPrototypeOf(Counted)).call(this, id, type, start, when, func, param));

      _this.interval = interval;
      _this.count = count;
      return _this;
    }

    return Counted;
  }(Task);

  var Infinite = function (_Task2) {
    _inherits(Infinite, _Task2);

    function Infinite(id, type, interval, start, when, func, param) {
      _classCallCheck(this, Infinite);

      var _this2 = _possibleConstructorReturn(this, (Infinite.__proto__ || Object.getPrototypeOf(Infinite)).call(this, id, type, start, when, func, param));

      _this2.interval = interval;
      return _this2;
    }

    return Infinite;
  }(Task);

  //Private variables and methods

  var tasks = [],
      currentTaskId = 0,


  //tracking
  isRunning = false,
      intervalID = null,
      _debug = false;

  var getNewTaskId = function getNewTaskId() {
    //console.log('currentTaskId: ' + currentTaskId)
    init();
    return currentTaskId++;
  },
      init = function init() {
    if (intervalID === null) {
      intervalID = requestAnimationFrame(update);
      isRunning = true;
    }
  },
      update = function update() {

    findTime();

    cleanList();

    if (tasks.length) {
      requestAnimationFrame(update);
    } else {
      intervalID = null;
      currentTaskId = 0;
    }
  },
      getNewWhen = function getNewWhen(interval) {
    return new Date().getTime() + interval;
  },
      findTime = function findTime() {

    tasks.forEach(function (task, index) {

      if (task == null) return;

      if (task.when - new Date().getTime() < 0) {
        task.func(task.param);

        switch (task.type) {
          case TYPE_TIMED:
            //timed

            tasks[index] = null;
            break;

          case TYPE_COUNTED:
            //count

            task.count--;
            if (task.count > 0) {
              var newT = new Date().getTime() + task.interval;
              //if(_debug) console.log(newT);
              task.when = getNewWhen(task.interval);
            } else {
              tasks[index] = null;
            }
            break;

          case TYPE_INFINITE:
            //infinite

            var newT = new Date().getTime() + task.interval;
            task.when = getNewWhen(task.interval);
            break;

          default:
            break;

        }
      }
    });
  },
      cleanList = function cleanList() {
    var newArray = [];
    for (var q = 0; q < tasks.length; q++) {
      if (tasks[q] != null) {
        newArray.push(tasks[q]);
      }
    }
    tasks = newArray;
  },
      kill = function kill(id) {
    if (tasks.length == 0) {
      return false;
    }

    tasks.forEach(function (task, index) {
      if (task != null) {
        if (task.id == id) {
          tasks[index] = null;
          if (_debug) {
            console.log('task killed: ' + id);
          }
          return true;
        }
      }
    });

    cleanList();
  },
      getTaskFromId = function getTaskFromId(id) {
    return tasks.find(function (t) {
      if (t != null) return t.id == id;
    });
  };
  /// PUBLIC FUNCTIONS

  //Public
  return {

    timed: function timed(when, myFunc, myParam) {
      if (when < 0) {
        throw new Error("'when' needs to be positive for timed");
      }

      var task = new Task(getNewTaskId(), //ID
      TYPE_TIMED, //type
      new Date().getTime(), //start time
      new Date().getTime() + when, //end time
      myFunc, //function
      myParam); //parameter

      tasks.push(task);

      if (_debug) console.log("added: " + w + " f: " + f);

      //console.log('timed Id: ' + myId)
      return task.id;
    },
    after: function after(id, when, myFunc, myParam) {
      if (when < 0) {
        throw new Error("'when' needs to be positive for after");
      }

      var myWhen;
      if (getTaskFromId(id) != null) {
        myWhen = getTaskFromId(id).when + when;
      } else {
        myWhen = new Date().getTime() + when;
      }

      var task = new Task(getNewTaskId(), TYPE_TIMED, new Date().getTime(), //start time
      myWhen, //end time
      myFunc, //function
      myParam); //parameter

      tasks.push(task);

      return task.id;
    },
    // then: function(w, f, p) {
    //   this.timed(w, f, p, currentTaskId);
    //   return this;
    // },

    counted: function counted(when, count, myFunc, myParam) {
      if (when < 0) {
        throw new Error("'when' needs to be positive for counted");
      }
      if (count < 0) {
        throw new Error("'count' needs to be positive");
      }

      var task = new Counted(getNewTaskId(), //ID
      TYPE_COUNTED, //type
      when, //when
      new Date().getTime(), //start time
      new Date().getTime() + when, //end time
      count, myFunc, //function
      myParam); //parameter

      tasks.push(task);

      if (_debug) console.log("added Counted: " + w + " f: " + f + " C: " + c);

      return task.id;
    },

    infinite: function infinite(when, myFunc, myParam) {
      if (when < 0) {
        throw new Error("'when' needs to be positive for infinite");
      }

      var task = new Infinite(getNewTaskId(), //ID
      TYPE_INFINITE, //type
      when, //when   
      new Date().getTime(), //start time
      new Date().getTime() + when, //end time
      myFunc, //function
      myParam); //parameter

      tasks.push(task);

      if (_debug) console.log("added Infinite: " + w + " f: " + f);

      return task.id;
    },
    remove: function remove(id) {
      if (_debug) console.log("Killing task " + id);
      var dead = kill(id);
      if (dead == false) {
        throw new Error("task id: " + id + " cannot be found");
      }
    },
    //removeAll
    //pause
    //stop
    waitFor: function waitFor(obj, prop, value, myFunc) {
      var f = myFunc;
      //console.log("wait for " + obj + " = " + value )
      this.infinite(1000, function () {
        if (obj[prop] == value) {
          //console.log("is " + value)
          f();
        }
        //then remove function
      });
    }
  };
}(FLOJO || {});

//P functions
var F = function F(arg) {

  var getEls = function getEls(arg) {
    //console.log('what: ' + arg.indexOf('#'))

    //need to be able to mix and match these
    if (arg.indexOf('#') != -1) {
      return [document.getElementById(arg.substr(1))];
    } else if (arg.indexOf('.') != -1) {
      return document.querySelectorAll(arg);
    } else {
      return document.getElementsByTagName(arg);
    }
  };

  return {
    addClass: function addClass(c) {
      var els = getEls(arg);
      //els.forEach(function(element) {
      for (var k = 0; k < els.length; k++) {
        var element = els[k];
        if (element.classList) element.classList.add(c);else element.className += ' ' + c;
      }
      //});
    },
    removeClass: function removeClass(c) {
      var els = getEls(arg);
      //els.forEach(function(element) {
      for (var k = 0; k < els.length; k++) {
        var element = els[k];
        if (element.classList) element.classList.remove(c);else element.classList = element.classList.replace(new RegExp('(^|\\b)' + c.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        //});
      }
    },
    hide: function hide() {
      el.style.display = 'none';
    },
    show: function show() {
      el.style.display = '';
    },
    remove: function remove() {
      el.parentNode.removeChild(el);
    },
    hasClass: function hasClass(c) {
      if (el.classList) el.classList.contains(c);else new RegExp('(^| )' + c + '( |$)', 'gi').test(el.c);
    },

    opacity: function opacity(o) {
      var els = getEls(arg);
      els.forEach(function (element) {
        element.style.opacity = o;
      });
    },
    fadeOut: function fadeOut(time) {
      var els = getEls(arg);
      var loops = Math.round(time / 60);

      //this still needs work for sure
      for (var k = 0; k < loops; k++) {
        FLOJO.timed(100, function () {
          console.log('k ' + k / loops);
          //els.forEach(function(element) {
          //  element.style.opacity = k/loops; 
          //});
        });
      }
    },
    fadeIn: function fadeIn(time) {}
    //to give programmtic control that which doesn't have it
    //color
    //each
    //animate
    //randomNum?
  };
};