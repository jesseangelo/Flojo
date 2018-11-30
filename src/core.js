import { TYPE_COUNTED, TYPE_TIMED, TYPE_INFINITE } from './types.js';

export class core {
  constructor() {
    this.tasks = [];
    this.currentTaskId = 0;

    //tracking
    this.isRunning = false;
    this.intervalID = null;
  }

  init() {
    if (this.intervalID === null) {
      this.intervalID = window.requestAnimationFrame(() => {
        this.update();
      });
      this.isRunning = true;
    }
  }

  add(task) {
    this.tasks.push(task);
  }

  remove(taskId) {
    if (this.tasks.length === 0) {
      return false;
    }

    this.tasks.forEach((task, index) => {
      if (task != null) {
        if (task.id === taskId) {
          this.tasks[index] = null;
          this.cleanList();
          if (this._debug) {
            console.log('task killed: ' + taskId);
          }
          return true;
        }
      }
    });
  }

  // set currentTaskId(x) {
  //   this.init();
  //   return this.currentTaskId++;
  // }

  update() {
    this.findTime();

    this.cleanList();
    if (this.tasks.length) {
      window.requestAnimationFrame(() => {
        this.update();
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

  getNewTaskId() {
    this.init();
    return this.currentTaskId++;
  }

  getTaskFromId(id) {
    return this.tasks.find(function(t) {
      if (t != null) {
        return t.id === id;
      }
    });
  }

  findTime() {
    this.tasks.forEach((task, index) => {
      if (task === null) {
        return;
      }

      if (task.when - new Date().getTime() < 0) {
        task.func(task.param);

        switch (task.type) {
          case TYPE_TIMED: //timed
            this.tasks[index] = null;
            //console.log(this.core.tasks[index]);
            break;

          case TYPE_COUNTED: //count
            task.count--;
            if (task.count > 0) {
              task.when = this.getNewWhen(task.interval);
            } else {
              this.tasks[index] = null;
            }
            break;

          case TYPE_INFINITE: //infinite
            task.when = this.getNewWhen(task.interval);
            break;

          default:
            break;
        }
      }
    });
  }

  cleanList() {
    var newArray = [];
    for (var q = 0; q < this.tasks.length; q++) {
      if (this.tasks[q] != null) {
        newArray.push(this.tasks[q]);
      }
    }
    this.tasks = newArray;
  }
}
