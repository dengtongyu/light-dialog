#light-dialog

##前言
light-dialog弹窗组件用于手机移动端页面，不依赖jQuery或者zepto，不兼容低版本IE浏览器。
light-dialog基于flexible适配方案，样式表单位采用rem。
light-dialog基于webpack，JavaScript需要模块化引入。

##运行
在light-dialog目录里面运行 `npm install` ,安装完毕后运行 `gulp` 启动服务。

##用法

###引入js模块

	var dialog=require('./lightDialog');

###引入样式

	（因为样式采用rem单位，所以建议引入样式前声明$norm值，不声明则默认值为750）
	例如：
	$norm=640;
	@import './common/dialog-pop.styl';

###调用

	dialog.showMsgBoth('我是一个弹窗！',function(){
		dialog.showMsg('我点了确定按钮');
		return false;				
	},function(){
		dialog.showMsgRightTop('我点了取消按钮',function(){
			console.log('关闭')
		});
	},null,'关闭');

##实例

###普通弹窗，只有一个确定按钮

	document.querySelector('#btn-1').onclick=function () {
		dialog.showMsg('这是一个普通弹窗！');
	}

###交互弹窗，确定和取消按钮

	document.querySelector('#btn-2').onclick=function () {
		dialog.showMsgBoth('交互弹窗，确定和取消按钮',function () {
			dialog.showMsg('点击了确定');
		},function () {
			dialog.showMsg('点击了取消');
		});
	}

###交互弹窗，可以修改按钮文案

	document.querySelector('#btn-2-2').onclick=function () {
		dialog.showMsgBoth('交互弹窗，可以修改按钮文案',function () {
			dialog.showMsg('点击了好的');
		},function () {
			dialog.showMsg('点击了谢谢');
		},'好的','谢谢');
	}

###只有右上角的关闭按钮

	document.querySelector('#btn-3').onclick=function () {
		dialog.showMsgRightTop('只有右上角的关闭按钮，只有右上角的关闭按钮，只有右上角的关闭按钮');
	}

###底部有遮罩的弹窗

	document.querySelector('#btn-4-1').onclick=function () {
		dialog.showMsg('这是一个有遮罩的弹窗！',null,true);	//通过最后一个参数为true开启遮罩
	}
	document.querySelector('#btn-4-2').onclick=function () {
		dialog.showMsgRightTop('这是一个有遮罩的弹窗！',null,true);	//通过最后一个参数为true开启遮罩
	}

###阻止弹窗关闭

	document.querySelector('#btn-4-3').onclick=function () {
		dialog.showMsgBoth('我是一个不会关闭的弹窗！我是一个不会关闭的弹窗！我是一个不会关闭的弹窗！',function(){
			dialog.showMsg('下面的弹窗没有关闭哟！');
			return false			//通过return false阻止弹窗关闭
		},null,null,null,true);		//通过最后一个参数为true开启遮罩
	}
