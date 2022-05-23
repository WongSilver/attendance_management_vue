import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import axios from "axios";
import "./styles.scss";
import "./config/axiosConfig"
import "./assets/global.css"

// 全局使用ele
Vue.use(ElementUI, {size: "small"});

Vue.config.productionTip = false;

// 添加http请求库
Vue.prototype.$axios = axios;

// 设置标题
router.beforeEach((to,from,next) =>{
    if(to.meta.name){
        document.title = to.meta.name
    }
    next();
})

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
