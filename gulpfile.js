var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	del = require('del');

gulp.task('sass',function(){
	return gulp.src('app/sass/main.sass')
	.pipe(sass())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});
gulp.task('clean',function(){
	return del.sync('dist');
});
gulp.task('watch',['browser-sync','sass'],function(){
	gulp.watch('app/sass/*.sass',['sass']);
	gulp.watch('app/*.html');
});

gulp.task('browser-sync',function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('build',['clean','sass'],function(){
	var buildCss = gulp.src('app/css/main.css')
	.pipe(gulp.dest('dist/css'));

	var buildImg = gulp.src('app/img/*.png')
	.pipe(gulp.dest('dist/img'));

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));
});