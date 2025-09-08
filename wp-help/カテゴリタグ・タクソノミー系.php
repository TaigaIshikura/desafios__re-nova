<?php
  // タクソノミーのリスト呼び出し
  $args = array(
    'orderby'       => 'id', 
    'order'         => 'ASC',
    'hide_empty'    => 1 //空のタームを返さない
  ); 
  $terms = get_terms('タクソノミー名', $args);
  foreach ( $terms as $term ){
    $term_name = $term->name;
    $term_slug = $term->slug;
  ?>
  ここに繰り返す内容
  <?php
  }

  // カテゴリーのリスト呼び出し
  $args = array(
    'orderby'       => 'slug', 
    'order'         => 'ASC',
    'hide_empty'    => 0
  ); 
  $cats = get_categories($args);
  foreach ( $cats as $cat ) {
    $cat_name = $cat->name;
    $cat_slug = $cat->slug;
  ?>
  ここに繰り返す内容
  <?php
  }

  // カレントタームの呼び出し
  $taxonomy = 'taxonomy_name'; 
  $term = get_term_by('slug', get_query_var($taxonomy), $taxonomy); 
  
  // カレントカテゴリの呼び出し
  get_term_by('id', get_query_var('cat'), 'category'); // 現在のページのIDを取得してそこから取得
  // ↑間違いかも、ループ内なら以下で呼び出せる
  get_the_category();

  // 記事に紐づけされたタクソノミーの呼び出し
  if ($terms = get_the_terms($post->ID, 'XXXXX')) { 
  ?> 
  タクソノミーがあった場合ヘッダー 
  <?php 
    foreach ( $terms as $term ) { 
  ?> 
  ここに繰り返す内容 
  <?php 
    } 
  ?> 
  タクソノミーがあった場合フッター 
  <?php 
  } 

?>