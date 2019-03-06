import { APP_VERSION, flojo } from './index.mjs';
import { addTextToBody } from './utils.mjs';

addTextToBody('Modules are pretty cool. ');

console.log('hello from singleton! version:' + flojo.APP_VERSION);

let t = flojo.timed(1, () => {
  console.log('IT FREAKING WORKS');
});

flojo.after(t, .250, () => {
  console.log('after no sweat');
});

let i = flojo.infinite(1.500, () => {
  console.log('infinite');
});

let c = 0;
flojo.counted(1.200, 5, () => {
  console.log('counting to 5 ' + c++);
  if (c == 5) {
    flojo.remove(i);
  }
});
