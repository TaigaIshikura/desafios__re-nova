<!doctype html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title><?php bloginfo( 'name' ); ?></title>
  <meta name="description" content="<?php bloginfo( 'description' ); ?>">
  <meta name="format-detection" content="telephone=no">

  <meta property="og:url" content="<?php echo get_current_link(); ?>">
  <meta property="og:type" content="website">
  <meta property="og:title" content="<?php bloginfo( 'name' ); ?>">
  <meta property="og:description" content="<?php bloginfo( 'description' ); ?>">

  <link rel="icon" href="<?php echo esc_url(get_template_directory_uri()); ?>/assets/img/favicon.png">
  <link rel="apple-touch-icon" sizes="180x180" href="<?php echo esc_url(get_template_directory_uri()); ?>/assets/img/apple-touch-icon.png">

  <!-- css -->
  <link rel="stylesheet" href="<?php echo esc_url(get_template_directory_uri()); ?>/assets/css/base.css">
  <link rel="stylesheet" href="<?php echo esc_url(get_template_directory_uri()); ?>/assets/css/layout.css">
  <link rel="stylesheet" href="<?php echo esc_url(get_template_directory_uri()); ?>/assets/css/module.css">
  <link rel="stylesheet" href="<?php echo esc_url(get_template_directory_uri()); ?>/assets/css/swiper.css">
  <link rel="stylesheet" href="<?php echo esc_url(get_template_directory_uri()); ?>/assets/css/magnific-popup.css">
  <!-- / css -->
  <!-- local css -->
  <link rel="stylesheet" href="<?php echo esc_url(get_template_directory_uri()); ?>/assets/css/top.css">
  <!-- / local css -->
<?php wp_head(); ?>
</head>

<body <?php body_class(); ?> id="<?php if( is_front_page() ) { echo 'top'; } ?>">
  <div id="pageWrap">
    <header class="headerArea js-menuBtnTgt" id="header">
      <div class="headerArea__inr">
        <div class="blks-1">
          <div class="grp">
            <h1 class="grp__logo"><a href="<?php echo esc_url(home_url('/')); ?>"><img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/img/cmn/cmn_logo01.svg" alt="Re.Nova 北山"></a></h1>
            <p class="grp__txt">官民連携事業による公園複合型施設</p>
          </div>
          <div class="menuBtn js-menuBtn">
            <div class="menuBtn__bar"><span></span></div>
          </div>
        </div><!-- / .blks-1 -->
        <div class="blks-2">
          <div class="blks-2__inr">
            <ul class="llist">
              <li class="llist__item"><a href="#about">ABOUT</a></li>
              <li class="llist__item"><a href="#news">NEWS</a></li>
              <li class="llist__item"><a href="#contactus">CONTACT US</a></li>
            </ul>
            <p class="insta"><a href="https://www.instagram.com/re.nova_kitayama" class="insta__ico" target="_blank"></a></p>
          </div>
        </div><!-- / .blks-2 -->
      </div><!-- / .headerArea__inr -->
    </header><!-- / .headerArea -->