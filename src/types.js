class Task {
  constructor(id, type, start, when, func, param) {
    this.id = id;
    this.type = type;
    this.start = start;
    this.when = when;
    this.func = func;
    this.param = param;
  }
}

class Counted extends Task {
  constructor(id, type, interval, start, when, count, func, param) {
    super(id, type, start, when, func, param);
    this.interval = interval;
    this.count = count;
  }
}

class Infinite extends Task {
  constructor(id, type, interval, start, when, func, param) {
    super(id, type, start, when, func, param);
    this.interval = interval;
  }
}
