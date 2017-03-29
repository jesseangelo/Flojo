# Perezoso 2.0

For they lazy Javascript programmers among us, here's PEREZOSO!

PEREZOSO is a task runner. It will wait and run a task (function) at a time you specify.

There are three types of tasks: timed, infinite, and counted.

```
P.timed(timeInMS, function())
```
```
P.infinite(timeInMS, function())
```
```
P.counted(timeInMS, count, function())
```
Tasks can be run after one another with the after() function. This will run the specified task after the first task has been executed.
```
P.after(taskId, timeInMS, function())
```
And finally, tasks can also be removed.
```
P.after(taskId, timeInMS, function())
```


## Some examples
### timed(timeInMS, function)
```
P.timed(2000, function(){
    document.write("You win!!")
});
```
### timed(timeInMS, function, parameter)
You can also reference a function and pass a parameter
```
function displayMessage(msg) {
  console.log(msg);
}

P.timed(3500, displayMessage, "I <3 JS");
```

### infinite(timeInMS, function, parameter)
```
P.infinite(3500, function(){
    document.write("Infinite")
});
```

### counted(timeInMS, count, function, parameter)
```
P.counted(1500, 4, function(){
    document.write("Will run 4 times")
});
```

### after(taskId, timeInMS, function, parameter)
```
var id = P.timed(2000, function(){
    document.write("You win!!")
});

P.after(id, 1000, function() {
    document.write("You win again!")
})
```

### remove(id)
```
var k = P.infinite(3500, function(){
    document.write("To be removed")
});

P.remove(k);
```
