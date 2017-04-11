// NOTES


//get time since and smooth animatnion
//shouldn't just run at 10ms
//type of task (use for throwing errors)
//animate selector
//  return (typeof(_doc) === "undefined") ? e : (_doc.querySelectorAll ? _doc.querySelectorAll(e) : _doc.getElementById((e.charAt(0) === "#") ? e.substr(1) : e));
//request animatino frame

//add class, other jquery-ish function
//provide interface for css anims

//https://14islands.com/blog/2015/03/13/transitioning-to-web-animations-from-greensock-gsap/?

// TweenLite.to = function(target, duration, vars) {
//  return new TweenLite(target, duration, vars);
// };

// //simple 'timed' task
// P.timed()
//
// //infinite
// P.infinite
//
// //counted
// P.counted()
//
// P.remove()
// P.pause()
// P.stop()
// P.reverse()
//
// var mySeq = P.sequence() //timeline?
// mySeq.then().then().then()
//
// P.watch().until()
//
//
// //utils
// random number
// animate
// find selector
// addClass, removeClass


//var P = (function(arg) {
var P = function(arg) {
  //Private

  //do we need one for each? I don't think so
  var tasksTimed = [],
      tasksInfinite = [],
      tasksCounted = [],
      
      //legacy from when each P would be an object
      currentTaskId = 0,

      //tracking
      isRunning = false,
      intervalID = null,
      _debug = false;


      
      //P()
    //GET ELEMENT
  var el, 
      getEl = function(arg) {
        console.log('elm' + arg)
        return document.querySelectorAll(arg) //class
      };

      //to start
      //should be part of an init?
      if(arg != undefined) { 
        el = getEl(arg) 
      } 

      //P.
  var getNewTaskId = function() {
        return ++currentTaskId;
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
        if(tasksTimed.length == 0 &&
          tasksInfinite.length == 0 &&
          tasksCounted.length == 0) {
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

        tasksTimed.forEach(function(task, index) {
          var myW = task.when;
          if((myW-myT) < 0)
          {
            task.func(task.param);
            tasksTimed[index] = null;
          }
        });

        tasksCounted.forEach(function(task, index) {
          var myW = task.when;
          if((myW-myT) < 0)
          {
            task.func(task.param);
            task.count--;
            if(task.count > 0) {
              var newT = myT + task.interval;
              //if(_debug) console.log(newT);
              task.when = getNewWhen(task.interval);
            } else {
              tasksCounted[index] = null;
            }
          }
        });

        tasksInfinite.forEach(function(task, index) {
          var myW = task.when;
          if((myW-myT) < 0)
          {
            task.func(task.param);
            var newT = myT + task.interval;
            //if(_debug) console.log(newT);
            //task.when = d.getTime() + task.interval;
            task.when = getNewWhen(task.interval);
          }
        });

      },
      cleanList = function() {
        var newArray = [];
        for(var q = 0; q < tasksTimed.length; q++) {
          if(tasksTimed[q] != null) { newArray.push(tasksTimed[q]); }
        }
        tasksTimed = newArray;

        var newCArray = [];
        for(var q = 0; q < tasksCounted.length; q++) {
          if(tasksCounted[q] != null) { newCArray.push(tasksCounted[q]); }
        }
        tasksCounted = newCArray;

        var newIArray = [];
        for(var q = 0; q < tasksInfinite.length; q++) {
          if(tasksInfinite[q] != null) { newIArray.push(tasksInfinite[q]); }
        }
        tasksInfinite = newIArray;
      },
      kill = function(id) {
        tasksTimed.forEach(function(task, index) {
          if(task != null) {
            var myId = task.id;
            if(myId == id)
            {
              tasksTimed[index] = null;
              if(_debug) { console.log('task killed: ' + id) }
            }
          }
        });
        // tasksTimed.forEach(function(task, index) {
        //   if(task != null) {
        //     var myId = task.id;
        //     if(myId == taskToKill.id)
        //     {
        //       tasksTimed[index] = null;
        //     }
        //   }
        // });
        // tasksCounted.forEach(function(task, index) {
        //   var myId = task.id;
        //   if(myId == taskToKill.id)
        //   {
        //     tasksCounted[index] = null;
        //   }
        // });
        // tasksInfinite.forEach(function(task, index) {
        //   if(task != null) {
        //     var myId = task.id;
        //     if(myId == taskToKill.id)
        //     {
        //       tasksInfinite[index] = null;
        //     }
        //   }
        // });
        cleanList();
      },
      getTaskFromId = function(id) {
        return tasksTimed.find(function(t) {
          return t.id == id;
        });
      }

      /// PUBLIC FUNCTIONS

  //Public
  return {

    //P()
    addClass: function(c){ 
      el.forEach(function(element) {
        if (element.classList) 
          element.classList.add(c);
        else
          element.className += ' ' + c;
      });
    },
    removeClass: function(c) {
      if (el.classList)
        el.classList.remove(c);
      else
        el.c = el.c.replace(new RegExp('(^|\\b)' + c.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
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
    },
    /*
    */
    //animate
    //randomNum?

    //need a task prototype

    //P.
    timed: function(w, f, p) {
      //console.log('arg is ' + arg)
      var d = new Date();
      var t = d.getTime();
      var myW = t + w;
      var myId = getNewTaskId();
      tasksTimed.push({id: myId, start: t, when: myW, func: f, param: p });
      if(_debug) console.log("added: " + w + " f: " + f);
      init();
      return myId;
    },
    after: function(id, when, myFunc, myParam) {
      console.log(id)
      var date = new Date(),
          time = date.getTime(),
          myWhen = mywhen = getTaskFromId(id).when + when,
          myId = getNewTaskId();

      tasksTimed.push({id: myId, start: time, when: myWhen, func: myFunc, param: myParam });
      return myId;
    },
    // then: function(w, f, p) {
    //   this.timed(w, f, p, currentTaskId);
    //   return this;
    // },
    infinite: function(w, f, p) {
      var d = new Date();
      var t = d.getTime();
      var myW = t + w;
      var myId = getNewTaskId();
      tasksInfinite.push({id: myId, interval: w, when: myW, func: f, param: p });
      if(_debug) console.log("added Infinite: " + w + " f: " + f);
      init();
      //this.id = myId;
      return this;
    },
    counted: function(w, c, f, p) {
      //error checking for values
      var d = new Date();
      var t = d.getTime();
      var myW = t + w;
      var myId = getNewTaskId();
      tasksCounted.push({id: myId, interval: w, when: myW, count: c, func: f, param: p });
      if(_debug) console.log("added Counted: " + w + " f: " + f + " C: " + c);
      init();
      return myId;
    },
    remove: function (id) {
      if(_debug) console.log("Killing task " + id)
      kill(id);
    },
    waitFor: function(obj, prop, value) {
      console.log("wait for " + obj + " = " + value )
      this.timed(1000, function() {
        if(obj[prop] == value)
          console.log("is " + value)
      })
    }
  }
//}(P || {}));
}

//TRANSLATION
P.timed = function(w, f, p) {
  P().timed(w, f, p);
}
P.after = function(id, w, f, p) {
  P().after(id, w, f, p);
}
P.infinite = function(w, f, p) {
  P().infinite(w, f, p);
}
P.counted = function(w, c, f, p) {
  P().counted(w, c, f, p);
}
P.remove = function(id) {
  P().remove(id);
}
P.waitFor = function(obj, prop, value) {
  P().waitFor(obj, prop, value);
}


