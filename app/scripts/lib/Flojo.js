// FLOJO
// pronounced flo-ho



var FLOJO = (function() {
  //Private

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
    //need a task prototype

    timed: function(w, f, p) {
      var d = new Date();
      var t = d.getTime();
      var myW = t + w;
      var myId = getNewTaskId();

      tasks.push({
        type: 1,
        id: myId,
        start: t, 
        when: myW, 
        func: f, 
        param: p 
      });

      if(_debug) console.log("added: " + w + " f: " + f);
      

      //console.log('timed Id: ' + myId)
      return myId;

    },
    after: function(id, when, myFunc, myParam) {
      //console.log(id)
      var date = new Date(),
          time = date.getTime(),
          myWhen = getTaskFromId(id).when + when,
          myId = getNewTaskId();

      tasks.push({
        type: 1,
        id: myId, 
        start: time, 
        when: myWhen, 
        func: myFunc, 
        param: myParam 
      });
      
      return myId;
    },
    // then: function(w, f, p) {
    //   this.timed(w, f, p, currentTaskId);
    //   return this;
    // },

    counted: function(w, c, f, p) {
      //error checking for values
      var d = new Date();
      var t = d.getTime();
      var myW = t + w;
      var myId = getNewTaskId();

      tasks.push({
        type: 2,
        id: myId, 
        interval: w, 
        when: myW, 
        count: c, 
        func: f, 
        param: p 
      });
      
      if(_debug) console.log("added Counted: " + w + " f: " + f + " C: " + c);
      
      return myId;
    },

    infinite: function(w, f, p) {
      var d = new Date();
      var t = d.getTime();
      var myW = t + w;
      var myId = getNewTaskId();
      
      tasks.push({
        type: 3,
        id: myId, 
        interval: w, 
        when: myW, 
        func: f, 
        param: p 
      });
      
      if(_debug) console.log("added Infinite: " + w + " f: " + f);
      
      //this.id = myId;
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
//}

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
