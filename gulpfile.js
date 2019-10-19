var gulp = require('gulp'); 
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    watch = require('gulp-watch'),
    cssnano = require('gulp-cssnano'),
    rtlcss = require('gulp-rtlcss'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
	jshintSummary = require('jshint-stylish-summary');

require('gulp-stats')(gulp);
    
gulp.task('cleanjs', function() {
    return del(['dist/js']);
});

gulp.task('cleancss', function() {
    return del(['dist/css']);
});

gulp.task('watch', function() {
  watch("src/js/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('js', ['cleanjs'], function() {
  return gulp.src('./src/js/*.js')
    .pipe(jshint())
	.pipe(jshint.reporter(stylish))
	.pipe(jshintSummary.collect())
    .on('end', jshintSummary.summarize())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('css', ['cleancss'], function() {
   return gulp.src('src/css/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'))
	// Till this point, we've only managed to minimize the css.
	
	// Now, take the minimized css and also generate an rtl version of it.
    .pipe(rtlcss())
    .pipe(rename({ suffix: '-rtl' }))
    .pipe(gulp.dest('dist/css'));
});

// 'js' and 'css' will run concurrently, but only after 'clean' is done.
gulp.task('default', ['js', 'css']);