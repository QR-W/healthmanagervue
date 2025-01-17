<template>
    <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
      label-position="left">
      <el-row :gutter="24" style="text-align: center;width: 100%;margin-left: 80px;">
        <el-col :span="3" style="text-align: right;">
          <img src="@/assets/images/01.png" style="
              width: 40px;
              height: 40px;
              margin: 5px 5px 0 0;
              -webkit-user-drag: none;
              -khtml-user-drag: none;
              -moz-user-drag: none;
              user-drag: none;
          " />
        </el-col>
        <el-col :span="30" style="font-size: 32px;font-weight: 600;text-align: left;margin: 7px 0 0 50px;">

        心 语

        </el-col>
      </el-row>
      <hr>

      <el-form-item prop="username">
        <span class="svg-container">
          <i class="iconfont icon-r-user2" style="font-size: 26px;color: grey;"></i>
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="用户名" name="username" type="text" tabindex="1"
          auto-complete="on" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <i class="iconfont icon-r-lock" style="font-size: 26px;color: grey;"></i>
        </span>
        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="密码"
          name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="success" style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin">登 录</el-button>
      <div>
        <el-button type="primary" style="width: 100%; margin-bottom: 30px; margin-left: 0px"
          @click.native.prevent="handleRegister">注 册</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>

import { validUsername } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    // 定义验证用户名函数
    const validateUsername = (rule, value, callback) => {
      // 调用 validUsername 函数判断用户名是否合法
      if (!validUsername(value)) {
        // 如果不合法则返回错误信息
        callback(new Error("请输入正确的用户名"));
      } else {
        // 合法则调用 callback() 函数返回验证成功信息
        callback();
      }
    };
    // 定义验证密码函数
    const validatePassword = (rule, value, callback) => {
      // 判断密码是否小于6位
      if (value.length < 6) {
        // 如果小于6位则返回错误信息
        callback(new Error("输入的密码不能少于6位"));
      } else {
        // 合法则调用 callback() 函数返回验证成功信息
        callback();
      }
    };
    return {
      // 定义表单数据对象
      loginForm: {
        username: "",
        password: "",
      },
      // 定义表单验证规则
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      // 定义 loading 状态
      loading: false,
      // 定义密码输入框类型，初始为密码框
      passwordType: "password",
      // 定义重定向路径，初始为 undefined
      redirect: undefined,
    };
  },

  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },

  methods: {

    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },

    // handleLogin() {
    //   this.$refs.loginForm.validate((valid) => {
    //     if (valid) {
    //       this.loading = true; // 显示 loading 状态圈
    //       this.$store
    //         .dispatch("user/login", this.loginForm)
    //         .then(() => {
    //           // 登录成功，跳转到目标路由
    //           this.$router.push({ path: this.redirect || "/" });
    //           this.loading = false; // 隐藏 loading 状态
    //         })
    //         .catch(() => {
    //           this.loading = false; // 隐藏 loading 状态
    //         });
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },

    // handleRegister() {
    //   this.$router.push({ path: "/register" });
    // },
  },
};
</script>

<style lang="scss">
$bg: #2d3a4b;
$dark_gray: black;
$light_gray: #eee;

.login-container {
  min-height: 100vh;
  width: 100%;
  background-color: $bg;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 20px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $dark_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .el-form-item {
    margin-bottom: 20px;
  }

  .el-input {
    width: 100%;
    border: none;
    border-radius: 5px;
    background-color: #f7f7f7;

    input {
      padding: 15px;
      color: $dark_gray;

      &::placeholder {
        color: #ccc;
      }
    }
  }

  .el-button {
    height: 50px;
    border-radius: 25px;
    font-size: 16px;
    // background-color: $dark_gray;
    border: none;

    // &:hover,
    // &:focus {
    //   background-color: darken($dark_gray, 10%);
    // }
  }
}
</style>
