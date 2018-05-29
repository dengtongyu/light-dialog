/**
 * 
 * @authors Tony.Deng (dengtongyu123@163.com)
 * @date    2018-05-28 20:38:55
 * @version $Id$
 */

var http = require('http');
var fs = require('fs');
var path = require("path");

http.createServer(function(request, response) {

	console.log(request.url);

	var filepath = path.resolve("/" + request.url);

	var fileExt = path.extname(filepath);
	var mimeType = mimeLookup[fileExt] ? mimeLookup[fileExt] : 'text/plain';

	var re = new RegExp('^/test($|/)');
	var result = re.test(filepath);


	console.log(filepath, fileExt, mimeType);

	if (result) {
		console.log('test路由！');
		//response.sendFile(__dirname + url);
		fs.readFile(__dirname + filepath, function(err, data) {
			if (err) {
				//未找到文件
				send404(response);
			} else {
				//成功读取文件
				response.writeHead(200, {
					'content-type': mimeType + ';charset="utf-8'
				});
				response.write(data);
				response.end();
			}
		});
	} else {
		console.log('其他路由！');
		// 发送 HTTP 头部 
		// HTTP 状态值: 200 : OK
		// 内容类型: text/plain
		response.writeHead(200, {
			'Content-Type': 'text/plain'
		});

		// 发送响应数据 "Hello World"
		response.end('Hello World\n');
	}
}).listen(8888);

function send404(response) {
	response.writeHead(404, {
		"Content-Type": "text/plain"
	});
	response.write("Error 404: Resource not found.");
	response.end();
}

var mimeLookup = {
	".js": "application/javascript",
	".html": "text/html",
	".css": "text/css"
};


// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');