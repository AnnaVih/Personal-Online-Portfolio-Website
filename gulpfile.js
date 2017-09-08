var gulp 			= require('gulp'),//gulp plugin
	sass 			= require('gulp-sass'),//sass plugin
	browserSync 	= require('browser-sync').create(),//Plugin for autoreload page
	autoprefixer 	= require('gulp-autoprefixer'),//Plugin for autoprefixer in CSS
	sourcemaps 		= require('gulp-sourcemaps'),//Plugin for showing original source code into inspector
	gulpif 			= require('gulp-if'),//Plugin for if statment inside of tasks
	uglify 			= require('gulp-uglify'),//Plugin for minify JavaScript
	minifyHTML 		= require('gulp-minify-html'),
	concat 			= require('gulp-concat');//Plugin for concating js files into one file


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

gulp.task('serve', function () {

	browserSync.init({
		server: {
			baseDir: outputDir
		}
	});

	gulp.watch('components/sass/*.scss', ['styles']);
	gulp.watch(jsSources, ['js']);
	gulp.watch('builds/development/*.html', ['html']);
});



gulp.task('default', ['styles', 'js', 'html', 'serve']);