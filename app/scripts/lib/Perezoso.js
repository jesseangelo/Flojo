var PEREZOSO = (function() {

  //Private
  var tasksTimed = [],
      tasksInfinite = [],
      currentTaskId = 0,
      isRunning = false,
      intervalID = null,
      _debug = false,
      getNewTaskId = function() {
        return currentTaskId++;
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
        if(tasksTimed.length == 0 && tasksInfinite.length == 0) {
          clearInterval(intervalID);
          intervalID = null;
        }
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

        tasksInfinite.forEach(function(task, index) {
          var myW = task.when;
          if((myW-myT) < 0)
          {
            task.func(task.param);
            var newT = myT + task.interval;
            //if(_debug) console.log(newT);
            task.when = d.getTime() + task.interval;
          }
        });

      },
      cleanList = function() {
        var newArray = [];
        for(var q = 0; q < tasksTimed.length; q++) {
          if(tasksTimed[q] != null) { newArray.push(tasksTimed[q]); }
        }
        tasksTimed = newArray;

        var newIArray = [];
        for(var q = 0; q < tasksInfinite.length; q++) {
          if(tasksInfinite[q] != null) { newIArray.push(tasksInfinite[q]); }
        }
        tasksInfinite = newIArray;
      },
      kill = function(id) {
        tasksTimed.forEach(function(task, index) {
          var myId = task.id;
          if(myId == id)
          {
            tasksTimed[index] = null;
          }
        });
        tasksInfinite.forEach(function(task, index) {
          var myId = task.id;
          if(myId == id)
          {
            tasksInfinite[index] = null;
          }
        });
        cleanList();
      }

  //Public
  return {
    addTimed: function(w, f, p) {
      var d = new Date();
      var t = d.getTime();
      var myW = t + w;
      var myId = getNewTaskId();
      tasksTimed.push({id: myId, start: t, when: myW, func: f, param: p });
      if(_debug) console.log("added: " + w + " f: " + f);
      init();
      return myId;
    },
    addInfinite: function(w, f, p) {
      var d = new Date();
      var t = d.getTime();
      var myW = t + w;
      var myId = getNewTaskId();
      tasksInfinite.push({id: myId, interval: w, when: myW, func: f, param: p });
      if(_debug) console.log("added Infinite: " + w + " f: " + f);
      init();
      return myId;
    },
    addCounted: function() {
      throw "Not Implemented"
    },
    removeTask: function (id) {
      if(_debug) console.log("Killing task " + id)
      kill(id);
    }
  }
}(PEREZOSO || {}));
