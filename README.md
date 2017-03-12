Perezoso
========

For they lazy Javascript programmers among us, here's PEREZOSO!

There are two main wait to run a task; timed and infinite.

PEREZOSO.addTimed(timeInMS, function())

PEREZOSO.addInfinite(timeInMS, function())



PEREZOSO.addTimed(2000, (function(){ document.write("You win!! <br>")}));
PEREZOSO.add(2500, (function(){ document.write("You win again!! <br>")}));
PEREZOSO.add(3500, displayMessage, "I <3 JS");
PEREZOSO.addInfinite(3500, (function(){ document.write("Infinite! <br>")}));
