package com.lyn.log;

import org.apache.log4j.Logger;

public class TestLog4j {
    private static Logger logger = Logger.getLogger(TestLog4j.class);

    public static void main(String[] args) {
//        PropertyConfigurator.configure("F:\\lyn\\Java\\Project\\websocket\\bitcoin\\src\\resource\\log4j.properties");
        logger.trace("跟踪信息");
        logger.info("输出信息");
        logger.debug("调试信息");
        logger.fatal("致命信息");
        logger.error("错误信息");
        logger.warn("警告信息");
    }
}
