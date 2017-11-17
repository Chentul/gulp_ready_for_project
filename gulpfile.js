var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var browserSync = require( 'browser-sync' ).create();
var uglify = require( 'gulp-uglify' );
var cssmin = require( 'gulp-cssmin' );
var rename = require( 'gulp-rename' );

gulp.task( 'sass', function() {

  gulp.src( 'scss/app.scss' )
    .pipe( sass({ includePaths: [ 'sass' ] }) )
    .pipe( cssmin() )
    .pipe( gulp.dest( 'app/css' ) );
} );

gulp.task('server', function() {
    browserSync.init({
        proxy: {
            target: "localhost/",
            ws: true
        },
        notify: false,
        scrollProportionally: false
    });

    gulp.watch("app/css/app.css").on('change', browserSync.reload);
    gulp.watch("scss/*.scss", ['sass']);

    gulp.watch("app/js/app.js").on('change', browserSync.reload);

    gulp.watch("./index.php").on('change', browserSync.reload);
    gulp.watch("app/php/*.php").on('change', browserSync.reload);
});

gulp.task( 'default', [ 'server' ], function() {});

