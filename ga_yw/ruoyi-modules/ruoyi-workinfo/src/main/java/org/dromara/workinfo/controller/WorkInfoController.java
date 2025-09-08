package org.dromara.workinfo.controller;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import cn.hutool.core.io.resource.InputStreamResource;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import lombok.RequiredArgsConstructor;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.*;
import cn.dev33.satoken.annotation.SaCheckPermission;
import org.dromara.common.core.utils.StringUtils;
import org.dromara.common.redis.utils.RedisUtils;
import org.dromara.common.satoken.utils.LoginHelper;
import org.dromara.system.domain.vo.SysOssVo;
import org.dromara.system.service.ISysOssService;
import org.dromara.system.service.ISysUserService;
import org.dromara.workinfo.domain.WorkInfo;
import org.dromara.workinfo.domain.bo.WorkInfoLogBo;
import org.dromara.workinfo.domain.vo.WorkInfoCountVo;
import org.dromara.workinfo.domain.vo.WorkInfoLogVo;
import org.dromara.workinfo.domain.vo.WorkInfoProjectCountVo;
import org.dromara.workinfo.service.IWorkInfoLogService;
import org.dromara.workinfo.service.IWorkProjectService;
import org.dromara.workinfo.utils.TimeParamsUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.annotation.Validated;
import org.dromara.common.idempotent.annotation.RepeatSubmit;
import org.dromara.common.log.annotation.Log;
import org.dromara.common.web.core.BaseController;
import org.dromara.common.mybatis.core.page.PageQuery;
import org.dromara.common.core.domain.R;
import org.dromara.common.core.validate.AddGroup;
import org.dromara.common.core.validate.EditGroup;
import org.dromara.common.log.enums.BusinessType;
import org.dromara.common.excel.utils.ExcelUtil;
import org.dromara.workinfo.domain.vo.WorkInfoVo;
import org.dromara.workinfo.domain.bo.WorkInfoBo;
import org.dromara.workinfo.service.IWorkInfoService;
import org.dromara.common.mybatis.core.page.TableDataInfo;

/**
 * 工单管理
 *
 * @author Lion Li
 * @date 2024-06-01
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/workInfo/workInfo")
public class WorkInfoController extends BaseController {

    private final IWorkInfoService workInfoService;

    private final IWorkInfoLogService workInfoLogService;

    private final ISysUserService userService;

    private  final ISysOssService sysOssService;

    private final IWorkProjectService workProjectService;

    private final ISysUserService sysUserService;


    /**
     * 查询工单管理列表
     */
    @SaCheckPermission("workInfo:workInfo:list")
    @GetMapping("/list")
    public TableDataInfo<WorkInfoVo> list(WorkInfoBo bo, PageQuery pageQuery) {
        return workInfoService.queryPageList(bo, pageQuery);
    }

    @GetMapping("/blist")
    public R<List<WorkInfo>> blist(WorkInfoBo bo, PageQuery pageQuery) {
        LocalDate today = LocalDate.now();
        // 创建日期格式化器，指定格式为 yyyy-MM-dd
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        // 使用格式化器格式化当前日期
        String formattedDate = today.format(formatter);
        QueryWrapper<WorkInfo> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("state","1");
        queryWrapper.like("start_time",formattedDate);
        List<WorkInfo> list=workInfoService.selectList(queryWrapper);
        return R.ok(list);
    }

    @GetMapping("/alist")
    public R<List<WorkInfo>> alist(WorkInfoBo bo, PageQuery pageQuery) {
        LocalDate today = LocalDate.now();
        // 创建日期格式化器，指定格式为 yyyy-MM-dd
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        // 使用格式化器格式化当前日期
        String formattedDate = today.format(formatter);
        QueryWrapper<WorkInfo> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("state","2");
        queryWrapper.like("start_time",formattedDate);
        List<WorkInfo> list=workInfoService.selectList(queryWrapper);
        return R.ok("当前时间："+formattedDate,list);
    }

    /**
     * 待审核列表
     */
//    @SaCheckPermission("workInfo:workInfo:Auditlist")
    @GetMapping("/Auditlist")
    public TableDataInfo<WorkInfoVo> Auditlist(WorkInfoBo bo, PageQuery pageQuery) {
        return workInfoService.queryAuditPageList(bo, pageQuery);
    }

    @GetMapping("/workInfoCount")
    public TableDataInfo<WorkInfoCountVo> workInfoCount(){
        return TableDataInfo.build(workInfoService.workInfoCount());
    }

    @GetMapping("/workInfoWeekCount")
    public TableDataInfo<WorkInfoCountVo> workInfoWeekCount(int week){
        TimeParamsUtils.TimeParams params;
        if(week == 1)
            params = TimeParamsUtils.createTimeParamsPrevWeek();
        else
            params = TimeParamsUtils.createTimeParamsCurrentWeek();
        if(week >= 2){
            params = TimeParamsUtils.createTimeParamsNextWeek();
        }
        List<WorkInfoCountVo> datas = workInfoService.workInfoTimeWeekCount(params.getStart(), params.getEnd());
//        datas.addAll(workInfoService.workInfoTimeWeekCount(params.getStart(), params.getEnd()));
        return TableDataInfo.build(datas);
    }

    @GetMapping("/selectCount")
    public TableDataInfo<WorkInfoCountVo> selectCount(){
        return TableDataInfo.build(workInfoService.selectCount());
    }

    @GetMapping("/workInfoTimeCount")
    public TableDataInfo<WorkInfoCountVo> workInfoTimeCount(){
        return TableDataInfo.build(workInfoService.selectWorkInfoTimeCount());
    }

    @GetMapping("/workInfoProjectCount")
    public TableDataInfo<WorkInfoProjectCountVo> workInfoProjectCount(){
        return TableDataInfo.build(workInfoService.workInfoProjectCount());
    }

    /**
     * 导出工单管理列表
     */
    @SaCheckPermission("workInfo:workInfo:export")
    @Log(title = "工单管理", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(WorkInfoBo bo, HttpServletResponse response) {
        List<WorkInfoVo> list = workInfoService.queryList(bo);
        ExcelUtil.exportExcel(list, "工单管理", WorkInfoVo.class, response);
    }

    /**
     * 获取工单管理详细信息
     *
     * @param id 主键
     */
    @SaCheckPermission("workInfo:workInfo:query")
    @GetMapping("/{id}")
    public R<WorkInfoVo> getInfo(@NotNull(message = "主键不能为空")
                                 @PathVariable Long id) {
        return R.ok(workInfoService.queryById(id));
    }

    /**
     * 新增工单管理
     */
    @SaCheckPermission("workInfo:workInfo:add")
    @Log(title = "工单管理", businessType = BusinessType.INSERT)
    @RepeatSubmit()
    @PostMapping()
    public R<Void> add(@Validated(AddGroup.class) @RequestBody WorkInfoBo bo) {
        return toAjax(workInfoService.insertByBo(bo));
    }

    @Log(title = "提交工单完成记录", businessType = BusinessType.INSERT)
    @RepeatSubmit()
    @PostMapping("finish")
    public R<Void> finishWorkInfo(@Validated(AddGroup.class) @RequestBody WorkInfoLogBo bo) {
        Long workInfoId = bo.getWorkInfoId();
        WorkInfoVo workInfoVo = workInfoService.queryById(workInfoId);
        if(workInfoVo == null)
            throw new RuntimeException("没有找到对应工单id=" + workInfoId);
        Long userId = LoginHelper.getUserId();

//        LoginHelper.getLoginUser().getRolePermission().equals("");

        if(!userId.equals(workInfoVo.getAcceptAccount()))
            throw new RuntimeException("你不是该工单的接收人!");
        return toAjax(workInfoLogService.finishWorkInfo(bo, workInfoVo));
    }


    @Log(title = "接收工单完成记录", businessType = BusinessType.INSERT)
    @RepeatSubmit()
    @PostMapping("receive")
    public R<Void> receiveWorkInfo(@Validated(AddGroup.class) @RequestBody WorkInfoLogBo bo) {
        Long workInfoId = bo.getWorkInfoId();
        WorkInfoVo workInfoVo = workInfoService.queryById(workInfoId);
        if(workInfoVo == null)
            throw new RuntimeException("没有找到对应工单id=" + workInfoId);
        Long userId = LoginHelper.getUserId();

//        LoginHelper.getLoginUser().getRolePermission().equals("");

        if(!userId.equals(workInfoVo.getAcceptAccount()))
            throw new RuntimeException("你不是该工单的接收人!");
        return toAjax(workInfoLogService.receiveWorkInfo(bo, workInfoVo));
    }

    @Log(title = "审核工单完成情况", businessType = BusinessType.INSERT)
//    @SaCheckRole(value = {"wf_captain", "an_captain"})
    @RepeatSubmit()
    @PostMapping("audit")
    public R<Void> finishAudit(@Validated(AddGroup.class) @RequestBody WorkInfoLogBo bo) {
        Long workInfoId = bo.getWorkInfoId();
        WorkInfoVo workInfoVo = workInfoService.queryById(workInfoId);
        if(workInfoVo == null)
            throw new RuntimeException("没有找到对应工单id=" + workInfoId);
        Long userId = LoginHelper.getUserId();
        return toAjax(workInfoLogService.finishAudit(bo, workInfoVo));
    }

    /**
     * 修改工单管理
     */
    @SaCheckPermission("workInfo:workInfo:edit")
    @Log(title = "工单管理", businessType = BusinessType.UPDATE)
    @RepeatSubmit()
    @PutMapping()
    public R<Void> edit(@Validated(EditGroup.class) @RequestBody WorkInfoBo bo) {
        return toAjax(workInfoService.updateByBo(bo));
    }

    /**
     * 接收工单
     */
    @SaCheckPermission("workInfo:workInfo:accept")
    @Log(title = "工单管理", businessType = BusinessType.UPDATE)
    @RepeatSubmit()
    @GetMapping("accept/{ids}")
    public R<Void> accept(@NotEmpty(message = "主键不能为空")
                          @PathVariable Long[] ids) {
        return toAjax(workInfoService.accept(ids));
    }

    /**
     * 删除工单管理
     *
     * @param ids 主键串
     */
    @SaCheckPermission("workInfo:workInfo:remove")
    @Log(title = "工单管理", businessType = BusinessType.DELETE)
    @DeleteMapping("/{ids}")
    public R<Void> remove(@NotEmpty(message = "主键不能为空")
                          @PathVariable Long[] ids) {
        return toAjax(workInfoService.deleteWithValidByIds(List.of(ids), true));
//        return toAjax(workInfoService.deleteWithValidByIds(null, true));
    }

    /**
     * 根据流水号查询流程图数据
     */
//    @SaCheckPermission("workInfo:workInfo:selectByLsh")
    @GetMapping("/listByLsh")
    public R<List<WorkInfoLogVo>> listByLsh(@RequestParam  String lsh) throws JsonProcessingException {
        List<WorkInfoLogVo> workInfoLogVoList=new ArrayList<>();
        //先根据流水号查出id
        List<WorkInfo> workInfo=workInfoService.selectList(new QueryWrapper<WorkInfo>().eq("number", lsh));
        if (!workInfo.isEmpty()) {
            WorkInfoLogBo workInfoLogBo=new WorkInfoLogBo();
            workInfoLogBo.setWorkInfoId(workInfo.get(0).getId());
            workInfoLogVoList=workInfoLogService.queryList(workInfoLogBo);
            //如果刚创建则走这里
            if (workInfoLogVoList.size()==0&&workInfo.size()!=0){
                //查询名称
                String projectName=workProjectService.queryById(Long.parseLong(workInfo.get(0).getProjectName())).getProName();
                WorkInfoLogVo workInfoLogVo=new WorkInfoLogVo();;
                workInfoLogVo.setCreateBy(String.valueOf(workInfo.get(0).getCreateBy()));
                workInfoLogVo.setState("2");
                workInfoLogVo.setWorkContent("已创建，等待分配...");
                workInfoLogVo.setAttachs(workInfo.get(0).getAttachs());
                workInfoLogVo.setWorkLevel(workInfo.get(0).getWorkLevel());
                workInfoLogVo.setContactPerson(workInfo.get(0).getContactPerson());
                //增加项目名称
                workInfoLogVo.setProjectName(projectName);
                workInfoLogVo.setWorkTitle(workInfo.get(0).getWorkTitle());
                workInfoLogVoList.add(workInfoLogVo);
            }
            //查询名字
            for (WorkInfoLogVo workInfoLogVo:workInfoLogVoList){
                String projectName=workProjectService.queryById(Long.parseLong(workInfo.get(0).getProjectName())).getProName();
                workInfoLogVo.setWorkLevel(workInfo.get(0).getWorkLevel());
                workInfoLogVo.setContactPerson(workInfo.get(0).getContactPerson());
                workInfoLogVo.setProjectName(projectName);
                workInfoLogVo.setWorkTitle(workInfo.get(0).getWorkTitle());
                //增加类型和对接人
                workInfoLogVo.setWorkType(workInfo.get(0).getWorkType());
                JSONArray jsonArray1=new JSONArray();
                String fileList=workInfoLogVo.getAttachs();
                workInfoLogVo.setCreateBy(userService.selectUserById(Long.parseLong(workInfoLogVo.getCreateBy())).getNickName());
                //处理图片过大问题
                if (workInfoLogVo.getWorkContent().matches(".*<img.*>.*")){
                    workInfoLogVo.setWorkContent(addImageStyle(workInfoLogVo.getWorkContent(), "width:1000px;"));
                }
                /**
                 * 强制修改创建人与接收人
                 */
                workInfoLogVo.setCreateBy(workInfoLogVoList.get(0).getCreateBy());
                workInfoLogVo.setAllocationBy(userService.selectUserById(workInfo.get(0).getAcceptAccount()).getNickName());
                //如果为待接收，则查询分配人
                if (workInfoLogVo.getState().equals("2")){
//                    workInfoLogVo.setAttachs(workInfo.get(0).getAttachs());
                    workInfoLogVo.setAllocationBy(userService.selectUserById(workInfo.get(0).getAcceptAccount()).getNickName());
                    fileList=workInfo.get(0).getAttachs();
                    workInfoLogVo.setAttachs(workInfo.get(0).getAttachs());
                    //查询所有附件
                    if (StringUtils.isNotBlank(fileList)){
                        JSONArray jsonArray=JSONUtil.parseArray(fileList);
                        //查询附件详情
                        for (int i=0;i<jsonArray.size();i++){
                            JSONObject urlJsonObejct=new JSONObject();
                            JSONObject jsonObject=new JSONObject();
                            jsonObject=(JSONObject)jsonArray.get(i);
                            SysOssVo sysOss=sysOssService.getById(Long.parseLong(jsonObject.get("id").toString()));
//                            SysOssVo sysOss=sysOssService.getById(Long.parseLong("1892032353753632771"));
                            urlJsonObejct.put("id",sysOss.getOssId().toString());
                            urlJsonObejct.put("name",sysOss.getFileName());
                            jsonArray1.add(urlJsonObejct);
                        }
                        workInfoLogVo.setUrlList(jsonArray1.toString());
                    }
                }else {
                    if (StringUtils.isNotBlank(fileList)){
                        String[] stringArray = fileList.split(",");
                        for (int i=0;i<stringArray.length;i++){
                            JSONObject urlJsonObejct=new JSONObject();
                            SysOssVo sysOss=sysOssService.getById(Long.parseLong(stringArray[i].toString()));
//                            SysOssVo sysOss=sysOssService.getById(Long.parseLong("1896358059909742600"));
                            urlJsonObejct.put("id",sysOss.getOssId().toString());
                            urlJsonObejct.put("name",sysOss.getFileName());
                            jsonArray1.add(urlJsonObejct);
                        }
                        workInfoLogVo.setUrlList(jsonArray1.toString());
                        workInfoLogVo.setAttachs(jsonArray1.toString());
                    }
                }
            }
        }
        return R.ok(workInfoLogVoList);
    }

//    @PostMapping("dowwwwn")
//    public void dowwwn(HttpServletRequest request, HttpServletResponse response, @RequestBody  String urlList)throws IOException{
//        HttpUtil.get("http://localhost/downloadAttachments");
//    }

    @GetMapping("/dowwwwn")
    public ResponseEntity<InputStreamResource> downloadZip() throws IOException {
        // 要压缩的文件路径列表
        String[] filePaths = {
//                "path/to/your/file1.txt",
                "D:\\upload\\upload\\2024\\12\\23\\v2-3ee8f4a611e1188f5c0b0da7c35c4543_r_20241223151315A002.jpg"
        };

        // 创建临时压缩文件
        File zipFile = new File("temp-download.zip");
        try (ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(zipFile))) {
            for (String filePath : filePaths) {
                File fileToZip = new File(filePath);
                zos.putNextEntry(new ZipEntry(fileToZip.getName()));
                Files.copy(Paths.get(filePath), zos);
                zos.closeEntry();
            }
        }

        // 读取压缩文件内容到字节数组
        byte[] data = Files.readAllBytes(Paths.get(zipFile.getAbsolutePath()));

        // 设置HTTP响应头
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=download.zip");
        headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_OCTET_STREAM_VALUE);

        // 返回压缩文件内容
        return ResponseEntity.ok()
                .headers(headers)
                .body(new InputStreamResource(new ByteArrayInputStream(data)));

        // 注意：这里为了示例简单，没有删除临时文件。在实际应用中，你应该在响应发送后删除它。
    }


    @GetMapping("/selectWorkInfoByName")
    public  R<List<WorkInfo>> selectWorkInfoByName(String id,String startTime,String endTime)throws Exception{
        QueryWrapper queryWrapper=new QueryWrapper();
        try
        {
            if (id!=null){
                queryWrapper.eq("create_by",id);
            }
            if (RedisUtils.getCacheList("selectWorkInfoByName1").size()>0){
                List<WorkInfo> list123=RedisUtils.getCacheList("selectWorkInfoByName1");
                return R.ok(RedisUtils.getCacheList("selectWorkInfoByName1"));
            }
            List<WorkInfo> list=getWorkTime(workInfoService.selectList(queryWrapper));

            //优化存缓存
            RedisUtils.setCacheList("selectWorkInfoByName1", list);
            RedisUtils.expire("selectWorkInfoByName1", Duration.ofMinutes(20));
            return R.ok(list);
        }catch (Exception e){
            e.printStackTrace();
            return R.ok("查询失败！");
        }
    }

    public List<WorkInfo> getWorkTime(List<WorkInfo> list)throws Exception{
        try{
            for (WorkInfo workInfo:list){
                String projectName=workProjectService.queryById(Long.parseLong(workInfo.getProjectName())).getProName();
                workInfo.setProjectName(projectName);
                String  name=sysUserService.selectUserById(workInfo.getCreateBy()).getNickName();
                workInfo.setCreateName(name);
                //增加计算工作时长
                String workTime="0";
                WorkInfoLogBo workInfoLogBo=new WorkInfoLogBo();
                workInfoLogBo.setWorkInfoId(workInfo.getId());
                List<WorkInfoLogVo> workInfoLogList=workInfoLogService.queryList(workInfoLogBo);
                LocalDateTime start =null;
                LocalDateTime end = null;
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                for (WorkInfoLogVo workInfoLogVo:workInfoLogList){
                    String status=workInfoLogVo.getState();
                    if (status.equals("4") ){
                        end=LocalDateTime.parse(simpleDateFormat.format(workInfoLogVo.getCreateTime()), formatter);
                    }
                    if (status.equals("3")){
                        start=LocalDateTime.parse(simpleDateFormat.format(workInfoLogVo.getCreateTime()), formatter);
                    }
                }
                if (end != null && start != null) {
                    // 计算两个时间之间的差异
                    Duration duration = Duration.between(start, end);

                    // 获取总的小时数
                    long totalHours = duration.toHours();
                    // 计算天数
                    long days = totalHours / 24;
                    // 计算剩余的小时数
                    long hours = totalHours % 24;
                    // 获取差异的分钟数
                    long minutes = duration.toMinutes() % 60;
                    // 获取差异的秒数
                    long seconds = duration.getSeconds() % 60;

                    // 格式化结果
                    StringBuilder workTimeBuilder = new StringBuilder();
                    if (days > 0) {
                        workTimeBuilder.append(days).append("天");
                    }
                    if (hours > 0 || days > 0) { // 如果有天数，即使小时为0也显示
                        workTimeBuilder.append(hours).append("小时");
                    }else {
                        workTimeBuilder.append(0).append("小时");
                    }
                    if (minutes > 0 || hours > 0 || days > 0) { // 如果有小时或天数，即使分钟为0也显示
                        workTimeBuilder.append(minutes).append("分钟");
                    }else {
                        workTimeBuilder.append(0).append("分钟");
                    }
                    if (seconds > 0 || minutes > 0 || hours > 0 || days > 0) { // 如果有分钟、小时或天数，即使秒为0也显示
                        workTimeBuilder.append(seconds).append("秒");
                    }

                    // 设置工作时间
                    workTime = workTimeBuilder.toString();
                    workInfo.setWorkTime(workTime);
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return list;
    }



    public static String addImageStyle(String html, String style) {
        // 正则表达式匹配<img>标签，并捕获其开头到结束之间的所有内容（非贪婪模式）
        String regex = "<img\\b[^>]*>";
        // 替换策略：在<img>标签的末尾（但在闭合的>之前）插入style属性
        // 注意：此策略假设<img>标签是正确闭合的，且没有嵌套在其他标签内
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(html);
        StringBuffer result = new StringBuffer();

        while (matcher.find()) {
            String imgTag = matcher.group();
            Matcher imgMatcher = Pattern.compile("<img\\b([^>]*)>").matcher(imgTag);
            if (imgMatcher.find()) {
                // 提取并保留<img>标签的原始属性
                String originalAttributes = imgMatcher.group(1).trim();
                // 如果原始属性中已包含style属性，则不进行替换（或可根据需求选择覆盖）
                if (!originalAttributes.contains("style=")) {
                    // 在属性列表的末尾添加style属性（注意空格分隔）
                    String newImgTag = "<img " + originalAttributes + (originalAttributes.isEmpty() ? "" : " ") + "style=\"" + style + "\">";
                    matcher.appendReplacement(result, newImgTag);
                } else {
                    // 如果已存在style属性，可根据需求选择是否覆盖或保留原样（此例中选择保留）
                    matcher.appendReplacement(result, imgTag);
                }
            }
        }
        matcher.appendTail(result);
        return result.toString();
    }
}
