<template>
    <div>
<!--        <h1>{{ this.titleName }}</h1>-->

        <!-- 筛选条件 -->
        <div class="filter-container">
            <!-- 所有项目 -->
            <el-select
                    filterable
                    v-model="projectName"
                    placeholder="选择项目"
                    clearable
                    style="margin-right: 10px; width: 80%"
            >
                <el-option
                        v-for="name in project"
                        :key="name"
                        :label="name"
                        :value="name"
                />
            </el-select>

            <!-- 任务安排人筛选 -->
            <el-select
                    filterable
                    v-model="selectedAssignee"
                    placeholder="选择处理人"
                    clearable
                    style="margin-right: 10px; width: 30%"
            >
                <el-option
                        v-for="name in nickName"
                        :key="name"
                        :label="name"
                        :value="name"
                />
            </el-select>

            <!-- 日期筛选 -->
            <el-date-picker
                    v-model="selectedDate"
                    type="daterange"
                    placeholder="选择月份"
                    format="YYYY年MM月-DD日"
                    value-format="YYYY-MM-DD"
                    style="margin-right: 10px; width: 800px"
            />
            <div style="width: 70%;position: absolute;margin-top: -5%;margin-left: 35%">
                <el-button
                        :class="{ 'blue-button': this.activeButton === 'lastWeek' }"
                        @click="selectLastWeek"
                >
                    上周
                </el-button>
                <el-button
                        :class="{ 'blue-button': this.activeButton === 'thisWeek' }"
                        @click="selectThisWeek"
                >
                    本周
                </el-button>
                <el-button
                        :class="{ 'blue-button': this.activeButton === 'nextWeek' }"
                        @click="selectNextWeek"
                >
                    下周
                </el-button>
            </div>
            <!-- 状态筛选 -->
            <el-select
                    v-model="selectedStatus"
                    placeholder="选择状态"
                    clearable
                    style="margin-right: 10px; width: 30%"
            >
                <el-option
                        v-for="(statusText, statusValue) in statusMap"
                        :key="statusValue"
                        :label="statusText"
                        :value="statusValue"
                />
            </el-select>

            <!-- 查询按钮 -->
<!--            <el-button type="primary" @click="filterTasks">查询</el-button>-->
        </div>

        <!-- 表格 -->
        <div v-loading="isLoading" element-loading-text="数据加载中，请稍后..." element-loading-spinner="el-icon-loading">
            <!-- 按项目展示 -->
            <div v-if="projectName && !selectedAssignee">
                <div v-for="(tasks, assignee) in groupedByAssignee" :key="assignee">
                    <h2 style="text-align:center">{{assignee +'（'+this.startTime+'--'+this.endTime+'）'}}</h2>
<!--                    <h2 style="text-align:center">{{ '周报汇总（'+this.startTime+'&#45;&#45;'+this.endTime+'）'}}</h2>-->
                    <el-table
                            :data="tasks"
                            style="width: 95%;margin-left: 2%"
                            border
                            :span-method="handleSpanMethod"
                    >
                        <el-table-column prop="project" label="所属项目" width="350"></el-table-column>
                        <el-table-column prop="createname" label="处理人" width="100"></el-table-column>
                        <el-table-column prop="sblsh" label="流水号" width="160"></el-table-column>
                        <el-table-column prop="assignee" label="任务安排人/对接人" width="150"></el-table-column>
                        <el-table-column label="具体工作内容">
                            <template #default="{ row }">
                                <el-button type="text" @click="handleRowClick(row.sblsh)">{{ row.description }}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="workTime" label="工作时长" width="150"></el-table-column>
                        <el-table-column prop="status" label="完成情况" width="120">
                            <template #default="{ row }">
                                <el-tag :type="getStatusTagType(row.status)">
                                    {{ row.status }}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="crTime" label="创建时间" width="200"></el-table-column>
                    </el-table>
                </div>
            </div>

            <!-- 按处理人展示 -->
            <div v-else-if="selectedAssignee && !projectName">
                <div v-for="(tasks, project) in groupedByProject" :key="project">
                    <h2 style="text-align:center">{{  project  }}</h2>
<!--                    <h2 style="text-align:center">{{'个人周报（'+this.startTime+'&#45;&#45;'+this.endTime+'）' }}</h2>-->
                    <el-table
                            :data="tasks"
                            style="width: 95%;margin-left: 2%"
                            border
                            :span-method="handleSpanMethod"
                    >
                        <el-table-column prop="project" label="所属项目" width="350"></el-table-column>
                        <el-table-column prop="createname" label="处理人" width="100"></el-table-column>
                        <el-table-column prop="sblsh" label="流水号" width="160"></el-table-column>
                        <el-table-column prop="assignee" label="任务安排人/对接人" width="150"></el-table-column>
                        <el-table-column label="具体工作内容">
                            <template #default="{ row }">
                                <el-button type="text" @click="handleRowClick(row.sblsh)">{{ row.description }}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="workTime" label="工作时长" width="150"></el-table-column>
                        <el-table-column prop="status" label="完成情况" width="120">
                            <template #default="{ row }">
                                <el-tag :type="getStatusTagType(row.status)">
                                    {{ row.status }}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="crTime" label="创建时间" width="200"></el-table-column>
                    </el-table>
                </div>
            </div>

            <!-- 默认展示 -->
            <div v-else>
                <el-table
                        :data="filteredTasks"
                        style="width: 95%;margin-left: 2%"
                        border
                        :span-method="handleSpanMethod"
                >
                    <el-table-column prop="project" label="所属项目" width="350"></el-table-column>
                    <el-table-column prop="createname" label="处理人" width="100"></el-table-column>
                    <el-table-column prop="sblsh" label="流水号" width="160"></el-table-column>
                    <el-table-column prop="assignee" label="任务安排人/对接人" width="150"></el-table-column>
                    <el-table-column label="具体工作内容">
                        <template #default="{ row }">
                            <el-button type="text" @click="handleRowClick(row.sblsh)">{{ row.description }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="workTime" label="工作时长" width="150"></el-table-column>
                    <el-table-column prop="status" label="完成情况" width="120">
                        <template #default="{ row }">
                            <el-tag :type="getStatusTagType(row.status)">
                                {{ row.status }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="crTime" label="创建时间" width="200"></el-table-column>
                </el-table>
            </div>
        </div>

        <!-- 对话框 -->
        <el-dialog
                v-model="dialogVisible"
                title="流程详情"
                width="80%"
        >
            <new-work-process1 v-if="dialogVisible" :process-data="yourProcessData" />
            <template #footer>
                <el-button @click="dialogVisible = false">关闭</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { ref, computed, onMounted, watch, nextTick, reactive } from 'vue';
import { listUser } from '@/api/system/user'; // 引入 listUser 接口
import { selectWorkInfoByName } from '@/api/workInfo/workInfo'; // 引入 selectWorkInfoByName 接口
import NewWorkProcess1 from '../../newWork/work/process1.vue'; // 引入组件
import dayjs from 'dayjs';
import { listAllProject } from "@/api/workProject/project";

export default {
    components: {
        NewWorkProcess1
    },
    setup() {
        let lastweekNumber = 0;
        const getWeekRange = (date) => {
            const startOfWeek = dayjs(date).startOf('week');
            const endOfWeek = dayjs(date).endOf('week');
            return [startOfWeek.format('YYYY-MM-DD'), endOfWeek.format('YYYY-MM-DD')];
        };
        const selectThisWeek = () => {
            lastweekNumber = 0;
            selectedDate.value = getWeekRange(dayjs());
            activeButton.value = 'thisWeek';
        };

        const selectLastWeek = () => {
            lastweekNumber = lastweekNumber + 1;
            selectedDate.value = getWeekRange(dayjs().subtract(lastweekNumber, 'week'));
            activeButton.value = 'lastWeek';
        };

        const selectNextWeek = () => {
            lastweekNumber = lastweekNumber - 1;
            selectedDate.value = getWeekRange(dayjs().subtract(lastweekNumber, 'week'));
            activeButton.value = 'nextWeek';
        };

        const tasks = ref([]);
        const titleName = ref('周报汇总');
        const project = ref([]);
        const selectedDate = ref([]);
        const selectedAssignee = ref('');
        const projectName = ref('');
        const activeButton = ref('');
        const selectedStatus = ref('');
        const nickName = ref([]);
        const isSearching = ref(false); // 是否正在搜索
        const startTime = ref('');
        const endTime = ref('');
        const yourProcessData = reactive({
            someProperty: ''
        });

        const statusMap = {
            '1': '未分配',
            '2': '待接收',
            '3': '处理中',
            '4': '待审核',
            '5': '已完成',
            '6': '已完成（不通过）'
        };

        const assignees = computed(() => {
            const uniqueAssignees = new Set(tasks.value.map(task => task.assignee));
            return Array.from(uniqueAssignees);
        });

        const filteredTasks = computed(() => {
            return tasks.value.filter(task => {
                let matchesDate = true;
                if (Array.isArray(selectedDate.value) && selectedDate.value.length === 2) {
                    const startDate = selectedDate.value[0];
                    const endDate = selectedDate.value[1];
                    matchesDate = task.crTime >= startDate && task.crTime <= endDate;
                }
                const matchesAssignee = selectedAssignee.value ? task.createname === selectedAssignee.value : true;
                const matchesStatus = selectedStatus.value ? task.state === selectedStatus.value : true;
                const projectSelect = projectName.value ? task.project === projectName.value : true;
                return matchesDate && matchesAssignee && matchesStatus && projectSelect;
            });
        });

        const groupedByAssignee = computed(() => {
            const grouped = {};
            filteredTasks.value.forEach(task => {
                if (!grouped[task.createname]) {
                    grouped[task.createname] = [];
                }
                grouped[task.createname].push(task);
            });
            return grouped;
        });

        const groupedByProject = computed(() => {
            const grouped = {};
            filteredTasks.value.forEach(task => {
                if (!grouped[task.project]) {
                    grouped[task.project] = [];
                }
                grouped[task.project].push(task);
            });
            return grouped;
        });

        const handleSpanMethod = ({ row, column, rowIndex, columnIndex }) => {
            // 只有在搜索时才合并
            if (isSearching.value) {
                // 合并“所属项目”列
                if (columnIndex === 0) { // 第一列是“所属项目”
                    debugger;
                    const project = row.project;
                    let rowspan = 1;
                    console.log(filteredTasks.value.length)
                    // 查找相同项目的行数
                    for (let i = rowIndex + 1; i < filteredTasks.value.length; i++) {
                        if (filteredTasks.value[i].project === project) {
                            rowspan++;
                        }
                    }
                    // 如果当前行是相同项目的第一行，则合并
                    // if (rowspan > ) {
                        return {
                            rowspan: rowspan,
                            colspan: 1
                        };
                    // }
                }

                // // 合并“处理人”列
                // if (columnIndex === 1) { // 第二列是“处理人”
                //     const assignee = row.createname;
                //     let rowspan = 1;
                //     // 查找相同处理人的行数
                //     for (let i = rowIndex + 1; i < filteredTasks.value.length; i++) {
                //         if (filteredTasks.value[i].createname === assignee) {
                //             rowspan++;
                //         } else {
                //             break;
                //         }
                //     }
                //     // 如果当前行是相同处理人的第一行，则合并
                //     if (rowspan > 0) {
                //         return {
                //             rowspan: rowspan,
                //             colspan: 1
                //         };
                //     } else {
                //         return {
                //             rowspan: 0,
                //             colspan: 0
                //         };
                //     }
                // }
            }

            // 不搜索时，不合并任何列
            return {
                rowspan: 1,
                colspan: 1
            };
        };

        const getStatusTagType = (status) => {
            switch (status) {
                case '未分配':
                    return 'info';
                case '待接收':
                    return 'warning';
                case '处理中':
                    return 'primary';
                case '待审核':
                    return 'warning';
                case '已完成':
                    return 'success';
                case '已完成（不通过）':
                    return 'danger';
                default:
                    return 'info';
            }
        };

        const isLoading = ref(false);
        const dialogVisible = ref(false);
        const selectedTask = ref(null);

        const fetchUserList = async () => {
            try {
                isLoading.value = true;
                const res = await listUser();
                if (res && res.rows) {
                    nickName.value = res.rows.map(user => user.nickName);
                }
            } catch (error) {
                console.error('获取用户列表失败:', error);
            }
        };

        const selectWorkByName = async (assignee, dateRange, status) => {
            try {
                isLoading.value = true;
                const res = await selectWorkInfoByName(assignee, dateRange, status);
                if (res && res.data) {
                    tasks.value = res.data.map(row => ({
                        project: row.projectName,
                        assignee: row.contactPerson,
                        createname: row.createName,
                        description: row.workTitle,
                        status: getStatusText(row.state),
                        crTime: row.createTime,
                        issues: '无',
                        date: row.date || '2023-10',
                        sblsh: row.number,
                        workTime: row.workTime,
                        state: row.state.toString()
                    }));
                }
            } catch (error) {
                console.error('获取工作信息失败:', error);
            }
        };

        const getStatusText = (state) => {
            return statusMap[state] || '未知状态';
        };

        const filterTasks = () => {
            isSearching.value = true; // 设置为搜索状态
            const assignee = selectedAssignee.value;
            const dateRange = selectedDate.value;
            const status = selectedStatus.value;
            selectWorkByName(assignee, dateRange, status);
        };

        const getWorkProjectList = async () => {
            const res = await listAllProject();
            const projectList = [];
            res.rows.forEach((ii) => {
                projectList.push(ii.proName);
            });
            project.value = projectList;
        };

        watch(filteredTasks, async (newValue) => {
            if (newValue.length > 0) {
                const startDate = selectedDate.value[0];
                const endDate = selectedDate.value[1];
                startTime.value=startDate;
                endTime.value=endDate;
                if (!projectName.value && !selectedAssignee.value) {
                    titleName.value = "周报汇总（" + startDate + "--" + endDate + "）";
                } else if (selectedAssignee.value) {
                    titleName.value = newValue[0].createname + "个人工作周报（" + startDate + "--" + endDate + "）";
                } else {
                    titleName.value = projectName.value + "周报汇总（" + startDate + "--" + endDate + "）";
                }
                await nextTick();
                setTimeout(() => {
                    isLoading.value = false;
                }, 300);
            }
        });

        const handleRowClick = async (row) => {
            try {
                isLoading.value = true;
                selectedTask.value = row;
                yourProcessData.someProperty = row;
                dialogVisible.value = true;
            } catch (error) {
                console.error('获取任务详情失败:', error);
            } finally {
                isLoading.value = false;
            }
        };

        onMounted(() => {
            getWorkProjectList();
            fetchUserList();
            selectThisWeek();
            selectWorkByName('', [], '');
        });

        return {
            selectedDate,
            selectThisWeek,
            selectLastWeek,
            selectNextWeek,
            selectedAssignee,
            selectedStatus,
            assignees,
            filteredTasks,
            handleSpanMethod,
            nickName,
            filterTasks,
            getStatusTagType,
            isLoading,
            statusMap,
            dialogVisible,
            selectedTask,
            handleRowClick,
            yourProcessData,
            titleName,
            project,
            projectName,
            activeButton,
            groupedByAssignee,
            groupedByProject,
            startTime,
            endTime
        };
    }
};
</script>

<style scoped>
h1 {
    text-align: center;
    margin-bottom: 20px;
}

.filter-container {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    width: 60%;
    margin-top: 4%;
    margin-left: 2%;
}

.blue-button {
    background-color: #00aeff;
    color: white;
}
</style>
