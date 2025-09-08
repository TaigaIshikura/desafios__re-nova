// ***********************************************
// slick setting (sample)
// ***********************************************
$('.slider').slick({
  arrows: false,
  autoplay: true,
  autoplaySpeed: 1000,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  fade: true,
  infinite: true, //スライドの無限ループの有効化
  asNavFor: '.js-slider-thumb',
  responsive:[
    {
      breakpoint:1024, // 1024px以下のサイズ
      settings: {
        slidesToShow:1
      }
    },
    {
      breakpoint:769, // 768px以下のサイズ
      settings: {
        slidesToShow:1
      }
    }
  ]
});

$('.js-slider-thumb').slick({
  accessibility: true, //タブと矢印キーのナビゲーションの有効化
  autoplay: true,
  speed: 1000,
  arrows: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.js-slider',
  focusOnSelect: true,
});

// ベルトコンベア
$(function(){
  $('.js-slider').slick({
    autoplay: true, // 自動でスクロール
    autoplaySpeed: 0, // 自動再生のスライド切り替えまでの時間を設定
    speed: 5000, // スライドが流れる速度を設定
    cssEase: "linear", // スライドの流れ方を等速に設定
    slidesToShow: 4, // 表示するスライドの数
    swipe: false, // 操作による切り替えはさせない
    arrows: false, // 矢印非表示
    pauseOnFocus: false, // スライダーをフォーカスした時にスライドを停止させるか
    pauseOnHover: false, // スライダーにマウスホバーした時にスライドを停止させるか
    responsive: [
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 3, // 画面幅750px以下でスライド3枚表示
        }
      }
    ]
  });
});