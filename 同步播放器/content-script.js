

chrome.runtime.onMessage.addListener(Listener);


/**
 * chrome 运行事件的监听函数 
 * @param {JSON} request 接收到的Message
 * @param {*} sender  pop.js发送端的插件和页面详情
 * @param {Function} sendResponse  发送的返回消息函数
 */	
function Listener (request, sender, sendResponse) {
	
	// console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");

	if (request.cmd == 	200) {
	    let currentTime = 0.0;
		currentTime = getCurTime();
		// alert(currentTime);
		sendResponse(currentTime);		
	} 
	else if (request.cmd == 400 ){
		setCurTime(request.value)
		sendResponse(400);
	} 
	else {
		console.log("Error1");
		sendResponse(600);		
	}
}

// bilibili video
var myVid = vv=document.getElementsByTagName("video")[0];


/**
 * 获取当前播放时间点
 * @returns {Number} currentTime当前时间点
 */
function getCurTime() {
	let currentTime = 0.0;
	currentTime =  myVid.currentTime;
	// alert(currentTime);
	console.log(currentTime);
	return currentTime;
}

/**
 * 设置当前播放时间点
 * @param {Number} time 需要设置的时间点
 */
function setCurTime(time) {
	myVid.currentTime = time;
	// myVid.play();
}

