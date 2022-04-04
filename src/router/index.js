import Vue from "vue";
import VueRouter from "vue-router";
import Manage from "../views/pages/Manage.vue";
import Home from "../views/pages/Home.vue";
import Login from "../views/pages/Login.vue";
import User from "../views/pages/User.vue";
import UserDataShow from "../views/pages/UserDataShow.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Manage",
        component: Manage,
        redirect: "/home",
        children: [
            {path: "home", name: "Home", component: Home},
            {path: "user", name: "User", component: User},
            {path: "userDataShow", name: "UserDataShow", component: UserDataShow},
        ]
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
];

const router = new VueRouter({
    mode: "history", //去除#号键
    // mode: "hash",
    routes,
});

export default router;
