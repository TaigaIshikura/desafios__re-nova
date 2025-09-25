    <footer class="footerArea" id="footer">
      <div class="footerArea__inr">
        <div class="blks-1">
          <div class="grp">
            <p class="logo"><a href="<?php echo esc_url(home_url('/')); ?>"><img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/img/cmn/cmn_logo01_w.svg" alt="Re.Nova 北山"></a></p>
            <ul class="llist">
              <li class="llist__item"><a href="#about">ABOUT</a></li>
              <li class="llist__item"><a href="#news">NEWS</a></li>
              <li class="llist__item"><a href="#contactus">CONTACT US</a></li>
              <li class="llist__item"><a href="https://www.instagram.com/re.nova_kitayama" class="_insta" target="_blank"></a></li>
            </ul>
          </div>
          <div class="grp-2">
            <p class="logo-2"><a href="https://www.regrand.jp/" target="_blank"><img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/img/cmn/cmn_logo02.png" alt="日本リグランド株式会社"></a></p>
            <ul class="llist-2">
              <li class="llist-2__item"><a href="https://www.regrand.jp/about/profile" target="_blank">会社概要</a></li>
              <li class="llist-2__item"><a href="https://www.regrand.jp/policy" target="_blank">プライバシーポリシー</a></li>
            </ul>
          </div>
        </div><!-- / .blks-1 -->
        <p class="copyright"><small>&copy; 2025 Japan Re-ground Corporation</small></p>
      </div><!-- / .footerArea__inr -->
    </footer><!-- / .footerArea -->
  </div><!-- / #pageWrap -->
  <!-- js -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/js/swiper.js"></script>
  <script src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/js/jquery.magnific-popup.min.js"></script>
  <script src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/js/common.js"></script>
  <!-- / js -->
  <!-- local js -->
  <script>
    let aslider;
    let eslider;
    $(function() {
      aslider = new Swiper('.js-aslider', {
        speed: 1000,
        pagination: {
          el: '.js-asliderPagination',
          clickable: true
        },
        navigation: {
          nextEl: '.js-asliderNext',
          prevEl: '.js-asliderPrev',
        },
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 0,
        effect: 'fade',
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        }
      });
      eslider = new Swiper('.js-eslider', {
        speed: 1000,
        pagination: {
          el: '.js-esliderPagination',
          clickable: true
        },
        navigation: {
          nextEl: '.js-esliderNext',
          prevEl: '.js-esliderPrev',
        },
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 0,
        effect: 'fade',
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        }
      });
    });
  </script>
  <!-- / local js -->
<?php wp_footer(); ?>
</body>

</html>