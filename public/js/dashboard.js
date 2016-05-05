'use strict'

$(function () {
  $('button.like').click(function (e) {
    var $clicked = $(this);
    var dataId   = $clicked.data('id');
    var likes    = $clicked.text();
    $clicked.text(parseInt(likes, 10) + 1);
  });
});
