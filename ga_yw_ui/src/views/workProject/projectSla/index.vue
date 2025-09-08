<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div v-show="showSearch" class="mb-[10px]">
        <el-card shadow="hover">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="服务名称" prop="slaName">
              <el-input v-model="queryParams.slaName" placeholder="请输入服务名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="服务说明" prop="slaContent">
              <el-input v-model="queryParams.slaContent" placeholder="请输入服务说明" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="状态" prop="slaState">
              <el-select v-model="queryParams.slaState" placeholder="请选择状态" clearable>
                <el-option v-for="dict in project_sla_state" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="服务类型" prop="slaType">
              <el-select v-model="queryParams.slaType" placeholder="请选择服务类型" clearable>
                <el-option v-for="dict in project_sla_type" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="处理时限" prop="slaTime">
              <el-select v-model="queryParams.slaTime" placeholder="请选择处理时限" clearable>
                <el-option v-for="dict in project_sla_time" :key="dict.value" :label="dict.label" :value="dict.value" />
              </el-select>
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
            <el-button v-hasPermi="['workProject:projectSla:add']" type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['workProject:projectSla:edit']" type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['workProject:projectSla:remove']" type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()"
              >删除</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPermi="['workProject:projectSla:export']" type="warning" plain icon="Download" @click="handleExport">导出</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @query-table="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="projectSlaList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column v-if="true" label="id" align="center" prop="id" />
        <el-table-column label="服务名称" align="center" prop="slaName" />
        <el-table-column label="服务说明" align="center" prop="slaContent" />
        <el-table-column label="状态" align="center" prop="slaState">
          <template #default="scope">
            <dict-tag :options="project_sla_state" :value="scope.row.slaState" />
          </template>
        </el-table-column>
        <el-table-column label="服务类型" align="center" prop="slaType">
          <template #default="scope">
            <dict-tag :options="project_sla_type" :value="scope.row.slaType" />
          </template>
        </el-table-column>
        <el-table-column label="处理时限" align="center" prop="slaTime">
          <template #default="scope">
            <dict-tag :options="project_sla_time" :value="scope.row.slaTime" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="修改" placement="top">
              <el-button v-hasPermi="['workProject:projectSla:edit']" link type="primary" icon="Edit" @click="handleUpdate(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button
                v-hasPermi="['workProject:projectSla:remove']"
                link
                type="primary"
                icon="Delete"
                @click="handleDelete(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
    </el-card>
    <!-- 添加或修改项目事件对话框 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" width="500px" append-to-body>
      <el-form ref="projectSlaFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="服务名称" prop="slaName">
          <el-input v-model="form.slaName" placeholder="请输入服务名称" />
        </el-form-item>
        <el-form-item label="服务说明" prop="slaContent">
          <el-input v-model="form.slaContent" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="状态" prop="slaState">
          <el-radio-group v-model="form.slaState">
            <el-radio v-for="dict in project_sla_state" :key="dict.value" :value="dict.value">{{ dict.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="服务类型" prop="slaType">
          <el-select v-model="form.slaType" placeholder="请选择服务类型">
            <el-option v-for="dict in project_sla_type" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理时限" prop="slaTime">
          <el-select v-model="form.slaTime" placeholder="请选择处理时限">
            <el-option v-for="dict in project_sla_time" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
          </el-select>
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

<script setup name="ProjectSla" lang="ts">
import { listProjectSla, getProjectSla, delProjectSla, addProjectSla, updateProjectSla } from '@/api/workProject/projectSla';
import { ProjectSlaVO, ProjectSlaQuery, ProjectSlaForm } from '@/api/workProject/projectSla/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { project_sla_state, project_sla_type, project_sla_time } = toRefs<any>(
  proxy?.useDict('project_sla_state', 'project_sla_type', 'project_sla_time')
);

const projectSlaList = ref<ProjectSlaVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref<ElFormInstance>();
const projectSlaFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const initFormData: ProjectSlaForm = {
  id: undefined,
  slaName: undefined,
  slaContent: undefined,
  slaState: undefined,
  slaType: undefined,
  slaTime: undefined
};
const data = reactive<PageData<ProjectSlaForm, ProjectSlaQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    slaName: undefined,
    slaContent: undefined,
    slaState: undefined,
    slaType: undefined,
    slaTime: undefined,
    params: {}
  },
  rules: {
    id: [{ required: true, message: '$comment不能为空', trigger: 'blur' }],
    slaName: [{ required: true, message: '服务名称不能为空', trigger: 'blur' }],
    slaContent: [{ required: true, message: '服务说明不能为空', trigger: 'blur' }],
    slaState: [{ required: true, message: '状态不能为空', trigger: 'change' }],
    slaType: [{ required: true, message: '服务类型不能为空', trigger: 'change' }],
    slaTime: [{ required: true, message: '处理时限不能为空', trigger: 'change' }]
  }
});

const { queryParams, form, rules } = toRefs(data);

const route = useRoute();

/** 查询项目事件列表 */
const getList = async () => {
  loading.value = true;
  const res = await listProjectSla(queryParams.value);
  projectSlaList.value = res.rows;
  total.value = res.total;
  loading.value = false;
};
/** 取消按钮 */
const cancel = () => {
  reset();
  dialog.visible = false;
};
/** 表单重置 */
const reset = () => {
  form.value = { ...initFormData };
  projectSlaFormRef.value?.resetFields();
};

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  handleQuery();
};

/** 多选框选中数据 */
const handleSelectionChange = (selection: ProjectSlaVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

/** 新增按钮操作 */
const handleAdd = () => {
  reset();
  dialog.visible = true;
  dialog.title = '添加项目事件';
};

/** 修改按钮操作 */
const handleUpdate = async (row?: ProjectSlaVO) => {
  reset();
  const _id = row?.id || ids.value[0];
  const res = await getProjectSla(_id);
  Object.assign(form.value, res.data);
  dialog.visible = true;
  dialog.title = '修改项目事件';
};

/** 提交按钮 */
const submitForm = () => {
  projectSlaFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      form.value.projectId = route.params.projectId;
      if (form.value.id) {
        await updateProjectSla(form.value).finally(() => (buttonLoading.value = false));
      } else {
        await addProjectSla(form.value).finally(() => (buttonLoading.value = false));
      }
      proxy?.$modal.msgSuccess('操作成功');
      dialog.visible = false;
      await getList();
    }
  });
};

/** 删除按钮操作 */
const handleDelete = async (row?: ProjectSlaVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('是否确认删除项目事件编号为"' + _ids + '"的数据项？').finally(() => (loading.value = false));
  await delProjectSla(_ids);
  proxy?.$modal.msgSuccess('删除成功');
  await getList();
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'workProject/projectSla/export',
    {
      ...queryParams.value
    },
    `projectSla_${new Date().getTime()}.xlsx`
  );
};

onMounted(() => {
  queryParams.value.projectId = route.params.projectId;
  getList();
});
</script>
