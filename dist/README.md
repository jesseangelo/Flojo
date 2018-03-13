# FLOJO 3.5


FLOJO ("Flo-ho") is a task runner. It will wait and run a task (function) at a time you specify.

There are three types of tasks: timed, infinite, and counted.

```
FLOJO.timed(timeInMS, function())
```
```
FLOJO.infinite(timeInMS, function())
```
```
FLOJO.counted(timeInMS, count, function())
```
Tasks can be run after one another with the after() function. This will run the specified task after the first task has been executed.
```
var taskId = FLOJO.timed(..)
FLOJO.after(taskId, timeInMS, function())
```
And finally, tasks can also be removed from the list. 
```
FLOJO.remove(taskId)
```


## Some examples
### timed(timeInMS, function)
```
FLOJO.timed(2000, function() {
    document.write("You win!!")
});
```
### timed(timeInMS, function, parameter)
You can also reference a function and pass a parameter
```
function displayMessage(msg) {
  console.log(msg);
}

FLOJO.timed(3500, displayMessage, "I <3 JS");
```

### infinite(timeInMS, function, parameter)
```
FLOJO.infinite(3500, function() {
    document.write("Infinite")
});
```

### counted(timeInMS, count, function, parameter)
```
FLOJO.counted(1500, 4, function() {
    document.write("Will run 4 times")
});
```

### after(taskId, timeInMS, function, parameter)
```
var id = FLOJO.timed(2000, function() {
    document.write("You win!!")
});

FLOJO.after(id, 1000, function() {
    document.write("You win again!")
})
```

### remove(id)
```
var k = FLOJO.infinite(3500, function() {
    document.write("Won't write")
});

FLOJO.remove(k);
```

## F()
F() is a helper to provide some commonly used functionality to make your tasks more powerful. It's based on the parts of jQuery used most often for visually manipulating the UI.

### F('#id')
### F('.class')
### .hide()
### .show()
### .remove()
### .addClass()
### .removeClass()
### .hasClass()






