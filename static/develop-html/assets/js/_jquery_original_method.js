// 基本型
(function($){

$.fn.methodName = function(){
    let $this = this;
};

$('.text').methodName();

})(jQuery);

// matchMedia
// ***********************************************
let mediaQuery = window.matchMedia('(max-width: 768px)')

if ( mediaQuery.matches ) {
  
}

// modal
// ***********************************************
(function(){
  let $modalBtn = $('.js-modalBtn');
  let $modalTgt = $('.js-modalTgt');
  let $modalShadow = $('.js-modalShadow');
  let $modalClose = $('.js-modalClose');
  let $modalBox = $('.js-modalTgt .box')
  
  $modalTgt.each(function(){
    if ( $(this).attr('data-modal-width') ) {
      $(this).find('.box').css('max-width', $(this).attr('data-modal-width')+'px');
    }
  });

  $modalBtn.on('click', function(){
    let selectModal = $(this).attr('data-modal-index');
    $modalTgt.each(function(){
      if ( $(this).attr('data-modal-index') == selectModal ) {
        $(this).addClass('is-active');
        $body.addClass('is-fixed');
      } else {
        $(this).removeClass('is-active');
      }
    });
  });
  $modalClose.on('click', function(){
    $('.js-modalTgt').removeClass('is-active');
    $body.removeClass('is-fixed');
  });
  $(window).on('load resize', function(){
    $modalShadow.each(function(){
      let thisModalBox = $(this).parents('.js-modalTgt').find($modalBox);
      let modalHeight = thisModalBox.outerHeight() + (thisModalBox.position().top *2);
      let winHeight = $win.height();
      if ( winHeight > modalHeight  ) {
        $(this).css('height', '100%');
      } else {
        $(this).css('height', modalHeight);
      }
    })
  });
}());

// modal2 簡易Ver
// ***********************************************
$win.on('load',function() {
  let $modalBtn = $('.js-modalBtn');
  let $modalTgt = $('.js-modalTgt');
  let $modalClose = $('.js-modalClose');
  let $modalShadow = $('.js-modalShadow');
  let position = 0;

  $modalBtn.on('click', function(){
    let selectModal = $(this).attr('data-modal-index');
    $modalTgt.each(function(){
      if ( $(this).attr('data-modal-index') == selectModal ) {
        let mediaQuery = window.matchMedia('(max-width: 767px)')
        if (mediaQuery.matches) {
          position = $win.scrollTop() + 50;
          $(this).css('top', position );
        } else {
          let winHeight = $win.height();
          let thisHeight = $(this).height();
          if ( winHeight > thisHeight ) {
            position = $win.scrollTop() + ($win.height() / 2) - ( $(this).height() / 2 );
          } else {
            position = $win.scrollTop() + 50;
          }
          $(this).css('top', position );
        }
        
        $(this).addClass('is-active');
        $modalShadow.addClass('is-active');
      } else {
        $(this).removeClass('is-active');
      }
    });
  });
  $modalClose.on('click', function(){
    $modalTgt.removeClass('is-active');
    $modalShadow.removeClass('is-active');
  });
  $modalShadow.on('click', function(){
    $(this).removeClass('is-active');
    $modalTgt.removeClass('is-active');
  });
});