"use strict";var FLOJO=function(){var a=[],b=[],c=[],d=0,e=!1,f=null,g=!0,h=function(){return console.log("currentTaskId: "+d),d++},i=function(){null===f&&(f=window.setInterval(j,10),e=!0)},j=function(){l(),m(),0==a.length&&0==b.length&&0==c.length&&(clearInterval(f),f=null)},k=function(b){return(new Date).getTime()+b},l=function(){var e=new Date,f=e.getTime();a.forEach(function(b,c){b.when-f<0&&(b.func(b.param),a[c]=null)}),c.forEach(function(a,b){a.when-f<0&&(a.func(a.param),--a.count>0?(a.interval,a.when=k(a.interval)):c[b]=null)}),b.forEach(function(a,b){a.when-f<0&&(a.func(a.param),a.interval,a.when=k(a.interval))})},m=function(){for(var e=[],f=0;f<a.length;f++)null!=a[f]&&e.push(a[f]);a=e;for(var g=[],f=0;f<c.length;f++)null!=c[f]&&g.push(c[f]);c=g;for(var h=[],f=0;f<b.length;f++)null!=b[f]&&h.push(b[f]);b=h},n=function(c){a.forEach(function(b,d){if(null!=b){b.id==c&&(a[d]=null,g&&console.log("task killed: "+c))}}),m()},o=function(c){return a.find(function(a){return a.id==c})};return{timed:function(c,d,e){var f=new Date,j=f.getTime(),k=j+c,l=h();return a.push({id:l,start:j,when:k,func:d,param:e}),g&&console.log("added: "+c+" f: "+d),i(),console.log("timed Id: "+l),l},after:function(c,d,e,f){var g=new Date,i=g.getTime(),j=o(c).when+d,k=h();return a.push({id:k,start:i,when:j,func:e,param:f}),k},infinite:function(c,d,e){var f=new Date,j=f.getTime(),k=j+c,l=h();return b.push({id:l,interval:c,when:k,func:d,param:e}),g&&console.log("added Infinite: "+c+" f: "+d),i(),this},counted:function(b,d,e,f){var j=new Date,k=j.getTime(),l=k+b,m=h();return c.push({id:m,interval:b,when:l,count:d,func:e,param:f}),g&&console.log("added Counted: "+b+" f: "+e+" C: "+d),i(),m},remove:function(b){g&&console.log("Killing task "+b),n(b)},waitFor:function(b,c,d,e){var f=e;this.infinite(1e3,function(){b[c]==d&&f()})}}}(),F=function(b){var c=[];return c=document.querySelectorAll(b),{addClass:function(b){c.forEach(function(a){a.classList?a.classList.add(b):a.className+=" "+b})},removeClass:function(b){c.forEach(function(a){a.classList?a.classList.remove(b):a.classList=a.classList.replace(new RegExp("(^|\\b)"+b.split(" ").join("|")+"(\\b|$)","gi")," ")})},hide:function(){el.style.display="none"},show:function(){el.style.display=""},remove:function(){el.parentNode.removeChild(el)},hasClass:function(b){el.classList?el.classList.contains(b):new RegExp("(^| )"+b+"( |$)","gi").test(el.c)}}};