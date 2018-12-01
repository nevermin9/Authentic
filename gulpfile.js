var gulp = require('gulp'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync  = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp.src('src/scss/main.scss')
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(plumber())
  .pipe(autoprefixer({
    browsers: ['> 1%', 'last 2 Chrome versions', 'Firefox ESR'],
    cascade: false
  }))
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
    notify: false
  });
  gulp.watch("src/scss/**/*.scss", ['sass']);
  gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('copy', function(){
  return gulp.src(['src/**/*.*', '!src/scss/**/*.*'])
  .pipe(gulp.dest('app/'));
});

gulp.task('default', ['serve']);
