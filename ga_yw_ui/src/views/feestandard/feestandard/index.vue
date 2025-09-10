<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="关联食堂" prop="canteenId">
              <el-input v-model="queryParams.canteenId" placeholder="请输入关联食堂ID" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="餐别" prop="mealType">
              <el-select v-model="queryParams.mealType" placeholder="请选择餐别" clearable >
                <el-option v-for="dict in meal_type" :key="dict.value" :label="dict.label" :value="dict.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="收费标准" prop="fee">
              <el-input v-model="queryParams.fee" placeholder="请输入收费标准" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
              <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>

    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['feestandard:feestandard:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['feestandard:feestandard:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['feestandard:feestandard:remove']">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['feestandard:feestandard:export']">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="feestandardList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="餐标ID" align="center" prop="id" v-if="true" />
        <el-table-column label="关联食堂ID" align="center" prop="canteenId" />
        <el-table-column label="餐别" align="center" prop="mealType">
          <template #default="scope">
            <dict-tag :options="meal_type" :value="scope.row.mealType"/>
          </template>
        </el-table-column>
        <el-table-column label="收费标准" align="center" prop="fee" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['feestandard:feestandard:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['feestandard:feestandard:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- 添加或修改餐费标准设置对话框 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="feestandardFormRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="关联食堂" prop="canteenId">
          <el-input v-model="form.canteenId" placeholder="请输入关联食堂ID" />
        </el-form-item>
        <el-form-item label="餐别" prop="mealType">
          <el-select v-model="form.mealType" placeholder="请选择餐别" style="width: 100%">
            <el-option
                v-for="dict in meal_type"
                :key="dict.value"
                :label="dict.label"
                :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收费标准" prop="fee">
          <el-input v-model="form.fee" placeholder="请输入收费标准" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Feestandard" lang="ts">
import { listFeestandard, getFeestandard, delFeestandard, addFeestandard, updateFeestandard, checkFeeStandardExists } from '@/api/feestandard/feestandard';
import { FeestandardVO, FeestandardQuery, FeestandardForm } from '@/api/feestandard/feestandard/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { meal_type } = toRefs<any>(proxy?.useDict('meal_type'));

const feestandardList = ref<FeestandardVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const feestandardFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: FeestandardForm = {
  id: undefined,
  canteenId: undefined,
  mealType: undefined,
  fee: undefined,
}
const data = reactive<PageData<FeestandardForm, FeestandardQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    canteenId: undefined,
    mealType: undefined,
    fee: undefined,
    params: {
    }
  },
  rules: {
    id: [
      { required: true, message: "不能为空", trigger: "blur" }
    ],
    canteenId: [
      { required: true, message: "关联食堂不能为空", trigger: "blur" }
    ],
    mealType: [
      { required: true, message: "餐别不能为空", trigger: "change" }
    ],
    fee: [
      { required: true, message: "收费标准不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询餐费标准设置列表 */
const getList = async () => {
  loading.value = true;
  const res = await listFeestandard(queryParams.value);
  feestandardList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}

/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
}

/** 表单重置 */
const reset = () => {
  form.value = {...initFormData};
  feestandardFormRef.value?.resetFields();
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
}

/** 多选框选中数据 */
const handleSelectionChange = (selection: FeestandardVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 检查收费标准是否已存在 */
const checkExisting = async (canteenId: string | number | undefined, mealType: string | number | undefined): Promise<boolean> => {
  if (!canteenId || !mealType) {
    return true; // 如果参数不完整，让表单验证处理
  }
  
  try {
    const response = await checkFeeStandardExists(Number(canteenId), Number(mealType));
    if (response.data && response.data.exists) {
      // 获取餐别显示名称
      const mealTypeLabel = meal_type.value.find((dict: any) => dict.value == mealType)?.label || mealType;
      proxy?.$modal.msgWarning(`该食堂的${mealTypeLabel}收费标准已存在，请选择修改而非新增`);
      return false;
    }
    return true;
  } catch (error) {
    console.error('检查收费标准失败:', error);
    proxy?.$modal.msgError('检查收费标准失败，请重试');
    return true; // 检查失败时允许继续，让后端校验
  }
}

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = "添加餐费标准设置";
}

/** 修改按钮操作 */
const handleUpdate = async (row?: FeestandardVO) => {
  reset();
  const _id = row?.id || ids.value[0]
  const res = await getFeestandard(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = "修改餐费标准设置";
}

/** 提交按钮 */
const submitForm = () => {
  feestandardFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      
      // 如果是新增操作，先检查是否已存在
      if (!form.value.id) {
        const canProceed = await checkExisting(form.value.canteenId, form.value.mealType);
        if (!canProceed) {
          buttonLoading.value = false;
          return; // 如果已存在，停止执行
        }
      }
      
      try {
        if (form.value.id) {
          await updateFeestandard(form.value);
        } else {
          await addFeestandard(form.value);
        }
        proxy?.$modal.msgSuccess("操作成功");
        dialog.visible = false;
        await getList();
      } catch (error) {
        console.error('操作失败:', error);
        proxy?.$modal.msgError('操作失败，请重试');
      } finally {
        buttonLoading.value = false;
      }
    }
  });
}

/** 删除按钮操作 */
const handleDelete = async (row?: FeestandardVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除餐费标准设置编号为"' + _ids + '"的数据项？').finally(() => loading.value = false);
  await delFeestandard(_ids);
  proxy?.$modal.msgSuccess("删除成功");
  await getList();
}

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download('feestandard/feestandard/export', {
    ...queryParams.value
  }, `feestandard_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>