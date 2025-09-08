<template>
  <el-row>
    <el-dialog v-model="dialog.visible" title="工作进度" width="800px" top="5vh" append-to-body>
      <el-row>
        <el-table v-loading="loading" :data="infoLogList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="id" align="center" prop="id" v-if="true" />
          <el-table-column label="附件" align="center">
            <template #default="scope">
              <file-download v-model="scope.row.attachs" />
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center" prop="createTime" width="200">
            <template #default="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
              <el-tooltip content="查看" placement="top">
                <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['infolog:infoLog:edit']"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
      </el-row>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="dialog.visible = false">确 定</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog title="查看" v-model="edit.visible" width="800px" append-to-body>
      <el-form ref="infoLogFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="内容">
          <div v-html="form.workContent"></div>
        </el-form-item>
        <el-form-item label="附件" prop="attachs">
          <file-download v-model="form.attachs" />
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script setup name="SelectUser" lang="ts">
import { listInfoLog, getInfoLog, delInfoLog, addInfoLog, updateInfoLog } from '@/api/infolog/infoLog';
import { InfoLogVO, InfoLogQuery, InfoLogForm } from '@/api/infolog/infoLog/types';
import { WorkInfoVO } from '@/api/workInfo/workInfo/types';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const infoLogList = ref<InfoLogVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const infoLogFormRef = ref<ElFormInstance>();

const dialog = reactive<DialogOption>({
  visible: false,
  title: ''
});

const edit = reactive<DialogOption>({
  visible: false,
  title: ''
});

const data = reactive<PageData<InfoLogForm, InfoLogQuery>>({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    workInfoId: null,
    params: {}
  },
  rules: undefined
});

const { queryParams, form, rules } = toRefs(data);

/** 查询工单处理信息列表 */
const getList = async () => {
  loading.value = true;
  const res = await listInfoLog(queryParams.value);
  infoLogList.value = res.rows;
  total.value = res.total;
  loading.value = false;
};

/** 多选框选中数据 */
const handleSelectionChange = (selection: InfoLogVO[]) => {
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
};

/** 修改按钮操作 */
const handleUpdate = async (row?: InfoLogVO) => {
  const _id = row?.id || ids.value[0];
  const res = await getInfoLog(_id);
  Object.assign(form.value, res.data);
  edit.visible = true;
};

/** 导出按钮操作 */
const handleExport = () => {
  proxy?.download(
    'infolog/infoLog/export',
    {
      ...queryParams.value
    },
    `infoLog_${new Date().getTime()}.xlsx`
  );
};

const show = (row: WorkInfoVO) => {
  queryParams.value.workInfoId = row.id;
  getList();
  dialog.visible = true;
};

defineExpose({
  show
});
</script>

<style scoped></style>
