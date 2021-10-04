/* blueEyesb.onclick = function() {
      let start = Date.now();

      let timer = setInterval(function() {
        let timePassed = Date.now() - start;

        train.style.left = timePassed / 5 + 'px';

        if (timePassed > 2000) clearInterval(timer);

      }, 20);
    } */

var object = document.getElementById('blueEyesb');

object.onclick=function(){
  var x = Math.floor(Math.random()*300);
  var y = Math.floor(Math.random()*300);
  object.style.top = x + 'px';
  object.style.left = y + 'px';
};