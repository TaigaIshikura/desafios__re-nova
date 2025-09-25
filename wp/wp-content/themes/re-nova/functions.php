<?php
// 開いているURLの取得
function get_current_link() {
    return (is_ssl() ? 'https' : 'http') . '://' . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
}

//リダイレクト処理
add_action( 'template_redirect', 'my_redirect', 1);
function my_redirect() {
    global $t_options;
    if (
        is_attachment() || is_404()
      ) {
        wp_safe_redirect( home_url() );
        exit;
    }
}

// テーマフォルダ直下のeditor-style.cssを読み込み
add_action('admin_init',function(){
  add_editor_style('assets/css/editor-style.css' );
});

// エディタのキャッシュ削除
function extend_tiny_mce_before_init( $mce_init ) {
  $mce_init['cache_suffix'] = 'v='.time();
  return $mce_init;
}
add_filter( 'tiny_mce_before_init', 'extend_tiny_mce_before_init' );

// メールアドレス確認
add_filter( 'wpcf7_validate_email', 'wpcf7_validate_email_filter_confrim', 11, 2 );
add_filter( 'wpcf7_validate_email*', 'wpcf7_validate_email_filter_confrim', 11, 2 );
function wpcf7_validate_email_filter_confrim( $result, $tag ) {
    $type = $tag['type'];
    $name = $tag['name'];
    if ( 'email' == $type || 'email*' == $type ) {
        if (preg_match('/(.*)_confirm$/', $name, $matches)){ //確認用メルアド入力フォーム名を ○○○_confirm としています。
            $target_name = $matches[1];
                $posted_value = trim( (string) $_POST[$name] ); //前後空白の削除
                $posted_target_value = trim( (string) $_POST[$target_name] ); //前後空白の削除
            if ($posted_value != $posted_target_value) {
                $result->invalidate( $tag,"確認用のメールアドレスが一致しておりません。");
            }
        }
    }
    return $result;
}

// 自動ファビコンのオフ
function wp_favicon_delete(){
  exit;
}
add_action("do_faviconico", "wp_favicon_delete");
?>