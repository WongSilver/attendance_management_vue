<template>
  <el-container style="height: 100%; min-height: 100vh">
    <el-aside :width="sideWidth + 'px'"
              style="background-color: rgb(48, 65, 86); height: 100%" id="myTransition">
      <Aside :isCollapse="this.isCollapse"/>
    </el-aside>

    <el-container>
      <el-header background-color="#08ffc8">
        <Header :collapseBtnClass="collapseBtnClass" :collapse="collapse"/>
      </el-header>

      <el-main>
        <!--当前路由的子路由会在 router-view 中展示-->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "@/components/Aside";
import Header from "@/components/Header";

export default {
  name: "Manage",
  data() {
    return {
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
    }
  },
  components: {
    Aside, Header,
  },
  methods: {
    //设置侧边栏按钮
    collapse() {
      this.isCollapse = !this.isCollapse;
      this.sideWidth = this.isCollapse ? 64 : 200;
      this.collapseBtnClass = this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold';
    },

  }
};
</script>
<style>
#myTransition {
  transition: width 100ms ease-out;
}
</style>
