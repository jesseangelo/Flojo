import { TYPE_TIMED, TYPE_COUNTED, TYPE_INFINITE, Counted, Infinite, Task } from './types';

describe('Type tests', () => {
    it('should make a Task', () => {
        const id = 0;
        const type = TYPE_TIMED;
        const start = 100;
        const when = 200;
        const func = (() => {});
        const param = {};
        let t = new Task(id, type, start, when, func, param);

        expect(t.id).toEqual(id);
        expect(t.type).toEqual(TYPE_TIMED);
        expect(t.start).toEqual(start);
        expect(t.when).toEqual(when);
        expect(t.func).toEqual(func);
        expect(t.param).toEqual(param);
    });

    it('should make a Counted task', () => {
        const id = 1;
        const type = TYPE_COUNTED;
        const int = 1000;
        const start = 100;
        const when = 200;
        const count = 10;
        const func = (() => {});
        const param = {};
        let c = new Counted(id, type, int, start, when, count, func, param);

        expect(c.id).toEqual(id);
        expect(c.type).toEqual(TYPE_COUNTED);
        expect(c.interval).toEqual(int);
        expect(c.start).toEqual(start);
        expect(c.when).toEqual(when);
        expect(c.count).toEqual(count);
        expect(c.func).toEqual(func);
        expect(c.param).toEqual(param);
    });

    it('should make an Infinite task', () => {
        const id = 2;
        const type = TYPE_INFINITE;
        const int = 1000;
        const start = 100;
        const when = 200;
        const func = (() => {});
        const param = {};
        let c = new Infinite(id, type, int, start, when, func, param);

        expect(c.id).toEqual(id);
        expect(c.type).toEqual(TYPE_INFINITE);
        expect(c.start).toEqual(start);
        expect(c.when).toEqual(when);
        expect(c.func).toEqual(func);
        expect(c.param).toEqual(param);
    })
});
