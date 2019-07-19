<%@ page language="java" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>用WebSocket实时获知比特币价格</title>
    <script type="text/javascript" src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
    <script type="text/javascript" src="initWebSocketTemplate.js"></script>
    <script type="text/javascript" src="index.js"></script>
</head>
<body>
<div style="width:400px;margin:20px auto;border:1px solid lightgray;padding:20px;text-align:center;">
    当前比特币价格：￥<span style="color:#FF7519" id="price">10000</span>
    <div style="font-size:0.9em;margin-top:20px">查看的人数越多，价格越高, 当前总共 <span id="total">1</span> 个人在线</div>
    <div style="color:silver;font-size:0.8em;margin-top:20px">以上价格纯属虚构，如有雷同，so what？</div>
</div>
</body>

</html>