var gulp = require('gulp'),//gulp plagin
	sass = require('gulp-sass'),//sass plugin
	browserSync = require('browser-sync').create(),//Plugin for autoreload page
	autoprefixer = require('gulp-autoprefixer'),//Plugin for autoprefixer in CSS
	sourcemaps = require('gulp-sourcemaps'),//Plugin for showing original source code into inspector
	concat = require('gulp-concat');//Plugin for concating js files into one file

var sassSources = ['components/sass/style.scss'];

var jsSources = ['components/scripts/gmaps.js',
	'components/scripts/jquery.waypoints.min.js',
	'components/scripts/typer.js',
	'components/scripts/main.js'];

gulp.task('styles', function () {
	gulp.src(sassSources)
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'expanded'})
			.on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('builds/development/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function() {
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(gulp.dest('builds/development/js'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('serve', function () {

	browserSync.init({
		server: {
			baseDir: 'builds/development/'
		}
	});

	gulp.watch('components/sass/*.scss', ['styles']);
	gulp.watch('components/scripts/*.js', ['js']);
	gulp.watch('**/*.html').on('change', browserSync.reload);
});



gulp.task('default', ['styles', 'js', 'serve']);