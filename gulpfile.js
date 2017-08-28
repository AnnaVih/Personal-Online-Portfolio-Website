var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', function () {
	gulp.src('./resource/css/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./resource/css/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('serve', function () {

	browserSync.init({
		server: {
			baseDir: './'
		}
	});

	gulp.watch('./resource/css/scss/*.scss', ['styles']);
	gulp.watch('./**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'serve']);