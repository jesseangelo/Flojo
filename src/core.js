import {
  TYPE_COUNTED,
  TYPE_TIMED,
  TYPE_INFINITE
} from './types.js';

export class core {
  constructor() {
    this.tasks = [];
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
    this.tasks.forEach((task, index) => {

      if(task === null) { return; }

      if((task.when - new Date().getTime()) < 0)
      {
        task.func(task.param);

        switch(task.type)
        {
          case TYPE_TIMED:      //timed
            this.tasks[index] = null;
            //console.log(this.core.tasks[index]);
            break;

          case TYPE_COUNTED:    //count
            task.count--;
            if(task.count > 0) {
              task.when = this.getNewWhen(task.interval);
            } else {
              this.tasks[index] = null;
            }
            break;

          case TYPE_INFINITE:   //infinite
            task.when = this.getNewWhen(task.interval)
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



}
