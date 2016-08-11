var glob=require('glob');

var arrPath=glob.sync('src/script/*.js');

function fileList(dir) {
	var opt='';
	for (var i = 0; i < arrPath.length; i++) {
		var val=arrPath[i].split('/script/')[1];
		var key=val.split('.')[0];
		opt+=(i==0?'{':'')+'"'+key+'":"'+dir+val+'"'+(i==arrPath.length-1?'}':',');
	};
	console.log(opt);
	//console.log(JSON.parse(opt));
	return JSON.parse(opt);
}

function changeFile(dir) {
	console.log(dir);
	var val='./'+dir;
	var key=dir.split('/script/')[1].split('.')[0];
	var opt='{"'+key+'":"'+val+'"}';
	val=key=null;
	console.log(opt);
	//console.log(JSON.parse(opt));
	return JSON.parse(opt);
}
//changeFile('src/script/logic/test/index.js');

//获取相对src的文件路径
function rootPath(path) {
	//console.log(path);
	var breakPath=path.split('light-dialog')[1];
	var arr=breakPath.split('\\').length==1?breakPath.split('/'):breakPath.split('\\');
	var newPath='';
	for (var i = 1; i < arr.length; i++) {
		newPath+=arr[i]+(i==arr.length-1?'':'/');
	};
	//newPath='src/pages/'+newPath.split('/pages/')[1];
	breakPath=i=arr=null;
	return newPath;
}

exports.readdir=fileList;
exports.changeFile=changeFile;
exports.rootPath=rootPath;
