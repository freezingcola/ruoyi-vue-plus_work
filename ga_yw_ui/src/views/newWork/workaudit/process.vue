<template>
  <el-watermark style="position: static" :content="[userName]">
    <div style="height: 0px" />
  </el-watermark>
  <!--  allocation :'',-->
  <!--  //某人处理中-->
  <!--  Doing:'',-->
  <!--  //审批是否通过-->
  <!--  ratify:'',-->

  <div style="height:1000px;margin-left: 15%;margin-top: 2%">
    <el-steps direction="vertical" :active=this.stage>
      <el-step title="创建" :description=this.allocation />
      <el-step title="处理中" :description=this.Doing />
      <el-step title="审核中" :description=this.ratify />
      <el-step title="审核完毕" :description=this.wbratify />
      <el-step  title="完成" />
    </el-steps>
    <div style="margin-left: 30%;margin-top: -1050px;position: relative;">
      <div class="fault-report" >
        <h2>创建<span></span></h2>
        <p class="report-detail">发起人: <span>{{this.cjPerson}}</span>
          <span style="margin-left: 15%">时间 :{{this.cjTime}}</span>
          <!--        <span style="margin-left: 15%">测试:123123123123</span>-->
        </p>
          <el-popover
                  placement="top-start"
                  :width="600"
                  trigger="hover"
                  :content="this.cjContent"
          >
              <template #reference>
                  <p class="report-detail line-clamp">内容: {{this.cjContent}}</p>
              </template>
          </el-popover>
        <div class="demo-image__preview" style="text-align: end;margin-top: -22%">
          <el-image
            style="width: 100px; height: 100px;"
            :src="cjUrl"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="cjUrlList"
            :initial-index="4"
            fit="cover"
            v-if="cjUrlList && cjUrlList.length > 0"
          >
              <template #error>
                  <div class="image-slot">
                      文件不是图片类型
                  </div>
              </template>
          </el-image>
          <p>
            <el-button style="color: #1c84c6" v-if="cjUrlList && cjUrlList.length > 0" @click="openFileList('cj')">
              查看附件 ({{cjUrlList.length}})
            </el-button>
          </p>
        </div>
      </div>
      <div class="fault-report">
        <h2>处理中</h2>
        <p class="report-detail">发起人: <span>{{this.clPerson}}</span>
          <span style="margin-left: 15%">时间 :{{this.clTime}}</span>
          <!--        <span style="margin-left: 15%">测试:123123123123</span>-->
        </p>
          <el-popover
                  placement="top-start"
                  :width="600"
                  trigger="hover"
                  :content="this.clContent"
          >
              <template #reference>
                  <p class="report-detail line-clamp">内容: {{this.clContent}}</p>
              </template>
          </el-popover>
      </div>
      <div class="fault-report">
        <h2>审核中</h2>
        <p class="report-detail">发起人: <span>{{this.shPerson}}</span>
          <span style="margin-left: 15%">时间 :{{this.shTime}}</span>
          <!--        <span style="margin-left: 15%">测试:123123123123</span>-->
        </p>
          <el-popover
                  placement="top-start"
                  :width="600"
                  trigger="hover"
                  :content="this.shContent"
          >
              <template #reference>
                  <p class="report-detail line-clamp">内容: {{this.shContent}}</p>
              </template>
          </el-popover>
        <div class="demo-image__preview" style="text-align: end;margin-top: -22%">
          <el-image
            style="width: 100px; height: 100px;"
            :src="shUrl"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="shUrlList"
            :initial-index="4"
            fit="cover"
            v-if="shUrlList && shUrlList.length > 0"
          >
              <template #error>
                  <div class="image-slot">
                      文件不是图片类型
                  </div>
              </template>
          </el-image>
          <p>
            <el-button style="color: #1c84c6" v-if="shUrlList && shUrlList.length > 0" @click="openFileList('sh')">
              查看附件 ({{shUrlList.length}})
            </el-button>
          </p>
        </div>
      </div>
      <div class="fault-report">
        <h2>审核完毕</h2>
        <p class="report-detail">审核人: <span>{{this.wbPerson}}</span>
          <span style="margin-left: 15%">时间 :{{this.wbTime}}</span>
          <!--        <span style="margin-left: 15%">测试:123123123123</span>-->
        </p>
          <el-popover
                  placement="top-start"
                  :width="600"
                  trigger="hover"
                  :content="this.wbContent"
          >
              <template #reference>
                  <p class="report-detail line-clamp">内容: {{this.wbContent}}</p>
              </template>
          </el-popover>
        <div class="demo-image__preview" style="text-align: end;margin-top: -22%">
          <el-image
            style="width: 100px; height: 100px;"
            :src="wbUrl"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="wbUrlList"
            :initial-index="4"
            fit="cover"
            v-if="wbUrlList && wbUrlList.length > 0"
          >
              <template #error>
                  <div class="image-slot">
                      文件不是图片类型
                  </div>
              </template>
          </el-image>
          <p>
            <el-button style="color: #1c84c6" v-if="wbUrlList && wbUrlList.length > 0" @click="openFileList('shwb')">
              查看附件 ({{wbUrlList.length}})
            </el-button>
          </p>
        </div>
      </div>
      <div class="fault-report">
        <h2>完成</h2>
        <p class="report-detail">创建人: <span>{{this.wcPerson}}</span>
          <span style="margin-left: 15%">时间 :{{this.wcTime}}</span>
          <!--        <span style="margin-left: 15%">测试:123123123123</span>-->
        </p>
          <el-popover
                  placement="top-start"
                  :width="600"
                  trigger="hover"
                  :content="this.wcContent"
          >
              <template #reference>
                  <p class="report-detail line-clamp">内容: {{this.wcContent}}</p>
              </template>
          </el-popover>
      </div>
    </div>
    <el-dialog
      v-model="isFile"
      title="附件"
      width="50%"
    >
      <file-download v-if="isFile" :modelValue="Attachs"></file-download>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="isFile = false">关闭</el-button>
          <!--            <el-button type="primary" @click="isFile = false">-->
          <!--              Confirm-->
          <!--            </el-button>-->
        </div>
      </template>
    </el-dialog>
  </div>

</template>
<script   lang="ts">
import useUserStore from '@/store/modules/user';
import {addWorkInfo, listByLsh,Download} from "@/api/workInfo/workInfo";
// const { proxy } = getCurrentInstance() as ComponentInternalInstance;
import {listByIds} from "@/api/system/oss";

export default {
  name: 'FaultReport',
  data() {
    return {
      //附件页面
      isFile:false,
      //审批附件列表
      Attachs:[],
      cjAttachs:[],
      shAttachs:[],
      shwbAttachs:[],
      //用户名
      userName:useUserStore().nickname,
      //分配给某人
      allocation :'',
      //某人处理中
      Doing:'',
      //审批是否通过
      ratify:'',
      listData:[],
      //审批结果
      wbratify:'',
      //阶段
      stage:1,
      //创建
      cjPerson:'',
      cjTime:'',
      cjContent:'',
      //处理中
      clPerson:'',
      clTime:'',
      clContent:'',
      //审核中
      shPerson:'',
      shTime:'',
      shContent:'',
      //审核完毕
      wbPerson:'',
      wbTime:'',
      wbContent:'',
      //完成
      wcPerson:'',
      wcTime:'',
      wcContent:'',
      //创建截图
      cjUrl:'',
      cjUrlList:[],
      shUrl:'',
      shUrlList:[],
      clUrl:'',
      clUrlList:[],
      wbUrl:'',
      wbUrlList:[],
      //审核不通过状态
      shStatus:'',
        //接收人
        jsName:''
    };
  },
  props: {
    processData: Object // 假设你传递的是一个对象
  },
  mounted() {
    console.log(this.processData,333);
    this.getList();
  },
  methods: {
    openFileList(status){
      // alert(123)
      this.isFile = true
      this.Attachs=[];
      debugger;
      if (status=='cj'){
        this.Attachs=this.cjAttachs
      }else if (status=='sh'){
        this.Attachs=this.shAttachs
      }else if (status=='shwb'){
        this.Attachs=this.shwbAttachs
      }
    },
    async getList() {
      let a=this.processData.someProperty;
      let res = await listByLsh(a);
      if (res.data){
        this.listData=res.data;
        this.listData.forEach(it=> {
          //获取状态
          let state=it.state;
          let createTime=it.createTime;
          let content=it.workContent.replace(/<[^>]*>?/gm, '');
          let createBy=it.createBy;
          if (state==2){
            this.cjPerson=createBy;
            this.cjTime=createTime;
            this.cjContent=content;
            this.stage=1;
            this.allocation='分配给'+'"'+it.allocationBy+'"';
            this.jsName=it.allocationBy;
            if (it.urlList) {
              let jsonData = JSON.parse(it.urlList);
              let arr = [];
              for (var item of jsonData) {
                arr.push(item.url);
              }
              this.cjUrl=arr[0];
              this.cjUrlList=arr;
              console.log(this.cjUrlList)
            }
            this.cjAttachs=it.attachs
            console.log(it.attachs)
          }else if (state==3){
              //如果开始处理，则改变创建的状态
              this.cjContent=this.jsName+"已接收！！";
            this.clPerson=createBy;
            this.clTime=createTime;
            this.clContent=content;
            this.stage=2;
            this.Doing='"'+createBy+'"'+'正在处理中...'
            if (it.urlList) {
              let jsonData = JSON.parse(it.urlList);
              let arr = [];
              for (var item of jsonData) {
                arr.push(item.url);
              }
              this.clUrl=arr[0];
              this.clUrlList=arr;
            }
          }else if (state==4){
            this.shPerson=createBy;
            this.shTime=createTime;
            this.shContent=content;
            this.stage=3;
            this.ratify='已完成，等待审核...';
            if (it.urlList) {
              let jsonData = JSON.parse(it.urlList);
              let arr = [];
              for (var item of jsonData) {
                arr.push(item.url);
              }
              this.shUrl=arr[0];
              this.shUrlList=arr;
            }
            this.shAttachs=it.attachs
          }else if(state==0){
            this.wbPerson=createBy;
            this.wbTime=createTime;
            this.wbContent=content;
            this.stage=4;
            this.wbratify='不通过!已退回重新处理中...';
            this.shStatus='1'
          }else if (state==1){
            this.wcPerson=createBy;
            this.wbPerson=createBy;
            this.wbPerson=createBy;
            this.wbTime=createTime;
            this.wcTime=createTime;
            this.wcContent=content;
            this.wbContent='审核通过！已完成！';
            this.wbratify='审核通过!';
            this.ratify='已审核!';
            this.stage=5;
            if (it.urlList) {
              let jsonData = JSON.parse(it.urlList);
              let arr = [];
              for (var item of jsonData) {
                arr.push(item.url);
              }
              this.wbUrl=arr[0];
              this.wbUrlList=arr;
            }
            this.shwbAttachs=it.attachs
          }else {
            this.wcPerson="无";
            this.wcTime="无";
            this.wcContent="无";
          }
        })
      }
    },
    async goToDetailPage(fileUrl: string) {
      alert('1231')
      this.$router.push({ name: 'FileDownload', params: { fileUrl } });
    }
    // async Download(ossId:String){
    //   //   console.log(ossId);
    //   // let res = await Download(ossId.toString());
    //   proxy?.$download.oss("1871442263478870017");
    // }
  },
};

</script>
<style scoped lang="scss">
.process{
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
  margin-left:53%;
  margin-top:-53%;
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: 210px
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
  content: "•";
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
.line-clamp {
  width: 80%;
  overflow:hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
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
</style>
