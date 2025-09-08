package org.dromara.workinfo.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.dromara.common.core.domain.R;
import org.dromara.common.core.utils.StringUtils;
import org.dromara.workinfo.domain.AlertSmsTaskResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.xml.parsers.DocumentBuilderFactory;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/test")
public class testController {
    private static final String DB_URL = "jdbc:mysql://68.174.0.135:3306/leitsm";
//    private static final String DB_URL = "jdbc:mysql://localhost:3306/ry_plus";
    private static final String USER = "root";
    private static final String PASS = "x6t5Sd";
//    private static final String PASS = "199534";
//    @ResponseBody
//    @GetMapping(path = "/getLeaderData")
//    @CrossOrigin
//    public Map<String, Object> getLeaderData() throws UnsupportedEncodingException {
//        // 打印调用接口信息
//        System.out.println("调用接口！！！！");
//        // 获取当前日期并格式化
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//        String currentDate = LocalDate.now().format(formatter);
//        System.out.println("----------------------开始调用领导人接口------------------");
//        // 准备请求参数
//        Map<String, String> requestParams = new HashMap<>();
//        requestParams.put("ssdwid", "18");
//        requestParams.put("bbrq", currentDate);
//        // 发送请求
//        String data=request("http://68.174.26.110/qwcxtj/zbldap/findList", requestParams).toString();
//        int startIndex = data.indexOf("=")+1;
//        // 剔除最后一个字符
//        int endIndex = data.length() - 1;
//        String jsonSubstring = data.substring(startIndex, endIndex);
//        System.out.println("-------------------"+request("http://68.174.26.110/qwcxtj/zbldap/findList", requestParams).toString());
//        System.out.println("结果数据"+jsonSubstring);
//        Map<String, Object> responseMap = new HashMap<>();
//        responseMap.put("data", JSONObject.parse(jsonSubstring));
//        return responseMap;
//    }




    @GetMapping("/testMysql")
    public R<List<AlertSmsTaskResult>> testMysql()throws Exception{
        Map<String,String> map=new HashMap<>();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        List<AlertSmsTaskResult> alertSmsTaskResults=new ArrayList<>();
        try{
            System.out.println("开始查询");
            // SQL查询语句
            String sql = "select *\n" +
                    "        from alert_sms_task_result\n" +
                    "        where msg is not null  and msg_type is null\n" +
                    "        and sent_time >= curdate()\n" +
                    "        and sent_time < date_add(curdate(), interval 1 day)";
            // 1. 加载数据库驱动程序（对于MySQL 8.0及以上版本）
//            Class.forName("com.mysql.cj.jdbc.Driver");
            Class.forName("com.mysql.jdbc.Driver");
            // 2. 建立数据库连接
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            // 3. 创建SQL语句
            pstmt = conn.prepareStatement(sql);
            // 4. 执行查询并处理结果
            rs = pstmt.executeQuery();

            // 处理结果集
            while (rs.next()) {
                AlertSmsTaskResult alertSmsTaskResult=new AlertSmsTaskResult();
                alertSmsTaskResult.setId(Long.parseLong(rs.getString("id")));
                alertSmsTaskResult.setMsg(rs.getString("msg"));
                alertSmsTaskResult.setMobile(rs.getString("mobile"));
//                alertSmsTaskResult.setSentTime(Date.valueOf(rs.getString("sent_time")));
                if (StringUtils.isNotEmpty(rs.getString("msg_type"))){
                    alertSmsTaskResult.setMsgType(Long.parseLong(rs.getString("msg_type")));
                }
                alertSmsTaskResults.add(alertSmsTaskResult);
            }
        }catch (Exception e){
            e.printStackTrace();
        } finally {
            // 5. 关闭资源
            try {
                if (rs != null) rs.close();
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }
        }
        return R.ok(alertSmsTaskResults);
    }

    @GetMapping("/updateMsgType")
    public  boolean updateMsgType(String id) {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try {
            System.out.println("开始更新");
            // SQL更新语句
            String sql = "update alert_sms_task_result set msg_type='1' where id= ?";
            // 1. 加载数据库驱动程序（对于MySQL 8.0及以上版本）
//            Class.forName("com.mysql.cj.jdbc.Driver");
            Class.forName("com.mysql.jdbc.Driver");
            // 2. 建立数据库连接
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            // 3. 创建SQL语句
            pstmt = conn.prepareStatement(sql);
            // 设置参数（避免SQL注入风险）
            pstmt.setInt(1, Integer.parseInt(id));
            // 4. 执行更新并获取受影响的行数
            int affectedRows = pstmt.executeUpdate();
            System.out.println("更新完成，受影响的行数：" + affectedRows);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 5. 关闭资源
            try {
                if (rs != null) rs.close();
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }
        }
    return  true;
    }


    /**
     * 查询昨日，今日，本周，上周
     * @param
     * @return
     */
    @ResponseBody
    @GetMapping(path="/updateStatus")
    @CrossOrigin
    public  Map<String,String>  getWeekData()throws Exception{
        Map<String,String> map=new HashMap<>();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try{
            System.out.println("开始查询");
            // SQL查询语句
            String sql = "SELECT \n" +
                    "    'bz' AS Period,\n" +
                    "    COUNT(*) AS Count\n" +
                    "FROM \n" +
                    "    wf_itil_form_dg_ywgd_flow\n" +
                    "WHERE \n" +
                    "    DATE(ENDTIME) BETWEEN \n" +
                    "        DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) + 7 DAY) AND \n" +
                    "        DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) + 1 DAY)\n" +
                    "UNION ALL\n" +
                    "SELECT \n" +
                    "    'sz' AS Period,\n" +
                    "    COUNT(*) AS Count\n" +
                    "FROM \n" +
                    "    wf_itil_form_dg_ywgd_flow\n" +
                    "WHERE \n" +
                    "    DATE(ENDTIME) BETWEEN \n" +
                    "        DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) AND \n" +
                    "        DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 6 DAY)\n" +
                    "UNION ALL\n" +
                    "SELECT \n" +
                    "    'zr' AS Period,\n" +
                    "    COUNT(*) AS Count\n" +
                    "FROM \n" +
                    "    wf_itil_form_dg_ywgd_flow\n" +
                    "WHERE \n" +
                    "    DATE(ENDTIME) = CURDATE() - INTERVAL 1 DAY\n" +
                    "UNION ALL\n" +
                    "SELECT \n" +
                    "    'jr' AS Period,\n" +
                    "    COUNT(*) AS Count\n" +
                    "FROM \n" +
                    "    wf_itil_form_dg_ywgd_flow\n" +
                    "WHERE \n" +
                    "    DATE(ENDTIME) = CURDATE();";
            // 1. 加载数据库驱动程序（对于MySQL 8.0及以上版本）
            Class.forName("com.mysql.cj.jdbc.Driver");
            // 2. 建立数据库连接
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            // 3. 创建SQL语句
            pstmt = conn.prepareStatement(sql);
            // 4. 执行查询并处理结果
            rs = pstmt.executeQuery();
            // 处理结果集
            while (rs.next()) {
                // 假设表中有两列：id 和 name
//                int id = rs.getInt("id");
                String Period = rs.getString("Period");
                String Count=rs.getString("Count");
                map.put(Period, Count);
            }
            System.out.println("工单数据量统计："+map);
        }catch (Exception e){
            e.printStackTrace();
        } finally {
            // 5. 关闭资源
            try {
                if (rs != null) rs.close();
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }
        }
        return map;
    }

    @ResponseBody
    @GetMapping(path="/getPcAndJf")
    @CrossOrigin
    public  Map<String,String>  getPcAndJf()throws Exception{
        Map<String,String> map=new HashMap<>();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try{
            System.out.println("开始查询");
            // SQL查询语句
            String sql = "SELECT \n" +
                    "    SUM(CASE WHEN jfgztype LIKE '%PC%' THEN 1 ELSE 0 END) AS pc,\n" +
                    "    SUM(CASE WHEN jfgztype LIKE '%机房%' THEN 1 ELSE 0 END) AS jf\n" +
                    "FROM wf_itil_form_dg_ywgd_flow WHERE REPORTSTARTTIME >= CURDATE() \n" +
                    "  AND REPORTSTARTTIME < CURDATE() + INTERVAL 1 DAY;";
            // 1. 加载数据库驱动程序（对于MySQL 8.0及以上版本）
            Class.forName("com.mysql.cj.jdbc.Driver");
            // 2. 建立数据库连接
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            // 3. 创建SQL语句
            pstmt = conn.prepareStatement(sql);
            // 4. 执行查询并处理结果
            rs = pstmt.executeQuery();
            // 处理结果集
            while (rs.next()) {
                // 假设表中有两列：id 和 name
//                int id = rs.getInt("id");
                String pc = rs.getString("pc");
                String jf=rs.getString("jf");
                map.put("pc",pc);
                map.put("jf",jf);
            }
            System.out.println("统计机房和pc："+map);
        }catch (Exception e){
            e.printStackTrace();
        } finally {
            // 5. 关闭资源
            try {
                if (rs != null) rs.close();
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }
        }
        return map;
    }




    public static Map<String, Object> request(String URL, Map<String, String> postData) {
        OutputStream outputStream = null;
        InputStream inStream = null;
        String result = "";
        Map<String, Object> map = new HashMap<>();
        ObjectMapper objectMapper = new ObjectMapper(); // 创建ObjectMapper实例
        try {
            URL url = new URL(URL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("accept", "application/json");
            conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8"); // 修改为JSON格式
            conn.setConnectTimeout(10000);
            conn.setReadTimeout(20000);
            conn.setDoOutput(true);

            // 构建JSON格式的POST请求数据
            if (postData != null && !postData.isEmpty()) {
                String jsonInputString = objectMapper.writeValueAsString(postData); // 将Map转换为JSON字符串

                // 发送POST请求数据
                outputStream = conn.getOutputStream();
                outputStream.write(jsonInputString.getBytes("UTF-8"));
            }

            // 读取响应
            inStream = conn.getInputStream();
            BufferedReader br = new BufferedReader(new InputStreamReader(inStream, "UTF-8"));
            String line;
            while ((line = br.readLine()) != null) {
                result += line;
            }

            map.put("result", result);
            conn.disconnect();
        } catch (Exception e) {
            System.out.println("请求：" + URL + ",失败,");
            map.put("errorMsg", e.getMessage());
            map.put("result", e.getMessage());
        } finally {
            if (outputStream != null) {
                try {
                    outputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (inStream != null) {
                try {
                    inStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        System.out.println("----------------------结束调用接口------------------");
        return map;
    }


    public static Map<String, Object> getRequest(String URL, Map<String, String> queryParams) {
        InputStream inputStream = null;
        String result = "";
        Map<String, Object> map = new HashMap<>();
        try {
            // 构建完整的URL，包含查询参数
            StringBuilder urlBuilder = new StringBuilder(URL);
            if (queryParams != null &&!queryParams.isEmpty()) {
                urlBuilder.append("?");
                boolean firstParam = true;
                for (Map.Entry<String, String> entry : queryParams.entrySet()) {
                    if (!firstParam) {
                        urlBuilder.append("&");
                    }
                    urlBuilder.append(entry.getKey()).append("=").append(entry.getValue());
                    firstParam = false;
                }
            }
            URL url = new URL(urlBuilder.toString());
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("accept", "application/json");
            conn.setConnectTimeout(10000);
            conn.setReadTimeout(20000);

            // 读取响应
            int responseCode = conn.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                inputStream = conn.getInputStream();
                BufferedReader br = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));
                String line;
                while ((line = br.readLine()) != null) {
                    result += line;
                }
            } else {
                System.out.println("请求失败，响应码: " + responseCode);
                map.put("errorMsg", "请求失败，响应码: " + responseCode);
                map.put("result", "");
            }

            map.put("result", result);
            conn.disconnect();
        } catch (Exception e) {
            System.out.println("请求：" + URL + ",失败,");
            map.put("errorMsg", e.getMessage());
            map.put("result", e.getMessage());
        } finally {
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        System.out.println("----------------------结束调用接口------------------");
        return map;
    }



    public static void main(String[] args) throws Exception {
        Document doc = DocumentBuilderFactory.newInstance()
                .newDocumentBuilder()
                .parse("nwdcli.xml");

        Element cmd = (Element) doc.getElementsByTagName("CMD")
                .item(0);
        String command = cmd.getTextContent().trim();

        Process p = Runtime.getRuntime().exec(command);

        // 修改为使用GBK编码读取输出
        BufferedReader stdInput = new BufferedReader(new InputStreamReader(p.getInputStream(), "GBK"));
        BufferedReader stdError = new BufferedReader(new InputStreamReader(p.getErrorStream(), "GBK"));

        // 打印标准输出
        System.out.println("标准输出:");
        String s;
        while ((s = stdInput.readLine()) != null) {
            System.out.println(s);
        }

        // 打印错误输出
        System.out.println("错误输出:");
        while ((s = stdError.readLine()) != null) {
            System.out.println(s);
        }

        p.waitFor();
    }
}
