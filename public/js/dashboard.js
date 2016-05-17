'use strict'

$(function () {
  $('button.like').click(function (e) {
    var $clicked = $(this);
    var dataId   = $clicked.data('id');
    var likes    = $clicked.text();
  $(this).parent().find(".hert_button").addClass("animated rubberBand");
  setTimeout(function(){
    console.log("hogehoge");
    $clicked.parent().find(".hert_button").removeClass("animated rubberBand");
  },1200)



    $.post(
        "/api/like",
        {'like':dataId},
        function( result ){
          if (result === "ok")
              $clicked.text(parseInt(likes, 10) + 1);
        console.log(result);


      }
    );
  });

});


//$('body').append('<div class="jpg"><img src="/img/001.png"></div>');
  //$('.jpg').delay(500).fadeOut("slow");
