'use strict';

$(function () {
    var $canvas   = $('canvas');
    var context2d = $canvas[0].getContext('2d');
    var isDrawing = false;

    // 画面を真っ白にする
    context2d.fillStyle = '#FFF';

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

    // 保存
    $('button.save').click(function (e) {
        var dataUrl = $canvas[0].toDataURL();

        $.post('/save', {
            img: encodeURIComponent(dataurl)
        }, function (result) {
            alert('保存しました！');
            // 画面を真っ白にする
            context2d.fillStyle = '#FFF';
        });
    });
});
