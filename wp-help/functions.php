<?php
  /* ************************
  基本形
  ************************ */
  // アイキャッチの設定
  add_theme_support('post-thumbnails');

  //リダイレクト処理
  add_action( 'template_redirect', 'my_redirect', 1);
  function my_redirect() {
      if (
          is_attachment() ||
          is_singular('')
        ) {
          wp_safe_redirect( home_url() );
          exit;
      }
  }

  // メニューを非表示 
  function remove_menus () {
    global $menu;
    remove_menu_page( 'edit.php' ); //投稿メニュー
  }
  add_action('admin_menu', 'remove_menus');

  // カテゴリ・タグの非表示
  function my_unregister_taxonomies() {
    global $wp_taxonomies;

    if (!empty($wp_taxonomies['category']->object_type)) {
        foreach ($wp_taxonomies['category']->object_type as $i => $object_type) {
            if ($object_type == 'post') {
                unset($wp_taxonomies['category']->object_type[$i]);
            }
        }
    }
    if (!empty($wp_taxonomies['post_tag']->object_type)) {
        foreach ($wp_taxonomies['post_tag']->object_type as $i => $object_type) {
            if ($object_type == 'post') {
                unset($wp_taxonomies['post_tag']->object_type[$i]);
            }
        }
    }
    return true;
  }
  add_action('init', 'my_unregister_taxonomies');

  // 文言変更
  function change_default_title( $title ) {
    $screen = get_current_screen();
    if ( $screen->post_type == 'post' ) {
          $title = '変更後の文言';
    }elseif ( $screen->post_type == '' ) {
          $title = '';
    }
    return $title;
  }
  add_filter( 'enter_title_here', 'change_default_title' );

  // アーカイブページ作成
  function post_has_archive($args, $post_type)
  {
      if ('post' == $post_type) {
          $args['rewrite'] = true;
          $args['has_archive'] = 'original_name';
      }
      return $args;
  }
  add_filter('register_post_type_args', 'post_has_archive', 10, 2);

  // テーマフォルダ直下のeditor-style.cssを読み込み
  add_action('admin_init',function(){
    add_editor_style();
  });

  //エディタのキャッシュ削除
  function extend_tiny_mce_before_init( $mce_init ) {
    $mce_init['cache_suffix'] = 'v='.time();
    return $mce_init;
  }
  add_filter( 'tiny_mce_before_init', 'extend_tiny_mce_before_init' );

  /* ************************
  便利関数
  ************************ */
  // url取得
  function getUrl () {
    return (empty($_SERVER['HTTPS']) ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
  }

  // カレントタームのスラッグ呼び出し
  function getCurrentTerm() {
    return get_term_by('id', get_query_var('cat'), 'category'); 
  }

  // タイトルの冒頭生成
  function stripTitleStrings() {
    global $post;
    $len = 44;
    if(mb_strlen($post->post_title, 'UTF-8')>$len){
      $content= mb_substr(strip_tags($post->post_title, '<br>'), 0, $len, 'UTF-8');
      echo $content.'...';
    }else{
      echo strip_tags($post->post_title, '<br>');
    }
  }

  // 記事の冒頭生成
  function stripContentStrings() {
    global $post;
    $len = 44;
    if(mb_strlen($post->post_content, 'UTF-8')>$len){
      $content= mb_substr(strip_tags($post->post_content, '<br>'), 0, $len, 'UTF-8');
      echo $content.'...';
    }else{
      echo strip_tags($post->post_content, '<br>');
    }
  }

  // ページネーション作成
  function pagination($pages = '', $range = 4){
    $showitems = ($range * 2)+1;
  
    global $paged;
    if(empty($paged)) $paged = 1;
  
    if($pages == '') {
      global $wp_query;
      $pages = $wp_query->max_num_pages;
      if(!$pages){
        $pages = 1;
      }
    }
    
    echo '<ul class="pager">'.PHP_EOL;
    for ($i=1; $i <= $pages; $i++) {
      if (( !($i >= $paged+$range+1 || $i <= $paged-$range-1) || $pages <= $showitems )) {
        echo ($paged == $i) ? '<li class="pager__item _active"><span>' . $i . '</span></li>'.PHP_EOL : '<li class="pager__item"><a href="'.get_pagenum_link($i).'" >' . $i . '</a></li>'.PHP_EOL;
      }
    }
    echo '</ul>'.PHP_EOL;
  }

  // 記事内の最初の画像を取得
  function catchThatImage() { 
    global $post, $posts; 
    $first_img = ''; 
    ob_start(); 
    ob_end_clean(); 
    $output = preg_match_all('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $post->post_content, $matches); 
    $first_img = $matches [1] [0]; 
    if(empty($first_img)){ 
        // 記事内で画像がなかったときのためのデフォルト画像を指定 
        $first_img = "/images/default.jpg"; 
    } 
    return $first_img; 
  }
?>