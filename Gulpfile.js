var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

var exec = require('child_process').exec;

/* Function
   ========================================================================== */

var execTask = function(task, cb) {
  exec('npm run ' + task, function(err) {
    if(err) {
      cb(err);
      throw err;
    } else {
      cb();
    }
  });
}

/* Tasks
   ========================================================================== */

gulp.task('deploy', function (cb) {
  execTask('deploy', cb);
});

gulp.task('build', function (cb) {
  execTask('generate', cb);
});

gulp.task('reload', ['build'], function() {
  reload();
});

gulp.task('watch', ['build'], function() {

  browserSync({
    notify: false,
    port: 9778,
    server: {
      baseDir: ['out'],
    }
  });

  gulp.watch([
    'src/**/*'
  ], ['reload']);

});

gulp.task('default', ['build']);
