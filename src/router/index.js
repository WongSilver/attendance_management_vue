import Vue from "vue";
import VueRouter from "vue-router";
import Manage from "../views/pages/Manage.vue";
import Home from "../views/pages/Home.vue";
import Login from "../views/pages/Login.vue";
import User from "../views/pages/User.vue";
import UserInfo from "../views/pages/UserInfo.vue";
import Role from "../views/pages/Role.vue";
import Right from "../views/pages/Right.vue";
import CheckUser from "../views/pages/CheckUser.vue";
import CheckAdmin from "../views/pages/CheckAdmin.vue";
import CheckUserHistory from "../views/pages/CheckUserHistory.vue";
import CheckAdminHistory from "../views/pages/CheckAdminHistory.vue";
import Not404 from "../views/error-pages/Not404.vue";

Vue.use(VueRouter);

const routes = [
    {path: "/login", name: "Login", component: Login,meta: {name: "登录", path: "/login"}},

    //TODO 先用固定路由，动态路由后期完善
    {
        path: "/",
        name: "Manage",
        component: Manage,
        redirect: "/home",
        children: [
            {path: "/", name: "home", component: Home, meta: {name: "首页", path: "/home"}},
            {path: "home", name: "Home", component: Home, meta: {name: "首页", path: "/home"}},
            {path: "user", name: "User", component: User, meta: {name: "用户列表", path: "/user"}},
            {path: "role", name: "role", component: Role, meta: {name: "角色列表", path: "/role"}},
            {path: "right", name: "right", component: Right, meta: {name: "权限列表", path: "/right"}},
            {path: "userInfo", name: "userInfo", component: UserInfo, meta: {name: "个人信息", path: "/userInfo"}},
            {path: "checkUser", name: "checkUser", component: CheckUser, meta: {name: "我要请假", path: "/checkUser"}},
            {path: "checkAdmin", name: "checkAdmin", component: CheckAdmin, meta: {name: "请假名单", path: "/checkAdmin"}},
            {
                path: "checkAdminHistory",
                name: "checkAdminHistory",
                component: CheckAdminHistory,
                meta: {name: "批假记录", path: "/checkAdminHistory"}
            },
            {
                path: "checkUserHistory",
                name: "checkUserHistory",
                component: CheckUserHistory,
                meta: {name: "请假记录", path: "/checkUserHistory"}
            },
            // 其他页面未定义的页面访问404
            { path: "*", name: 'not404', component: {Not404}, meta: {name: "页面未找到",path: "/404"}}
        ],
    }];

const router = new VueRouter({
    mode: "history", //去除#号键
    routes,
});

/**
 * TODO
 * 动态路由未完成，先用固定路由，后期完善
 */
// export const setRouter = () => {
//     const storeRights = sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")).rights : []
//     if (storeRights) {
//         // console.log(storeRights)
//         const manageRouter = {path: "/", name: "Manage", component: Manage, redirect: "/home", children: []}
//         storeRights.forEach(item => {
//             let itemRight = {
//                 path: item.url.replace("/", ""),
//                 name: item.name,
//                 component: () => import("../views/pages/" + item.pagePath + ".vue"),
//                 meta: {name: item.name, path: item.url.replace("/", "")}
//             }
//             manageRouter.children.push(itemRight)
//         })
//         // console.log(manageRouter)
//         const names = router.getRoutes().map(v => v.name);
//         if (!names.includes("Manage")) {
//             router.addRoute(manageRouter);
//         }
//     }
// }

// 路由守卫
// let registerRouteFresh = true
// router.beforeEach(async (to, from, next) => {
//     // 如果首次或者刷新界面，next(...to, replace: true)会循环遍历路由，如果to找不到对应的路由那么他会再执行一次beforeEach((to, from, next))直到找到对应的路由，我们的问题在于页面刷新以后异步获取数据，直接执行next()感觉路由添加了但是在next()之后执行的，所以我们没法导航到相应的界面。这里使用变量registerRouteFresh变量做记录，直到找到相应的路由以后，把值设置为false然后走else执行next(),整个流程就走完了，路由也就添加完了。
//     if (registerRouteFresh) {
//         setRouter()
//         next({...to, replace: true})
//         registerRouteFresh = false
//     } else {
//         next()
//     }
// })

// 解决路由重复的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default router;
