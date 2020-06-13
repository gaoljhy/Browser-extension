

$('#btn_create').click(function () {
	getVideoTimePosition();

});


$('#btn_change').click(function () {
	setVideoTimePosition(timeDistance())

});

/**
 *  获取界面分享的Code
 * @returns {JSON} 返回Code 的 JSON对象
 */
function getCode() {
	let textC = document.getElementById("text_change");
	let proCode = textC.value;
	if (proCode != "") {
		return JSON.parse( proCode);
	} else {
		alert("请粘贴所分享的代码")
	}
}

/**
 * 获取时间差
 * @returns {Number} 时间节点差
 */
function timeDistance() {
// {"time":1592056769158,"video":2.813366} 
// {"time":1592056777463,"video":8.949177}
// 8305  6.135811
	let proCode= getCode();
	return proCode.video;
}

/**
 * 生成同步Code,复制之后并刷新到界面
 * @returns  {JSON} 返回同步代码
 */
function createCode(response) {
	timeStamp = getTime();
	// alert(timeStamp)
	code = {
		time: timeStamp,
		video: response
	}
	aal = JSON.stringify(code);
	alert("点击复制");
	setValue(aal);
	
}

/**
 * 将同步码字符串进行编码,复制后显示到界面上
 *   @param {String} proCode json转换之后的字符串
 */
function setValue(proCode) {
	let textC = document.getElementById("text_create");
	textC.value=proCode;
    textC.select(); // 选中文本
    document.execCommand("copy"); // 执行浏览器复制命令
}


/**
 * 获取当前时间
 * @returns {Date} 返回格林尼治时间timestamp 时间戳*1000就是毫秒数
 */
function getTime() {
	return new Date().getTime();
}


/**
 * 向content-script.js 发送信息
 * @param {JSON} message 发送的消息
 * @param {Function} callback 回调函数
 */
function sendMessageToContentScript(message, callback) {
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
			if (callback) callback(response);
		});
	});
}

/**
 * 获取当前视频播放的位置时间点
 * @returns {Number} time 返回位置时间
 */
function getVideoTimePosition() {

	sendMessageToContentScript({
			cmd: 200,
			value: '获取播放时间点'
		},
		createCode
	);

}

/**
 *  设置当前视频播放的位置时间点
 * @param {Number} time 跳转位置
 */
function setVideoTimePosition(time) {
	sendMessageToContentScript({
			cmd: 400,
			value: time
		},
		function (response) {
			// alert(response)
			console.log('来自content的回复：' + response);
		}
	);
}



