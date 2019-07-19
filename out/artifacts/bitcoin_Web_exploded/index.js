// <script type="text/javascript">
$(function () {
    console.log("执行websocket");
    initMachineStatusWebSocket();
    initFirstLoadInterval();
});

//处理机器状态的 webSocket
function initMachineStatusWebSocket() {
    WebSocketTemplate.init({
        url: "http://127.0.0.1:8083/webSocketServer",
        open: function () {
            // 连接成功建立的回调方法
            console.log("客户端链接成功");
        },
        close: function () {
            // 连接关闭的回调方法
            console.log("WebSocket连接关闭");
        },
        message: function (event) {
            // 接收到消息的回调方法
            var bitcoin = JSON.parse(event.data);
            console.log("服务端返回的数据：" + event.data);
            // var bitcoin = eval("(" + datas + ")");
            document.getElementById('price').innerHTML = bitcoin.price;
            document.getElementById('total').innerHTML = bitcoin.total;
        },
        error: function () {
            // 连接发生错误的回调方法
            console.log("WebSocket连接发生错误");
        }
    });
}

// 首次初始化, 定义的定时器
function initFirstLoadInterval() {
    console.log("客户端向服务端发送请求")
    aFirstInt = setInterval(function () {
        if (WebSocketTemplate.websocket !== null) {
            WebSocketTemplate.websocket.send('触发进度展示');
            clearInterval(aFirstInt);
        }
    }, 200);
}

// </script>