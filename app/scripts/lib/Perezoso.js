var PEREZOSO = (function() {
  
  //Private
  var tasksTimed = [],
      tasksInfinite = [],
      isRunning = false,
      intervalID = null,
      _debug = false,
      init = function() {
        if(intervalID === null) {
          intervalID = window.setInterval(update, 10);
          isRunning = true;
        }
      },
      update = function() {
        findTime();
        cleanList();
      },    
      findTime = function()
      {
        var d = new Date();
        var myT = d.getTime();

        if(tasksTimed.length)
        {        
          tasksTimed.forEach(function(task, index) {
            var myW = task.when;

            if((myW-myT) < 0)
            {
              task.func(task.param);
              tasksTimed[index] = null;
            }
          });      
        }

        if(tasksInfinite.length)
        {
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
        }
      },
      cleanList = function() {
        var newArray = [];
         for(var q = 0; q < tasksTimed.length; q++) {
            if(tasksTimed[q] != null) { newArray.push(tasksTimed[q]); }
         }
         tasksTimed = newArray;
         if(newArray.length == 0 && tasksInfinite.length == 0) {
            clearInterval(intervalID);
            intervalID = null;
         }
      }
    
  //Public
  return {
    add: function(w, f, p) {
      this.addTimed(w, f, p);
      return "hello";
    },
    addTimed: function(w, f, p) {
      var d = new Date();
      var t = d.getTime();
      var myW = t + w;
      tasksTimed.push({start: t, when: myW, func: f, param: p });
      if(_debug) console.log("added: " + w + " f: " + f);
      init();
    },
    addInfinite: function(w, f, p) {
      var d = new Date();
      var t = d.getTime();
      var myW = t + w;
      tasksInfinite.push({interval: w, when: myW, func: f, param: p });
      if(_debug) console.log("added Infinite: " + w + " f: " + f);
      init();
    }
  }
}(PEREZOSO || {}));
