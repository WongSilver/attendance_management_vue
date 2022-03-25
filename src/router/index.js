import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/pages/Home.vue";
import Login from "../views/pages/Login.vue";
import User from "../views/pages/User.vue";
import UserDetail from "../views/pages/UserDetail.vue";
import UserEdit from "../views/pages/UserEdit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    redirect: { name: "Home" },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/user/list",
    name: "User",
    component: User,
  },
  {
    path: "/user/:userId",
    name: "UserDetail",
    component: UserDetail,
  },
  {
    path: "/user/:userId/edit",
    name: "UserEdit",
    component: UserEdit,
  },
];

const router = new VueRouter({
  mode: "history", //去除#号键
  // mode: "hash",
  routes,
});

export default router;
