<template>
  <div style="font-size: 12px;display: flex;line-height: 60px;width: 100%;justify-content:space-between">
    <div style="display: flex;justify-content:flex-start;font-size: 18px;text-align: left;">
      <span :class="collapseBtnClass" style="cursor: pointer; color: #c6e6e8; line-height: 60px"
            @click="collapse"></span>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 60px; padding-left: 20px;">
        <el-breadcrumb-item :to="{ path: '/' }" style="color: #c6e6e8">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="justify-content:flex-end">
      <el-dropdown style="width: 60px;cursor: pointer; ">
        <span v-text="this.userName"></span><i class="el-icon-arrow-down" style="margin-left: 5px;"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
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
      userName: JSON.parse(sessionStorage.getItem("userInfo")).name,
    }
  }
};
</script>

<style>
.el-dropdown, .el-breadcrumb__inner {
  color: #c6e6e8 !important;
}
</style>
