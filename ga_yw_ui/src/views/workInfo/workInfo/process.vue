<template>
  <el-watermark style="position: static" :content="[userName]">
    <div style="height: 0px" />
  </el-watermark>
  <!--  allocation :'',-->
  <!--  //某人处理中-->
  <!--  Doing:'',-->
  <!--  //审批是否通过-->
  <!--  ratify:'',-->

  <div style="height: 800px; margin-left: 15%; margin-top: 2%">
    <el-steps direction="vertical" :active="stage">
      <el-step title="创建" :description="allocation" />
      <el-step title="处理中" :description="Doing" />
      <el-step title="审核中" :description="ratify" />
      <el-step title="完成" />
    </el-steps>
    <div style="margin-left: 30%; margin-top: -66%">
      <div class="fault-report">
        <h2>创建<span></span></h2>
        <p class="report-detail">
          创建人: <span>{{ cjPerson }}</span>
          <span style="margin-left: 15%">时间 :{{ cjTime }}</span>
          <!--        <span style="margin-left: 15%">测试:123123123123</span>-->
        </p>
        <p class="report-detail">内容: {{ cjContent }}</p>
        <div class="demo-image__preview" style="text-align: end; margin-top: -22%">
          <el-image
            style="width: 100px; height: 100px"
            :src="cjUrl"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="cjUrlList"
            :initial-index="4"
            fit="cover"
          />
        </div>
      </div>

      <div class="fault-report">
        <h2>处理中</h2>
        <p class="report-detail">
          创建人: <span>{{ clPerson }}</span>
          <span style="margin-left: 15%">时间 :{{ clTime }}</span>
          <!--        <span style="margin-left: 15%">测试:123123123123</span>-->
        </p>
        <p class="report-detail">内容: {{ clContent }}</p>
        <div class="demo-image__preview" style="text-align: end; margin-top: -22%">
          <el-image
            style="width: 100px; height: 100px"
            :src="url"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="srcList"
            :initial-index="4"
            fit="cover"
          />
        </div>
      </div>

      <div class="fault-report">
        <h2>审核中</h2>
        <p class="report-detail">
          创建人: <span>{{ shPerson }}</span>
          <span style="margin-left: 15%">时间 :{{ shTime }}</span>
          <!--        <span style="margin-left: 15%">测试:123123123123</span>-->
        </p>
        <p class="report-detail">内容: {{ shContent }}</p>
        <div class="demo-image__preview" style="text-align: end; margin-top: -22%">
          <el-image
            style="width: 100px; height: 100px"
            :src="url"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="srcList"
            :initial-index="4"
            fit="cover"
          />
        </div>
      </div>

      <div class="fault-report">
        <h2>完成</h2>
        <p class="report-detail">
          创建人: <span>{{ wcPerson }}</span>
          <span style="margin-left: 15%">时间 :{{ wcTime }}</span>
          <!--        <span style="margin-left: 15%">测试:123123123123</span>-->
        </p>
        <p class="report-detail">内容: {{ wcContent }}</p>
        <div class="demo-image__preview" style="text-align: end; margin-top: -22%">
          <el-image
            style="width: 100px; height: 100px"
            :src="url"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="srcList"
            :initial-index="4"
            fit="cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import useUserStore from '@/store/modules/user';
import { listByLsh } from '@/api/workInfo/workInfo';

export default {
  name: 'FaultReport',
  props: {
    processData: Object // 假设你传递的是一个对象
  },
  data() {
    return {
      // faultManifestations: [
      //   '机械臂在执行抓取任务时动作迟缓',
      //   '伴有不规则震动',
      //   '无法正常完成预设的精准定位与装配动作'
      // ],
      //用户名
      userName: useUserStore().nickname,
      //分配给某人
      allocation: '',
      //某人处理中
      Doing: '',
      //审批是否通过
      ratify: '',
      listData: [],
      //阶段
      stage: 1,
      //创建
      cjPerson: '',
      cjTime: '',
      cjContent: '',
      //处理中
      clPerson: '',
      clTime: '',
      clContent: '',
      //审核中
      shPerson: '',
      shTime: '',
      shContent: '',
      //完成
      wcPerson: '',
      wcTime: '',
      wcContent: '',
      //创建截图
      cjUrl: '',
      cjUrlList: []
    };
  },
  mounted() {
    console.log(this.processData, 333);
    this.getList();
  },
  methods: {
    async getList() {
      let a = this.processData.someProperty;
      let res = await listByLsh(a);
      if (res.data) {
        this.listData = res.data;
        this.listData.forEach((it) => {
          //获取状态
          let state = it.state;
          let createTime = it.createTime;
          let content = it.workContent.replace(/<[^>]*>?/gm, '');
          let createBy = it.createBy;
          //图片
          // const url =
          //   'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
          // const srcList =
          if (state == 2) {
            this.cjPerson = createBy;
            this.cjTime = createTime;
            this.cjContent = content;
            this.stage = 1;
            this.allocation = '分配给' + '"' + it.allocationBy + '"';
            this.cjUrl = 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg';
            this.cjUrlList = ['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'];
          } else if (state == 3) {
            this.clPerson = createBy;
            this.clTime = createTime;
            this.clContent = content;
            this.stage = 2;
            this.Doing = '"' + createBy + '"' + '正在处理中...';
          } else if (state == 4) {
            this.shPerson = createBy;
            this.shTime = createTime;
            this.shContent = content;
            this.stage = 3;
            this.ratify = '已完成，等待审核...';
          } else if (state == 0) {
            this.shPerson = createBy;
            this.shTime = createTime;
            this.shContent = content;
            this.stage = 3;
            this.ratify = '不通过';
          } else if (state == 1) {
            this.wcPerson = createBy;
            this.wcTime = createTime;
            this.wcContent = content;
            this.ratify = '审核通过';
            this.stage = 4;
          } else {
            this.wcPerson = '无';
            this.wcTime = '无';
            this.wcContent = '无';
          }
        });
      }
    }
  }
};
</script>
<style scoped lang="scss">
.process {
  margin-left: 50%;
  text-align: right;
  margin-top: -53%;
  width: 563px;
  height: 177px;
  background-color: #c6c6c6; /* 绿色背景 */
  color: #0b0b0b; /* 文本颜色为白色 */
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}

.fault-report {
  margin-left: 53%;
  margin-top: -53%;
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 200px;
}

.report-detail {
  margin: 10px 0;
}

.section-header {
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  margin-bottom: 15px;
}

.manifestations {
  list-style-type: none;
  padding: 0;
}

.manifestations li {
  margin: 5px 0;
  padding-left: 20px;
  position: relative;
}

.manifestations li::before {
  content: '•';
  color: #999;
  display: inline-block;
  width: 1em;
  margin-left: -20px;
  position: absolute;
}

.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>
