import { core } from './core';

describe('Core tests', () => {
  it('should init', () => {
    let c = new core();

    expect(c).toBeTruthy();
  });
});
