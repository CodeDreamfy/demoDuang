(function(window){
  var vw = document.body.clientWidth/100,
    bodyFont = 100 / vw,
    radiusBase = 7.12 * bodyFont * vw;
  var argOptions = {
    radius: radiusBase,
    bgcolor: '#fcfcfc',
    forecolor: 'rgba(95, 203, 253, 1)',
    btnRadius:0.18  * bodyFont * vw,
    lineWidth: 5,
    btnColor: '#fff',
    btnShadow: "rgba(95, 203, 253, 0.5)",
    radiansStart: -(Math.PI/180)*210,
    radiansEnd: -(Math.PI/180)*330,
    processLength: 11,
    processMin: 19,
    callBackBefore: null,
    callBackActive: null,
    callBackAfter: null,
  }
  var roller = function(canvasID, options) {
    return new roller.prototype._init(canvasID, options)
  }

  // 绘制bg
  function radiansBg () {
    if (!this.imgPath) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.options.bgcolor;
      this.ctx.lineWidth = this.options.lineWidth;
      this.ctx.arc(0, 0, this.options.radius, this.options.radiansStart, this.options.radiansEnd, true);
      this.ctx.stroke();
      this._resetCenter();
      this.imgPath = this.ctx.getImageData(0, 0, this.W, this.H);
      this.ctx.restore();
    } else {
      this.ctx.save();
      this._resetCenter();
      this.ctx.putImageData(this.imgPath, 0, 0);
      this.ctx.restore();
    }
  }

  // 绘制进度条
  function radians (x, y) {
    var arg1 = 0, arg2 = this.options.radius;
    if (arguments.length >= 2 ) {
      arg1 = x; arg2 = y;
    }
    this.ctx.save();
    this.ctx.beginPath();
    var lineargradient = this.ctx.createLinearGradient(-this.W/2, -this.radiansY, arg1, arg2);
    lineargradient.addColorStop(0, this.options.bgcolor);
    lineargradient.addColorStop(1, this.options.forecolor);
    lineargradient.addColorStop(1, this.options.bgcolor);
    this.ctx.strokeStyle = lineargradient;
    this.ctx.lineWidth = this.options.lineWidth;
    this.ctx.arc(0, 0, this.options.radius, this.options.radiansStart, this.options.radiansEnd, true);
    this.ctx.stroke();
    this.ctx.restore();
  }

  // 绘制按钮
  function roundBtn (x, y) {
    var arg1 = 0, arg2 = this.options.radius;
    if (arguments.length >= 2 ) {
      arg1 = x; arg2 = y;
    }
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = this.options.btnColor;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.shadowBlur = 6;
    this.ctx.shadowColor = this.options.btnShadow;
    this.ctx.arc(arg1, arg2, this.options.btnRadius, 0, 2*Math.PI);
    this.ctx.fill();
    this.ctx.restore();
  }


  roller.prototype = {
    _init: function(canvasID, options) {
      var option = options;
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
          if(option[key] && key === 'radius') {
            option[key] = (option[key] / 100) * bodyFont * vw; // 将用户传递的值进行转换
          }
          if(!options[key]) {
            option[key] = argOptions[key]
          }
        }
        this.options = option;
      }else {
        this.options = argOptions;
      }
      this.ctx = this.canvas.getContext('2d');
      this.parentNode = this.canvas.parentNode;
      this.W = this.parentNode.offsetWidth,
      this.H = this.parentNode.offsetHeight;
      this.canvas.setAttribute('width', this.W );
      this.canvas.setAttribute('height', this.H );
      this.radiansY = ( this.H - this.options.btnRadius - 2 ) - this.options.radius;
      this._setCenter(); // center tranlsate
      
      // 初始化
      radiansBg.call(this);
      radians.call(this);
      roundBtn.call(this);
      this._bindEvent();
      this._boundary(0);
      return this;
    },
    _bindEvent: function(){
      var that = this;
      this.canvas.addEventListener('touchstart', function (e){
        that.options.callBackBefore && that.options.callBackBefore.call(that);
        that._bindCallBack(e)
      })
      this.canvas.addEventListener('touchmove', function(e){
        that.options.callBackAction && that.options.callBackAction.call(that);
        that._bindCallBack(e)
      })
      this.canvas.addEventListener('touchend', function(e){
        that.options.callBackAfter && that.options.callBackAfter.call(that);
        that._bindCallBack(e)
      })
    },
    _unBindEvent: function () {
      this.canvas.removeEventListener('touchstart');
      this.canvas.removeEventListener('touchmove');
      this.canvas.removeEventListener('touchend');
    },
    _bindCallBack: function(e) {
      this._clearCanvas();
      var x = -this.W/2 + e.changedTouches[0].clientX - this.parentNode.offsetLeft;
      x = this._boundary(x);
      var y = this._disstanceY(x);
      radians.call(this, x, y);
      roundBtn.call(this, x, y);
    },
    _setCenter: function () {
      this.ctx.translate(this.W/2, this.radiansY); 
    },
    _resetCenter: function () {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    },
    _clearCanvas: function (cb) {
      this.ctx.save();
      this._resetCenter();
      this.ctx.clearRect(0,0, this.W, this.H);
      radiansBg.call(this)
      !!cb && cb();
      this.ctx.restore();
    },
    _disstanceY: function (x) {
      return Math.sqrt(Math.pow(this.options.radius, 2) - Math.pow(x, 2));
    },
    _boundary: function (x) {
      var min = -this.W/2 + this.options.btnRadius,
          max = this.W/2 - this.options.btnRadius,
          result;

      if ( x <= min ) {
        result = min
      } else if (x >= max ) {
        result = max;
      } else {
        result = x;
      }
      this.process = Math.round((result-min)/(max-min) * this.options.processLength) + this.options.processMin;
      // console.log((this.process-this.options.processMin) / this.options.processLength * (max-min) + min )
      return result;
    }
  }

  roller.prototype._init.prototype = roller.prototype;
  window.roller = roller;
  
})(window, undefined);
