<template>
  <el-card style="width: 400px;margin: 0 auto">
    <el-form :model="form" label-width="100px">
      <el-form-item label="用户名">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.telephone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.mail" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="form.groupId" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      form: {},
    }
  },
  created() {
    this.form = JSON.parse(sessionStorage.getItem("userInfo"));
  }
}
</script>

<style scoped>

</style>