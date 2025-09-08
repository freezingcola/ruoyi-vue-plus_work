package org.dromara.workinfo.service.impl;

import cn.hutool.core.util.NumberUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.dromara.common.core.domain.dto.RoleDTO;
import org.dromara.common.core.domain.model.LoginUser;
import org.dromara.common.core.utils.MapstructUtils;
import org.dromara.common.core.utils.StringUtils;
import org.dromara.common.json.utils.JsonUtils;
import org.dromara.common.mybatis.core.page.TableDataInfo;
import org.dromara.common.mybatis.core.page.PageQuery;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import lombok.RequiredArgsConstructor;
import org.dromara.common.satoken.utils.LoginHelper;
import org.dromara.system.domain.bo.SysDeptBo;
import org.dromara.system.domain.vo.SysDeptVo;
import org.dromara.system.domain.vo.SysOssVo;
import org.dromara.system.domain.vo.SysUserVo;
import org.dromara.system.service.ISysDeptService;
import org.dromara.system.service.ISysOssService;
import org.dromara.system.service.ISysUserService;
import org.dromara.workinfo.domain.bo.WorkInfoLogBo;
import org.dromara.workinfo.domain.vo.*;
import org.dromara.workinfo.service.IWorkInfoLogService;
import org.dromara.workinfo.service.IWorkProjectService;
import org.dromara.workinfo.utils.SerialNumberGenerator;
import org.dromara.workinfo.utils.TimeParamsUtils;
import org.springframework.stereotype.Service;
import org.dromara.workinfo.domain.bo.WorkInfoBo;
import org.dromara.workinfo.domain.WorkInfo;
import org.dromara.workinfo.mapper.WorkInfoMapper;
import org.dromara.workinfo.service.IWorkInfoService;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * 工单管理Service业务层处理
 *
 * @author Lion Li
 * @date 2024-06-01
 */
@RequiredArgsConstructor
@Service
public class WorkInfoServiceImpl implements IWorkInfoService {

    private final WorkInfoMapper baseMapper;

    private final ISysOssService sysOssService;

    private final IWorkProjectService workProjectService;

    private final IWorkInfoLogService workInfoLogService;

    private final ISysUserService sysUserService;

    private final ISysDeptService sysDeptService;

    /**
     * 查询工单管理
     *
     * @param id 主键
     * @return 工单管理
     */
    @Override
    public WorkInfoVo queryById(Long id){
        return baseMapper.selectVoById(id);
    }

    /**
     * 分页查询工单管理列表
     *
     * @param bo        查询条件
     * @param pageQuery 分页参数
     * @return 工单管理分页列表
     */
    @Override
    public TableDataInfo<WorkInfoVo> queryPageList(WorkInfoBo bo, PageQuery pageQuery) {
        LambdaQueryWrapper<WorkInfo> lqw = buildQueryWrapperNew(bo,UserViewingPermissions());
//        Page<WorkInfoVo> result = baseMapper.selectVoPage(pageQuery.build(), lqw);
        Page<WorkInfoVo> result = baseMapper.selectWorkInfoList(pageQuery.build(), lqw);
        for (WorkInfoVo workInfoVo:result.getRecords()){
            if (workInfoVo.getProjectName()!=null){
                WorkProjectVo workProjectVo=workProjectService.queryById(Long.parseLong(workInfoVo.getProjectName()));
                if (workProjectVo!=null){
                    workInfoVo.setProjectName(workProjectVo.getProName());
                }else {
                    workInfoVo.setProjectName("无");
                }
                //增加完成时间查询
                WorkInfoLogBo workInfoLogBo=new WorkInfoLogBo();
                workInfoLogBo.setWorkInfoId(workInfoVo.getId());
                List<WorkInfoLogVo> workInfoLogList=workInfoLogService.queryList(workInfoLogBo);
                for (WorkInfoLogVo workInfoLogVo:workInfoLogList){
                    System.out.println("状态"+workInfoLogVo.getState());
                    if (workInfoLogVo.getState().equals("6") || workInfoLogVo.getState().equals("1")){
                        workInfoVo.setFinishTime(workInfoLogVo.getCreateTime());
                    }
                    //增加判断是否有附件
                    if(workInfoLogVo.getWorkContent().matches(".*<img.*>.*")){
                        workInfoVo.setFileStatus("1");
                    }else {
                        workInfoVo.setFileStatus("0");
                    }
                }
            }
        }

        return TableDataInfo.build(result);
    }


    @Override
    public TableDataInfo<WorkInfoVo> queryAuditPageList(WorkInfoBo bo, PageQuery pageQuery) {
        LambdaQueryWrapper<WorkInfo> lqw = buildQueryWrapperNew(bo,UserViewingPermissions());
        LoginUser loginUser = LoginHelper.getLoginUser();
        //只查这个人创建的数据
//        lqw.eq(WorkInfo::getCreateBy,loginUser.getUserId());
//        lqw.eq(WorkInfo::getState,"4");
//        Page<WorkInfoVo> result = baseMapper.selectVoPage(pageQuery.build(), lqw);
        Page<WorkInfoVo> result = baseMapper.selectWorkInfoListNew(pageQuery.build(), lqw);
        for (WorkInfoVo workInfoVo:result.getRecords()){
            if (workInfoVo.getProjectName()!=null){
                WorkProjectVo workProjectVo=workProjectService.queryById(Long.parseLong(workInfoVo.getProjectName()));
                //查询创建人名称
                SysUserVo sysUserVo=sysUserService.selectUserById(workInfoVo.getCreateBy());
                if (sysUserVo!=null){
                    workInfoVo.setCreateByName(sysUserVo.getNickName());
                }
                if (workProjectVo!=null){
                    workInfoVo.setProjectName(workProjectVo.getProName());
                }else {
                    workInfoVo.setProjectName("无");
                }
                //增加完成时间查询
                WorkInfoLogBo workInfoLogBo=new WorkInfoLogBo();
                workInfoLogBo.setWorkInfoId(workInfoVo.getId());
                List<WorkInfoLogVo> workInfoLogList=workInfoLogService.queryList(workInfoLogBo);
                for (WorkInfoLogVo workInfoLogVo:workInfoLogList){
                    System.out.println("状态"+workInfoLogVo.getState());
                    if (workInfoLogVo.getState().equals("6") || workInfoLogVo.getState().equals("1")){
                        workInfoVo.setFinishTime(workInfoLogVo.getCreateTime());
                    }
                    //增加判断是否有附件
                    if(workInfoLogVo.getWorkContent().matches(".*<img.*>.*")){
                        workInfoVo.setFileStatus("1");
                    }else {
                        workInfoVo.setFileStatus("0");
                    }
                }
            }

        }
        return TableDataInfo.build(result);
    }

    public List<WorkInfoCountVo> workInfoCount() {
        Map<String, Object> map = new HashMap<>();
        setCommonParam(map);
        return baseMapper.selectWorkInfoStateCount(map);
    }

    public List<WorkInfoCountVo> selectCount() {
        Map<String, Object> map = new HashMap<>();
        setCommonParam(map);
        return baseMapper.selectCount(map);
    }

    @Override
    public List<WorkInfoCountVo> selectWorkInfoTimeCount() {
        Map<String, Object> map = new HashMap<>();
        setCommonParam(map);
        TimeParamsUtils.TimeParams timeParams = TimeParamsUtils.createTimeParamsMonth();
        map.put("create_time_start", timeParams.getStart());
        map.put("create_time_end", timeParams.getEnd());
        return baseMapper.selectWorkInfoTimeCount(map);
    }

    public List<WorkInfoCountVo> workInfoTimeWeekCount(String startTime, String endTime) {
        Map<String, Object> map = new HashMap<>();
        setCommonParam(map);
        map.put("create_time_start", startTime);
        map.put("create_time_end", endTime);
        return baseMapper.selectWorkInfoWeekCount(map);
    }

    public List<WorkInfoProjectCountVo> workInfoProjectCount() {
        Map<String, Object> map = new HashMap<>();
        setCommonParam(map);
        return baseMapper.selectWorkInfoProjectCount(map);
    }

    private void setCommonParam(Map<String, Object> map){
        LoginUser loginUser = LoginHelper.getLoginUser();
        List<SysUserVo> sysUserVos = UserViewingPermissions();
        map.put("tenant_id", loginUser.getTenantId());
        if(sysUserVos.size() <= 0 && loginUser.getUserId() != 1){
            SysUserVo sysUserVo = new SysUserVo();
            sysUserVo.setUserId(loginUser.getUserId());
            sysUserVos.add(sysUserVo);
        }
        System.out.println("users:" + sysUserVos.size());
        map.put("users", sysUserVos);
    }

    /**
     * 查询符合条件的工单管理列表
     *
     * @param bo 查询条件
     * @return 工单管理列表
     */
    @Override
    public List<WorkInfoVo> queryList(WorkInfoBo bo) {
        LambdaQueryWrapper<WorkInfo> lqw = buildQueryWrapper(bo);
        return baseMapper.selectVoList(lqw);
    }

    private LambdaQueryWrapper<WorkInfo> buildQueryWrapperNew(WorkInfoBo bo,List<SysUserVo> sysUserVoList) {
        LoginUser loginUser = LoginHelper.getLoginUser();
        Map<String, Object> params = bo.getParams();
        LambdaQueryWrapper<WorkInfo> lqw = Wrappers.lambdaQuery();
//        //不是超级管理员只能看到自己的创建的数据
        List<RoleDTO> list=loginUser.getRoles();
        List<Long> values =new ArrayList<>();
        for (RoleDTO roleDTO:list){
            if (roleDTO.getRoleKey().contains("staff")){
                lqw.eq(WorkInfo::getCreateBy,loginUser.getUserId()).or().eq(WorkInfo::getAcceptAccount,loginUser.getUserId());
            }else {
                if (bo.getAcceptAccount()==null){
                    for (SysUserVo sysUserVo : sysUserVoList) {
                        values.add(sysUserVo.getUserId());
                    }
//                    lqw.in(WorkInfo::getCreateBy, values);
                }
            }
        }
        lqw.eq(StringUtils.isNotBlank(bo.getProjectName()), WorkInfo::getProjectName, bo.getProjectName());
        lqw.eq(bo.getCreateBy()!=null, WorkInfo::getCreateBy, bo.getCreateBy());
        lqw.eq(StringUtils.isNotBlank(bo.getState()), WorkInfo::getState, bo.getState());
        lqw.eq(StringUtils.isNotBlank(bo.getWorkType()), WorkInfo::getWorkType, bo.getWorkType());
        lqw.eq(StringUtils.isNotBlank(bo.getContactPerson()), WorkInfo::getContactPerson, bo.getContactPerson());
        //增加查询标题和内容
        lqw.like(StringUtils.isNotBlank(bo.getWorkTitle()),WorkInfo::getWorkTitle,bo.getWorkTitle()).or()
                .like(StringUtils.isNotBlank(bo.getWorkTitle()),WorkInfo::getWorkContent,bo.getWorkTitle());
        lqw.eq(bo.getAcceptAccount() != null, WorkInfo::getAcceptAccount, bo.getAcceptAccount());
        return lqw;
    }

    private LambdaQueryWrapper<WorkInfo> buildQueryWrapper(WorkInfoBo bo) {
        LoginUser loginUser = LoginHelper.getLoginUser();
        Map<String, Object> params = bo.getParams();
        LambdaQueryWrapper<WorkInfo> lqw = Wrappers.lambdaQuery();
        //不是超级管理员只能看到自己的创建的数据
        if (loginUser.getUserId()!=(1)){
            lqw.eq(WorkInfo::getCreateBy,loginUser.getUserId()).or().eq(WorkInfo::getAcceptAccount,loginUser.getUserId());
        }
        lqw.eq(StringUtils.isNotBlank(bo.getWorkTitle()), WorkInfo::getWorkTitle, bo.getWorkTitle());
        lqw.eq(StringUtils.isNotBlank(bo.getWorkContent()), WorkInfo::getWorkContent, bo.getWorkContent());
        lqw.eq(StringUtils.isNotBlank(bo.getState()), WorkInfo::getState, bo.getState());
        lqw.eq(StringUtils.isNotBlank(bo.getWorkType()), WorkInfo::getWorkType, bo.getWorkType());
        lqw.eq(bo.getAcceptAccount() != null, WorkInfo::getAcceptAccount, bo.getAcceptAccount());
        return lqw;
    }

    /**
     * 判断当前用户查看数据权限
     */
    public  List<SysUserVo> UserViewingPermissions() {
        List<SysUserVo> sysUserList=new ArrayList<>();
//        try{
        //获取当前用户的基本信息
        LoginUser loginUser=LoginHelper.getLoginUser();
        //获取用户角色ID
        List<RoleDTO>  roleDTOS=loginUser.getRoles();
        Set<String> aa=loginUser.getRolePermission();
        //判断各种角色的权限
        for (String stringRole:aa){
            //如果是小组长则只能看到和审批本组下的数据
            if (stringRole.contains("captain")){
                //如果是小组长，则查询所有组员信息
                sysUserList=sysUserService.selectUserListByDept(loginUser.getDeptId());
                System.out.println(sysUserList);
            }
            if (stringRole.equals("wf_leader")||stringRole.equals("wf_boss")||stringRole.equals("wf_admin")){
                //查询出该部门下属部门
                SysDeptBo sysDeptBo=new SysDeptBo();
                sysDeptBo.setParentId(loginUser.getDeptId());
                List<SysDeptVo> sysDeptVos=sysDeptService.selectDeptList(sysDeptBo);
                //查询出部门下所有人员信息
                List<Long>  deptIds=new ArrayList();
                for (SysDeptVo sysDeptVo:sysDeptVos){
                    deptIds.add(sysDeptVo.getDeptId());
                }
                sysUserList=sysUserService.selectUserListByDepts(deptIds);
            }
        }
//        }catch (Exception e){
//            e.printStackTrace();
//        }
        return sysUserList;
    }

    /**
     * 新增工单管理
     *
     * @param bo 工单管理
     * @return 是否新增成功
     */
    @Override
    public Boolean insertByBo(WorkInfoBo bo) {
        WorkInfo add = MapstructUtils.convert(bo, WorkInfo.class);
        bo.setNumber(SerialNumberGenerator.generateBasicSerialNumber());
        add.setNumber(SerialNumberGenerator.generateBasicSerialNumber());
        add.setState(bo.getState());
        putAttachInfos(bo, add);
        boolean flag = baseMapper.insert(add) > 0;
//        if (flag) {
//            bo.setId(add.getId());
//            //插入log表
//            WorkInfoLogBo workInfoLogBo=new WorkInfoLogBo();
//            workInfoLogBo.setWorkInfoId(add.getId());
//            workInfoLogBo.setCreateBy(add.getCreateBy());
//            workInfoLogBo.setCreateDept(add.getCreateDept());
//            workInfoLogBo.setCreateTime(new Date());
////            workInfoLogBo.setWorkContent("分配成功，等待接收");
//            workInfoLogBo.setWorkContent(add.getWorkContent());
//            workInfoLogBo.setState(bo.getState());
//            workInfoLogService.insertByBo(workInfoLogBo);
//        }
        return flag;
    }

    /**
     * 修改工单管理
     *
     * @param bo 工单管理
     * @return 是否修改成功
     */
    @Override
    public Boolean updateByBo(WorkInfoBo bo) {
        WorkInfo update = MapstructUtils.convert(bo, WorkInfo.class);
        putAttachInfos(bo, update);
        return baseMapper.updateById(update) > 0;
    }

    @Override
    @Transactional
    public Boolean accept(Long[] ids) {
        for (Long id : ids) {
            WorkInfoVo workInfoVo = this.queryById(id);
            Long userId = LoginHelper.getUserId();
            if(!WorkInfo.WAIT_FOR_ACCEPT.equals(workInfoVo.getState()))
                throw new RuntimeException("工单不处于待接收状态!工单ID:" + id);
            if(!userId.equals(workInfoVo.getAcceptAccount()) )
                throw new RuntimeException("你不是指定的用户!工单ID:" + id);
            WorkInfo update = MapstructUtils.convert(workInfoVo, WorkInfo.class);
            update.setState(WorkInfo.WAIT_FOR_DO);
            baseMapper.updateById(update);
            //插入Log表
            WorkInfoLogBo workInfoLogBo=new WorkInfoLogBo();
            workInfoLogBo.setWorkInfoId(update.getId());
            LoginUser loginUser = LoginHelper.getLoginUser();
            workInfoLogBo.setCreateBy(loginUser.getUserId());
            workInfoLogBo.setCreateDept(loginUser.getDeptId());
            workInfoLogBo.setCreateTime(new Date());
            workInfoLogBo.setWorkContent("接收成功，处理中....");
            workInfoLogBo.setState("3");
            workInfoLogService.insertByBo(workInfoLogBo);
        }
        return true;
    }

    /**
     * 保存前的数据校验
     private void validEntityBeforeSave(WorkInfo entity){

     }
     */
    private void putAttachInfos(WorkInfoBo bo, WorkInfo workInfo){
        String tmp = bo.getAttachIds();
        if(StringUtils.isNotBlank(tmp)){
            List<Long> ids = StringUtils.splitTo(tmp, ",", str->{
                return NumberUtil.parseLong(str.toString());
            });
            List<SysOssVo> sysOssVos = sysOssService.listByIds(ids);
            List<AttachVo> attachVos = new ArrayList<>(sysOssVos.size());
            AttachVo attachVo;
            for (SysOssVo sysOssVo : sysOssVos) {
                attachVo = new AttachVo();
                attachVo.setId(sysOssVo.getOssId());
                attachVo.setName(sysOssVo.getOriginalName());
                attachVos.add(attachVo);
            }
            workInfo.setAttachs(JsonUtils.toJsonString(attachVos));
        }
    }

    /**
     * 校验并批量删除工单管理信息
     *
     * @param ids     待删除的主键集合
     * @param isValid 是否进行有效性校验
     * @return 是否删除成功
     */
    @Override
    public Boolean deleteWithValidByIds(Collection<Long> ids, Boolean isValid) {
        if(isValid){
            //TODO 做一些业务上的校验,判断是否需要校验
        }
        return baseMapper.deleteBatchIds(ids) > 0;
    }

    /**
     *
     */
    public List<WorkInfo> selectList(QueryWrapper<WorkInfo> wrapper){
        return baseMapper.selectList(wrapper);
    };
}
