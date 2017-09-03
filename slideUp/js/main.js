$(function(){
  const elem = $('.wrap');
  let xStart, xEnd, xMt = 0;
  var maxHeight = window.innerHeight;
  var sectionHeight = $('section').outerHeight();
  var minHeight = maxHeight-sectionHeight;
  var placeDistance = 0;
  var target = null
  elem.on('touchstart', function(e){
    xStart = e.changedTouches[0].pageY;
    target = $(e.target).attr('class');
  })
  elem.on('touchmove', function(e){
    xEnd = e.changedTouches[0].pageY;
    distanceIf(xEnd)
  })
  elem.on('touchend', function(e){
    xEnd = e.changedTouches[0].pageY;
    distanceIf(xEnd,'end')
  })

  function distanceIf (disY, tags) {
    xEnd = disY;
    const xdiff = xStart - xEnd;
    if(xdiff>0){ // 向上滑 
      if(placeDistance == minHeight) {
        return false
      }
      const ratio = (xdiff/sectionHeight)*100;
      console.log(ratio)
      if(tags){
        if(ratio<50) {
          placeDistance = 0;
          $('.index').animate({height: '100%'}, '300ms');
          return false;
        }
      }
      if(ratio<36) {
        placeDistance = ratio;
        $('.index').height((100 - ratio)+'%');
      }
      else {
        placeDistance = minHeight;
        $('.index').animate({height: minHeight}, '300ms');
      }
    }else if(target && target == 'index' ||  placeDistance){
      if(Math.abs(xdiff)>150) {
        placeDistance = 0;
        $('.index').animate({height: '100%'}, '300ms');
      }
    }
  }
})