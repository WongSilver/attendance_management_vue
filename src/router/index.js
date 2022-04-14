import Vue from "vue";
import VueRouter from "vue-router";
import Manage from "../views/pages/Manage.vue";
import Home from "../views/pages/Home.vue";
import Login from "../views/pages/Login.vue";
import User from "../views/pages/User.vue";
import UserDataShow from "../views/pages/UserDataShow.vue";
import userInfo from "../views/pages/UserInfo.vue";
import Role from "../views/pages/Role.vue";
import Right from "../views/pages/Right.vue";
import RoleDataShow from "../views/pages/RoleDataShow.vue";
import RightDataShow from "../views/pages/RightDataShow.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Manage",
        component: Manage,
        redirect: "/home",
        children: [
            {path: "home", name: "Home", component: Home, meta: {name: "首页", path: "/home"}},
            {path: "user", name: "User", component: User, meta: {name: "用户列表", path: "/user"}},
            {path: "role", name: "role", component: Role, meta: {name: "角色列表", path: "/role"}},
            {path: "right", name: "right", component: Right, meta: {name: "权限列表", path: "/right"}},
            {path: "userInfo", name: "userInfo", component: userInfo, meta: {name: "个人信息", path: "/userInfo"}},
            {
                path: "userDataShow",
                name: "UserDataShow",
                component: UserDataShow,
                meta: {name: "用户分析", path: "/userDataShow"}
            },
            {
                path: "RoleDataShow",
                name: "roleDataShow",
                component: RoleDataShow,
                meta: {name: "角色分析", path: "/roleDataShow"}
            },
            {
                path: "RightDataShow",
                name: "rightDataShow",
                component: RightDataShow,
                meta: {name: "角色分析", path: "/rightDataShow"}
            },
        ],

    },
    // {
    //     path: "/home",
    //     name: "Home2",
    //     component: Home,
    // },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
];

const router = new VueRouter({
    mode: "history", //去除#号键
    // mode: "hash",
    routes,
});

// 解决路由重复的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default router;
