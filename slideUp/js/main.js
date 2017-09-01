$(function(){
  console.log("sasasa");
  const elem = $('.wrap');
  let xStart, xEnd, xMt = 0;
  var maxHeight = window.innerHeight;
  var gb = (420/maxHeight)*100;
  elem.on('touchstart', function(e){
    xStart = e.changedTouches[0].pageY;
  })
  elem.on('touchmove', function(e){
    xEnd = e.changedTouches[0].pageY;
    const cha = xStart-xEnd;
    if(xEnd<xStart && cha>130 && xMt<=gb ) {
      const h = 100 - cha/maxHeight*100;
      $('.index').height(h+'%');
      xMt = cha/maxHeight*100;
    }else {

    }
  })
  elem.on('touchend', function(e){
    xEnd = e.changedTouches[0].pageY;
    const cha = xStart-xEnd;
    if(xEnd<xStart && cha>130 && xMt<=gb ) {
      const h = 100 - cha/maxHeight*100;
      $('.index').height(gb+'%');
      xMt = cha/maxHeight*100
    }
  })

  function distanceIf (disY) {
    xEnd = disY;
    const xdiff = xStart - xEnd;
    if(xdiff>0){ // 向上滑
      if(xMt<=gb){

      }
    }else { // 向下滑

    }
  }
})