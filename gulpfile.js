'use strict';

var _ = require("lodash");
var del = require('del');
var event_stream = require('event-stream');
var gulp = require('gulp');
var gulp_changed = require('gulp-changed');
var gulp_count = require('gulp-count');
var gulp_filter = require('gulp-filter');
var gulp_mocha = require('gulp-spawn-mocha');
var gulp_sourcemaps = require('gulp-sourcemaps');
var gulp_typescript = require('gulp-typescript');
var gulp_util = require('gulp-util');
var gulp_tsd = require('gulp-tsd');
var gulp_tslint = require('gulp-tslint');
var runSequence = require('run-sequence');

var helpers = require('./gulp/helpers.js');
helpers.setMaxListeners();

var module_paths = {
    source: {
        files: 'src/**/*.{ts,js}',
        externalTypings: 'typings/tsd.d.ts'
    },
    built_path: 'build/',
    extras: [
        'src/*/*.json',
        'src/*/*.d.ts'
    ],
    clean: [
        'build'
    ],
    test_files: 'build/*/**/*.spec.js'
};

// remove all owned directories but only owned files in common directories
gulp.task('clean', function() {
    return del(module_paths.clean);
});

gulp.task('build', ['tsd'], function(cb) {
    runSequence('build:scripts', 'install', cb);
});

gulp.task('build:scripts', function(cb) {
    var build_path = [module_paths.source.files, module_paths.source.externalTypings];

    var firstError = null;

    var tsResult = gulp.src(_.flatten(build_path, true))
        .pipe(gulp_changed(module_paths.built_path, {
            extension: '.js'
        }))
        .pipe(gulp_count('Building <%= files %>...'))
        .pipe(gulp_sourcemaps.init())
        .pipe(gulp_typescript(gulp_typescript.createProject('tsconfig.json')))
        .on('error', function(err) {
            firstError = firstError || err;
        });

    event_stream.merge(
            tsResult.dts.pipe(gulp.dest(module_paths.built_path)),
            tsResult.js.pipe(gulp_sourcemaps.write()).pipe(gulp.dest(module_paths.built_path))
        )
        .on('end', function() {
            cb(firstError);
        });
});

gulp.task('lint', function() {
    var tsFilter = gulp_filter('**/*.ts');
    return gulp.src(module_paths.source.files)
        .pipe(tsFilter)
        .pipe(gulp_tslint({
            configuration: 'tslint.json',
            emitError: true,
            reportLimit: 15
        }))
        .pipe(gulp_tslint.report('prose'));
});

gulp.task('install', ['tsd'], function(cb) {
    return gulp.src(module_paths.extras)
        .pipe(gulp_changed(module_paths.built_path))
        .pipe(gulp.dest(module_paths.built_path));
});

gulp.task('test', function(cb) {
    runSequence('test:run', cb);
});

gulp.task('test:run', function() {
    return gulp.src([module_paths.test_files], {
            read: false
        })
        .pipe(gulp_mocha({
            env: {
                NODE_ENV: 'test'
            },
            timeout: 10000
        }));
});

gulp.task('tsd', ['tsd:reinstall'], function(cb) {
    cb();
});

gulp.task('tsd:reinstall', function() {
    return gulp.src('gulp_tsd.json')
        .pipe(gulp_tsd())
});

gulp.task('tsd:clean', function() {
    return del(['typings/*']);
});

module.exports = {
    paths: module_paths
};
