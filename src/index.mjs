// FLOJO
// pronounced 'flo-ho'

// Singleton Module
// https://stackoverflow.com/questions/32647215/declaring-static-constants-in-es6-classes
import { Task, Counted, Infinite,
  TYPE_COUNTED, TYPE_TIMED, TYPE_INFINITE } from './types.js';
import { core } from './core.js';


export const APP_VERSION = 4.0;

export class FLOJO {

  constructor() {
    this.core = new core();
    this._debug = false;
  }

  static get APP_VERSION() {
    return APP_VERSION
  }

  kill(id) {
    if(this.core.tasks.length === 0) { return false; }

    this.core.tasks.forEach(function(task, index) {
      if(task != null) {
        if(task.id === id)
        {
          this.core.tasks[index] = null;
          if(this._debug) { console.log('task killed: ' + id); }
            return true;
        }
      }
    });

    cleanList();
  }

  getTaskFromId(id) {
    return this.core.tasks.find(function(t) {
      if(t != null) {
        return t.id === id;
      }
    });
  }

  getNewTaskId() {
    //console.log('currentTaskId: ' + currentTaskId)
    //call init in setter
    this.core.init();
    return this.core.currentTaskId++;
    //return this.core.currentTaskId(1);
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

    //this.core.tasks.push(task);
    this.core.tasks.push(task);

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

    this.core.tasks.push(task);

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
        this.getNewTaskId(),                 //ID
        TYPE_COUNTED,                   //type
        when,                           //when
        new Date().getTime(),           //start time
        new Date().getTime() + when,    //end time
        count,
        myFunc,                         //function
        myParam);                       //parameter

    this.core.tasks.push(task);

    if(this._debug) { console.log('added Counted: ' + when + ' f: ' + myFunc + ' C: ' + count); }

    return task.id;
  }

  infinite(when, myFunc, myParam) {
    if(when < 0) { throw new Error('"when" needs to be positive for infinite'); }

    var task = new Infinite(
        this.getNewTaskId(),                 //ID
        TYPE_INFINITE,                  //type
        when,                           //when
        new Date().getTime(),           //start time
        new Date().getTime() + when,    //end time
        myFunc,                         //function
        myParam);                       //parameter

    this.core.tasks.push(task);

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
