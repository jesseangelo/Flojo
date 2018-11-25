export const TYPE_TIMED = 1;
export const TYPE_COUNTED = 2;
export const TYPE_INFINITE = 3;

export class Task {
  constructor(id, type, start, when, func, param) {
    this.id = id;
    this.type = type;
    this.start = start;
    this.when = when;
    this.func = func;
    this.param = param;
  }
}

export class Counted extends Task {
  constructor(id, type, interval, start, when, count, func, param) {
    super(id, type, start, when, func, param);
    this.interval = interval;
    this.count = count;
  }
}

export class Infinite extends Task {
  constructor(id, type, interval, start, when, func, param) {
    super(id, type, start, when, func, param);
    this.interval = interval;
  }
}
