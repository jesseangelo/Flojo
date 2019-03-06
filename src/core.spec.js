import { core } from './core';

describe('Core tests', () => {
  let c;

  beforeEach(() => {
    c = new core();
  });

  it('should init', () => {
    expect(c).toBeTruthy();
  });

  it('should set time on init if not running', () => {
    let updateSpy = spyOn(c, "update");
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());

    expect(c.isRunning).toEqual(false);

    c.init();

    expect(c.isRunning).toEqual(true);
    // jest.useFakeTimers()
    // jest.advanceTimersByTime(250);

    // expect(updateSpy).toHaveBeenCalled();
  });

  it('should add a task to the array of tasks', () => {
    c.add({});
    expect(c.tasks.length).toEqual(1);
  })

  it('should remove a task from the list', () => {
    const taskID = c.add({});
    expect(c.tasks.length).toEqual(1);
    c.remove(taskID);
    expect(c.tasks.length).toEqual(0);
  });

  it('should update', () => {
    // c.tasks.push({});
    // c.init();
    // expect(c.update).toBeCalledTimes(2)    
  })

  it('should get a new when', () => {
    const curr = new Date().getTime();
    const time = c.getNewWhen(2000);
    expect(time).toBeGreaterThan(curr);
  })

  it('should get new sequential taskids', () => {
    const tid = c.getNewTaskId();
    expect(tid).toEqual(0);
    const tid1 = c.getNewTaskId();
    expect(tid1).toEqual(1);
  })

  it('should get a task from id', () => {
    c.tasks.push({id: 0}, {id: 1});
    const myTask = c.getTaskFromId(0);
    expect(myTask).toEqual({id: 0})
  })

  it('should find time', () => {

  })

  it('should clean the list', () => {
    c.tasks.push(null, {})
    expect(c.tasks.length).toEqual(2);
    c.cleanList();
    expect(c.tasks.length).toEqual(1);
  })

});
