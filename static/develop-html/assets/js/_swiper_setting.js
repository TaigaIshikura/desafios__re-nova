// ***********************************************
// swiper setting (sample)
// ***********************************************
var swiper;
$(window).on('load',function() {
  swiper = new Swiper('.js-slider', {
    speed: 1000,
    pagination: {
      el: '.js-slider-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.js-slider-next',
      prevEl: '.js-slider-prev',
    },
    loop: true,
    slidesPerView: 'auto',
    spaceBetween:0,
    effect: 'fade',
    autoplay: {
      delay: 2000,
      disableOnInteraction: false, //ユーザーがスライダーを操作したあと、自動再生が止まるかどうか。
    },
    thumbs: {
      swiper: sliderThumbnail
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
        spaceBetween: 10
      }
    }
  });
});

var sliderThumbnail = new Swiper('.js-slider-thumb', {
  slidesPerView: 1,
  loop: true,
  freeMode: true, // スワイプした際、スライドぴったりで止まらなくなる
  watchSlidesVisibility: true, // watchSlidesProgressを使用する際に必要
  watchSlidesProgress: true, // 画面に表示されているスライドに「swiper-slide-visible」クラスを追加
  allowTouchMove: false, // タッチ・クリックでのスワイプを許可するか
  loopAdditionalSlides: 2, // スライドをループする際に作成しておくクローンの数
  speed: 1000,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false, //ユーザーがスライダーを操作したあと、自動再生が止まるかどうか。
  },
});