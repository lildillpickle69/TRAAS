/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'),
  watchify = require('watchify'),
  sass = require('gulp-sass'),
  cssnano = require('gulp-cssnano'),
  browserify = require('browserify'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  livereload = require('gulp-livereload'),
  del = require('del'),
  babelify = require('babelify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  gutil = require('gulp-util'),
  glob = require('glob'),
  embedlr = require("gulp-embedlr"),
  runSequence = require("run-sequence");

//html
// gulp.src('src/html/**/*.html')
// 	.pipe(embedlr())
// 	.pipe(gulp.dest('./dist/html'));

// Styles
gulp.task('styles', function() {
  return gulp.src('src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/styles/'))
    .pipe(notify({ message: 'Styles task complete' }))
    .pipe(livereload());
});

// Scripts


var testFiles = glob.sync('src/scripts/**/*.jsx');
var browserwatch = watchify(browserify({ entries: testFiles, extensions: ['.jsx'], cache: {}, packageCache: {} }), { delay: 500 });
browserwatch.transform(babelify, { presets: ['env', 'react', 'stage-0', 'es2015'] });


function bundle() {
  return browserwatch.bundle()
    .on('error', function (e) {
      gutil.log(gutil.colors.red('Bundle error:', e.message));
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
      gutil.log(gutil.colors.red('Bundle error:', e.message));
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
browserwatch.on('update', minbundle); 

// Images
gulp.task('images', function() {
  return gulp.src('src/images/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function() {
  return del(['dist/styles', 'dist/scripts', 'dist/images', 'dist/html']);
});
gulp.task('apply-prod-environment', function() {
  process.env.NODE_ENV = 'production';
});
// Default task
// add production environment
gulp.task('default', ['clean'], function() {
  runSequence('styles', ['minscripts']);
  // gulp.start(/*'scripts',*/ 'minscripts', 'watch');
});

// Watch
// gulp.task('watch', function() {

//   // Watch .scss files
//   gulp.watch('src/styles/**/*.scss', ['styles']);

//   // Watch .js files
//   // gulp.watch('src/scripts/**/*.jsx', ['scripts', 'minscripts']);

//   // // Watch image files
//   // gulp.watch('src/images/*', ['images']);

//   // Create LiveReload server
//   livereload.listen();

//   // Watch any files in dist/, reload on change
//   gulp.watch(['dist/**']).on('change', livereload.changed);
// });
