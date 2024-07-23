var gulp = require('gulp'),
  sass = require('gulp-sass')(require('sass')),
  htmlmin = require('gulp-html-minifier'),
  browserSync = require('browser-sync').create(),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify-es').default,
  cleanCSS = require('gulp-clean-css'),
  babel = require('gulp-babel'),
  rename = require('gulp-rename'),
  htmlImport = require('gulp-html-import'),
  del = require('del'),
  cache = require('gulp-cache'),
  autoprefixer = require('gulp-autoprefixer'),
  notify = require('gulp-notify');

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: 'src',
    },
    serveStatic: ['src/html'],
    open: false,
    notify: false,
    port: 8080,
  });
});

function bsReload(done) {
  browserSync.reload();
  done();
}

gulp.task('import', function () {
  return gulp
    .src('./src/templates/index.html')
    .pipe(htmlImport('./src/templates/'))
    .pipe(gulp.dest('src/html'));
});

gulp.task('buildHtml', function () {
  return gulp
    .src('./src/html/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function () {
  return gulp
    .src('src/styles/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', notify.onError()))
    .pipe(rename({suffix: '.min', prefix: ''}))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 10 versions'],
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function () {
  return gulp
    .src('src/js/common.js')
    .pipe(concat('scripts.min.js'))
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('removedist', function () {
  return del(['dist'], {force: true});
});

gulp.task('clearcache', function () {
  return cache.clearAll();
});

gulp.task('buildCss', function () {
  return gulp.src(['src/css/styles.min.css']).pipe(gulp.dest('dist/css'));
});

gulp.task('buildJs', function () {
  return gulp.src(['src/js/scripts.min.js']).pipe(gulp.dest('dist/js'));
});

gulp.task('buildImage', function () {
  return gulp.src('src/img/**/*').pipe(gulp.dest('dist/img'));
});

gulp.task('buildFonts', function () {
  return gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'));
});

gulp.task(
  'build',
  gulp.series(
    'removedist',
    'sass',
    'js',
    'import',
    'buildCss',
    'buildImage',
    'buildFonts',
    'buildJs',
    'buildHtml'
  )
);

gulp.task('code', function () {
  return gulp.src('src/html/index.html').pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function () {
  gulp.watch('src/styles/**/*.scss', gulp.parallel('sass'));
  gulp.watch('src/js/common.js', gulp.parallel('js'));
  gulp.watch('src/templates/**/*.html', gulp.parallel(['code', 'import']));
});

gulp.task('default', gulp.parallel('import', 'sass', 'js', 'browser-sync', 'watch'));
