
// required
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    compass = require('gulp-compass'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del'),
    rename = require('gulp-rename');
 
// scripts task
gulp.task('scripts', function(){
    gulp.src(['src/js/**/*.js', '!src/js/**/*min.js'])
        .pipe(plumber())
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('src-asset/js'))
        .pipe(reload({stream:true}))
});

// compass sass task
gulp.task('compass', function(){
    gulp.src('app/scss/style.scss')
        .pipe(plumber())
        .pipe(compass({
            config_file: 'config.rb',
            css: 'src-asset/css',
            sass: 'src/scss',
            require: ['susy']
        }))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('src-asset/css'))
        .pipe(reload({stream:true}))
})

// html task
gulp.task('html', function(){
    gulp.src('./**/**/*.html')
    .pipe(reload({stream:true}))
})



// browser-sync
gulp.task('browser-sync', function() {
    // Serve files from the root of the project
    browserSync.init({
      server: {
        baseDir: "./"
      }
    });
  });

// watch task
gulp.task('watch', function(){
    gulp.watch('src/js/**/*.js', ['scripts'])
    gulp.watch('src/scss/**/*.scss', ['compass'])
    gulp.watch('./**/*.html', ['html'])
})


// default task
gulp.task('default', ['scripts', 'compass', 'html', 'browser-sync', 'watch']);
