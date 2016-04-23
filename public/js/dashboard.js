'use strict';

$(function () {
    // いいねする
    $('button.like').click(function (e) {
        var $clicked = $(this);
        var dataId   = $clicked.data('id');
        var likes    = $clicked.text();

        $.get('/like', {
            id: dataId
        }, function (result) {
            $clicked.text(result.likes);
        });
    });
});
