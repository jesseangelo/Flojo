import { core } from './core';

describe('Core tests', () => {
  it('should init', () => {
    let c = new core();

    expect(c).toBeTruthy();
  });

  it('should set time on init if not running', () => {
    let c = new core();
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
    let c = new core();
    c.add({});
    expect(c.tasks.length).toEqual(1);
  })

});
