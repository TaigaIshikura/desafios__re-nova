<?php 
  $args = array( 
    'posts_per_page'   => 10, 
    'orderby'          => 'date', 
    'order'            => 'DESC', 
    'post_type'        => 'post', 
    'post_status'      => 'publish', 
    'tax_query' => array( 
      array( 
        'taxonomy' => 'タクソノミー名', 
        'field' => 'slug', 
        'terms'    => '指定のターム' 
      ) 
    ) 
  ); 
  $the_query = new WP_Query( $args ); 
  if ( $the_query->have_posts() ){ 
?> 
該当記事がある場合のヘッダー 
<?php 
  while ( $the_query->have_posts() ) { 
  $the_query->the_post(); 
?> 
該当記事がある場合のループ内容 
<?php 
} 
wp_reset_postdata(); 
?> 
該当記事がある場合のフッター 
<?php 
} else { 
?> 
該当記事がない場合の内容 
<?php 
} 
?>