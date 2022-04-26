<template>
  <el-container style="height: 100vh">

    <el-main class="wrapper">
      <div class="from-login"
           style="line-height: 100%;background-color:#fff; padding: 20px; margin: 10% auto;border-radius: 10px;width: 30%;min-width: 370px; max-width: 40%; box-shadow: 5px 0 30px #88000000">
        <div style="padding: 30px"><b style="font-size: 26px">学生考勤系统登录</b></div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                 style="margin: 0 auto;padding: 20px 60px 0 60px;">
          <el-form-item prop="name">
            <el-input placeholder="用户名" type="text" v-model="ruleForm.name" autocomplete="off" size="30px"></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input placeholder="密码" type="password" v-model="ruleForm.password" autocomplete="off"
                      size="30px"></el-input>
          </el-form-item>

          <el-form-item prop="verify">
            <el-input type="text" oninput="value=value.replace(/[^0-9|A-Z|a-z]{4}$/g,'')" maxlength="4"
                      placeholder="验证码" v-model="ruleForm.verify" size="30px"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button type="warning" @click="register()">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
    <el-dialog title="注册" :visible.sync="dialogFormVisible" width="20%" style="margin: 0 auto">
      <el-form :model="formRegister" label-width="100px" :rules="regRule" status-icon>
        <el-form-item label="用户名" prop="regName">
          <el-input v-model="formRegister.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="regPassword">
          <el-input v-model="formRegister.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>

import ElementUI from "element-ui";

export default {
  name: "Login",
  data() {
    return {
      //登录表单
      ruleForm: {
        name: "wang",
        password: "123456",
        verify: "1",
      },
      // 注册表单
      formRegister: {
        name: "",
        password: "",
      },
      //登录验证
      rules: {
        name: [{validator: validateName, trigger: "blur"}],
        password: [{validator: validatePass, trigger: "blur"}],
        verify: [{validator: validateVerify, trigger: "blur"}],
      },
      dialogFormVisible: false,
      regRule: {},      //TODO 有时间实现
    };

    const validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
      setTimeout(() => {
        callback();
      }, 100);
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      setTimeout(() => {
        callback();
      }, 100);
    };
    const validateVerify = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      }
      setTimeout(() => {
        callback();
      }, 100);
    };
  },

  methods: {
    submitForm: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this;
          this.$axios.post("/login", this.ruleForm).then((res) => {
            // 获取headers中的数据
            const jwt = res.headers["authorization"];
            const userInfo = res.data.data;

            // 把数据存入store中
            _this.$store.commit("SET_TOKEN", jwt);
            _this.$store.commit("SET_USERINFO", userInfo);
            // 跳转
            _this.$router.push("/home");
          }).catch(error => {
            console.log(error.response)
          });
        } else {
          return false;
        }
      });
    },

    //打开注册功能
    register() {
      this.dialogFormVisible = true
    },

    //添加用户
    save() {
      console.log(this.formRegister)
      this.$axios.post("/user/add", this.formRegister).then(res => {
        let data = res.data;
        if (data.code === 200) {
          ElementUI.Message.success("注册成功")
          this.dialogFormVisible = false;
          this.formRegister = {};
        }
      })
    },
  },
};
</script>

<style>
.el-form-item__content {
  margin-left: 0 !important;
}

.wrapper {
  height: 100vh;
  background-image: linear-gradient(to bottom right, #ed556a, #57c3c2);
}
</style>