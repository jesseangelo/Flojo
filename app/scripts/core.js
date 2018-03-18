

export function FLOJO() {
  

  const APP_VERSION = 4.0;

  const TYPE_TIMED = 1;
  const TYPE_COUNTED = 2;
  const TYPE_INFINITE = 3;

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

  var init = () => {
        if(intervalID === null) {
          intervalID = requestAnimationFrame(update);
          isRunning = true;
        }
      },
      getNewWhen = (interval) => {
        return new Date().getTime() + interval;
      },
      findTime = () => {

        tasks.forEach(function(task, index) {

          if(task === null) { return; }

          if((task.when - new Date().getTime()) < 0)
          {
            task.func(task.param);

            switch(task.type)
            {
              case TYPE_TIMED:      //timed
                tasks[index] = null;
                break;

              case TYPE_COUNTED:    //count
                task.count--;
                if(task.count > 0) {
                  task.when = getNewWhen(task.interval);
                } else {
                  tasks[index] = null;
                }
                break;

              case TYPE_INFINITE:   //infinite
                task.when = getNewWhen(task.interval);
                break;

              default:
                break;

            }
          }
        });
      },
      cleanList = () => {
        var newArray = [];
        for(var q = 0; q < tasks.length; q++) {
          if(tasks[q] != null) { newArray.push(tasks[q]); }
        }
        tasks = newArray;
      },
      kill = (id) => {
        if(tasks.length === 0) { return false; }

        tasks.forEach(function(task, index) {
          if(task != null) {
            if(task.id === id)
            {
              tasks[index] = null;
              if(_debug) { console.log('task killed: ' + id); }
                return true;
            }
          }
        });

        cleanList();
      },
      getTaskFromId = (id) => {
        return tasks.find(function(t) {
          if(t != null) {
            return t.id === id;
          }
        });
      },
      update = () => {

        findTime();

        cleanList();

        if(tasks.length) {
          requestAnimationFrame(update);
        } else {
          intervalID = null;
          currentTaskId = 0;
          isRunning = false;
        }
      },
      getNewTaskId = function() {
        //console.log('currentTaskId: ' + currentTaskId)
        init();
        return currentTaskId++;
      };
      /// PUBLIC FUNCTIONS

  //Public
  return {

    timed: function(when, myFunc, myParam) {
      if(when < 0) { throw new Error('"when" needs to be positive for timed'); }

      var task = new Task(
        getNewTaskId(),               //ID
        TYPE_TIMED,                   //type
        new Date().getTime(),         //start time
        new Date().getTime() + when,  //end time
        myFunc,                       //function
        myParam);                     //parameter

      tasks.push(task);

      if(_debug) { console.log('added timed: ' + when); }

      //console.log('timed Id: ' + myId)
      return task.id;
    },
    after: (id, when, myFunc, myParam) => {
      if(when < 0) { throw new Error('"when" needs to be positive for after'); }

      var myWhen;
      if(getTaskFromId(id) != null) {
        myWhen = getTaskFromId(id).when + when;
      } else {
        myWhen = new Date().getTime() + when;
      }

      var task = new Task(
        getNewTaskId(),
        TYPE_TIMED,
        new Date().getTime(),             //start time
        myWhen,                           //end time
        myFunc,                           //function
        myParam);                         //parameter

      tasks.push(task);

      return task.id;
    },
    // then: function(w, f, p) {
    //   this.timed(w, f, p, currentTaskId);
    //   return this;
    // },

    counted: (when, count, myFunc, myParam) => {
      if(when < 0) { throw new Error('"when" needs to be positive for counted'); }
      if(count < 0) { throw new Error('"count" needs to be positive'); }

      var task = new Counted(
          getNewTaskId(),                 //ID
          TYPE_COUNTED,                   //type
          when,                           //when
          new Date().getTime(),           //start time
          new Date().getTime() + when,    //end time
          count,
          myFunc,                         //function
          myParam);                       //parameter

      tasks.push(task);

      if(_debug) { console.log('added Counted: ' + when + ' f: ' + myFunc + ' C: ' + count); }

      return task.id;
    },

    infinite: (when, myFunc, myParam) => {
      if(when < 0) { throw new Error('"when" needs to be positive for infinite'); }

      var task = new Infinite(
          getNewTaskId(),                 //ID
          TYPE_INFINITE,                  //type
          when,                           //when
          new Date().getTime(),           //start time
          new Date().getTime() + when,    //end time
          myFunc,                         //function
          myParam);                       //parameter

      tasks.push(task);

      if(_debug) { console.log('added Infinite: ' + when + ' f: ' + myFunc); }

      return task.id;
    },
    remove: (id) => {
      if(_debug) { console.log('Killing task ' + id); }
      var dead = kill(id);
      if(dead === false){
        throw new Error('task id: ' + id + ' cannot be found');
      }
    },
    //removeAll
    //pause
    //stop
    //watchElement? MutationObserver
    waitFor: (obj, prop, value, myFunc) => {
      var f = myFunc;
      //console.log("wait for " + obj + " = " + value )
      var k = FLOJO.infinite(1000, function() {
        if(obj[prop] === value) {
          //console.log("is " + value)
          f();
          FLOJO.remove(k);
        }
      });
    }
  };
};