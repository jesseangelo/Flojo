// FLOJO
// pronounced 'flo-ho'
"use strict";


var FLOJO = (function() {

  //Class Definitions

  class Task {
    constructor(id, type, start, when, func, param) {
      this.id = id;
      this.type = type;
      this.start = start;
      this.when = when;
      this.func = func;
      this.param = param;
    }
  }

  class Counted extends Task {
    constructor(id, type, interval, start, when, count, func, param) {
      super(id, type, start, when, func, param);
      this.interval = interval;
      this.count = count;
    }
  }

  class Infinite extends Task {
    constructor(id, type, interval, start, when, func, param) {
      super(id, type, start, when, func, param);
      this.interval = interval;
    }
  }

  //Private variables and methods

  var tasks = [],
      
      currentTaskId = 0,

      //tracking
      isRunning = false,
      intervalID = null,
      _debug = false;

  var getNewTaskId = function() {
        //console.log('currentTaskId: ' + currentTaskId)
        init();
        return (currentTaskId++);
      },
      init = function() {
        if(intervalID === null) {
          intervalID = window.setInterval(update, 10);
          isRunning = true;
        }
      },
      update = function() {
        findTime();
        cleanList();
        if(tasks.length == 0) {
          clearInterval(intervalID);
          intervalID = null;
        }
      },
      getNewWhen = function(interval) {
        var d = new Date();
        return d.getTime() + interval;
      },
      findTime = function() {
        var d = new Date();
        var myT = d.getTime();

        tasks.forEach(function(task, index) {
          if(task == null) return;
          var myW = task.when;
          if((myW-myT) < 0)
          {
            task.func(task.param);

            switch(task.type)
            {
              case 1:     //timed
                tasks[index] = null;
                break;
              case 2:     //count
                task.count--;
                if(task.count > 0) {
                  var newT = myT + task.interval;
                  //if(_debug) console.log(newT);
                  task.when = getNewWhen(task.interval);
                } else {
                  tasks[index] = null;
                }
                break;
              case 3:     //infinite
                var newT = myT + task.interval;
                task.when = getNewWhen(task.interval);
                break;
              default: 
                break;
            }

            
          }
        });
      },
      cleanList = function() {
        var newArray = [];
        for(var q = 0; q < tasks.length; q++) {
          if(tasks[q] != null) { newArray.push(tasks[q]); }
        }
        tasks = newArray;

      },
      kill = function(id) {
        tasks.forEach(function(task, index) {
          if(task != null) {
            var myId = task.id;
            if(myId == id)
            {
              tasks[index] = null;
              if(_debug) { console.log('task killed: ' + id) }
            }
          }
        });
       
        cleanList();
      },
      getTaskFromId = function(id) {
        return tasks.find(function(t) {
          return t.id == id;
        });
      }
      /// PUBLIC FUNCTIONS

  //Public
  return {

    timed: function(when, myFunc, myParam) {
      var d = new Date();

      if(when < 0) { throw new Error("When needs to be positive")}

      var task = new Task(
        getNewTaskId(),         //ID
        1,                      //type
        d.getTime(),            //start time
        d.getTime() + when,     //end time
        myFunc,                 //function
        myParam)                //parameter

      tasks.push(task);

      if(_debug) console.log("added: " + w + " f: " + f);

      //console.log('timed Id: ' + myId)
      return task.id;

    },
    after: function(id, when, myFunc, myParam) {
      //console.log(id)
      var d = new Date();

      var task = new Task(
        getNewTaskId(),
        1,
        d.getTime(),            //start time
        d.getTime() + when,     //end time
        myFunc,                 //function
        myParam)                //parameter

      tasks.push(task);
      
      return task.id;
    },
    // then: function(w, f, p) {
    //   this.timed(w, f, p, currentTaskId);
    //   return this;
    // },

    counted: function(when, count, myFunc, myParam) {
      //error checking for values
      var d = new Date();

      var task = new Counted(
          getNewTaskId(),         //ID
          2,                      //type
          when,                   //when
          d.getTime(),            //start time
          d.getTime() + when,     //end time
          count,
          myFunc,                 //function
          myParam)                //parameter

      tasks.push(task);

      
      if(_debug) console.log("added Counted: " + w + " f: " + f + " C: " + c);
      
      return task.id;
    },

    infinite: function(when, myFunc, myParam) {
      var d = new Date();
      
      var task = new Infinite(
          getNewTaskId(),         //ID
          3,                      //type
          when,                   //when   
          d.getTime(),            //start time
          d.getTime() + when,     //end time
          myFunc,                 //function
          myParam)                //parameter

      tasks.push(task);
      
      if(_debug) console.log("added Infinite: " + w + " f: " + f);

      return this;
    },
    remove: function (id) {
      if(_debug) console.log("Killing task " + id)
      kill(id);
    },
    waitFor: function(obj, prop, value, myFunc) {
      var f = myFunc;
      //console.log("wait for " + obj + " = " + value )
      this.infinite(1000, function() {
        if(obj[prop] == value) {
          //console.log("is " + value)
          f();
        }

        //then remove function
      })
    }
  }
}(FLOJO || {}));

//P functions
var F = function(arg) {

  var getEls = function(arg) {
    //console.log('what: ' + arg.indexOf('#'))

    if(arg.indexOf('#') != -1) {
      return [document.getElementById(arg.substr(1))]
    } else {
      return document.querySelectorAll(arg) 
    }
  }

  return {
    addClass: function(c){ 
      var els = getEls(arg)
      els.forEach(function(element) {
        if (element.classList) 
          element.classList.add(c);
        else
          element.className += ' ' + c;
      });
    },
    removeClass: function(c) {
      var els = getEls(arg)
      els.forEach(function(element) {
        if (element.classList)
          element.classList.remove(c);
        else
          element.classList = element.classList.replace(new RegExp('(^|\\b)' + c.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      });
    },
    hide: function() {
      el.style.display = 'none';
    },
    show: function() {
      el.style.display = '';
    },
    remove: function() {
      el.parentNode.removeChild(el);
    },
    hasClass: function(c) {
      if (el.classList)
        el.classList.contains(c);
      else
        new RegExp('(^| )' + c + '( |$)', 'gi').test(el.c);
    }
    /*
    */
    //animate
    //randomNum?
  }

};
