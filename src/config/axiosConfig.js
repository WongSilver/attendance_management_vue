import axios from "axios";
import ElementUI from "element-ui";
import router from "../router";
import store from "../store";

// 配置基础路由路径
axios.defaults.baseURL = "http://127.0.0.1:8088/"

// 前置拦截
axios.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    if (localStorage.getItem("token") !== null) {
        config.headers['authorization'] = localStorage.getItem("token");
    } else if ((localStorage.getItem("token") === null)) {
        router.push("/login")
    }

    return config
})

// 后置拦截
axios.interceptors.response.use(response => {
        let res = response.data;
        let msg = res.msg;

        //返回文件
        if (response.config.responseType === 'blob') {
            return res
        }
        //判断状态码是否成功
        if (res.code === 200) {
            return response
        } else if (res.code === 999) {
            msg = "token已失效，请重新登录"
            store.commit("REMOVE_INFO")
            router.push("/login")
        } else if (res.code === 233) {
            msg = "无权限"
        } else if (res.code === 401) {
            msg = "未授权异常，请重新登录"
            router.push("/login")
        }
        ElementUI.Message.error(msg, {duration: 3 * 100})
        return Promise.reject(res.msg)

    },

    // 处理后端没有定义的错误
    error => {
        let response = error.response;
        let msg;
        if (response.status === 401) {
            store.commit("REMOVE_INFO")
            msg = "未授权异常，请重新登录"
            router.push("/login")
        } else {
            msg = "未知错误"
        }
        ElementUI.Message.error(msg, {duration: 3 * 1000})
        return Promise.reject(res.msg)
    }
)