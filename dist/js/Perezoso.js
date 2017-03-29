"use strict";

var P = function () {

  //Private
  var tasksTimed = [],
      tasksInfinite = [],
      tasksCounted = [],
      currentTaskId = 0,
      isRunning = false,
      intervalID = null,
      _debug = false,
      getNewTaskId = function getNewTaskId() {
    return ++currentTaskId;
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
    if (tasksTimed.length == 0 && tasksInfinite.length == 0 && tasksCounted.length == 0) {
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

    tasksTimed.forEach(function (task, index) {
      var myW = task.when;
      if (myW - myT < 0) {
        task.func(task.param);
        tasksTimed[index] = null;
      }
    });

    tasksCounted.forEach(function (task, index) {
      var myW = task.when;
      if (myW - myT < 0) {
        task.func(task.param);
        task.count--;
        if (task.count > 0) {
          var newT = myT + task.interval;
          //if(_debug) console.log(newT);
          task.when = getNewWhen(task.interval);
        } else {
          tasksCounted[index] = null;
        }
      }
    });

    tasksInfinite.forEach(function (task, index) {
      var myW = task.when;
      if (myW - myT < 0) {
        task.func(task.param);
        var newT = myT + task.interval;
        //if(_debug) console.log(newT);
        //task.when = d.getTime() + task.interval;
        task.when = getNewWhen(task.interval);
      }
    });
  },
      cleanList = function cleanList() {
    var newArray = [];
    for (var q = 0; q < tasksTimed.length; q++) {
      if (tasksTimed[q] != null) {
        newArray.push(tasksTimed[q]);
      }
    }
    tasksTimed = newArray;

    var newCArray = [];
    for (var q = 0; q < tasksCounted.length; q++) {
      if (tasksCounted[q] != null) {
        newCArray.push(tasksCounted[q]);
      }
    }
    tasksCounted = newCArray;

    var newIArray = [];
    for (var q = 0; q < tasksInfinite.length; q++) {
      if (tasksInfinite[q] != null) {
        newIArray.push(tasksInfinite[q]);
      }
    }
    tasksInfinite = newIArray;
  },
      kill = function kill(id) {
    tasksTimed.forEach(function (task, index) {
      if (task != null) {
        if (task.id == id) {
          tasksTimed[index] = null;
          //if(_debug) { console.log('task killed: ' + id) }
        }
      }
    });
    tasksTimed.forEach(function (task, index) {
      if (task != null) {
        if (task.id == id) {
          tasksTimed[index] = null;
        }
      }
    });
    tasksCounted.forEach(function (task, index) {
      var myId = task.id;
      if (task.id == id) {
        tasksCounted[index] = null;
      }
    });
    tasksInfinite.forEach(function (task, index) {
      if (task != null) {
        if (task.id == id) {
          tasksInfinite[index] = null;
        }
      }
    });
    cleanList();
  },
      getTaskFromId = function getTaskFromId(id) {
    return tasksTimed.find(function (t) {
      return t.id == id;
    });
  };

  //Public
  return {
    //Creates a simple task that runs at 'when' ms in the future
    timed: function timed(when, func, param) {
      var date = new Date(),
          time = date.getTime(),
          myWhen = time + when,
          myId = getNewTaskId();

      tasksTimed.push({ id: myId, start: time, when: myWhen, func: func, param: param });
      if (_debug) console.log("added: " + w + " f: " + f);
      init();
      return myId;
    },

    //Creates a simple task that runs some ms after a the specified task specified by id
    after: function after(id, when, func, param) {
      var date = new Date(),
          time = date.getTime(),
          myWhen = getTaskFromId(id).when + when,
          myId = getNewTaskId();

      tasksTimed.push({ id: myId, start: time, when: myWhen, func: func, param: param });
      return myId;
    },

    //Create a task that runs forever at an interval
    infinite: function infinite(when, func, param) {
      var date = new Date(),
          time = date.getTime(),
          myWhen = time + when,
          myId = getNewTaskId();

      tasksInfinite.push({ id: myId, interval: when, when: myWhen, func: func, param: param });
      if (_debug) console.log("added Infinite: " + w + " f: " + f);
      init();
      return myId;
    },

    //Creates a task that runs a specified number of times at an interval
    counted: function counted(when, count, func, param) {
      //error checking for values
      var date = new Date(),
          time = date.getTime(),
          myWhen = time + when,
          myId = getNewTaskId();

      tasksCounted.push({ id: myId, interval: when, when: myWhen, count: count, func: func, param: param });
      if (_debug) console.log("added Counted: " + w + " f: " + f + " C: " + c);
      init();
      return myId;
    },

    remove: function remove(id) {
      if (_debug) console.log("Killing task " + id);
      kill(id);
    }

  };
}(P || {});