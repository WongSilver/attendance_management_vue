<template>
  <ul class="infinite-list" style="overflow:auto">
    <li v-for="item in checks" class="infinite-list-item" style="margin: 0 auto;display: inline">
      <el-collapse-transition>
        <el-card style="width: 45%; margin: 10px auto; min-width: 250px" v-if="show[item.id]">
          <el-descriptions class="margin-top" title="请假单" :column="1" border>
            <template slot="extra">
              <el-button type="success" size="small" @click="agree(item.id)">同意
              </el-button>
              <el-button type="danger" size="small" @click="refuse((item.id))">拒绝</el-button>
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
          </el-descriptions>
        </el-card>
      </el-collapse-transition>
    </li>
  </ul>
</template>

<script>
export default {
  name: "CheckAdmin",
  data() {
    return {
      checks: {},
      show: [],
      userId: JSON.parse(sessionStorage.getItem("userInfo")).userGroup,
    }
  },
  created() {
    this.loadData()
  },
  // mounted() {
  //   this.loadData()
  // },
  methods: {
    agree(id) {
      this.$set(this.show, id, false)
      this.$axios.get("/check/read", {params: {id: id, yorn: 1,}}).then(res => {
        // this.loadData()
      })
    },
    refuse(id) {
      this.$set(this.show, id, false)
      this.$axios.get("/check/read", {params: {id: id, yorn: -1,}}).then(res => {
        // this.loadData()
      })
    },
    loadData() {
      this.$axios.get("/check/list/" + this.userId).then(res => {
        this.checks = res.data.data;
        for (let i = 0; i < this.checks.length; i++) {
          this.show[this.checks[i].id] = true;
        }
      })
    }
  },

}
</script>

<style scoped>
li{
  padding: 0!important;
}
</style>