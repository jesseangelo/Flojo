import { APP_VERSION, flojo } from './index.mjs';
import {addTextToBody} from './utils.mjs';

addTextToBody('Modules are pretty cool. ');

console.log("hello from singleton! version:" + flojo.APP_VERSION);

flojo.timed(1000, () => {
  console.log('IT FREAKING WORKS')
})
