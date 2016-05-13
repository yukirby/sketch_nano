'use strict'

$(function () {
  $('button.like').click(function (e) {
    var $clicked = $(this);
    var dataId   = $clicked.data('id');
    var likes    = $clicked.text();
    $.post(
        "/api/like",
        {'like':dataId},
        function( result ){
          if (result === "ok")
              $clicked.text(parseInt(likes, 10) + 1);
        console.log(result);
      $('body').append('<div class="jpg"><img src="/img/001.png"></div>');
        $('.jpg').delay(500).fadeOut("slow");
      }
    );
  });

});
