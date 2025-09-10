<template>
  <div class="home-container layout-pd">
    <div style="padding: 10px 12px">
      <el-row :gutter="20" justify="space-between">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" style="margin-bottom: 20px">
          <el-card>
            <div class="homeCard">
              <div class="homeCard_l">
                <div class="homeCard_l_t">{{ state.zs }}<span></span></div>
                <div class="homeCard_l_b">总工单数量</div>
              </div>
              <div class="homeCard_r">
                <img src="@/assets/index/zgd.png" alt="" />
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-card>
            <div class="homeCard">
              <div class="homeCard_l">
                <div class="homeCard_l_t">{{ state.monthCount }}个<span></span></div>
                <div class="homeCard_l_b">本月工单数量</div>
              </div>
              <div class="homeCard_r">
                <img src="@/assets/index/bygd.png" alt="" />
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-card>
            <div class="homeCard">
              <div class="homeCard_l">
                <div class="homeCard_l_t">
                  {{ state.wc }}个<span><!--+3%--></span>
                </div>
                <div class="homeCard_l_b">已完成工单数</div>
              </div>
              <div class="homeCard_r">
                <img src="@/assets/index/ywc.png" alt="" />
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-card>
            <div class="homeCard">
              <div class="homeCard_l">
                <div class="homeCard_l_t">{{ state.wwc }}个<span></span></div>
                <div class="homeCard_l_b">未完成工单数</div>
              </div>
              <div class="homeCard_r">
                <img src="@/assets/index/wwc.png" alt="" />
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 日历 -->
    <!-- <div>
      <el-calendar v-model="state.CalendarData" />
    </div> -->

    <!-- 统计图 -->
    <div class="echarts">
      <div id="LineChart" style="width: 100%; height: 380px"></div>
    </div>
    <div class="echarts">
      <div id="BarChart" style="width: 100%; height: 380px"></div>
    </div>
    <div v-hasRoles="['wf_leader', 'superadmin']">
      <el-radio-group v-model="state.week" style="margin-bottom: 5px" @change="handleWeekChange">
        <el-radio-button label="本周">本周</el-radio-button>
        <el-radio-button label="上周">上周</el-radio-button>
        <el-radio-button label="下周">下周</el-radio-button>
      </el-radio-group>
      <div id="noDataDiv" style="display: none">暂无数据</div>
      <div class="echarts">
        <!--      <div id="LingdaoChart" style="width: 30%; height: 380px"></div>-->
        <div id="deptDataDiv" class="chart-group-container">
          <div v-for="dept in depts" :id="dept + 'Chart'" :key="dept" style="width: 30%; height: 380px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="example/home">
import { reactive, onMounted, ref, watch, nextTick, onActivated, markRaw } from 'vue';
import * as echarts from 'echarts';
import { getIndexData, getWorkInfoProjectData, getWorkInfoTimeData, getWorkInfoWeekData, selectCount } from '@/api/workInfo/workInfo';

// 定义变量内容
const homeLineRef = ref();
//后面可以改为在后台获取数据，但是这个页面已经有很多请求了，性能会有影响
const depts = ['总', '基础设施组', '网络安全组', '政务云组', '系统应用组', '运营组'];

const state = reactive({
  week: '本周',
  CalendarData: new Date(),
  zs: '',
  monthCount: 0,
  wwc: '1',
  wc: '2',
  proName: [],
  title: '各项目工单总数',
  times: [],
  timesCount: [],
  finish: [],
  noFinish: [],
  deptWeekCount: {},
  global: {
    homeChartOne: null,
    homeChartTwo: null,
    homeCharThree: null,
    dispose: [null, '', undefined]
  } as any,
  myCharts: [] as EmptyArrayType,
  charts: {
    theme: '',
    bgColor: '',
    color: '#303133'
  }
});
// 定义获取工单数量的函数，可根据实际接口和需求修改
// let title = '各项目工单总数';
// let proNames = [];
const initWorkInfoWeekData = async (week) => {
  try {
    const weekDataResult = await getWorkInfoWeekData(week);
    if (weekDataResult.code == '200') {
      const rows = weekDataResult.rows;
      for (let name of depts) {
        state.deptWeekCount[name] = {};
        state.deptWeekCount[name].times = [];
        state.deptWeekCount[name].timesCount = [];
        state.deptWeekCount[name].finish = [];
        state.deptWeekCount[name].noFinish = [];
      }
      const count = {};
      const dataTemp = {};
      var key;
      for (let row of rows) {
        key = row.deptName + ':' + row.name;
        if (!count[row.name]) {
          count[row.name] = {};
          count[row.name].timesCount = 0;
          count[row.name].finish = 0;
          count[row.name].noFinish = 0;
        }
        if (!dataTemp[key]) {
          dataTemp[key] = {};
          dataTemp[key].finish = 0;
          dataTemp[key].noFinish = 0;
          dataTemp[key].timesCount = 0;
        }
        if (row.finish == 1) {
          dataTemp[key].finish += row.ct;
          count[row.name].finish += row.ct;
        } else {
          dataTemp[key].noFinish += row.ct;
          count[row.name].noFinish += row.ct;
        }
        count[row.name].timesCount += row.ct;
        dataTemp[key].timesCount += row.ct;
      }
      let nameAll = '总';
      for (let key in count) {
        state.deptWeekCount[nameAll].times.push(key);
        state.deptWeekCount[nameAll].timesCount.push(count[key].timesCount);
        state.deptWeekCount[nameAll].finish.push(count[key].finish);
        state.deptWeekCount[nameAll].noFinish.push(count[key].noFinish);
      }

      for (let key in dataTemp) {
        var keys = key.split(':');
        let deptName = keys[0];
        let name = keys[1];
        state.deptWeekCount[deptName].times.push(name);
        state.deptWeekCount[deptName].timesCount.push(dataTemp[key].timesCount);
        state.deptWeekCount[deptName].finish.push(dataTemp[key].finish);
        state.deptWeekCount[deptName].noFinish.push(dataTemp[key].noFinish);
      }

      console.info(state.deptWeekCount['系统应用组']);
    } else {
      console.error('获取工单数量失败，接口返回错误信息：', weekDataResult.message);
    }
  } catch (error) {
    // console.error('发送获取工单数量请求出现错误：', error);
    console.error('发送请求出现错误：', error);
  }
};

const getWorkOrderCount = async () => {
  try {
    // 这里的URL需要替换为你实际的后端接口地址
    const responseCount = await selectCount();
    const response = await getIndexData();
    const projectResult = await getWorkInfoProjectData();
    const timeDataResult = await getWorkInfoTimeData();
    // console.log(projectResult);

    if (responseCount.code == '200') {
      state.zs = responseCount.rows[0].ct;
    } else {
      console.error('获取工单总数失败，接口返回错误信息：', response.message);
    }

    if (projectResult.code == '200') {
      const rows = projectResult.rows;
      for (let row of rows) {
        // state.proName.push(row.proName);
        state.proName.push({ 'name': row.proName, 'value': row.ct });
      }
    } else {
      console.error('获取工单数量失败，接口返回错误信息：', response.message);
    }

    if (response.code == '200') {
      const rows = response.rows;
      for (let row of rows) {
        if (row.state === '5') {
          state.wc = row.ct;
        }
        if (row.state === '3') {
          state.wwc = row.ct;
        }
      }
    } else {
      console.error('获取工单数量失败，接口返回错误信息：', response.message);
    }

    if (timeDataResult.code == '200') {
      const rows = timeDataResult.rows;
      const dataTmp = {};
      for (let row of rows) {
        if (!dataTmp[row.name]) {
          dataTmp[row.name] = {};
          dataTmp[row.name].ct = 0;
          dataTmp[row.name].finish = 0;
          dataTmp[row.name].nofinish = 0;
        }
        if (row.finish == 1) {
          dataTmp[row.name].finish += row.ct;
        } else {
          dataTmp[row.name].nofinish += row.ct;
        }
        dataTmp[row.name].ct += row.ct;
        state.monthCount += row.ct;
      }
      for (let key in dataTmp) {
        state.times.push(key);
        state.timesCount.push(dataTmp[key].ct);
        state.finish.push(dataTmp[key].finish);
        state.noFinish.push(dataTmp[key].nofinish);
      }
    } else {
      console.error('获取工单数量失败，接口返回错误信息：', response.message);
    }
  } catch (error) {
    // console.error('发送获取工单数量请求出现错误：', error);
    console.error('发送请求出现错误：', error);
  }
};
// 折线图
const initLineChart = () => {
  const option = {
    title: {
      text: '各项目工单数量',
      left: 'center',
      top: 20,
      textStyle: {
        fontSize: 18,
        fontWeight: 'normal'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle',
      formatter: function (name) {
        var dataList = state.proName;
        for (var i = 0; i < dataList.length; i++) {
          if (dataList[i].name === name) {
            return name + ':' +'（'+ dataList[i].value+'）';
          }
        }
        return name;
      }
    },
    series: [
      {
        name: '工单数量',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: state.proName
      }
    ]
  };

  let LineChart = echarts.init(document.getElementById('LineChart'));
  LineChart.setOption(option);
};

// 柱状图
const initBarChart = () => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      top: 20,
      right: 20
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '8%',
      containLabel: true
    },
    title: {
      text: '当月每日工单数量',
      left: 'center',
      top: 20,
      textStyle: {
        fontSize: 18,
        fontWeight: 'normal'
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#eee',
          type: 'dashed'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#eee'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#666'
      }
    },
    xAxis: {
      type: 'category',
      data: state.times,
      axisLine: {
        lineStyle: {
          color: '#eee'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#666'
      }
    },
    series: [
      {
        name: '已完成',
        type: 'bar',
        stack: 'Ad',
        itemStyle: {
          color: '#409eff'
        },
        emphasis: {
          focus: 'series'
        },
        barWidth: 24,
        data: state.finish,
        barGap: '40%',
        label: {
          show: true,
          position: 'inside',
          color: '#fff',
          formatter: function (params) {
            return params.value;
          }
        }
      },
      {
        name: '未完成',
        type: 'bar',
        stack: 'Ad',
        itemStyle: {
          color: '#f56c6c'
        },
        emphasis: {
          focus: 'series'
        },
        barWidth: 24,
        data: state.noFinish,
        barGap: '40%',
        label: {
          show: true,
          position: 'inside',
          color: '#fff',
          formatter: function (params) {
            return params.value;
          }
        }
      },
      {
        type: 'bar',
        stack: 'Ad',
        silent: true,
        data: state.timesCount,
        itemStyle: {
          color: 'transparent'
        },
        label: {
          show: true,
          position: 'bottom',
          distance: -13,
          color: '#666',
          fontWeight: 'bold',
          formatter: '{c}'
        }
      }
    ]
  };
  let BarChart = echarts.init(document.getElementById('BarChart'));
  BarChart.setOption(option);
};

const initLingdaoChart = (name) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      top: 'bottom'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '8%',
      containLabel: true
    },
    title: {
      text: name + '工单数量',
      left: 'center'
    },
    yAxis: {
      type: 'value',

      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#000'
      }
    },
    xAxis: {
      type: 'category',
      data: state.deptWeekCount[name].times,
      axisLine: {
        lineStyle: {
          color: '#D2E6F9'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#000'
      }
    },
    series: [
      {
        name: '已完成',
        type: 'bar',
        stack: 'all',
          itemStyle: {
              color: '#009dff' // 直接使用橙色
          },
        emphasis: {
          focus: 'series'
        },
        data: state.deptWeekCount[name].finish,
        label: {
          show: true, // 显示标签
          position: 'inside', // 标签位置在柱子内部
          formatter: function (params) {
            return params.value; // 显示该柱子对应的数据值
          }
        }
      },
      {
        name: '未完成',
        type: 'bar',
        stack: 'all',
        emphasis: {
          focus: 'series'
        },
          barWidth: 23,
          itemStyle: {
              color: '#cd2b2b' // 直接使用橙色
          },
        data: state.deptWeekCount[name].noFinish,
        label: {
          show: true, // 显示标签
          position: 'inside', // 标签位置在柱子内部
          formatter: function (params) {
            return params.value; // 显示该柱子对应的数据值
          }
        }
      },
      {
        type: 'bar',
        stack: 'all',
        silent: true, // 禁用交互
        data: state.deptWeekCount[name].timesCount,
        itemStyle: {
          color: 'transparent' // 隐藏柱子
        },
        label: {
          show: true,
          position: 'bottom',
          distance: -13, // 标签与柱子间距
          color: '#333',
          fontWeight: 'bold',
          formatter: '{c}'
        }
      }
    ]
  };
  let BarChart = echarts.init(document.getElementById(name + 'Chart'));
  BarChart.setOption(option);
};
// 批量设置 echarts resize
const initEchartsResizeFun = () => {
  nextTick(() => {
    for (let i = 0; i < state.myCharts.length; i++) {
      setTimeout(() => {
        state.myCharts[i].resize();
      }, i * 1000);
    }
  });
};
// 批量设置 echarts resize
const initEchartsResize = () => {
  window.addEventListener('resize', initEchartsResizeFun);
};

const handleWeekChange = async (value: '本周' | '上周') => {
  const deptDataDiv = document.getElementById('deptDataDiv');
  if (deptDataDiv != null) {
    var weekType = value === '本周' ? 0 : 1;
    if (value === '下周') weekType = 2;
    await initWorkInfoWeekData(weekType);
    for (let name of depts) {
      initLingdaoChart(name);
    }
  }
};

// 页面加载时
onMounted(async () => {
  // initEchartsResize();
  await getWorkOrderCount();
  initBarChart();
  initLineChart();
  handleWeekChange('本周');
});
// 由于页面缓存原因，keep-alive
onActivated(() => {
  initEchartsResizeFun();
});
// 监听 pinia 中的 tagsview 开启全屏变化，重新 resize 图表，防止不出现/大小不变等
watch(
  () => true, //是否全屏  框架内应该自带的有找找
  () => {
    initEchartsResizeFun();
  }
);
// 监听 pinia 中是否开启深色主题   框架内应该自带的有找找
watch(
  () => false,
  (isIsDark) => {
    nextTick(() => {
      state.charts.theme = isIsDark ? 'dark' : '';
      state.charts.bgColor = isIsDark ? 'transparent' : '';
      state.charts.color = isIsDark ? '#dadada' : '#303133';
    });
  },
  {
    deep: true,
    immediate: true
  }
);
</script>

<style scoped lang="scss">
.chart-group-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.homeCard {
  width: 100%;
  height: 90px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
  }

  .homeCard_l {
    width: 100px;
    .homeCard_l_t {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 20px;
      background: linear-gradient(45deg, #409eff, #36cfc9);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      span {
        color: #409eff;
        font-size: 14px;
        font-weight: normal;
        margin-left: 5px;
      }
    }
  }

  .homeCard_r {
    width: 64px;
    height: 64px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.3s ease;
    }
  }
}
.mb15 {
  margin-bottom: 15px !important;
}
.font30 {
  font-size: 30px;
}
.echarts {
  display: flex;
  width: 100%;
  margin: 20px 0;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.home-container {
  background: #f5f7fa;
  min-height: 100vh;
  padding: 20px;
}

.layout-pd {
  padding: 20px;
}
</style>
