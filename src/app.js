/**
 * 
 * @authors Tony.Deng (dengtongyu123@163.com)
 * @date    2018-05-28 16:40:08
 * @version $Id$
 */


var dialogStyle = require('./style/style.css');

var dialogTpl = require('./tpl/dialog.art');

var config = {
	yesShow: true, //是否显示确定按钮
	noShow: false, //是否显示取消按钮
	closeBtnShow: false, //是否显示右上角关闭按钮
}

var bodyDom = document.querySelector('body'),
	tempDom, popObj = {};
//visible='display:block;visibility:hidden';

//合并对象
function extend(des, src) {
	for (var key in src) {
		des[key] = src[key]
	}
	return des;
}

//创建dom
function strDom(html) {
	tempDom = document.createElement('div');
	tempDom.innerHTML = html;
	return tempDom.childNodes;
};

//过滤字符DOM
function filterNode(nodeList) {
	var newNodeList = [];
	for (var i = 0; i < nodeList.length; i++) {
		newNodeList.push(nodeList[i]);
	}
	return newNodeList;
}

//插入节点
function insertHtml(nodeList, parentNode) {
	for (var i = 0; i < nodeList.length; i++) {
		parentNode.appendChild(nodeList[i]);
	}
}


//计算居中
function popDomCenter(node, key) {
	//node.setAttribute('style',visible);
	var className = node.getAttribute('class') + ' ' + dialogStyle['animated'] + ' ' + dialogStyle['bounceIn'];
	node.setAttribute('class', className);
	node.setAttribute('style', 'margin-top:-' + (node.offsetHeight / 2) + 'px;margin-left:-' + (node.offsetWidth / 2) + 'px');
	className = null;
}

//选中弹窗
function selectPopDom(nodeList, key) {
	for (var i = 0; i < nodeList.length; i++) {
		if (nodeList[i].id == key) {
			return nodeList[i]
		} else {
			return null;
		}
	}
}

//确定按钮
function bindYesButton(node, cb) {
	node.querySelector('#dialog-yes-btn').onclick = function() {
		var popId = this.getAttribute('sub');
		if (typeof cb === 'function') cb() === false || closePop(popId);
		else closePop(popId);
	}
}


//取消按钮
function bindNoButton(node, cb) {
	node.querySelector('#dialog-no-btn').onclick = function() {
		var popId = this.getAttribute('sub');
		if (typeof cb === 'function') cb() === false || closePop(popId);
		else closePop(popId);
	}
}

//关闭按钮
function bindCloseButton(node, cb) {
	node.querySelector('#dialog-close-btn').onclick = function() {
		var popId = this.getAttribute('sub');
		closePop(popId);
		if (typeof cb === 'function') cb();
	}
}

//关闭弹窗
function closePop(popId) {
	if (popId) {
		for (var i = 0; i < popObj[popId].length; i++) {
			bodyDom.removeChild(popObj[popId][i]);
		}
		delete popObj[popId];
	}
	popId = null;
}

//创建弹窗
function baseAlert(obj) {
	obj.popId = new Date().getTime();
	var configTemp = JSON.parse(JSON.stringify(config));
	obj = extend(configTemp, obj);
	obj.style = dialogStyle;

	var nodeList = filterNode(strDom(dialogTpl(obj)));
	popObj[obj.popId] = nodeList;
	insertHtml(nodeList, bodyDom);
	var popDom = selectPopDom(popObj[obj.popId], obj.popId);
	if (obj.text) {
		insertHtml(filterNode(strDom(obj.text)), popDom.querySelector('#dialog-content'));
	}
	popDomCenter(popDom, obj.popId);

	if (obj.yesShow) {
		bindYesButton(popDom, obj.yesFun);
	};

	if (obj.noShow) {
		bindNoButton(popDom, obj.noFun);
	};

	if (obj.closeBtnShow) {
		bindCloseButton(popDom, obj.closeFun);
	};

	if (obj.time > 0) {
		setTimeout(function() {
			closePop(obj.popId);
		}, obj.time)
	}
	configTemp = popDom = nodeList = null;
}

//普通弹窗，只有一个确定按钮
function alert(text, cb, showMark) {
	baseAlert({
		text: text, //提示文案
		yesFun: cb, //确定按钮的回调函数
		showMark: showMark //是否显示遮罩
	});
}

//交互弹窗，确定和取消按钮
function confirm(text, yesFun, noFun, yesBtnText, noBtnText, showMark) {
	baseAlert({
		text: text, //提示文案
		noShow: true, //显示取消按钮
		yesFun: yesFun, //确定按钮的回调函数
		noFun: noFun, //取消按钮的回调函数
		yesBtnText: yesBtnText, //确定按钮的文案
		noBtnText: noBtnText, //取消按钮的文案
		showMark: showMark //是否显示遮罩
	});
}

//贴片弹窗，只有右上角的关闭按钮
function tapPiece(text, closeFun, showMark) {
	baseAlert({
		text: text, //提示文案
		yesShow: false, //不显示确定按钮
		closeBtnShow: true, //显示右上角关闭按钮
		closeFun: closeFun, //关闭按钮的回调函数
		showMark: showMark //是否显示遮罩
	});
}

//贴片弹窗，自动关闭
function piece(text, time, showMark) {
	baseAlert({
		text: text, //提示文案
		yesShow: false, //不显示确定按钮
		closeBtnShow: false, //显示右上角关闭按钮
		time: time, //关闭按钮的回调函数
		showMark: showMark //是否显示遮罩
	});
}

exports.baseAlert = baseAlert //基础创建弹窗方法
exports.alert = alert; //普通弹窗，只有一个确定按钮
exports.confirm = confirm; //交互弹窗，确定和取消按钮
exports.tapPiece = tapPiece; //贴片弹窗，只有右上角的关闭按钮
exports.piece = piece; //贴片弹窗，自动关闭