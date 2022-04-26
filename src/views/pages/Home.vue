<template>
  <div>
    <el-row style="margin-bottom: 60px" :gutter="10">
      <el-col :span="6">
        <el-card>
          <div style="color: #1ba784"><i class="el-icon-user"/> 师生总数</div>
          <div style="padding: 10px; font-weight: bold">
            <el-tag>{{ this.userTotal }}</el-tag>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div style="color:#5e665b;"><i class="el-icon-tickets"/> 今日请假人数</div>
          <div style="padding: 10px; font-weight: bold">
            <el-tag type="info">13</el-tag>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div style="color:#f26b1f;"><i class="el-icon-link"/> 今日迟到人数</div>
          <div style="padding: 10px; font-weight: bold">
            <el-tag type="warning">3</el-tag>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div style="color:#c02c38;"><i class="el-icon-ship"/> 今日旷课人数</div>
          <div style="padding: 10px; font-weight: bold">
            <el-tag type="danger">12</el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card id="lineMain" style="width: 100%; height: 400px"></el-card>
      </el-col>
      <el-col :span="12">
        <el-card id="pieMain" style="width: 100%; height: 400px"></el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "Home",
  data() {
    return {
      userTotal: 0,

    }
  },
  //页面渲染后触发
  mounted() {
    const lineChartDom = document.getElementById('lineMain');
    const pieChartDom = document.getElementById('pieMain');
    const lineChart = echarts.init(lineChartDom);
    const pieChart = echarts.init(pieChartDom);
    const lineOption = {
      title: {
        text: '每日请假人数统计图',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: []
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [],
          type: 'line',
          smooth: true
        }
      ]
    }
    const pieOption = {
      title: {
        text: '每日请假人数统计图',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: '50%',
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    this.$axios.get("/check/homeList").then(res => {
      let lineData = res.data.data
      console.log()
      let pieData = []
      for (let i = 0; i < lineData.x.length; i++) {
        let obj = {};
        obj.name = lineData.x[i];
        obj.value = lineData.y[i];
        pieData[i] = obj
      }
      lineOption.xAxis.data = lineData.x
      lineOption.series[0].data = lineData.y
      pieOption.series[0].data = pieData
      lineChart.setOption(lineOption);
      pieChart.setOption(pieOption);
    });

    //获取学校总人数
    this.$axios.get("/user/total").then(res => {
      if (res.data.code === 200) {
        this.userTotal = res.data.data;
      }
    });
  },
}
</script>

<style scoped>

</style>