import axios from "axios";
import ElementUI from "element-ui";
import router from "../router";
import store from "../store";

// 配置基础路由路径
axios.defaults.baseURL = "http://127.0.0.1:8088"

// 前置拦截
axios.interceptors.request.use(config => {

    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    // console.log(localStorage.getItem("token"))
    config.headers['authorization'] = localStorage.getItem("token");
    return config
})

// 后置拦截
axios.interceptors.response.use(response => {
        let res = response.data;

        //返回文件
        if (response.config.responseType === 'blob') {
            return res
        }
        //判断状态码是否成功
        if (res.code === 200) {
            return response
        } else {
            ElementUI.Message.error(res.msg, {
                duration: 3 * 1000
            })
            return Promise.reject(res.msg)
        }

    },

    // 处理后端没有定义的错误
    error => {
        if (error.response.status === 401) {
            store.commit("REMOVE_INFO")
            router.push("/login")
        }
        ElementUI.Message.error(error.message, {
            duration: 3 * 1000
        })
        return Promise.reject(res.msg)
    }
)