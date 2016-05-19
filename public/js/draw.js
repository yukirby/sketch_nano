'use strict';

$(function () {
  var $canvas = $('canvas');
  var canvas = $canvas[0];
  var width = canvas.width;
  var height = canvas.height;

  var context2d = canvas.getContext('2d');
  var isDrawing = false;

  // 画面を真っ白にする
  context2d.fillStyle = '#FFF';
  context2d.fillRect(0, 0, width, height);
  context2d.strokeStyle = '#DD1281';
  context2d.lineWidth = 10; //初期値
  context2d.lineJoin = 'round'
  context2d.lineCap = 'round'
  context2d.shadowBlur = 3;
  context2d.shadowColor = '#DD1281';


  // マウスを押し始めた時
  $canvas.mousedown(function (e) {
    var x = e.originalEvent.layerX; // 行き先
    var y = e.originalEvent.layerY; // 行き先

    context2d.beginPath();
    context2d.moveTo(x, y);
    isDrawing = true;
  });

  // マウスを動かしているあいだ中
  $canvas.mousemove(function (e) {
    var x = e.originalEvent.layerX; // 行き先
    var y = e.originalEvent.layerY; // 行き先
    if (isDrawing) {
      context2d.lineTo(x, y);
      context2d.stroke();
    }
  });



  // マウスを離した時
  $canvas.mouseup(function (e) {
    isDrawing = false;
  });

  // マウスがキャンバスの外に出た時時
  $canvas.mouseleave(function (e) {
    isDrawing = false;
  });
  //スライダーの線の太さを反映させる
  $('#line').on('input',function()
                {
                    var width = $(this).val();
                    context2d.lineWidth = width;
た                });
//スライダーの線の太さを反映させる
$('#color').on('change',function()
    {
    var color = $(this).val();
    context2d.strokeStyle = color;
    });

  // 保存
  $('button.save').click(function (e) {
    var dataUrl = canvas.toDataURL();
    var title = $('.drawbox input[name=title]').val();
    var adult = $('.drawbox input[id=adult]').prop("checked");

    $.post('/draw', {
      src: dataUrl,
      title: title,
      adult: adult,
    }, function (result) {
      //alert('保存しました');
      // 画面を真っ白にする
      context2d.fillStyle = '#FFF';
      context2d.fillRect(0, 0, width, height);
    });
  });
});

var context = $('canvas')[0].getContext('2d');



document.querySelector('button.submit').addEventListener('click',function clickHandler(e){

    this.removeEventListener('click',clickHandler,false);

    e.preventDefault();
    var self = this;
    setTimeout(function(){
        self.className = 'loading';
    },125);

    setTimeout(function(){
        self.className = 'ready';
    },4300);

    location.href ='/dashboard';


},false);
