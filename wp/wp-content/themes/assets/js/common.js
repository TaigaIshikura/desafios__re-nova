let $win = $(window),
    $body = $('body');

let mq = function() {
  if ( window.matchMedia('(max-width: 768px)').matches ) {
    return true;
  } else {
    return false;
  }
}

// objectFit
// ***********************************************
objectFitImages();

// headerScroll
// ***********************************************
$win.on("scroll", function(){
  $header = $('.headerArea');
	$header.css("left", -$(window).scrollLeft());
});

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

// accordion
// ***********************************************
(function(){
  $accordionBtn = $('.js-accBtn');
  $accordionBtn.on('click', function(){
    $(this).toggleClass('is-active');
    $(this).next('.js-accTgt').slideToggle();
  });
}());

// accordion2
// ***********************************************
(function(){
  $('.js-acc2Btn').on('click', function(){
    $accNum = $(this).attr('data-acc-num');
    $('.js-acc2Tgt[data-acc-num=' + $accNum + ']').slideToggle('fast');
    $(this).toggleClass('is-active');
  });
}());

// tab
// ***********************************************
(function(){
  $tabBtn = $('.js-tabBtn');
  $tabTgt = $('.js-tabTgt');
  $tabBtn.on('click', function(){
    let tabGroup = $(this).attr('data-tab-group');
    let selectTab = $(this).attr('data-tab-index');
    $tabBtn.each(function(){
      if ( $(this).attr('data-tab-group') == tabGroup ) {
        $(this).removeClass('is-active');
        if ( $(this).attr('data-tab-index') == selectTab ) {
          $(this).addClass('is-active');
        }
      }
    });
    $tabTgt.each(function(){
      if ( $(this).attr('data-tab-group') == tabGroup ) {
        $(this).removeClass('is-active');
        if ( $(this).attr('data-tab-index') == selectTab ) {
          $(this).addClass('is-active');
        }
      }
    });
  });
}());

// pageTop
// ***********************************************
(function(){
  let $pagetop = $('.js-pagetop');
    $pagetop.on('click',function(){
    $('html,body').animate({scrollTop:'0'},500);
  });
}());

// pageTop2
// ***********************************************
(function(){
  let $pagetop = $('.js-pagetop');
  let scrollTop = 0;
  $win.on('scroll', function() {
    setTimeout(function() {
      scrollTop = $win.scrollTop();
      if (0 < scrollTop) {
        $pagetop.addClass('is-active');
      } else {
        $pagetop.removeClass('is-active');
      }
    }, 100);
  });
  $pagetop.on('click',function(){
    $('html,body').animate({scrollTop:'0'},500);
  });
}());

// toTop
// ***********************************************
(function(){
  var $toTop = $('.js-toTop');
  var showPosition = 0;
  $win.on('scroll', function(){
    setTimeout( function(){
      $toTop.each(function(){
        showPosition = $(this).offset().top - ($win.height() * .67);
        if ( $win.scrollTop() > showPosition ) {
          $(this).addClass('is-toTop-show');
        }
      });
    }, 100);
  });
}());

//txtCut
// ***********************************************
(function(){
  $.fn.txtCut = function(txtMaxLength){
    this.each(function(elm){
      let txt = $(this).text();
      let txtLength = txt.length;
      let cuttedTxt;
      if (txtLength > txtMaxLength) {
        cuttedTxt = txt.substr(0, txtMaxLength) + '...';
        $(this).text(cuttedTxt);
      }
    });
  };
}());

// autoHeight
// ***********************************************
$(function() {
  function autoHeight() {
    let tgtGroups = [];
    $('.js-autoHeight').each(function(){
      let tgtGroup = $(this).attr('data-ah-group');
      if ( tgtGroups.indexOf(tgtGroup) < 0 ) {
        let tgtGroupItems = $('[data-ah-group='+tgtGroup+']');
        let maxHeight = 0;
        let tgtHeight = 0;
        tgtGroupItems.each(function(){
          $(this).css('height','auto');
          tgtHeight = $(this).height();
          if( tgtHeight > maxHeight ){
              maxHeight = tgtHeight;
          }
          tgtGroupItems.css('height', maxHeight);
        });
      }
    });
  }
  $win.on('load resize', function(){
    if ( $('.js-autoHeight').length> 0 ) {
      autoHeight();
    }
  });
});