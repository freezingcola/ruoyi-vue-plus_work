package org.dromara.workinfo.mapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import org.dromara.common.mybatis.annotation.DataColumn;
import org.dromara.common.mybatis.annotation.DataPermission;
import org.dromara.workinfo.domain.WorkInfo;
import org.dromara.workinfo.domain.vo.WorkInfoCountVo;
import org.dromara.workinfo.domain.vo.WorkInfoProjectCountVo;
import org.dromara.workinfo.domain.vo.WorkInfoVo;
import org.dromara.common.mybatis.core.mapper.BaseMapperPlus;

import java.util.List;
import java.util.Map;

/**
 * 工单管理Mapper接口
 *
 * @author Lion Li
 * @date 2024-06-01
 */
public interface WorkInfoMapper extends BaseMapperPlus<WorkInfo, WorkInfoVo> {

    @DataPermission({
            @DataColumn(key = "deptName", value = "create_dept")
            ,@DataColumn(key = "userName", value = "accept_account")
    })
    Page<WorkInfoVo> selectWorkInfoList(@Param("page") Page<WorkInfo> page, @Param(Constants.WRAPPER) Wrapper<WorkInfo> queryWrapper);

    Page<WorkInfoVo> selectWorkInfoListNew(@Param("page") Page<WorkInfo> page, @Param(Constants.WRAPPER) Wrapper<WorkInfo> queryWrapper);

    List<WorkInfoCountVo> selectWorkInfoStateCount(Map<String, Object> map);

    List<WorkInfoCountVo> selectWorkInfoTimeCount(Map<String, Object> map);

    List<WorkInfoCountVo> selectWorkInfoWeekCount(Map<String, Object> map);

    List<WorkInfoCountVo> selectCount(Map<String, Object> map);
    List<WorkInfoProjectCountVo> selectWorkInfoProjectCount(Map<String, Object> map);
}
