import { APP_VERSION, flojo } from './index.mjs';
import {addTextToBody} from './utils.mjs';

addTextToBody('Modules are pretty cool. ');

console.log("hello from singleton! version:" + flojo.APP_VERSION);

flojo.timed(1000, () => {
  console.log('IT FREAKING WORKS')
})


flojo.infinite(1500, () => {
  console.log('infinite')
})

flojo.counted(1200, 5, () => {
  console.log('counting to 5')
})
