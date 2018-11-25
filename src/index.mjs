// FLOJO
// pronounced 'flo-ho'

// Singleton Module
// https://stackoverflow.com/questions/32647215/declaring-static-constants-in-es6-classes
import { Task, Counted, Infinite,
  TYPE_COUNTED, TYPE_TIMED, TYPE_INFINITE } from './types.js';

export const APP_VERSION = 4.0;


export class FLOJO {

  constructor() {

    //yolo.hello();
    console.log('flojo constructor ')
    //private
    this.tasks = [];
    this.currentTaskId = 0;

      //tracking
    this.isRunning = false;
    this.intervalID = null;
    this._debug = false;
    this.init();
  }

  static get APP_VERSION() {
    return APP_VERSION
  }

  init() {
    if(this.intervalID === null) {
      this.intervalID = window.requestAnimationFrame(() => {
        this.update()
      });
      this.isRunning = true;
    }
  }

  update() {
    this.findTime();

    this.cleanList();
    if(this.tasks.length) {
      window.requestAnimationFrame(() => {
        this.update()
      });
    } else {
      this.intervalID = null;
      this.currentTaskId = 0;
      this.isRunning = false;
    }
  }

  getNewWhen(interval) {
    // new DATE might be problematic depending on browser
    return new Date().getTime() + interval;
  }

  findTime() {

    this.tasks.forEach(function(task, index) {

      if(task === null) { return; }

      if((task.when - new Date().getTime()) < 0)
      {
        task.func(task.param);

        switch(task.type)
        {
          case TYPE_TIMED:      //timed
            console.log('fonud a timed')
            flojo.tasks[index] = null;
            //this.tasks[index] = null;
            //console.log(this.tasks[index]);
            break;

          case TYPE_COUNTED:    //count
            task.count--;
            if(task.count > 0) {
              task.when = getNewWhen(task.interval);
            } else {
              this.tasks[index] = null;
            }
            break;

          case TYPE_INFINITE:   //infinite
            task.when = getNewWhen(task.interval);
            break;

          default:
            break;

        }
      }
    });
  }

  cleanList() {
    var newArray = [];
    for(var q = 0; q < this.tasks.length; q++) {
      if(this.tasks[q] != null) { newArray.push(this.tasks[q]); }
    }
    this.tasks = newArray;
  }

  kill(id) {
    if(this.tasks.length === 0) { return false; }

    this.tasks.forEach(function(task, index) {
      if(task != null) {
        if(task.id === id)
        {
          this.tasks[index] = null;
          if(this._debug) { console.log('task killed: ' + id); }
            return true;
        }
      }
    });

    cleanList();
  }

  getTaskFromId(id) {
    return this.tasks.find(function(t) {
      if(t != null) {
        return t.id === id;
      }
    });
  }

  getNewTaskId() {
    //console.log('currentTaskId: ' + currentTaskId)
    this.init();
    return this.currentTaskId++;
  }

  timed(when, myFunc, myParam) {
    if(when < 0) { throw new Error('"when" needs to be positive for timed'); }

    let task = new Task(
      this.getNewTaskId(),               //ID
      TYPE_TIMED,                   //types aren't working right now? enum?
      new Date().getTime(),         //start time
      new Date().getTime() + when,  //end time
      myFunc,                       //function
      myParam);                     //parameter

    this.tasks.push(task);

    if(this._debug) { console.log('added timed: ' + when); }

    console.log('timed Id: ' + myId)
    return task.id;
  }


  timed (when, myFunc, myParam) {
    if(when < 0) { throw new Error('"when" needs to be positive for timed'); }

    var task = new Task(
      this.getNewTaskId(),               //ID
      TYPE_TIMED,                   //type
      new Date().getTime(),         //start time
      new Date().getTime() + when,  //end time
      myFunc,                       //function
      myParam);                     //parameter

    this.tasks.push(task);

    if(this._debug) { console.log('added timed: ' + when); }

    //console.log('timed Id: ' + myId)
    return task.id;
  }

  after(id, when, myFunc, myParam) {
    if(when < 0) { throw new Error('"when" needs to be positive for after'); }

    var myWhen;
    if(this.getTaskFromId(id) != null) {
      myWhen = getTaskFromId(id).when + when;
    } else {
      myWhen = new Date().getTime() + when;
    }

    var task = new Task(
      this.getNewTaskId(),
      TYPE_TIMED,
      new Date().getTime(),             //start time
      myWhen,                           //end time
      myFunc,                           //function
      myParam);                         //parameter

    this.tasks.push(task);

    return task.id;
  }

  // then: function(w, f, p) {
  //   this.timed(w, f, p, currentTaskId);
  //   return this;
  // },

  counted(when, count, myFunc, myParam) {
    if(when < 0) { throw new Error('"when" needs to be positive for counted'); }
    if(count < 0) { throw new Error('"count" needs to be positive'); }

    var task = new Counted(
        getNewTaskId(),                 //ID
        TYPE_COUNTED,                   //type
        when,                           //when
        new Date().getTime(),           //start time
        new Date().getTime() + when,    //end time
        count,
        myFunc,                         //function
        myParam);                       //parameter

    tasks.push(task);

    if(this._debug) { console.log('added Counted: ' + when + ' f: ' + myFunc + ' C: ' + count); }

    return task.id;
  }

  infinite(when, myFunc, myParam) {
    if(when < 0) { throw new Error('"when" needs to be positive for infinite'); }

    var task = new Infinite(
        getNewTaskId(),                 //ID
        TYPE_INFINITE,                  //type
        when,                           //when
        new Date().getTime(),           //start time
        new Date().getTime() + when,    //end time
        myFunc,                         //function
        myParam);                       //parameter

    tasks.push(task);

    if(this._debug) { console.log('added Infinite: ' + when + ' f: ' + myFunc); }

    return task.id;
  }

  //removeAll
  //pause
  //stop
  //watchElement? MutationObserver
  waitFor(obj, prop, value, myFunc) {
    var f = myFunc;
    //console.log("wait for " + obj + " = " + value )
    var k = FLOJO.infinite(1000, function() {
      if(obj[prop] === value) {
        //console.log("is " + value)
        f();
        FLOJO.remove(k);
      }
    });
  }


  remove(id) {
    if(this._debug) { console.log('Killing task ' + id); }
    var dead = kill(id);
    if(dead === false){
      throw new Error('task id: ' + id + ' cannot be found');
    }
  }
}

export let flojo = new FLOJO();
