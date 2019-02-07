function anim(duration, offsetStart = 0, startPos = 0) {
    var temp;

    return function(sel) {
        var offset = offsetStart;
        if (window.pageYOffset <= startPos) {
        offset = 2 * offset;
      }
        cancelAnimationFrame(temp);
        var start = performance.now();
        var from = window.pageYOffset || document.documentElement.scrollTop,
        to = document.querySelector(sel).getBoundingClientRect().top - offset;
        requestAnimationFrame(function step(timestamp) {
            var progress = (timestamp - start) / duration;

            1 <= progress && (progress = 1);
            window.scrollTo(0, from + to * progress | 0);
            1 > progress && (temp = requestAnimationFrame(step))
        })
    }
};

function fixOnScroll(navElement, navStartPosition) {
  //var navStartPosition = nav.getBoundingClientRect().top;
  if(window.pageYOffset >= navStartPosition - 2){
    if (!navElement.classList.contains('navigation_fixed')) {
        navElement.classList.add('navigation_fixed');
      }
    }
    else{
      if (navElement.classList.contains('navigation_fixed')) {
         navElement.classList.remove('navigation_fixed');
       }
    }
}



var nav = document.getElementById('nav');
var navTop= nav.getBoundingClientRect().top;
var navOffset = nav.offsetHeight;


window.addEventListener("scroll", function() {
  fixOnScroll(nav, navTop);
})
var scrollMenu = anim(200, navOffset, navTop);



