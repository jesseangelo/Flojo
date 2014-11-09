function displayMessage(msg) {
  console.log(msg);
}

var PEREZOSO = (function() {
  var tasksTimed = [],
      tasksInfinite = [],
      isRunning = false,
      intervalID = null; 
  return {
    add: function(w, f, p) {
      this.addTimed(w, f, p);
    },
    addTimed: function(w, f, p) {
      var d = new Date();
      var t = d.getTime();
      var myW = t + w;
      tasksTimed.push({start: t, when: myW, func: f, param: p });
      //console.log("added: " + w + " f: " + f + " myID: " + o);
      this.init();
    },
    addInfinite: function(w, f, p) {
      var d = new Date();
      var t = d.getTime();
      var myW = t + w;
      tasksInfinite.push({interval: w, when: myW, func: f, param: p });
      //console.log("added Infinite: " + w + " f: " + f);
      this.init();
    },
    update: function() {
      PEREZOSO.findTime();  
      PEREZOSO.cleanList();
    },
    init: function(){
      if(intervalID === null) {
        intervalID = window.setInterval(this.update, 10);
        isRunning = true;
      }
    },
    findTime: function() 
    {
      if(tasksTimed.length) 
      {
        for(var q = 0; q < tasksTimed.length; q++) 
        {
          var d = new Date();
          var myT = d.getTime();
          var myW = tasksTimed[q].when;
          
          if((myW-myT) < 0) 
          {
            tasksTimed[q].func(tasksTimed[q].param);
            tasksTimed[q] = null;
          }
        } 
      }
      if(tasksInfinite.length) 
      {
        for(var q = 0; q < tasksInfinite.length; q++) 
        {
          var d = new Date();
          var myT = d.getTime();
          var myW = tasksInfinite[q].when;
          
          if((myW-myT) < 0) 
          {
            tasksInfinite[q].func(tasksInfinite[q].param);
            var newT = myT + tasksInfinite[q].interval;
            console.log(newT);
            tasksInfinite[q].when = d.getTime() + tasksInfinite[q].interval;
          }
        } 
      }
    },
    cleanList: function() {
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
  }
}(PEREZOSO || {}));

/*
PEREZOSO.addTimed(2000, (function(){ document.write("You win!! <br>")}));
PEREZOSO.add(2500, (function(){ document.write("You win again!! <br>")}));
PEREZOSO.add(3500, displayMessage, "I <3 JS");
PEREZOSO.addInfinite(3500, (function(){ document.write("Infinite! <br>")}));
*/