package com.lyn.socket;


import org.apache.log4j.Logger;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.concurrent.CopyOnWriteArraySet;

/**
 * @ServerEndpoint 注解是一个类层次的注解，它的功能主要是将目前的类定义成一个websocket服务器端,
 * 注解的值将被用于监听用户连接的终端访问URL地址,客户端可以通过这个URL来连接到WebSocket服务器端
 */
@ServerEndpoint("/webSocketServer")
public class WebSocketManager {

    private static Logger logger = Logger.getLogger(WebSocketManager.class);

    //与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;

    //concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象。若要实现服务端与单一客户端通信的话，可以使用Map来存放，其中Key可以为用户标识
    private static CopyOnWriteArraySet<WebSocketManager> webSocketSet = new CopyOnWriteArraySet<>();

    @OnOpen
    public void onOpen(Session session) {
        this.session = session;
        webSocketSet.add(this);
        logger.info("WebSocket：建立WebSocket连接，当前WebSocket个数 - " + webSocketSet.size());
    }

    public void sendMessage(String message) throws IOException {
        logger.info("WebSocket:：服务端向客户端发送数据：" + message);
        this.session.getBasicRemote().sendText(message);
    }

    @OnClose
    public void onClose() {
        webSocketSet.remove(this);
        logger.info("WebSocket：关闭WebSocket连接，当前WebSocket个数 - " + webSocketSet.size());
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        logger.info("WebSocket：来自客户端的消息:" + message);
    }

    @OnError
    public void onError(Session session, Throwable error) {
        logger.info("WebSocket：发生错误");
        error.printStackTrace();
    }

    /**
     * 当前连接数
     *
     * @return
     */
    public static int size() {
        return webSocketSet.size();
    }

    /**
     * 广播数据
      * @param message
     */
    public static void broadCast(String message) {
        for (WebSocketManager webSocketManager : webSocketSet) {
            try {
                webSocketManager.sendMessage(message);
            } catch (IOException e) {
                logger.error(e.getMessage(), e);
            }
        }
    }

}
