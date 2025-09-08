/*
=====================================
使用するプラグイン（モジュールのロード）
=====================================
*/
var gulp = require('gulp'),
  plumber = require('gulp-plumber'), //エラーが原因でタスクが強制停止することを防止する
  sass = require('gulp-sass')(require('sass')),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync'),
  notify = require('gulp-notify'), //エラーの通知を出す
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  mozjpeg  = require('imagemin-mozjpeg'),
  nunjucksRender = require('gulp-nunjucks-render'),
  data = require('gulp-data'),
  htmlbeautify = require('gulp-html-beautify'),
  changed = require('gulp-changed');
  cache = require('gulp-cached'); 

/*
=====================================
オプション(使用したい場合はtrueに)
=====================================
*/

//画像を格納する度に自動的に画像圧縮
var autoImg = true;

/*
=====================================
各ファイルのフォルダの指定
=====================================
*/

//WordPress開発中ならtrue
var wpDev = true;
var themaName = '';

//Folder to develop -> 開発フォルダ
var develop = "./static/develop-html/";
var public = "./static/public/";
var wp = "./wp/wp-content/themes/" + themaName + "/";
//config
var config = {

  "path" : {
    "sassCompile" : [develop+"assets/sass/**/*.scss", "!"+develop+"assets/sass/**/* copy.scss"],
    "sassModule" : develop+"assets/sass/**/_*.scss",
    "afterCompileSass" : public+"assets/css/",
    "afterCompileSassWp" : wp+"assets/css/",
    "htmlWatchDir" : [develop+"**/*.html", "!"+develop+"**/* copy.html", "!"+develop+"**/* - Copy.html"],
    "htmlCompileDir" : [develop+"**/*.html", "!"+develop+"**/* copy.html", "!"+develop+"**/* - Copy.html", "!"+develop+"**/_*.html"],
    "afterCompileHTML": public,
    "cssDir":[develop+'assets/css/**/*.css', "!"+develop+'assets/css/**/* copy.css', "!"+develop+"assets/css/**/* - Copy.css", "!"+develop+"**/_*.css"],
    "cssCompileDir": public+"assets/css/",
    "cssCompileDirWp": wp+"assets/css/",
    "jsDir": [develop+'assets/js/**/*.js', "!"+develop+'assets/js/**/* copy.js', "!"+develop+'assets/js/**/* - Copy.js', "!"+develop+"**/_*.js"],
    "jsCompileDir": public+"assets/js/",
    "jsCompileDirWp": wp+"assets/js/",
    "imgDir": [develop+"assets/img/**/*.{png,jpg,svg,ico,gif}", "!"+develop+'assets/img/**/* copy.{png,jpg,svg,ico,gif}', "!"+develop+'assets/img/**/* - Copy.{png,jpg,svg,ico,gif}'],
    "imgCompileDir": public+"assets/img/",
    "imgCompileDirWp": wp+"assets/img/"
  }
}

/*
=====================================
glupの実行
=====================================
*/
gulp.task('default', function(){
  //監視
  gulp.watch(config.path.htmlWatchDir, gulp.series(HTML,RELOAD));
  gulp.watch(config.path.sassCompile,gulp.series(SASS,RELOAD));
  gulp.watch(config.path.jsDir,gulp.series(JS,RELOAD));
  gulp.watch(config.path.cssDir,gulp.series(CSS,RELOAD));
  if ( autoImg == true ){
    gulp.watch(config.path.imgDir,gulp.series(IMG,RELOAD));
  }

  //サーバー起動
  browserSync({
    server:{
      baseDir: "./"+public//ルートとなるディレクトリ
    }
  });
});

gulp.task('build', function(done){
  gulp.series(HTML,SASS,JS,CSS,IMG,RELOAD);
  browserSync({
    server:{
      baseDir: "./"+public//ルートとなるディレクトリ
    }
  });
});

/*
=====================================
taskの定義
=====================================
*/
//sassファイルのコンパイルとプレフィックスの付与
var SASS = function(){
  if(wpDev == false){
    return gulp.src([config.path.sassCompile[0],'!'+config.path.sassModule])
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')//エラーがあればデスクトップに通知
    }))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer({browsers: ['last 3 versions','ie >=11','android >=4.3']}))//プレフィックスを付与
    .pipe(gulp.dest(config.path.afterCompileSass))//一度コンパイルしてから
    .pipe(browserSync.stream());//変更したファイル部分だけをブラウザ更新
  } else {
    return gulp.src([config.path.sassCompile[0],'!'+config.path.sassModule])
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')//エラーがあればデスクトップに通知
    }))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer({browsers: ['last 3 versions','ie >=11','android >=4.3']}))//プレフィックスを付与
    .pipe(gulp.dest(config.path.afterCompileSass))//一度コンパイルしてから
    .pipe(gulp.dest(config.path.afterCompileSassWp))
    .pipe(browserSync.stream());//変更したファイル部分だけをブラウザ更新
  }
}
exports.SASS = SASS;

// html整形の設定
var beautify_options = {
  "preserve_newlines" : true,
  "indent_size": 2
}

// htmlファイルのコンパイル
var HTML = function () {
  return gulp.src(config.path.htmlCompileDir)
  .pipe(data(function() {
      return require(develop+'_data/site.json'); //各ファイルに引き渡すデータ
  }))
  .pipe(nunjucksRender({
      path: develop //njkファイルの基点になるパス
  }))
  .pipe(htmlbeautify(beautify_options)) //生成されたhtmlをきれいに
  .pipe(gulp.dest(public));
}
exports.HTML = HTML;


//jsをpublicへ
var JS = function(){
  if(wpDev == false){
    return gulp.src(config.path.jsDir)
    .pipe(gulp.dest(config.path.jsCompileDir));
  } else {
    return gulp.src(config.path.jsDir)
    .pipe(gulp.dest(config.path.jsCompileDir))
    .pipe(gulp.dest(config.path.jsCompileDirWp));
  }
}
exports.JS = JS;

//ブラウザの自動リロード
var RELOAD = function(done){
  browserSync.reload();
  done();
}
exports.RELOAD = RELOAD;

// 画像圧縮
var IMG = function(){
  if(wpDev == false){
    return gulp.src(config.path.imgDir)
    // .pipe(changed(config.path.imgCompileDir))
    .pipe(cache(imagemin()))
    .pipe(imagemin([
      pngquant({
        quality: [.7, .85],
        speed: 1
      }),
      mozjpeg({
        quality:90,
        progressive: true
      })
    ]))
    .pipe(gulp.dest(config.path.imgCompileDir));
  } else {
    return gulp.src(config.path.imgDir)
    // .pipe(changed(config.path.imgCompileDir))
    // .pipe(changed(config.path.imgCompileDirWp))
    .pipe(cache(imagemin()))
    .pipe(imagemin([
      pngquant({
        quality: [.7, .85],
        speed: 1
      }),
      mozjpeg({
        quality:90,
        progressive: true
      })
    ]))
    .pipe(gulp.dest(config.path.imgCompileDir))
    .pipe(gulp.dest(config.path.imgCompileDirWp));
  }
}
exports.IMG= IMG;

// 追加されたCSSをpublicへ
var CSS = function(){
  if(wpDev == false){
    return gulp.src(config.path.cssDir)
    .pipe(gulp.dest(config.path.cssCompileDir));
  } else {
    return gulp.src(config.path.cssDir)
    .pipe(gulp.dest(config.path.cssCompileDir))
    .pipe(gulp.dest(config.path.cssCompileDirWp));
  }
}
exports.CSS= CSS;

