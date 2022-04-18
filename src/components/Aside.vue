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


    <!--    TODO-->
    <div v-for="item in rights" :key="item.id">
      <el-menu-item :index="item.url">
        <i :style="{color:iconColor}" :class="item.icon"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </div>


  </el-menu>
</template>
<script>
export default {
  name: "Aside",
  data() {
    return {
      iconColor: '#c6e6e8',
      rights: JSON.parse(sessionStorage.getItem("userInfo")) === null ? this.getInfo() : JSON.parse(sessionStorage.getItem("userInfo")).rights
    }
  },
  props: {
    isCollapse: Boolean,
  },
  methods: {
    getInfo() {
      if (sessionStorage.getItem("userInfo") === null) {
        this.$axios.get("/user/info").then(res => {
          this.$store.commit("SET_USERINFO", res.data.data);
          location.reload();
        })
      }
    }
  }

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