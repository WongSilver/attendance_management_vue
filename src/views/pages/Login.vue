<template>
  <el-container>
    <el-header>
      <img class="mlogo" src="../../assets/logo.png" alt="logo"/>
      <p>
        <span display="inline" style="font-size: 32px">考勤管理系统</span>
      </p>
    </el-header>

    <el-main>
      <div class="from-login" style="width: 30%; text-align: center">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="name">
            <el-input placeholder="用户名" type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input placeholder="密码" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item prop="verify">
            <el-input type="text" oninput="value=value.replace(/[^0-9|A-Z|a-z]{4}$/g,'')" maxlength="4"
                      placeholder="验证码" v-model="ruleForm.verify"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>

    <el-footer>
      <div class="ft-text">Copyright © 2022 WongSilver 版权所有</div>
    </el-footer>
  </el-container>
</template>

<script>

export default {
  name: "Login",
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
      setTimeout(() => {
        callback();
      }, 100);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      setTimeout(() => {
        callback();
      }, 100);
    };
    var validateVerify = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      }
      setTimeout(() => {
        callback();
      }, 100);
    };
    return {
      ruleForm: {
        name: "wang",
        password: "123456",
        verify: "1",
      },
      rules: {
        name: [{validator: validateName, trigger: "blur"}],
        password: [{validator: validatePass, trigger: "blur"}],
        verify: [{validator: validateVerify, trigger: "blur"}],
      },
    };
  },
  methods: {
    submitForm(formName) {
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
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
/* 统一设置高度为100% */
#app {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
.el-container {
  height: 100%;
}
/* 设置LOGO大小 */
.mlogo {
  margin-top: 20px;
  height: 60%;
}
.el-header {
  background-color: #428675;
  color: #333;
  text-align: center;
  height: 20%;
}
.el-main {
  background-color: #c6e6e8;
  color: #333;
  text-align: center;
}
.el-footer {
  background-color: #428675;
  color: #333;
  vertical-align: bottom;
  text-align: center;
}
.demo-ruleForm {
  max-width: 500px;
  min-width: 300px;
}
.from-login {
  margin: 0 auto;
}
</style>