// FLOJO
// pronounced 'flo-ho'
"use strict";

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FLOJO = function () {

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
      intervalID = window.setInterval(update, 10);
      isRunning = true;
    }
  },
      update = function update() {
    findTime();
    cleanList();
    if (tasks.length == 0) {
      clearInterval(intervalID);
      intervalID = null;
    }
  },
      getNewWhen = function getNewWhen(interval) {
    var d = new Date();
    return d.getTime() + interval;
  },
      findTime = function findTime() {
    var d = new Date();
    var myT = d.getTime();

    tasks.forEach(function (task, index) {
      if (task == null) return;
      var myW = task.when;
      if (myW - myT < 0) {
        task.func(task.param);

        switch (task.type) {
          case 1:
            //timed
            tasks[index] = null;
            break;
          case 2:
            //count
            task.count--;
            if (task.count > 0) {
              var newT = myT + task.interval;
              //if(_debug) console.log(newT);
              task.when = getNewWhen(task.interval);
            } else {
              tasks[index] = null;
            }
            break;
          case 3:
            //infinite
            var newT = myT + task.interval;
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
    tasks.forEach(function (task, index) {
      if (task != null) {
        var myId = task.id;
        if (myId == id) {
          tasks[index] = null;
          if (_debug) {
            console.log('task killed: ' + id);
          }
        }
      }
    });

    cleanList();
  },
      getTaskFromId = function getTaskFromId(id) {
    return tasks.find(function (t) {
      return t.id == id;
    });
  };
  /// PUBLIC FUNCTIONS

  //Public
  return {

    timed: function timed(when, myFunc, myParam) {
      var d = new Date();

      if (when < 0) {
        throw new Error("When needs to be positive");
      }

      var task = new Task(getNewTaskId(), //ID
      1, //type
      d.getTime(), //start time
      d.getTime() + when, //end time
      myFunc, //function
      myParam); //parameter

      tasks.push(task);

      if (_debug) console.log("added: " + w + " f: " + f);

      //console.log('timed Id: ' + myId)
      return task.id;
    },
    after: function after(id, when, myFunc, myParam) {
      //console.log(id)
      var d = new Date();

      var task = new Task(getNewTaskId(), 1, d.getTime(), //start time
      d.getTime() + when, //end time
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
      //error checking for values
      var d = new Date();

      var task = new Counted(getNewTaskId(), //ID
      2, //type
      when, //when
      d.getTime(), //start time
      d.getTime() + when, //end time
      count, myFunc, //function
      myParam); //parameter

      tasks.push(task);

      if (_debug) console.log("added Counted: " + w + " f: " + f + " C: " + c);

      return task.id;
    },

    infinite: function infinite(when, myFunc, myParam) {
      var d = new Date();

      var task = new Infinite(getNewTaskId(), //ID
      3, //type
      when, //when   
      d.getTime(), //start time
      d.getTime() + when, //end time
      myFunc, //function
      myParam); //parameter

      tasks.push(task);

      if (_debug) console.log("added Infinite: " + w + " f: " + f);

      return this;
    },
    remove: function remove(id) {
      if (_debug) console.log("Killing task " + id);
      kill(id);
    },
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

    if (arg.indexOf('#') != -1) {
      return [document.getElementById(arg.substr(1))];
    } else {
      return document.querySelectorAll(arg);
    }
  };

  return {
    addClass: function addClass(c) {
      var els = getEls(arg);
      els.forEach(function (element) {
        if (element.classList) element.classList.add(c);else element.className += ' ' + c;
      });
    },
    removeClass: function removeClass(c) {
      var els = getEls(arg);
      els.forEach(function (element) {
        if (element.classList) element.classList.remove(c);else element.classList = element.classList.replace(new RegExp('(^|\\b)' + c.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      });
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
    opacity: function opacity(o) {
      var els = getEls(arg);
      els.forEach(function (element) {

        element.style.opacity = o;
      });
    },
    hasClass: function hasClass(c) {
      if (el.classList) el.classList.contains(c);else new RegExp('(^| )' + c + '( |$)', 'gi').test(el.c);
    }
    /*
    */
    //animate
    //randomNum?
  };
};