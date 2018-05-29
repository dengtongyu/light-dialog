/**
 * 
 * @authors Tony.Deng (dengtongyu123@163.com)
 * @date    2018-05-29 11:07:40
 * @version $Id$
 */



var dialog = require('../index');

document.querySelector('#btn-1').onclick = function() {
	dialog.alert('这是一个普通弹窗！');
}

document.querySelector('#btn-2').onclick = function() {
	dialog.confirm('交互弹窗，确定和取消按钮', function() {
		dialog.alert('点击了确定');
	}, function() {
		dialog.alert('点击了取消');
	});
}


document.querySelector('#btn-2-2').onclick = function() {
	dialog.confirm('交互弹窗，可以修改按钮文案', function() {
		dialog.alert('点击了好的');
	}, function() {
		dialog.alert('点击了谢谢');
	}, '好的', '谢谢');
}


document.querySelector('#btn-3').onclick = function() {
	dialog.tapPiece('只有右上角的关闭按钮，只有右上角的关闭按钮，只有右上角的关闭按钮');
}


document.querySelector('#btn-4-1').onclick = function() {
	dialog.alert('这是一个有遮罩的弹窗！', null, true); //通过最后一个参数为true开启遮罩
}
document.querySelector('#btn-4-2').onclick = function() {
	dialog.tapPiece('这是一个有遮罩的弹窗！', null, true); //通过最后一个参数为true开启遮罩
}

document.querySelector('#btn-4-3').onclick = function() {
	dialog.confirm('我是一个不会关闭的弹窗！我是一个不会关闭的弹窗！我是一个不会关闭的弹窗！', function() {
		dialog.alert('下面的弹窗没有关闭哟！');
		return false //通过return false阻止弹窗关闭
	}, null, null, null, true); //通过最后一个参数为true开启遮罩
}

document.querySelector('#btn-5-1').onclick = function() {
	dialog.piece('这是一个3秒后自动关闭的有遮罩的弹窗！', 3000); //通过最后一个参数为true开启遮罩
}