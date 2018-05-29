var webpack = require('webpack');

var packConfig = function(entry, output) {
	return {
		entry: entry,
		output: {
			path: __dirname + output,
			filename: "index.js",
			libraryTarget: 'umd'
		},
		module: {
			rules: [{
				test: /\.css$/,
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'css-loader',
					options: {
						modules: true
					}
				}]
			}, {
				test: /\.art$/,
				use: [{
					loader: 'art-template-loader'
				}]
			}]
		},
		optimization: {
			minimize: false
		},
		mode: 'production'
	}
}

var appPackConfig = function() {
	return packConfig("./src/app.js", "/")
}

var testPackConfig = function() {
	return packConfig("./test/app.js", "/test")
}

//var compiler = webpack(config);
//compiler.run();

pack = async function() {
	var compiler = webpack(appPackConfig());

	var app = await compiler.run(function(err, stats) {
		if (err) {
			console.log('错误：' + err);
		} else {
			console.log('正常：' + stats);
		}
	});
	console.log('app 编译完成！');

	compiler = webpack(testPackConfig());

	var test = await compiler.run(function(err, stats) {
		if (err) {
			console.log('错误：' + err);
		} else {
			console.log('正常：' + stats);
		}
	});
	console.log('test 编译完成！');
}

pack();