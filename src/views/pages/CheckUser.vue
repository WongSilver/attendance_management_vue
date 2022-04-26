<template>
  <el-card style="width: 600px;margin: 0 auto">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="请假原因">
        <el-radio-group v-model="form.type">
          <el-radio label="事假"></el-radio>
          <el-radio label="病假"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker
            v-model="form.startDate"
            type="datetime"
            placeholder="选择日期时间"
            :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
            v-model="form.endDate"
            type="datetime"
            placeholder="选择日期时间"
            :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="详细说明">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="visible">立即创建</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import ElementUI from "element-ui";

export default {
  name: "CheckUser",
  data() {
    return {
      visible: false,
      form: {
        type: '',
        startDate: '',
        endDate: '',
        description: '',
      },
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '明天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24);
            picker.$emit('pick', date);
            console.log(date)
          }
        }, {
          text: '三天后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 3);
            picker.$emit('pick', date);
          }
        }]
      },
    }
  },
  methods: {
    onSubmit() {
      this.visible = true;
      this.form.userId = JSON.parse(sessionStorage.getItem("userInfo")).userId
      this.form.groupId = JSON.parse(sessionStorage.getItem("userInfo")).userGroup

      console.log(this.form.startDate)

      this.$axios.post("/check/create", this.form).then(res => {
        this.visible = false;
        if (res.data.code === 200) {
          ElementUI.Message.success(res.data.data)
        }
      }).catch(() => {
        //超时响应
        setTimeout(() => {
          this.visible = false;
          ElementUI.Message.error("网络请求失败");
        }, 2000)
      })
    },
  }
}

</script>

<style scoped>
</style>