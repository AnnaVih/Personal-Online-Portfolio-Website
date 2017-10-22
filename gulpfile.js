var gulp 				= require('gulp'),
	sass 				= require('gulp-sass'),
	browserSync 		= require('browser-sync').create(),//Plugin for autoreload page
	autoprefixer 		= require('gulp-autoprefixer'),
	sourcemaps 			= require('gulp-sourcemaps'),//Plugin for showing original source code into inspector
	gulpif 				= require('gulp-if'),//Plugin for if statment inside of tasks
	uglify 				= require('gulp-uglify'),
	minifyHTML 			= require('gulp-minify-html'),
	imagemin			= require('gulp-imagemin'),
	imageminGifsicle 	= require('imagemin-gifsicle'),
	imageminJpegtran 	= require('imagemin-jpegtran'),
	imageminOptipng 	= require('imagemin-optipng'),
	imageminSvgo 		= require('imagemin-svgo'),
	concat 				= require('gulp-concat');


var env,
	sassSources,
	jsSources,
	htmlSources,
	outputDir,
	sassStyle;

env = process.env.NODE_ENV || 'development';

if (env === 'development') {
	outputDir = 'builds/development/';
	sassStyle = 'expanded';
} else {
	outputDir = 'builds/production/';
	sassStyle = 'compressed';
} 


sassSources = ['components/sass/style.scss'];

jsSources 	= ['components/scripts/gmaps.js',
			'components/scripts/jquery.waypoints.min.js',
			'components/scripts/typer.js',
			'components/scripts/main.js'];

htmlSources = [outputDir + '*.html'];

gulp.task('styles', function () {
	return gulp.src(sassSources)
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: sassStyle})
			.on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(outputDir + 'css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function() {
	return gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(outputDir + 'js'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function() {
	return gulp.src('builds/development/*.html')
		.pipe(gulpif(env === 'production', minifyHTML()))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('images', function() {
	return gulp.src('builds/development/img/**/*.*')
		.pipe(gulpif(env === 'production', imagemin([
			imagemin.gifsicle({interlaced: true}),
		    imagemin.jpegtran({progressive: true}),
		    imagemin.optipng({optimizationLevel: 5}),
		    imagemin.svgo({plugins: [{removeViewBox: false}]})
		])))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir + 'img')))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('docs', function() {
	return gulp.src('builds/production/**/*.*')
		.pipe(gulpif(env === 'production', gulp.dest('docs')))
		.pipe(browserSync.reload({stream: true}));
});


gulp.task('serve', function () {

	browserSync.init({
		server: {
			baseDir: outputDir
		}
	});

	gulp.watch('components/sass/*.scss', ['styles']);
	gulp.watch(jsSources, ['js']);
	gulp.watch('builds/development/*.html', ['html']);
	gulp.watch('builds/development/img/**/*.*', ['images']);
});



gulp.task('default', ['html', 'images', 'styles', 'js', 'docs', 'serve']);