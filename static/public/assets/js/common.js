let $win = $(window),
    $body = $('body');

let mq = function() {
  if ( window.matchMedia('(max-width: 768px)').matches ) {
    return true;
  } else {
    return false;
  }
}

// headerHeight
// ***********************************************
(function(){
  let $header = $('.headerArea'),
      $contents = $('.contentsArea')
      $anchor = $('.anchor'),
      headerHeight = 0;

  $win.on('load resize', function(){
    headerHeight = $header.outerHeight();
    $contents.css('padding-top', headerHeight);
    $anchor.css('padding-top', headerHeight);
    $anchor.css('margin-top', -headerHeight);
  });

}());

// menuBtn
// ***********************************************
(function(){
  let $menuBtn = $('.js-menuBtn');
  let $menuBtnTgt = $('.js-menuBtnTgt');
  $menuBtn.on('click', function(){
    $(this).toggleClass('is-active');
    $body.toggleClass('is-menuOpen');
    $menuBtnTgt.toggleClass('is-active');
  });
}());

// smoothScroll
// ***********************************************
(function(){
  $('a[href^="#"]').on('click',function() {
    let speed = 400;
    let href= $(this).attr("href");
    let target = $(href == "#" || href == "" ? 'html' : href);
    let position = target.offset().top;
    $('body,html').stop().animate({scrollTop:position}, speed, 'swing');
    return false;
  });
}());

// magnificPopup
// ***********************************************
$('.js-youtube').magnificPopup({
    type: 'iframe'
});

// contact form
// ***********************************************
document.addEventListener('DOMContentLoaded', function () {
  const forms = document.querySelectorAll('.wpcf7');

  forms.forEach(function (form) {
    form.addEventListener('wpcf7invalid', function (e) {
      setTimeout(function () {
        const element = document.querySelector('#contactform');
        const scrollAmount = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: scrollAmount,
          behavior: 'smooth'
        });
      }, 300);
    }, false);
  });
});