function displayMessage(msg) {
  console.log(msg);
}

var Perezoso = (function() {
  var tasks = [],
  intervalID = null; 
  return {
    add: function(w, f, p) {
      var self = this;
      var d = new Date();
      var t = d.getTime();
      var myW = t + w;
      //document.write("INIT: Now is: " + t + " waiting for: " + myW + "....\n\n");
      tasks.push({start: t, when: myW, func: f, param: p, infinite: false});
      //console.log("added: " + w + " f: " + f + " myID: " + o);
      this.init();
    },
    update: function() {
      Perezoso.findTime();  
      Perezoso.cleanList();
    },
    init: function(){
      if(intervalID === null) {
        intervalID = window.setInterval(this.update, 100);
      }
    },
    findTime: function() {
      if(tasks.length) {
        for(var q = 0; q < tasks.length; q++) {
          var d = new Date();
          var myT = d.getTime();
          var myW = tasks[q].when;
          
          if((myW-myT) < 0) {
            tasks[q].func(tasks[q].param);
            if(tasks[q].infinite) {
              //Perezoso.add(2000, true, (function(){ document.write("You win!! <br>")}));
              //tasks.push({start: t, when: myW, func: f, param: p, infinite: i});
              //
            } else {
              tasks[q] = null;
            }
          }
        } 
      }
    },
    cleanList: function() {
      var newArray = [];
       for(var q = 0; q < tasks.length; q++) {
          if(tasks[q] != null) { newArray.push(tasks[q]); }
       }
       tasks = newArray;
       if(newArray.length == 0) {
          clearInterval(intervalID);
          intervalID = null;
       }
    }
  }
})();

/*
Perezoso.add(2000, (function(){ document.write("You win!! <br>")}));
Perezoso.add(2500, (function(){ document.write("You win again!! <br>")}));
Perezoso.add(3500, displayMessage, "I <3 JS");
*/