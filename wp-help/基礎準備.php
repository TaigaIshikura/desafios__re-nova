<!-- header.php -->
<html <?php language_attributes(); ?>>

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<!-- footer.php -->
  <?php wp_footer(); ?>
</body>

<!-- 各ページヘッダーとフッターの呼び出し -->
<?php get_header(); ?>
<?php get_footer(); ?>

<!-- シングルページに必要なループ -->
<?php if(have_posts()): while(have_posts()): the_post(); ?>
<?php endwhile; endif; ?>