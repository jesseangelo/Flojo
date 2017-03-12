# Perezoso 1.0
========

For they lazy Javascript programmers among us, here's PEREZOSO!

There are two main wait to run a task; timed and infinite.

```
PEREZOSO.addTimed(timeInMS, function())
```
```
PEREZOSO.addInfinite(timeInMS, function())
```

## Some examples
### addTimed(timeInMS, function)
```
PEREZOSO.addTimed(2000, (function(){
    document.write("You win!!")
}));
```
### addTimed(timeInMS, function, parameter)
You can also reference a function and pass a parameter
```
function displayMessage(msg) {
  console.log(msg);
}

PEREZOSO.addTimed(3500, displayMessage, "I <3 JS");
```

### addInfinite(timeInMS, function, parameter)
```
PEREZOSO.addInfinite(3500, (function(){
    document.write("Infinite")
}));
```
