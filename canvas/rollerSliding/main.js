+function(window){
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
        for( var key in options) {
          if( typeof options[key] == undefined) {
            options[key2] = arg
          }
        }
      }
      return this;
    },
    bindEvent: function(){
      console.log("bindEvent")
    }
  }

  roller.prototype.init.prototype = roller.prototype;
  window.roller = roller;
  
}(window, undefined);
