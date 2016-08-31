var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	webpack = require('gulp-webpack'),
	swig = require('gulp-swig'),
	tmodjs = require('gulp-tmod'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	proxyMiddleware = require('http-proxy-middleware'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-cssmin'),
	runSequence = require('run-sequence'),
	htmlmin = require('gulp-htmlmin'),
	copy = require('gulp-contrib-copy'),
	funPack=require('./function');


var config={
	base:'src',
	build:'build'
}
var opts={
	defaults: {
		varControls: ['{[', ']}'],
		locals: {
			title: "test by tony.Deng",
			keywords:"test by tony.Deng"
		},
		cache: false,
		now:function(){
             return Date.parse(new Date())
        }
	}
}
var stylePath=config.base+'/style/[^_]*.styl',
	cssPath=config.build+'/style/**/*.css',
	scriptPath=config.base+'/script/*.js',
	jsLogic='./'+config.base+'/script/',
	uglifyPath=config.build+'/script/**/*.js',
	htmlPath='{'+config.base+'/*.htm,'+config.base+'/pages/**/*.htm}',
	htmlminPath='{'+config.build+'/*.html,'+config.build+'/pages/**/*.html}',
	tmodPath=config.base+'/tpl/*.html';

var changeWebPack={},
	changePath=config.base+'/**/[^_]*.*',
	styleChangePath,
	cssChangePath,
	htmlChangePath,
	htmlminChangePath,
	tmodChangePath,
	uglifyChangePath;



//stylus任务
gulp.task('stylus_build', function () {
	return gulp.src(stylePath,config)
	    .pipe(stylus())
	    .pipe(gulp.dest(config.build))
	    .on("end", reload);
});
gulp.task('stylus_change', function () {
	return gulp.src(styleChangePath,config)
	    .pipe(stylus())
	    .pipe(gulp.dest(config.build))
	    .on("end", reload);
});

//cssmin任务
gulp.task('cssmin_build', function () {
	return gulp.src(cssPath,config)
    	.pipe(cssmin())
	    .pipe(gulp.dest(config.build))
	    .on("end", reload);
});
gulp.task('cssmin_change', function () {
	return gulp.src(cssChangePath,config)
    	.pipe(cssmin())
	    .pipe(gulp.dest(config.build))
	    .on("end", reload);
});

//swig任务
gulp.task('swig_build', function () {
	return gulp.src(htmlPath,config)
	    .pipe(swig(opts))
	    .pipe(gulp.dest(config.build))
	    .on("end", reload);
});
gulp.task('swig_change', function () {
	return gulp.src(htmlChangePath,config)
	    .pipe(swig(opts))
	    .pipe(gulp.dest(config.build))
	    .on("end", reload);
});

//htmlmin任务
gulp.task('htmlmin_build', function () {
	return gulp.src(htmlminPath,config)
	    .pipe(htmlmin({collapseWhitespace: true}))
	    .pipe(gulp.dest(config.build))
	    .on("end", reload);
});
gulp.task('htmlmin_change', function () {
	return gulp.src(htmlminChangePath,config)
	    .pipe(htmlmin({collapseWhitespace: true}))
	    .pipe(gulp.dest(config.build))
	    .on("end", reload);
});

//复制html
gulp.task('copy_index', function() {
	return gulp.src(config.build+'/index.html')
		.pipe(copy())
	    .pipe(gulp.dest('./'));
});

//tomd任务
gulp.task('tomd_build', function(){
	return gulp.src(tmodPath/*,config*/)
		.pipe(tmodjs({
			combo: false,
			type:'cmd',
			base: config.base+'/tpl/',
        	output: config.base+'/views/'
		}))
		.on("end", reload);
		//.pipe(gulp.dest(config.build));
});
gulp.task('tomd_change', function(){
	return gulp.src(tmodChangePath)
		.pipe(tmodjs({
			combo: false,
			type:'cmd',
			base: config.base+'/tpl/',
        	output: config.base+'/views/'
		}))
		.on("end", reload);
		//.pipe(gulp.dest(config.build));
});

//webpack任务
gulp.task('webpack_build', function() {
   	return gulp.src(scriptPath)
    //.pipe(webpack( require('./webpack.config.js') ))
    .pipe(webpack({
	    entry: funPack.readdir(jsLogic),
	    output: {
	      filename: '[name].js',
	    },
    }))
    .pipe(gulp.dest(config.build+'/script'))
	.on("end", reload);
});
gulp.task('webpack_change', function() {
   	return gulp.src(changePath)
    .pipe(webpack({
	    entry: changeWebPack,
	    output: {
	      filename: '[name].js',
	    },
    }))
    .pipe(gulp.dest(config.build+'/script/'))
	.on("end", reload);
});

//console.log(funPack.readdir(jsLogic));

//uglify任务
gulp.task('uglify_build', function(){
	return gulp.src(uglifyPath,{base:config.build})
		.pipe(uglify())
	    .pipe(gulp.dest(config.build))
		.on("end", reload);
});
gulp.task('uglify_change', function(){
	return gulp.src(uglifyChangePath,{base:config.build})
		.pipe(uglify())
	    .pipe(gulp.dest(config.build))
		.on("end", reload);
});


gulp.task('server', function() {
  browserSync({
      host: 'local.test.com',
      open: 'external',
      ghostMode: false, // 每个页面的镜像独立，不相互影响
      server: {
          baseDir: config.build,
          //middleware: [proxy]
      }
  });

//监控stylus
var styleWatcher=gulp.watch(stylePath,['stylus_change']);
styleWatcher.on('change',function(event){
    console.log(event.type); //变化类型 added为新增,deleted为删除，changed为改变
    styleChangePath=funPack.rootPath(event.path); //变化的文件的路径
    console.log(funPack.rootPath(event.path));
});
styleWatcher.on('added',function(event){
    console.log(event.type); //变化类型 added为新增,deleted为删除，changed为改变
    styleChangePath=funPack.rootPath(event.path); //变化的文件的路径
    console.log(funPack.rootPath(event.path));
});

//监控css
var styleWatcher=gulp.watch(cssPath,['cssmin_change']);
styleWatcher.on('change',function(event){
    console.log(event.type); //变化类型 added为新增,deleted为删除，changed为改变
    cssChangePath=funPack.rootPath(event.path); //变化的文件的路径
    console.log(funPack.rootPath(event.path));
});
styleWatcher.on('added',function(event){
    console.log(event.type); //变化类型 added为新增,deleted为删除，changed为改变
    cssChangePath=funPack.rootPath(event.path); //变化的文件的路径
    console.log(funPack.rootPath(event.path));
});

//监控swig
var htmlWatcher=gulp.watch(htmlPath,['swig_change']);
htmlWatcher.on('change',function(event){
    console.log(event.type); //变化类型 added为新增,deleted为删除，changed为改变
    htmlChangePath=funPack.rootPath(event.path); //变化的文件的路径
    console.log(funPack.rootPath(event.path));
});
htmlWatcher.on('added',function(event){
    console.log(event.type); //变化类型 added为新增,deleted为删除，changed为改变
    htmlChangePath=funPack.rootPath(event.path); //变化的文件的路径
    console.log(funPack.rootPath(event.path));
});

//监控html
var htmlminWatcher=gulp.watch(htmlminPath,['htmlmin_change']);
htmlminWatcher.on('change',function(event){
    console.log(event.type); //变化类型 added为新增,deleted为删除，changed为改变
    htmlminChangePath=funPack.rootPath(event.path); //变化的文件的路径
    console.log(funPack.rootPath(event.path));
});
htmlminWatcher.on('added',function(event){
    console.log(event.type); //变化类型 added为新增,deleted为删除，changed为改变
    htmlminChangePath=funPack.rootPath(event.path); //变化的文件的路径
    console.log(funPack.rootPath(event.path));
});

//监控tomd
var tomdWatcher=gulp.watch(tmodPath,['tomd_change']);
tomdWatcher.on('change',function(event){
    console.log(event.type); //变化类型 added为新增,deleted为删除，changed为改变
    tmodChangePath=funPack.rootPath(event.path); //变化的文件的路径
    console.log(funPack.rootPath(event.path));
});
tomdWatcher.on('added',function(event){
    console.log(event.type); //变化类型 added为新增,deleted为删除，changed为改变
    tmodChangePath=funPack.rootPath(event.path); //变化的文件的路径
    console.log(funPack.rootPath(event.path));
});

//监控js改变 webpack
var webpackWatcherChange=gulp.watch(scriptPath,['webpack_change']);
webpackWatcherChange.on('change',function(event){
    console.log(event.type); //变化类型 added为新增,deleted为删除，changed为改变
	console.log(event.path);
    console.log(funPack.rootPath(event.path)); //变化的文件的路径
    changeWebPack=funPack.changeFile(funPack.rootPath(event.path));
});
//监控js增加 webpack
var webpackWatcherAdd=gulp.watch(scriptPath,['webpack_change']);
webpackWatcherAdd.on('added',function(event){
    console.log(event.type); //变化类型 added为新增,deleted为删除，changed为改变
    console.log(funPack.rootPath(event.path)); //变化的文件的路径
    if(funPack.rootPath(event.path).split('.')[1]=='js') {
    	changeWebPack=funPack.changeFile(funPack.rootPath(event.path));
    }
});

//监控build下js改变 uglify
var uglifyWatcher=gulp.watch(uglifyPath,['uglify_change']);
uglifyWatcher.on('change',function(event){
    console.log(event.type); //变化类型 added为新增,deleted为删除，changed为改变
    uglifyChangePath=funPack.rootPath(event.path);//变化的文件的路径
    console.log(funPack.rootPath(event.path));
});
uglifyWatcher.on('added',function(event){
    console.log(event.type); //变化类型 added为新增,deleted为删除，changed为改变
    uglifyChangePath=funPack.rootPath(event.path);//变化的文件的路径
    console.log(funPack.rootPath(event.path));
});


});

// zip
//gulp.task('zip', function () {
//  return gulp.src('build-zip/**/*')
//    .pipe(zip('m-front.zip'))
//    .pipe(gulp.dest('./'));
//});


gulp.task('build', function (callback) {
  runSequence('stylus_build','cssmin_build','swig_build','htmlmin_build','copy_index','tomd_build','webpack_build','uglify_build', callback);
});

gulp.task('pack', function () {
  runSequence('cssmin_build');
});

gulp.task('default', function () {
  runSequence('build', 'server');
});
