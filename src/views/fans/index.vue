<template>
  <div>
    <el-card class="box-card">
         <div slot="header" class="clearfix">
          <span>详情分析</span>
         </div>
      <el-radio-group v-model="radio1">
      <el-radio-button label="今日" type="primary"></el-radio-button>
      <el-radio-button label="本周"></el-radio-button>
      <el-radio-button label="本月"></el-radio-button>
            <span class="demonstration">起始日期时刻为 12:00:00</span>
            <el-date-picker
            class="data-picker"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']">
            </el-date-picker>
    </el-radio-group>
    <div class="fss">
        <div class="fs">
            <i></i>
    </div>
    </div>
     <div class="fss">
        <div class="fs">
            <i></i>
    </div>
    </div>
     <div class="fss">
        <div class="fs">
            <i></i>
    </div>
    </div>
    <h4>头条粉丝</h4>
     <!-- 画布容器 -->
    <div id="main" style="width: 100%;height:400px;"></div>
    <h4>图文数据</h4>
    <div id="man" style="width: 100%;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
// 在哪使用在哪引入
import echarts from 'echarts'
export default {
  name: 'Fans',

  data () {
    return {
    }
  },
  async mounted () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))

    // // 指定图表的配置项和数据
    // var option = {
    //     title: {
    //         text: 'ECharts 入门示例'
    //     },
    //     tooltip: {},
    //     legend: {
    //         data:['销量']
    //     },
    //     xAxis: {
    //         data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    //     },
    //     yAxis: {},
    //     series: [{
    //         name: '销量',
    //         type: 'bar',
    //         data: [5, 20, 36, 10, 10, 20]
    //     }]
    // };
    var option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
    var myChart1 = echarts.init(document.getElementById('man'))
    var option1 = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ]
        }
      ]
    }

    myChart1.setOption(option1)
  }
}
</script>

<style lang="less" scoped>
.data-picker {
    margin-left:20px;
    vertical-align: middle;
}
h4 {
    padding-top:20px;
}
</style>
