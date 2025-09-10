package org.dromara.info.mapper;

import org.dromara.info.domain.CanteenInfo;
import org.dromara.info.domain.vo.CanteenInfoVo;
import org.dromara.common.mybatis.core.mapper.BaseMapperPlus;
import org.apache.ibatis.annotations.Mapper;

/**
 * 食堂信息Mapper接口
 *
 * @author Lion Li
 * @date 2025-09-08
 */
@Mapper
public interface CanteenInfoMapper extends BaseMapperPlus<CanteenInfo, CanteenInfoVo> {

}
