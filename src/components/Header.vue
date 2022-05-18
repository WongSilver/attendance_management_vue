<template>
  <div style="font-size: 12px;display: flex;line-height: 60px;width: 100%;justify-content:space-between">
    <div style="display: flex;justify-content:flex-start;font-size: 18px;text-align: left;">
      <span :class="collapseBtnClass" style="cursor: pointer; color: #c6e6e8; line-height: 60px"
            @click="collapse"></span>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 60px; padding-left: 20px;">
        <el-breadcrumb-item :to="{ path: breadcrumb.path }">{{ breadcrumb.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="justify-content:flex-end">
      <el-dropdown style="width: 120px;cursor: pointer;" trigger="click">
        <span>{{this.userName}}<i class="el-icon-arrow-down el-icon--right"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><span @click="userInfo">个人信息</span></el-dropdown-item>
          <el-dropdown-item><span @click="logout">退出登录</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    collapseBtnClass: String,
    collapse: null,
  },
  data() {
    return {
      userName: JSON.parse(sessionStorage.getItem("userInfo")) === null ? "未登录" : JSON.parse(sessionStorage.getItem("userInfo")).userName,
    }
  },
  methods: {
    logout() {
      this.$router.push("/login");
      this.$store.commit("REMOVE_INFO");
    },
    userInfo() {
      this.$router.push("/userInfo")
    }
  },
  computed: {
    //TODO 面包屑未实现全部功能
    breadcrumb() {
      return this.$route.meta;
    }
  },
};
</script>

<style>
.el-dropdown, .el-breadcrumb__inner {
  color: #c6e6e8 !important;
}
</style>
