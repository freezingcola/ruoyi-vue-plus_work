<template>
  <el-row>
    <el-dialog v-model="visibleUser" title="选择用户" width="800px" top="5vh" append-to-body>
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="queryParams.userName" placeholder="请输入用户名称" clearable @keyup.enter="handleQuery" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phonenumber">
          <el-input v-model="queryParams.phonenumber" placeholder="请输入手机号码" clearable @keyup.enter="handleQuery" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
          <el-button icon="Refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      <el-row>
        <el-table ref="tableRef" :data="userList" height="260px" @row-click="clickRow" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="用户名称" prop="userName" :show-overflow-tooltip="true" />
          <el-table-column label="用户昵称" prop="nickName" :show-overflow-tooltip="true" />
          <el-table-column label="邮箱" prop="email" :show-overflow-tooltip="true" />
          <el-table-column label="手机" prop="phonenumber" :show-overflow-tooltip="true" />
          <el-table-column label="状态" align="center" prop="status">
            <template #default="scope">
              <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center" prop="createTime" width="180">
            <template #default="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-if="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
      </el-row>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSelectUser">确 定</el-button>
          <el-button @click="visibleUser = false">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </el-row>
</template>

<script setup name="SelectUser" lang="ts">
import { acceptUserList } from '@/api/system/role';
// import user from '@/api/system/user';
import { UserVO } from '@/api/system/user/types';
import { UserQuery } from '@/api/system/user/types';

const props = defineProps({
  parntForm: {
    type: [Object],
    required: true
  }
});

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_normal_disable } = toRefs<any>(proxy?.useDict('sys_normal_disable'));

const userList = ref<UserVO[]>([]);
const visibleUser = ref(false);
const total = ref(0);
// const userIds = ref<Array<string | number>>([]);
const users = {};

const queryParams = reactive<UserQuery>({
  pageNum: 1,
  pageSize: 10,
  roleId: undefined,
  userName: undefined,
  phonenumber: undefined
});

const tableRef = ref<ElTableInstance>();
const queryFormRef = ref<ElFormInstance>();

const show = () => {
  getList();
  visibleUser.value = true;
};

/**
 * 选择行
 */
const clickRow = (row: any) => {
  // ele的bug
  tableRef.value?.toggleRowSelection(row, false);
};
/** 多选框选中数据 */
const handleSelectionChange = (selection: UserVO[]) => {
  if (selection.length > 1) {
    proxy?.$modal.alertWarning('只能选择一个用户!');
    return false;
  }
  if (selection.length > 0) {
    users.selection = {
      'userId': selection[0].userId,
      'nickName': selection[0].nickName
    };
  }
};

/** 查询数据 */
const getList = async () => {
  const res = await acceptUserList(queryParams);
  userList.value = res.rows;
  total.value = res.total;
};
/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNum = 1;
  getList();
};
/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields();
  getList();
};

const emit = defineEmits(['ok', 'setAcceptAccount']);
/**选择授权用户操作 */
const handleSelectUser = async () => {
  // const roleId = queryParams.roleId;
  // const ids = userIds.value.join(',');
  // console.info(users.selection);
  if (!users.selection) {
    proxy?.$modal.msgError('请选择要分配的用户');
    return;
  }
  emit('setAcceptAccount', users.selection);
  proxy?.$modal.msgSuccess('分配成功');
  // emit('ok');
  visibleUser.value = false;
};
// 暴露
defineExpose({
  show
});
</script>

<style scoped></style>
