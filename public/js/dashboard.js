'use strict'

$(function () {
  $('button.like').click(function (e) {
    var $clicked = $(this);
    var dataId   = $clicked.data('id');
    var likes    = $clicked.text();

    $.get('/api/like', {
      id: dataId
    }, function (result) {
      $clicked.text(result.likes);
    });
  });
});
