# Perezoso 3.0


PEREZOSO is a task runner. It will wait and run a task (function) at a time you specify.

There are three types of tasks: timed, infinite, and counted.

```
PEREZOSO.timed(timeInMS, function())
```
```
PEREZOSO.infinite(timeInMS, function())
```
```
PEREZOSO.counted(timeInMS, count, function())
```
Tasks can be run after one another with the after() function. This will run the specified task after the first task has been executed.
```
PEREZOSO.after(taskId, timeInMS, function())
```
And finally, tasks can also be removed.
```
PEREZOSO.remove(taskId)
```


## Some examples
### timed(timeInMS, function)
```
PEREZOSO.timed(2000, function(){
    document.write("You win!!")
});
```
### timed(timeInMS, function, parameter)
You can also reference a function and pass a parameter
```
function displayMessage(msg) {
  console.log(msg);
}

PEREZOSO.timed(3500, displayMessage, "I <3 JS");
```

### infinite(timeInMS, function, parameter)
```
PEREZOSO.infinite(3500, function(){
    document.write("Infinite")
});
```

### counted(timeInMS, count, function, parameter)
```
PEREZOSO.counted(1500, 4, function(){
    document.write("Will run 4 times")
});
```

### after(taskId, timeInMS, function, parameter)
```
var id = PEREZOSO.timed(2000, function(){
    document.write("You win!!")
});

PEREZOSO.after(id, 1000, function() {
    document.write("You win again!")
})
```

### remove(id)
```
var k = PEREZOSO.infinite(3500, function(){
    document.write("Won't write")
});

PEREZOSO.remove(k);
```