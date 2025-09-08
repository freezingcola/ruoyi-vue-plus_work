<template>
    <el-watermark style="position: static" :content="[user.nickname]">
        <div style="height: 0px" />
    </el-watermark>
    <div class="p-2">
        <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
            <div v-show="showSearch" class="mb-[10px]">
                <el-card shadow="hover">
                    <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                        <el-form-item label="创建人" prop="createName">
                            <el-select filterable v-model="queryParams.createBy" placeholder="请选择创建人" clearable>
                                <el-option v-for="name in nickName" :key="name.userId" :label="name.nickName" :value="name.userId" />
                            </el-select>
                        </el-form-item>


                        <el-form-item label="接收人" prop="acceptAccount">
                            <el-select filterable v-model="queryParams.acceptAccount" placeholder="请选择接收人" clearable>
                                <el-option v-for="name in nickName" :key="name.userId" :label="name.nickName" :value="name.userId" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="状态" prop="state">
                            <el-select v-model="queryParams.state" placeholder="请选择状态" clearable>
                                <el-option v-for="dict in work_info_state" :key="dict.value" :label="dict.label" :value="dict.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="类型" prop="workType">
                            <el-select v-model="queryParams.workType" placeholder="请选择类型" clearable>
                                <el-option v-for="dict in work_info_type" :key="dict.value" :label="dict.label" :value="dict.value" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="标题或内容" prop="workTitle" label-width="90">
                            <el-input v-model="queryParams.workTitle" placeholder="请输入标题或内容" />
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
                        <el-button v-hasPermi="['workInfo:workInfo:add']" type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
                    </el-col>
                    <el-col :span="1.5">
                        <el-button v-hasPermi="['workInfo:workInfo:edit']" type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()"
                        >修改</el-button
                        >
                    </el-col>
                    <el-col :span="1.5">
                        <el-button v-hasPermi="['workInfo:workInfo:remove']" type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()"
                        >删除</el-button
                        >
                    </el-col>
                    <el-col :span="1.5">
                        <el-button v-hasPermi="['workInfo:workInfo:export']" type="warning" plain icon="Download" @click="handleExport">导出</el-button>
                    </el-col>
                    <right-toolbar v-model:showSearch="showSearch" @query-table="getList"></right-toolbar>
                </el-row>
            </template>

            <el-table v-loading="loading" :data="workInfoList" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="45" align="center" />
                <!--        <el-table-column label="id" align="center" prop="id" v-if="true" />-->
                <el-table-column label="流水号" prop="number" width="180">
                    <template #default="scope">
                        <el-button  type="primary" link  @click="goToDetailPage(scope.row)">{{ scope.row.number }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="标题"  prop="workTitle">
                    <template #default="scope">
                        <!--            <span :style="{ color: '#009fff' }" @click="handleView(scope.row)">{{ scope.row.workTitle }}</span>-->
                        <span>{{ scope.row.workTitle }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" align="center"  width="120" prop="state">
                    <template #default="scope">
                        <dict-tag :options="work_info_state" :value="scope.row.state" />
                    </template>
                </el-table-column>
                <el-table-column label="类型" align="center"  width="95" prop="workType">
                    <template #default="scope">
                        <dict-tag :options="work_info_type" :value="scope.row.workType" />
                    </template>
                </el-table-column>
                <!--        <el-table-column label="创建人" align="center" width="110" prop="createByName" />-->
                <el-table-column label="接收人" width="110" prop="acceptAccountName" />
                <el-table-column label="对接人"  width="110" prop="contactPerson" />
                <!--        <el-table-column label="附件" align="center">-->
                <!--          <template #default="scope">-->
                <!--            <file-download v-model="scope.row.attachs" />-->
                <!--          </template>-->
                <!--        </el-table-column>-->
                <el-table-column label="创建时间" align="center" prop="createTime" width="150">
                    <template #default="scope">
                        <span>{{ parseTime(scope.row.createTime) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="完成时间" align="center" prop="createTime" width="150">
                    <template #default="scope">
                        <span>{{ parseTime(scope.row.finishTime) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                    <template #default="scope">
                        <el-button
                                v-if="scope.row.acceptAccount == currentUserId && scope.row.state == '2'"
                                type="warning"
                                @click="handleAccept(scope.row)"
                        >
                            接收
                        </el-button>

                        <el-button
                                v-if="scope.row.acceptAccount == currentUserId && scope.row.state == '3'"
                                type="success"
                                @click="handleFinish(scope.row)"
                        >完成</el-button>


                        <!--              <el-button-->
                        <!--                      v-if="scope.row.state == '4'"-->
                        <!--                      v-hasRoles="['wf_captain']"-->
                        <!--                     type="warning"-->
                        <!--                      @click="handleAudit(scope.row)"-->
                        <!--              >审核</el-button-->
                        <!--              >-->
                        <el-tooltip content="修改" placement="top">
                            <el-button  v-if="scope.row.state === '2'" v-hasPermi="['workInfo:workInfo:edit']"  type="primary" icon="Edit" @click="handleUpdate(scope.row)"></el-button>
                        </el-tooltip>
                        <!--            <el-tooltip content="删除" placement="top">-->
                        <!--              <el-button v-hasPermi="['workInfo:workInfo:remove']"  type="danger" icon="Delete" @click="handleDelete(scope.row)"></el-button>-->
                        <!--            </el-tooltip>-->






                        <!--            <el-button link type="text" class="el-button&#45;&#45;primary" @click="openWorkinfolog(scope.row)" >处理过程22</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
            <pagination v-show="total > 0" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" :total="total" @pagination="getList" />
        </el-card>
        <!-- 添加或修改工单管理对话框 -->
        <el-dialog v-model="dialog.visible" :title="dialog.title" width="auto" append-to-body>
            <el-form-item label="工单类型" prop="mode">
                <el-radio-group v-model="form.mode">
                    <el-radio label="A" >会议保障</el-radio>
                    <el-radio label="B">故障处理</el-radio>
                </el-radio-group>
            </el-form-item>
<!--            <template v-if="form.mode === 'A'">-->
            <el-form-item label="标题" prop="workTitle" label-width="80px">
                <el-input v-model="form.workTitle" placeholder="请输入标题" />
            </el-form-item>

            <el-form ref="workInfoFormRef" :model="form"  label-width="80px">
                <el-form-item label="等级" prop="workLevel">
                    <el-select v-model="form.workLevel" placeholder="请选择工单等级">
                        <el-option v-for="dict in test_dj" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="处理人" prop="contactPerson">
                    <el-input v-model="form.contactPerson" placeholder="请输入处理人" />
                </el-form-item>

                <!--        预计解决日期-->
                <el-form-item label="开始时间" style="width: 666px">
                    <el-date-picker
                            v-model="form.startTime"
                            type="datetime"
                            placeholder="请选择开始时间"
                            format="YYYY-MM-DD HH:mm:ss"
                            date-format="MMM DD, YYYY"
                            time-format="HH:mm"
                    />
                </el-form-item>
                <el-form-item label="结束时间" style="width: 666px">
                    <el-date-picker
                            v-model="form.endTime"
                            type="datetime"
                            placeholder="请选择结束时间"
                            format="YYYY-MM-DD HH:mm:ss"
                            date-format="MMM DD, YYYY"
                            time-format="HH:mm"
                    />
                </el-form-item>
                <!--        <el-form-item label="内容">-->
                <!--          <editor v-model="form.workContent" :min-height="192" />-->
                <!--        </el-form-item>-->

                <!--        <el-form-item label="附件" prop="attachIds">-->
                <!--          <file-upload v-model="form.attachIds" />-->
                <!--        </el-form-item>-->

                <el-form-item label="接收人">
                    <el-input v-model="form.acceptAccountName" placeholder="" style="width: 120px" :readonly="true" :disabled="true" />
                    <el-button type="primary" plain icon="Plus" @click="openSelectUser">请选择接收人</el-button>
                </el-form-item>
            </el-form>
<!--            </template>-->
            <template #footer>
                <div class="dialog-footer">
                    <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
                    <el-button @click="cancel">取 消</el-button>
                </div>
            </template>
            <select-user ref="selectRef" :parent-form="form" @ok="handleQuery" @set-accept-account="setAcceptAccount" />

        </el-dialog>
        <finish-work ref="finishWork" :data-object="dataObject" @ok="handleQuery" @fresh-list="getList" />
        <work-log ref="workLog" :data-object="dataObject" />
        <el-dialog v-model="isProcess" title="流程跟踪" width="80%">
            <!--      :before-close="handleClose"-->
            <div>
                <Process v-if="isProcess" :process-data="yourProcessData" />
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <!--          <el-button @click="isProcess = false">关闭</el-button>-->
                    <el-button type="primary" @click="isProcess = false"> 关闭 </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup name="WorkInfo" lang="ts">
import { listWorkInfo, getWorkInfo, delWorkInfo, addWorkInfo, updateWorkInfo, acceptWorkInfo, AuditlistWorkInfo } from '@/api/workInfo/workInfo';
import { WorkInfoVO, WorkInfoQuery, WorkInfoForm } from '@/api/workInfo/workInfo/types';
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import useUserStore from '@/store/modules/user';
import SelectUser from './selectUser.vue';
import FinishWork from './finishWork.vue';
import WorkLog from './workLog.vue';
import Process from './process1.vue';
import { LeaveVO } from '@/api/workflow/leave/types';
// import { reactive, watch } from 'vue'
// import { isDark } from '@/composables/dark'
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';
import { listAllProject, listProject } from '@/api/workProject/project';
import { ProjectVO } from '@/api/workProject/project/types';
import { RouterJumpVo } from '@/api/workflow/workflowCommon/types';
import workflowCommon from '@/api/workflow/workflowCommon';
import { listUser } from "@/api/system/user";
import {UserVO} from "@/api/system/user/types";
const router = useRouter();
console.log(router.currentRoute.value.query, 'router');

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { work_info_type, work_info_state, test_xm, test_fl, test_dj } = toRefs<any>(
    proxy?.useDict('work_info_type', 'work_info_state', 'test_xm', 'test_fl', 'test_dj')
);
const selectRef = ref<InstanceType<typeof SelectUser>>();
const workLog = ref<InstanceType<typeof WorkLog>>();
const finishWork = ref<InstanceType<typeof FinishWork>>();
const value2 = ref('')
const value1 = ref('')
const workInfoList = ref<WorkInfoVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const currentUserId = useUserStore().userId;
const user = useUserStore();
const yourProcessData = reactive({
    someProperty: ''
});
const project = ref<ProjectVO[]>([]);
const nickName = ref(ref<UserVO[]>());
const queryFormRef = ref<ElFormInstance>();
const workInfoFormRef = ref<ElFormInstance>();
const dialog = reactive<DialogOption>({
    visible: false,
    title: ''
});

const dataObject = reactive<any>({});

const initFormData: {
    attachs: undefined;
    attachIds: undefined;
    createBy: undefined;
    workTitle: undefined;
    classificationType: undefined;
    acceptAccountName: undefined;
    contactPerson: undefined;
    id: undefined;
    state: undefined;
    acceptAccount: undefined;
    workLevel: undefined
} = {
    id: undefined,
    workTitle: undefined,
    state: undefined,
    workLevel: undefined,
    classificationType: undefined,
    acceptAccount: undefined,
    acceptAccountName: undefined,
    attachs: undefined,
    attachIds: undefined,
    createBy: undefined,
    contactPerson: undefined
};
const data = reactive<PageData<WorkInfoForm, WorkInfoQuery>>({
    form: { ...initFormData },
    queryParams: {
        pageNum: 1,
        pageSize: 10,
        workTitle: undefined,
        state: undefined,
        workLevel: undefined,
        classificationType: undefined,
        attachs: undefined,
        attachIds: undefined,
        acceptAccount: undefined,
        acceptAccountName: undefined,
        contactPerson:undefined,
        params: {}
    },
    rules: {
        workTitle: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
        workLevel: [{ required: true, message: '类型不能为空', trigger: 'change' }],

    }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询工单管理列表 */
const getList = async () => {
    loading.value = true;
    // console.log(router.currentRoute.value.query,'router')
    console.log('事件列表查询信息-----' + router.currentRoute.value.query.state);
    const res = await listWorkInfo(queryParams.value);
    workInfoList.value = res.rows;
    total.value = res.total;
    loading.value = false;
};


const getWorkList = async () => {
    // form.value.mode='A';
    loading.value  = true;
    const res = await listProject();
    if (res && res.rows)  {
        project.value  = res.rows;  // 将返回的项目数据存储在 project 变量中
    }
    console.log(res);
    loading.value  = false;
};

const fetchUserList = async () => {
    loading.value = true;
    const res = await listUser(); // 调用接口
    if (res && res.rows) {
        // 假设接口返回的数据结构为 { rows: [{ nickName: '张三' }, { nickName: '李四' }] }
        nickName.value = res.rows; // 提取 nickName
        // nickName.userId=res.rows.map(user => user.userId);
        // consolel.log(nickName)
    }

};

const setAcceptAccount = (selection: any) => {
    form.value.acceptAccount = selection.userId;
    form.value.acceptAccountName = selection.nickName;
};

/** 取消按钮 */
const cancel = () => {
    reset();
    dialog.visible = false;
};

/**
 * 增加跳转
 */
const isProcess = ref(false);
//打开弹窗
const goToDetailPage = (row) => {
    // lsh.value=row.number;
    console.log(row.number);
    console.log(isProcess.value);
    yourProcessData.someProperty = row.number;
    console.log(yourProcessData, 1111);
    isProcess.value = true;
    // console.log(lsh.value)
};
//弹窗关闭监听
// const handleClose = ()=>{
//
// }

/** 表单重置 */
const reset = () => {
    form.value = { ...initFormData };
    workInfoFormRef.value?.resetFields();
};

/** 重置按钮操作 */
const resetQuery = () => {
    queryFormRef.value?.resetFields();
    handleQuery();
};

const handleAudit = (row: WorkInfoVO) => {
    finishWork.value?.show();
    dataObject.row = row;
    dataObject.type = 'finishAudit';
    dataObject.title = '审核工作成果';
    // dataObject.visible = true;
};

const handleFinish = (row: WorkInfoVO) => {
    finishWork.value?.show();
    dataObject.row = row;
    dataObject.type = 'finishWork';
    dataObject.title = '完成工单';
    // dataObject.visible = true;
};

const openSelectUser = () => {
    selectRef.value?.show();
};

const openWorkinfolog = (row: WorkInfoVO) => {
    workLog.value?.show(row);
};

/** 搜索按钮操作 */
const handleQuery = () => {
    queryParams.value.pageNum = 1;
    getList();
};

/** 多选框选中数据 */
const handleSelectionChange = (selection: WorkInfoVO[]) => {
    ids.value = selection.map((item) => item.id);
    single.value = selection.length != 1;
    multiple.value = !selection.length;
};

/** 新增按钮操作 */
const handleAdd = () => {
    reset();
    dialog.visible = true;
    dialog.title = '添加工单管理';
    //查询所有项目数据
    getWorkProjectList();
    getList();

};

const getWorkProjectList = async () => {
    // loading.value = true;
    // console.log(router.currentRoute.value.query,'router')
    const res = await listAllProject();
    project.value = res.rows;
    console.log(res);
};

const handleAccept = async (row?: WorkInfoVO) => {
    // const _ids = row?.id || ids.value;
    // await proxy?.$modal.confirm('是否确认接收管理编号为"' + _ids + '"的工单？').finally(() => (loading.value = false));
    // await acceptWorkInfo(_ids);
    // proxy?.$modal.msgSuccess('接收成功');
    finishWork.value?.show();
    dataObject.row = row;
    dataObject.type = 'receiveWork';
    dataObject.title = '接收工单';
    await getList();
};

/** 修改按钮操作 */
const handleUpdate = async (row?: WorkInfoVO) => {
    reset();
    const _id = row?.id || ids.value[0];
    const res = await getWorkInfo(_id);
    Object.assign(form.value, res.data);

    let attachIds = '';
    if (form.value.attachs) {
        let jsonData = JSON.parse(form.value.attachs);
        let arr = [];
        for (var item of jsonData) {
            arr.push(item.id);
        }
        attachIds = arr.join(',');
        form.value.attachIds = attachIds;
    }
    dialog.visible = true;
    dialog.title = '修改工单管理';
};

const handleView = async (row?: WorkInfoVO) => {
    reset();
    const _id = row?.id || ids.value[0];
    const res = await getWorkInfo(_id);
    Object.assign(form.value, res.data);

    let attachIds = '';
    if (form.value.attachs) {
        let jsonData = JSON.parse(form.value.attachs);
        let arr = [];
        for (var item of jsonData) {
            arr.push(item.id);
        }
        attachIds = arr.join(',');
        form.value.attachIds = attachIds;
    }
    dialog.visible = true;
    dialog.title = '查看工单';
};

const handleLook = async (row?: WorkInfoVO) => {
    reset();
    const _id = row?.id || ids.value[0];
    const res = await getWorkInfo(_id);
    Object.assign(form.value, res.data);

    let attachIds = '';
    if (form.value.attachs) {
        let jsonData = JSON.parse(form.value.attachs);
        let arr = [];
        for (var item of jsonData) {
            arr.push(item.id);
        }
        attachIds = arr.join(',');
        form.value.attachIds = attachIds;
    }
    dialog.visible = true;
    dialog.title = '查看工单';
};

/** 提交按钮 */
const submitForm = () => {
    workInfoFormRef.value?.validate(async (valid: boolean) => {
        form.value.projectName="123";
        form.value.workContent="123";
        form.value.workType="1";
        if (valid) {
            buttonLoading.value = true;
            const startDate = dayjs(form.value.startTime).format('YYYY-MM-DD HH:mm:ss');
            const endDate = dayjs(form.value.endTime).format('YYYY-MM-DD HH:mm:ss');
            try {
                form.value.startTime=startDate;
                form.value.endTime=endDate;
                if (form.value.id) {
                    // 修改操作
                    await updateWorkInfo(form.value);
                } else {
                    // 新增操作
                    await addWorkInfo(form.value);
                    dataObject.type = 'receiveWork';
                }
                proxy?.$modal.msgSuccess('操作成功');
                dialog.visible = false;
                await getList(); // 新增保存后刷新列表
            } catch (error) {
                console.error('操作失败', error);
            } finally {
                buttonLoading.value = false;
            }
        }
    });
};

/** 删除按钮操作 */
const handleDelete = async (row?: WorkInfoVO) => {
    const _ids = row?.id || ids.value;
    await proxy?.$modal.confirm('是否确认删除工单管理编号为"' + _ids + '"的数据项？').finally(() => (loading.value = false));
    await delWorkInfo(_ids);
    proxy?.$modal.msgSuccess('删除成功');
    await getList();
};

/** 导出按钮操作 */
const handleExport = () => {
    proxy?.download(
        'workInfo/workInfo/export',
        {
            ...queryParams.value
        },
        `workInfo_${new Date().getTime()}.xlsx`
    );
};

//925增加水印
const font = reactive({
    color: 'rgba(0, 0, 0, .15)'
});

onMounted(() => {
    getWorkList();
    fetchUserList();
    getList();
    // form.mode='A';
});
</script>
