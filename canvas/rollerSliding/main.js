(function(window){
  var vw = document.body.clientWidth/100,
    bodyFont = 100 / vw,
    radiusBase = 7.12 * bodyFont * vw;
  var argOptions = {
    radius: radiusBase,
    bgcolor: '#fcfcfc',
    forecolor: 'rgba(95, 203, 253, 1)',
    btnRadius:0.18  * bodyFont * vw,
    lineWidth: 5
  }
  var roller = function(canvasID, options) {
    return new roller.prototype.init(canvasID, options)
  }

  roller.prototype = {
    init: function(canvasID, options) {
      var that = this;
      var len = arguments.length;
      if ( typeof this.canvas == 'undefined') {
        var canvas = document.getElementById(canvasID);
        if(canvas === null){
          console.error("Canvas is null.Check the canvasID");
          return;
        }
        this.canvas = canvas;
      }
      if (typeof arguments[1] !== 'undefined') {
        for( var key in argOptions) {
          if(key === 'radius' && options[key] ) {
            options[key] = (options[key] / 100) * bodyFont * vw; // 将用户传递的值进行转换
          }
          if( typeof options[key] == undefined) {
            options[key] = argOptions[key]
          }
        }
        this.options = options;
      }else {
        this.options = argOptions;
      }
      this.ctx = this.canvas.getContext('2d');
      this.W = this.canvas.parentNode.offsetWidth,
      this.H = this.canvas.parentNode.offsetHeight;
      this.canvas.setAttribute('width', this.W );
      this.canvas.setAttribute('height', this.H );


      return this;
    },
    bindEvent: function(){
      console.log("bindEvent")
    }
  }

  roller.prototype.init.prototype = roller.prototype;
  window.roller = roller;
  
})(window, undefined);
