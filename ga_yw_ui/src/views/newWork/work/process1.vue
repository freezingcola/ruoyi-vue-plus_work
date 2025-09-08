<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <el-watermark style="position: static" :content="[userName]">
      <div style="height: 0px" />
    </el-watermark>
    <div style="height: 800px">
      <div class="arrowsBox">
        <div v-for="(item, index) in list" :key="index" class="arrowsItem" @click="done(index)">
          <div
            class="arrows-up arrows"
            :class="{
              arrows_active: item.status === 'active',
              arrows_done: item.status === 'done',
              arrows_todo: item.status === 'todo'
            }"
          ></div>
          <div
            class="arrows-down arrows"
            :class="{
              arrows_active: item.status === 'active',
              arrows_done: item.status === 'done',
              arrows_todo: item.status === 'todo'
            }"
          ></div>
          <div
            class="arrows-label"
            :class="{
              arrows_label_active: item.status === 'active',
              arrows_label_done: item.status === 'done',
              arrows_label_todo: item.status === 'todo'
            }"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
      <div v-for="(i, index) in listData" :key="index">
        <el-card v-if="activeIndex == index">
          <template #header>
            <div class="card-header">
              <span v-if="i.state!==0">{{ i.state == 2 ? '创建' : i.state == 3 ? '接收' : i.state == 4 ? '处置' : '已完成' }}</span>
            </div>
          </template>
            <el-descriptions column="1">
                <!-- 第一列 -->
                <el-descriptions-item label="项目:">
                    {{ i.projectName }} <!-- 假设这里用项目名称作为标题，或根据需要替换为其他字段 -->
                </el-descriptions-item>

            </el-descriptions>
            <el-descriptions column="1">
                <el-descriptions-item width="363" label="主题:">
                    {{ i.workTitle }}
                </el-descriptions-item>
            </el-descriptions>
            <el-descriptions column="6">
                <!-- 第二列开始，空项用于占位以开始新列 -->
<!--                <el-descriptions-item>-->
<!--                    &lt;!&ndash; 空内容，仅用于占位 &ndash;&gt;-->
<!--                </el-descriptions-item>-->

                <!-- 第二列的内容 -->
                <el-descriptions-item label="发起人:">
                    {{ i.createBy }}
                </el-descriptions-item>
                <el-descriptions-item label="对接人:">
                    {{ i.contactPerson }}
                </el-descriptions-item>
                <el-descriptions-item label="接收人:">
                    {{ i.createBy }}
                </el-descriptions-item>
                <el-descriptions-item label="类型:">
                    <span v-if="i.contactPerson == 1" style="background: #ee0707;color: #fff3e0">材料整理、编写</span>
                    <span v-else-if="i.contactPerson == 2" style="background: #f15c30;color: #fff3e0">故障处理</span>
                    <span v-else-if="i.contactPerson == 3" style="background: #feb44a;color: #fff3e0">常态巡检</span>
                    <span v-else-if="i.contactPerson == 4" style="background: #2c5acf;color: #fff3e0">沟通协调</span>
                    <span v-else-if="i.contactPerson == 5" style="background: #7e8cf4;color: #fff3e0">临时工作</span> <!-- 修改了颜色以区分四级和其他 -->
                    <span v-else-if="i.contactPerson == 6" style="background: #7e8cf4;color: #fff3e0">技术评估</span> <!-- 修改了颜色以区分四级和其他 -->
                    <span v-else-if="i.contactPerson == 7" style="background: #7e8cf4;color: #fff3e0">现场保障</span> <!-- 修改了颜色以区分四级和其他 -->
                    <span v-else-if="i.contactPerson == 8" style="background: #7e8cf4;color: #fff3e0">工单处理</span> <!-- 修改了颜色以区分四级和其他 -->
                    <span v-else-if="i.contactPerson == 9" style="background: #7e8cf4;color: #fff3e0">资源管理</span> <!-- 修改了颜色以区分四级和其他 -->
                    <span v-else-if="i.contactPerson == 10" style="background: #7e8cf4;color: #fff3e0">变更实施</span> <!-- 修改了颜色以区分四级和其他 -->
                    <span v-else-if="i.contactPerson == 11" style="background: #7e8cf4;color: #fff3e0">参加会议</span> <!-- 修改了颜色以区分四级和其他 -->
                    <span v-else>其他</span>
                </el-descriptions-item>
                <el-descriptions-item label="紧急程度:">
                    <span v-if="i.workLevel == 1" style="background: #ee0707;color: #fff3e0">一级</span>
                    <span v-else-if="i.workLevel == 2" style="background: #f15c30;color: #fff3e0">二级</span>
                    <span v-else-if="i.workLevel == 3" style="background: #feb44a;color: #fff3e0">三级</span>
                    <span v-else-if="i.workLevel == 4" style="background: #2c5acf;color: #fff3e0">四级</span>
                    <span v-else-if="i.workLevel == 5" style="background: #7e8cf4;color: #fff3e0">其他</span> <!-- 修改了颜色以区分四级和其他 -->
                    <span v-else>未知</span>
                </el-descriptions-item>
                <el-descriptions-item label="时间:">
                    {{ i.createTime }}
                </el-descriptions-item>
                <el-descriptions-item label="内容:">
                    <div style="max-width: 650px;" v-html="showHtml(i.workContent)"></div> <!-- 宽度调整为适应两列布局 -->
                </el-descriptions-item>
            </el-descriptions>
          <div class="demo-image__preview" style="text-align: end">
            <el-image
              v-if="i.NewUrlList && i.NewUrlList.length > 0"
              style="width: 100px; height: 100px"
              :src="i.NewUrlList[0].url"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              :preview-src-list="i.NewUrlList.map(item => item.url)"
              :initial-index="Math.min(4, i.NewUrlList.length - 1)"
              fit="cover"
            >
              <template #error>
                <div class="image-slot">文件不是图片类型</div>
              </template>
            </el-image>
            <p>
              <el-button v-if="i.NewUrlList && i.NewUrlList.length > 0" style="color: #1c84c6" @click="openFileList(i.attachs)">
                查看附件 ({{ i.NewUrlList.length }})
              </el-button>
            </p>
          </div>
        </el-card>
      </div>
    </div>
    <el-dialog v-model="isFile" title="附件" width="50%">
      <file-download v-if="isFile" :model-value="Attachs"></file-download>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="isFile = false">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import useUserStore from '@/store/modules/user';
import { addWorkInfo, listByLsh, Download } from '@/api/workInfo/workInfo';
import * as http from "http";
export default {
    computed: {
        http() {
            return http
        }
    },
  props: {
    processData: Object // 假设你传递的是一个对象
  },
  data() {
    return {
      str: '<p>内容: 11、13:00用户报障网络卡顿后，AICC工程师 ping&amp;nbsp;测AICC服务器19.106.13.80，出现丢包现象。2、13:05—13:15运维中心值班人员登陆核心12708设备查看Eth-trunk 10互联链路，Eth-trunk 10中的成员口G1/2/0/13口状态为DOWN。3、13：15-13:42运维中心值班人员到机房复位Eth-trunk10口中的成员口G1/2/0/13，接口仍未仍未有恢复，然存在丢包情况。4、13:50-14：30 华为侧单工通过LLDP发现12708的 G1/2/0/13错连8F-C01-36U-ZWW Access-s5735-3的G0/0/47口，导致物理接口状态与聚合接口活动链路状态不一致。 经过与华为侧专家共同分析确认原因为：核心交换机12708与汇聚交换机8F-C01-38U-40U-ZWW Access-S5735 之间的物理线路松动，导致链路频繁震荡，从而导致汇聚交换机8F-C01-38U-40U-ZWW Access-S5735上所部署的业务出现up/down的情况。</p>',
      userName: useUserStore().nickname,
      listData: [],
      isFile: false,
      Attachs: [],
      list: [
        {
          label: '创建',
          prop: '2',
          status: 'todo'
        },
        {
          label: '接收',
          prop: '3',
          status: 'todo'
        },
        {
          label: '处置',
          prop: '4',
          status: 'todo'
        },
        {
          label: '审核通过',
          prop: '1',
          status: 'todo'
        },
      ],
      activeIndex: 0
    };
  },
  mounted() {
    // this.str = this.showHtml(this.str);
    this.getList();
  },
  methods: {
    openFileList(urlList) {
      // alert(123)
      this.isFile = true;
      this.Attachs = urlList;
      console.log(urlList)
    },
    // 富文本处理
    showHtml(str) {
      return str
        .replace(str ? /&(?!#?\w+;)/g : /&/g, '&amp;')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;nbsp;/g, '\u3000');
    },

    done(index) {
      if (index > this.listData.length - 1) return;
      this.activeIndex = index;
      // 先将所有项的 active 状态移除
      this.list.forEach((item) => {
        if (item.status === 'active') {
          item.status = 'done';
          delete item.prevStatus;
        }
      });

      // 将点击项的状态设置为 active
      const clickedItem = this.list[index];
      if (clickedItem.status !== 'active') {
        clickedItem.prevStatus = clickedItem.status;
        clickedItem.status = 'active';
      }
    },
    async getList() {
      let a = this.processData.someProperty;
      let res = await listByLsh(a);
      if (res.data) {
        this.listData = res.data;
        res.data.forEach(item1=>{
            if (item1.state=='0'){
                res.data.forEach(item=>{
                    console.log(item.state);
                    if (item.state==0){
                        let l=[];
                        l.push(
                            {
                                label: '创建',
                                prop: '2',
                                status: 'todo'
                            },
                            {
                                label: '接收',
                                prop: '3',
                                status: 'todo'
                            },
                            {
                                label: '处置',
                                prop: '4',
                                status: 'todo'
                            },
                            {
                                label: '审核不通过',
                                prop: '0',
                                status: 'todo'
                            },
                            {
                                label: '重新接收',
                                status: 'todo'
                            },
                            {
                                label: '重新处置',

                                status: 'todo'
                            },
                            {
                                label: '再次审核',

                                status: 'todo'
                            },
                        )
                        this.list=l;
                    }else if (item.state==3){
                        let l=[];
                        l.push(
                            {
                                label: '创建',
                                prop: '2',
                                status: 'todo'
                            },
                            {
                                label: '接收',
                                prop: '3',
                                status: 'todo'
                            },
                            {
                                label: '处置',
                                prop: '4',
                                status: 'todo'
                            },
                            {
                                label: '审核不通过',
                                prop: '0',
                                status: 'todo'
                            },
                            {
                                label: '重新接收',
                                prop: '3',
                                status: 'todo'
                            },
                            {
                                label: '重新处置',
                                status: 'todo'
                            },
                            {
                                label: '再次审核',
                                status: 'todo'
                            },
                        )
                        this.list=l;
                    }else if (item.state=='4'){
                        let l=[];
                        l.push(
                            {
                                label: '创建',
                                prop: '2',
                                status: 'todo'
                            },
                            {
                                label: '接收',
                                prop: '3',
                                status: 'todo'
                            },
                            {
                                label: '处置',
                                prop: '4',
                                status: 'todo'
                            },
                            {
                                label: '审核不通过',
                                prop: '0',
                                status: 'todo'
                            },
                            {
                                label: '重新接收',
                                prop:'3',
                                status: 'todo'
                            },
                            {
                                label: '重新处置',
                                prop: '4',
                                status: 'todo'
                            },
                            {
                                label: '再次审核',
                                status: 'todo'
                            },
                        )
                        this.list=l;
                    }else if (item.state=='1'){
                        let l=[];
                        l.push(
                            {
                                label: '创建',
                                prop: '2',
                                status: 'todo'
                            },
                            {
                                label: '接收',
                                prop: '3',
                                status: 'todo'
                            },
                            {
                                label: '处置',
                                prop: '4',
                                status: 'todo'
                            },
                            {
                                label: '审核不通过',
                                prop: '0',
                                status: 'todo'
                            },
                            {
                                label: '重新接收',
                                prop:'3',
                                status: 'todo'
                            },
                            {
                                label: '重新处置',
                                prop: '4',
                                status: 'todo'
                            },
                            {
                                label: '再次审核(通过)',
                                prop: '1',
                                status: 'todo'
                            },
                        )
                        this.list=l;
                    }else if (item.state=='6'){
                        let l=[];
                        l.push(
                            {
                                label: '创建',
                                prop: '2',
                                status: 'todo'
                            },
                            {
                                label: '接收',
                                prop: '3',
                                status: 'todo'
                            },
                            {
                                label: '处置',
                                prop: '4',
                                status: 'todo'
                            },
                            {
                                label: '审核不通过',
                                prop: '0',
                                status: 'todo'
                            },
                            {
                                label: '重新接收',
                                prop:'3',
                                status: 'todo'
                            },
                            {
                                label: '重新处置',
                                prop: '4',
                                status: 'todo'
                            },
                            {
                                label: '再次审核（不通过）',
                                prop: '6',
                                status: 'todo'
                            },
                        )
                        this.list=l;
                    }
                })
            }
        })

        let lastMatchedIndex = -1;
        // 遍历 list 数组
        this.list.forEach((item, index) => {
          const isMatched = this.listData.some((data) => data.state === item.prop);
          if (isMatched) {
            item.status = 'done';
            lastMatchedIndex = index;
          } else {
            item.status = 'todo';
          }
        });

        // 如果有匹配项，将最后一个匹配项的状态设为 active
        if (lastMatchedIndex !== -1) {
          this.activeIndex = lastMatchedIndex;
          this.list[lastMatchedIndex].status = 'active';
        }

        this.listData.forEach((item, index) => {
          if (item.urlList && item.urlList.length > 0) {
            let arr = JSON.parse(item.urlList);
            let newArr = [];
            arr.forEach((i, index) => {
              newArr.push({
                url: i.url,
                name: i.url
              });
            });
            item.NewUrlList = newArr;
          }
        });
        console.log(this.listData);
      }
    }
  }
};
</script>
<style scoped>
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 12px;
  text-align: center;
}
.card-header {
  font-weight: bold;
}

.arrowsBox {
  display: flex;
  justify-content: center;
  height: 40px;
  margin: 20px;
  font-weight: bold;
}
.arrowsItem {
  position: relative;
  height: 100%;
  width: 140px;
  margin-right: 10px;
}
.arrows-up {
  transform: skewX(30deg);
}
.arrows-down {
  transform: skewX(-30deg);
}
.arrows {
  height: 50%;

  background: gray;
}

.arrows-label {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
}
.arrows_done {
  background: #edf9ff;
}
.arrows_active {
  background: #009fe9;
}
.arrows_todo {
  background: #ebedf0;
}

.arrows_label_done {
  color: #009fe9;
}
.arrows_label_active {
  color: #fff;
}
.arrows_label_todo {
  color: #929393;
}
.btn {
  background: #009fe9;
  color: #fff;
  border: none;
  padding: 6px;
  width: 100px;
  border-radius: 4px;
  margin: auto;
  display: block;
}
</style>
