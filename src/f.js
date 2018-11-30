//F functions
// var F = function(arg) {
//   var el,
//   getEls = function(arg) {
//     //console.log('what: ' + arg.indexOf('#'))

//     //need to be able to mix and match these
//     if(arg.indexOf('#') !== -1) {
//       return [document.getElementById(arg.substr(1))];
//     } else if(arg.indexOf('.') !== -1) {
//       return document.querySelectorAll(arg);
//     } else {
//       return document.getElementsByTagName(arg);
//     }
//   };

//   return {
//     addClass: function(c) {
//       var els = getEls(arg);
//       //els.forEach(function(element) {
//       for(var k = 0; k < els.length; k++) {
//         var element = els[k];
//         if (element.classList) {
//           element.classList.add(c);
//         } else {
//           element.className += ' ' + c;
//         }
//       }
//       //});
//     },
//     removeClass: function(c) {
//       var els = getEls(arg);
//       //els.forEach(function(element) {
//       for(var k = 0; k < els.length; k++) {
//         var element = els[k];
//         if (element.classList) {
//           element.classList.remove(c);
//         } else {
//           element.classList = element.classList.replace(new RegExp('(^|\\b)' + c.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
//         }
//       //});
//       }
//     },
//     hide: function() {
//       el.style.display = 'none';
//     },
//     show: function() {
//       el.style.display = '';
//     },
//     remove: function() {
//       el.parentNode.removeChild(el);
//     },
//     hasClass: function(c) {
//       if (el.classList) {
//         el.classList.contains(c);
//       } else {
//         new RegExp('(^| )' + c + '( |$)', 'gi').test(el.c);
//       }
//     },

//     opacity: function(o) {
//       var els = getEls(arg);
//       els.forEach(function(element) {
//         element.style.opacity = o;
//       });
//     },
//     fadeOut: function(time) {
//       var els = getEls(arg);
//       var loops = Math.round(time / 60);

//       //this still needs work for sure
//       for(var k = 0; k < loops; k++) {
//         FLOJO.timed(100, function(){
//           console.log('k ' + (k / loops));
//           //els.forEach(function(element) {
//           //  element.style.opacity = k/loops;
//           //});
//         });
//       }
//     },
//     fadeIn: function(time) {
//       let t = time;
//     }
//     //to give programmtic control that which doesn't have it
//     //color
//     //each
//     //animate
//     //randomNum?
//   };

// };
