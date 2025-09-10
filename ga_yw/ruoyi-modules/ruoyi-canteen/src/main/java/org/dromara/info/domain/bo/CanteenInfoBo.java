package org.dromara.info.domain.bo;

import org.dromara.info.domain.CanteenInfo;
import org.dromara.common.mybatis.core.domain.BaseEntity;
import org.dromara.common.core.validate.AddGroup;
import org.dromara.common.core.validate.EditGroup;
import io.github.linpeilie.annotations.AutoMapper;
import lombok.Data;
import lombok.EqualsAndHashCode;
import jakarta.validation.constraints.*;

/**
 * 食堂信息业务对象 canteen_info
 *
 * @author Lion Li
 * @date 2025-09-08
 */
@Data
@EqualsAndHashCode(callSuper = true)
@AutoMapper(target = CanteenInfo.class, reverseConvertGenerate = false)
public class CanteenInfoBo extends BaseEntity {

    /**
     * 食堂ID
     */
    @NotNull(message = "食堂ID不能为空", groups = { EditGroup.class })
    private Long id;

    /**
     * 食堂名称
     */
    @NotBlank(message = "食堂名称不能为空", groups = { AddGroup.class, EditGroup.class })
    private String canteenName;

    /**
     * 食堂位置
     */
    @NotBlank(message = "食堂位置不能为空", groups = { AddGroup.class, EditGroup.class })
    private String location;

    /**
     * 开放时间
     */
    @NotBlank(message = "开放时间不能为空", groups = { AddGroup.class, EditGroup.class })
    private String openTime;

    /**
     * 负责人
     */
    @NotBlank(message = "负责人不能为空", groups = { AddGroup.class, EditGroup.class })
    private String manager;

    /**
     * 所属单位ID
     */
    @NotNull(message = "所属单位ID不能为空", groups = { AddGroup.class, EditGroup.class })
    private Long unitId;


}
