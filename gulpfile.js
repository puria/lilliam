var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    order = require('gulp-order');

var jsSources = ['js/*.js'],
    sassSources = ['sass/*.scss'],
    htmlSources = ['*.html'],
	cssSources = ['css/**'],
	imagesSources = ['images/**'],
    outputCSSDir = 'dist/css',
    outputJSDir = 'dist/js',
	outputImages = 'dist/images',
    outputDir = 'dist';


gulp.task('sass', function() {
  gulp.src(sassSources)
  .pipe(sass({outputStyle: 'expanded'}))
    .on('error', gutil.log)
  .pipe(gulp.dest(outputCSSDir))
  .pipe(connect.reload())
});

gulp.task('js', function() {
	gulp
		.src(jsSources)
		.pipe(order([
			'js/jquery.min.js',
			'js/modernizr-2.6.2.min.js',
			'js/jquery.easing.1.3.js',
			'js/bootstrap.min.js',
			'js/jquery.waypoints.min.js',
			'js/sticky.js',
			'js/jquery.stellar.min.js',
			'js/hoverIntent.js',
			'js/superfish.js',
			'js/jquery.magnific-popup.min.js',
			'js/magnific-popup-options.js',
			'js/google_map.js',
			'js/main.js'
		], {base: './'}))
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest(outputDir))
		.pipe(uglify({mangle: false}))
		.pipe(rename('scripts.min.js'))
		.pipe(gulp.dest(outputDir))
		.pipe(connect.reload())
});

gulp.task('watch', function() {
  gulp.watch(jsSources, ['js']);
  gulp.watch(sassSources, ['sass']);
  gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: './dist',
    livereload: true
  })
});

gulp.task('html', function() {
  gulp.src(htmlSources)
  .pipe(gulp.dest(outputDir))
  .pipe(connect.reload())

  gulp.src(cssSources)
	  .pipe(gulp.dest(outputCSSDir))
  gulp.src(imagesSources)
	  .pipe(gulp.dest(outputImages))
});

gulp.task('default', ['html', 'js', 'sass', 'connect', 'watch']);
gulp.task('build', ['html', 'js', 'sass']);
