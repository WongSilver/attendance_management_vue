<template>
  <el-menu class="demo" style="height: 100%;overflow-x: hidden; min-height: 100%; "
           text-color="#c6e6e8"
           width="200px"
           background-color="#1ba784"
           active-text-color="#1a6840"
           :collapse-transition="false"
           :collapse="isCollapse"
           :style="{color:iconColor}"
           router>

    <div style="height: 60px; line-height: 60px; text-align: center">
      <img src="../assets/logo.png" alt="LOGO"
           style="width: 20px; position: relative; top: 3px; margin-right: 5px">
      <b style="color: #c6e6e8" v-show="!isCollapse">考勤管理系统</b>
    </div>
    <!--    主页-->
    <el-menu-item index="/">
      <i :style="{color:iconColor}" class="el-icon-house"></i>
      <span slot="title">主页</span>
    </el-menu-item>

    <!--    用户管理-->
    <el-submenu style="color: #c6e6e8" index="">
      <template slot="title">
        <i :style="{color:iconColor}" class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </template>
      <el-menu-item index="user">用户列表</el-menu-item>
      <el-menu-item index="userDataShow">用户分析</el-menu-item>
    </el-submenu>

    <!--    角色管理-->
    <el-submenu index="3">
      <template slot="title">
        <i :style="{color:iconColor}" class="el-icon-link"></i>
        <span slot="title">角色管理</span>
      </template>
      <el-menu-item index="/role">角色列表</el-menu-item>
      <el-menu-item index="/roleDataShow">角色分析</el-menu-item>
      <!--      <el-menu-item index="3-3">选项3</el-menu-item>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>-->
    </el-submenu>

    <!--    权限管理-->
    <el-submenu index="4">
      <template slot="title">
        <i :style="{color:iconColor}" class="el-icon-key"></i>
        <span slot="title">权限管理</span>
      </template>
      <el-menu-item index="/right">权限列表</el-menu-item>
      <el-menu-item index="/rightDataShow">权限分析</el-menu-item>
      <!--      <el-menu-item index="3-3">选项3</el-menu-item>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>-->
    </el-submenu>

    <!--    数据统计-->
    <el-submenu index="5">
      <template slot="title">
        <i :style="{color:iconColor}" class="el-icon-pie-chart"></i>
        <span slot="title">数据统计</span>
      </template>
      <el-menu-item index="3-1">选项1</el-menu-item>
      <el-menu-item index="3-2">选项2</el-menu-item>
      <el-menu-item index="3-3">选项3</el-menu-item>
      <el-submenu index="3-4">
        <template slot="title">选项4</template>
        <el-menu-item index="3-4-1">选项4-1</el-menu-item>
      </el-submenu>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  name: "Aside",
  data() {
    return {
      iconColor: '#c6e6e8',
    }
  },
  props: {
    isCollapse: Boolean,
  },

}
</script>
<style>
.el-scrollbar {
  height: 100%;
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}

.el-menu {
  border-right-width: 0 !important;
}

.el-submenu__title i {
  color: #c6e6e8 !important;
}
</style>