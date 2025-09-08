<template>
    <div class="p-2">
        <el-dialog :title="props.dataObject.title" v-model="props.dataObject.visible" width="850px" append-to-body>
            <el-form ref="infoLogFormRef" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="工单标题" v-if="props.dataObject.type === 'finishAudit'">
                    <a style="color:#00a6ff"  @click="goToDetailPage(props.dataObject.row.number)">{{props.dataObject.row.workTitle}}</a>
                </el-form-item>
                <el-form-item  label="项目名称" v-if="props.dataObject.type === 'finishAudit'">
                    <span>{{props.dataObject.row.projectName}}</span>
                </el-form-item>
                <el-form-item v-if="props.dataObject.type === 'finishAudit'" label="审核结果" prop="menuType">
                    <el-radio-group  v-model="form.state">
                        <el-radio value="1">通过</el-radio>
                        <el-radio value="0">不通过</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="内容" prop="workContent">
                    <editor v-model="form.workContent" :min-height="190" />
                </el-form-item>
                <el-form-item label="附件" prop="attachs">
                    <file-upload v-model="form.attachs" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer" v-if="props.dataObject.type === 'finishAudit' || props.dataObject.type === 'receiveWork'|| props.dataObject.type === 'finishWork'">
                    <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
                    <el-button @click="cancel">取 消</el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog
            v-model="isProcess"
            title="流程跟踪"
            width="80%"
        >
            <!--      :before-close="handleClose"-->
            <div>
                <Process v-if="isProcess" :processData="yourProcessData"/>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <!--          <el-button @click="isProcess = false">关闭</el-button>-->
                    <el-button type="primary" @click="isProcess = false">
                        关闭
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup name="InfoLog" lang="ts">
import { listInfoLog, getInfoLog, delInfoLog, addInfoLog, updateInfoLog } from '@/api/infolog/infoLog';
import {finishWork, finishAudit, receiveWork} from '@/api/workInfo/workInfo';
import { InfoLogVO, InfoLogQuery, InfoLogForm } from '@/api/infolog/infoLog/types';
import Process from "@/views/newWork/workaudit/process1.vue";
import {ref} from "vue";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const emit = defineEmits(['ok', 'freshList']);
const isProcess = ref(false)
const infoLogList = ref<InfoLogVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const total = ref(0);
const yourProcessData= reactive({
    // someProperty: props.dataObject.row.number
    someProperty:''
});
const infoLogFormRef = ref<ElFormInstance>();

const props = defineProps({
    dataObject: {
        type: [Object],
        required: true
    }
});

const dialog = reactive<DialogOption>({
    visible: false,
    title: ''
});

const initFormData: InfoLogForm = {
    id: undefined,
    workContent: undefined,
    state: undefined,
    attachs: undefined
};

const data = reactive<PageData<InfoLogForm, InfoLogQuery>>({
    form: { ...initFormData },
    queryParams: {
        pageNum: 1,
        pageSize: 10,
        workContent: undefined,
        state: undefined,
        attachs: undefined,
        params: {}
    },
    rules: {
        // eslint-disable-next-line prettier/prettier
        workContent: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
    }
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

const show = () => {
    debugger;

    // 然后重置表单
    reset();
    // 先根据类型设置内容
    if (props.dataObject.type === 'receiveWork') {
        form.value.workContent = '已接收，正在处理';
    }

    // 显示对话框
    // eslint-disable-next-line vue/no-mutating-props
    props.dataObject.visible = true;
};
const goToDetailPage= number => {
    yourProcessData.someProperty=number;
    isProcess.value = true
}
/** 取消按钮 */
const cancel = () => {
    reset();
    // eslint-disable-next-line vue/no-mutating-props
    props.dataObject.visible = false;
};

/** 表单重置 */
const reset = () => {
    form.value = { ...initFormData };
    infoLogFormRef.value?.resetFields();
};

/** 搜索按钮操作 */
const handleQuery = () => {
    queryParams.value.pageNum = 1;
    getList();
};

/** 提交按钮 */
const submitForm = () => {
    infoLogFormRef.value?.validate(async (valid: boolean) => {
        if (valid) {
            buttonLoading.value = true;
            form.value.workInfoId = props.dataObject.row.id;
            console.info(form);
            if (form.value.id) {
                await updateInfoLog(form.value).finally(() => (buttonLoading.value = false));
            } else {
                if (props.dataObject.type === 'finishAudit') {
                    await finishAudit(form.value).finally(() => (buttonLoading.value = false));
                } else if (props.dataObject.type === 'finishWork') {
                    await finishWork(form.value).finally(() => (buttonLoading.value = false));
                }else if (props.dataObject.type === 'receiveWork'){
                    await receiveWork(form.value).finally(() => (buttonLoading.value = false));
                    props.dataObject.type='';
                }
            }
            proxy?.$modal.msgSuccess('操作成功');
            // eslint-disable-next-line vue/no-mutating-props
            props.dataObject.visible = false;
            emit('ok');
        }
    });
    // form.value.workContent='';
};

defineExpose({
    show
});

// onMounted(() => {
//   getList();
// });
</script>
