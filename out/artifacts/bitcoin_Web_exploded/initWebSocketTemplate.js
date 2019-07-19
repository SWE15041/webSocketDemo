var WebSocketTemplate = {};

WebSocketTemplate.websocket = null;

/**
 *
 * @param param
 *  {
 *      url: websocket url
 *      error: 连接发生错误的回调方法
 *      open: 连接成功建立的回调方法
 *      message: 接收到消息的回调方法
 *      close: 连接关闭的回调方法
 *  }
 */
WebSocketTemplate.init = function (param) {
    //判断当前浏览器是否支持WebSocket
    console.log('WebSocket支持? | '+('WebSocket' in window));
    if ('WebSocket' in window) {
        var url;
        if (param.url.startsWith('https://')){
            url = "wss://"+param.url.replace('https://', '');
        }else {
            url = "ws://"+param.url.replace('http://', '');
        }
        // console.log(url);
        WebSocketTemplate.websocket = new WebSocket(url);
    }
    else {
        alert('当前浏览器 Not support websocket')
    }

    //连接发生错误的回调方法
    WebSocketTemplate.websocket.onerror = function () {
        if (param.error !== undefined){
            param.error();
        }
    };

    //连接成功建立的回调方法
    WebSocketTemplate.websocket.onopen = function () {
        if (param.open !== undefined){
            param.open();
        }
    };

    //接收到消息的回调方法
    WebSocketTemplate.websocket.onmessage = function (event) {
        if (param.message !== undefined){
            param.message(event);
        }
    };

    //连接关闭的回调方法
    WebSocketTemplate.websocket.onclose = function () {
        if (param.close !== undefined){
            param.close();
        }
    };
};



//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
    closeWebSocket();
};

//关闭WebSocket连接
function closeWebSocket() {
    WebSocketTemplate.websocket.close();
}

//发送消息
function send() {
    // var message = document.getElementById('text').value;
    // WebSocketTemplate.websocket.send(message);
}