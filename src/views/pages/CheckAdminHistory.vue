<template>
  <ul class="infinite-list" style="overflow:auto">
    <li v-for="item in checks" class="infinite-list-item" style="width: 100%;margin: 0 auto">
      <el-card style="width: 45%; margin: 10px auto;min-width: 300px">
        <el-descriptions class="margin-top" title="请假单" :column="1" border>
          <template slot="extra">
<!--            <el-button type="primary" size="small">操作</el-button>-->
          </template>
          <el-descriptions-item>
            <template slot="label"><i class="el-icon-user"></i> 学生名</template>
            {{ item.userName }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i class="el-icon-mobile-phone"></i> 请假时间</template>
            {{ item.startDate }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i class="el-icon-location-outline"></i> 结束时间</template>
            {{ item.endDate }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i class="el-icon-tickets"></i> 请假原因</template>
            <el-tag size="small">{{ item.type }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i class="el-icon-office-building"></i> 详细说明</template>
            {{ item.description }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i class="el-icon-office-building"></i> 教师意见</template>
            <el-tag :type="typeData[item.yorn]">{{ yORnsData[item.yorn] }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </li>
  </ul>
</template>
<script>
export default {
  name: "CheckAdminHistory",
  data() {
    return {
      checks: {},
      userId: JSON.parse(sessionStorage.getItem("userInfo")).userGroup,
      yORnsData: {
        '-1': '拒绝',
        '0': '待批阅',
        '1': '同意'
      },
      typeData: {
        '-1': 'danger',
        '0': 'info',
        '1': 'success'
      }
    }
  },
  created() {
    this.$axios.get("/check/groupHistory/" + this.userId).then(res => {
      this.checks = res.data.data;
    })
  },
}
</script>

<style scoped>
</style>