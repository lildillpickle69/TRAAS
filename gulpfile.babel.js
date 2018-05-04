/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
import gulp from 'gulp';
import watchify from 'watchify';
import cssnano from 'cssnano';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import cssnext from 'postcss-cssnext';
import browserify from 'browserify';
import uglify from 'gulp-uglify';
import notify from 'gulp-notify';
import livereload from 'gulp-livereload';
import del from 'del';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import glob from 'glob';
import log from 'fancy-log';
import concat from 'gulp-concat-css';


// Styles
const plugins = [
  cssnext({ browsers: ['last 1 version'] }),
  cssnano()
];

gulp.task('styles', () =>
  gulp.src('src/styles/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(concat('stylesheet.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/styles/'))
    .pipe(notify({ message: 'Styles task complete' }))
    .pipe(livereload()));

// Scripts


var testFiles = glob.sync('src/scripts/**/*.jsx');
var browserwatch = watchify(browserify({ entries: testFiles, extensions: ['.jsx'], cache: {}, packageCache: {} }), { delay: 500 });
browserwatch.transform(babelify, { presets: ['env', 'react'] });


function bundle() {
  return browserwatch.bundle()
    .on('error', function (e) {
      log('Bundle error:', e.message);
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/scripts/'))
    .pipe(notify({ message: 'Scripts task complete' }))
    .pipe(livereload());
}

function minbundle() {
  return browserwatch.bundle()
    .on('error', function (e) {
      log('Bundle error:', e.message);
      this.emit('end');
    })
    .pipe(source('bundle.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts/'))
    .pipe(notify({ message: 'Minify scripts task complete' }));
}


gulp.task('scripts', bundle);
gulp.task('minscripts', minbundle);
// browserwatch.on('update', bundle);
browserwatch.on('update', bundle);


// Clean
gulp.task('clean', () =>
  del(['dist/styles', 'dist/scripts', 'dist/images', 'dist/html']));

gulp.task('apply-prod-environment', function() {
  process.env.NODE_ENV = 'production';
});


// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/styles/**/*.css', gulp.series('styles'));


  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);
});

gulp.task('default', gulp.series('clean'/*, 'apply-prod-environment'*/, 'styles', gulp.parallel('scripts', 'watch')));
