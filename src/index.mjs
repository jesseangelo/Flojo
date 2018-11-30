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
    return this.APP_VERSION
  }

  remove(id) {
    this.core.remove(id);
  }

  timed (when, myFunc, myParam) {
    if(when < 0) { throw new Error('"when" needs to be positive for timed'); }

    var task = new Task(
      this.core.getNewTaskId(),          //ID
      TYPE_TIMED,                   //type
      new Date().getTime(),         //start time
      new Date().getTime() + when,  //end time
      myFunc,                       //function
      myParam);                     //parameter

    this.core.add(task);

    if(this._debug) { console.log('added timed: ' + when); }

    return task.id;
  }

  //what if the parent is another infinite
  after(id, when, myFunc, myParam) {
    if(when < 0) { throw new Error('"when" needs to be positive for after'); }

    var myWhen;
    if(this.core.getTaskFromId(id) != null) {
      myWhen = this.core.getTaskFromId(id).when + when;
    } else {
      myWhen = new Date().getTime() + when;
    }

    var task = new Task(
      this.core.getNewTaskId(),
      TYPE_TIMED,
      new Date().getTime(),             //start time
      myWhen,                           //end time
      myFunc,                           //function
      myParam);                         //parameter

    this.core.add(task);

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
        this.core.getNewTaskId(),                 //ID
        TYPE_COUNTED,                   //type
        when,                           //when
        new Date().getTime(),           //start time
        new Date().getTime() + when,    //end time
        count,
        myFunc,                         //function
        myParam);                       //parameter

      this.core.add(task);

    if(this._debug) { console.log('added Counted: ' + when + ' f: ' + myFunc + ' C: ' + count); }

    return task.id;
  }

  infinite(when, myFunc, myParam) {
    if(when < 0) { throw new Error('"when" needs to be positive for infinite'); }

    var task = new Infinite(
        this.core.getNewTaskId(),                 //ID
        TYPE_INFINITE,                  //type
        when,                           //when
        new Date().getTime(),           //start time
        new Date().getTime() + when,    //end time
        myFunc,                         //function
        myParam);                       //parameter

        this.core.add(task);

    if(this._debug) { console.log('added Infinite: ' + when + ' f: ' + myFunc); }

    return task.id;
  }

  //removeAll
  //pause
  //stop
  //watchElement? MutationObserver
  //this isn't quite right
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
}

export let flojo = new FLOJO();
