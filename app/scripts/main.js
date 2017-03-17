

/*
var k1 = PEREZOSO.addTimed(2000, function(){ document.write("You win!! <br>")});
var k = PEREZOSO.addTimed(2500, function(){ document.write("You win again!! <br>")});
console.log(k1);
console.log(k);
PEREZOSO.removeTask(k1);

var inf = PEREZOSO.addInfinite(3500, function(){ document.write("Infinite! <br>")});
PEREZOSO.addTimed(15000, function (){
  PEREZOSO.removeTask(inf)
})
*/
//PEREZOSO.addCounted();

//Random number 0 - 6
//Math.floor(Math.random() * 6) + 0

//box transform demo 1

PEREZOSO.addInfinite(1400, function() {
	var boxTransform = document.querySelector(".box-transform .box");
	boxTransform.style.height = Math.floor(Math.random() * 150) + 40 + "px";
	boxTransform.style.width = Math.floor(Math.random() * 150) + 40 + "px";
})
