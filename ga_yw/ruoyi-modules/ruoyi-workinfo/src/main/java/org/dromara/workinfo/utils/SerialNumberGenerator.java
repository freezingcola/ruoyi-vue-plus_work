package org.dromara.workinfo.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class SerialNumberGenerator {

    // 日期时间格式，精确到毫秒  
    private static final String DATETIME_FORMAT = "yyyyMMddHHmmssSSS";

    // 生成基于年月日时分秒毫秒的流水号（不添加额外序列号）  
    public static String generateBasicSerialNumber() {
        // 获取当前日期时间的字符串表示，精确到毫秒  
        SimpleDateFormat sdf = new SimpleDateFormat(DATETIME_FORMAT);
        return sdf.format(new Date());
    }

    // 生成基于年月日时分秒毫秒和序列号的流水号  
    public static String generateSerialNumberWithSequence() {
        // 静态变量用于模拟序列号（在实际应用中，可能需要更复杂的逻辑来生成序列号）  
        // 注意：这里的静态变量不适用于多线程环境，仅作为示例  
        int sequence = 0;
        synchronized (SerialNumberGenerator.class) {
            sequence++;
        }

        // 获取当前日期时间的字符串表示，精确到毫秒  
        SimpleDateFormat sdf = new SimpleDateFormat(DATETIME_FORMAT);
        String datetimePart = sdf.format(new Date());

        // 将序列号格式化为固定长度的字符串（例如，3位数字，前面补0）  
        String seqStr = String.format("%01d", sequence);

        // 组合日期时间部分和序列号部分形成流水号  
        return datetimePart;
    }

    public static void main(String[] args) {
        // 测试生成基本的流水号（不带序列号）  
        System.out.println("Basic Serial Number: " + generateBasicSerialNumber());

        // 测试生成带序列号的流水号（注意：由于使用了静态变量和同步块，这里的序列号会递增）  
        for (int i = 0; i < 5; i++) {
            System.out.println("Serial Number with Sequence: " + generateSerialNumberWithSequence());
        }
    }
}