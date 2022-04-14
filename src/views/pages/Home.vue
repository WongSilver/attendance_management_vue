<template>
  <div>
    <el-row style="margin-bottom: 40px;margin-bottom: 60px" :gutter="10">
      <el-col :span="6">
        <el-card>
          <div style="color: #1ba784"><i class="el-icon-user"/> 师生总数</div>
          <div style="padding: 10px; font-weight: bold">
            <el-tag>12345</el-tag>
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
            <el-tag type="warning">12345</el-tag>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div style="color:#c02c38;"><i class="el-icon-ship"/> 今日旷课人数</div>
          <div style="padding: 10px; font-weight: bold">
            <el-tag type="danger">12345</el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card id="main" style="width: 100%; height: 400px"></el-card>
      </el-col>
      <el-col :span="12">
        <el-card id="main1" style="width: 100%; height: 400px"></el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "Home",
  data() {
    return {}
  },
  //页面渲染后触发
  mounted() {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);
    const option = {
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
    ;
    this.$axios.get("/check/list").then(res => {
      let line = res.data.data
      option.xAxis.data = line.x
      option.series[0].data = line.y
      myChart.setOption(option);
    })
  }
}
</script>

<style scoped>

</style>