<template>
  <div class="sign-in">
    <div id="login-box">
      <div class="login-banner"></div>
      <el-form ref="form" :model="form" :rules="rules" class="login-form" label-position="left">
        <div class="title-container">
          <h3 class="title">{{ title }}</h3>
        </div>
        <div>
          <el-form-item prop="account">
            <el-input ref="name" v-model="form.account" placeholder="用户名" type="text" tabindex="1">
              <svg-icon slot="prefix" name="user"/>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input ref="password" v-model="form.password" :type="passwordType" placeholder="密码" tabindex="2"
                      @keyup.enter.native="handleLogin">
              <svg-icon slot="prefix" name="password"/>
              <svg-icon slot="suffix" :name="passwordType === 'password' ? 'eye' : 'eye-open'" @click="showPassword"/>
            </el-input>
          </el-form-item>
        </div>
        <el-checkbox v-model="form.remember">记住我</el-checkbox>
        <el-button :loading="loading" type="primary" style="width: 100%;" @click="handleLogin">登 录</el-button>
      </el-form>
    </div>
    <copyright></copyright>
  </div>
</template>

<script>

import {mapState} from 'vuex'
import {clone} from 'lodash-es'
import to from 'await-to-js'

export default {
  name: "SignIn",
  data() {
    return {
      title: process.env.APP_TITLE,
      form: {
        account: "",
        password: "",
        remember: false
      },
      rules: {
        account: [{required: true, trigger: 'blur', message: '请输入用户名'}],
        password: [
          {required: true, trigger: 'blur', message: '请输入密码'},
          {min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位'}
        ]
      },
      loading: false,
      passwordType: 'password'
    }
  },
  computed: {
    ...mapState({
      loginForm: state => state.project.loginForm
    })
  },
  created() {
    if (this.loginForm.remember) this.form = clone(this.loginForm);
  },
  methods: {
    showPassword() {
      this.passwordType = this.passwordType === "text" ? "password" : "text";
    },
    async handleLogin() {
      const [, valid] = await to(this.$refs.form.validate())
      if (valid) {
        const [err] = await to(this.$store.dispatch("SignIn", this.form))
        if (!err) {
          this.$router.push({path: this.$route.query?.redirect || '/'}).then();
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
[data-mode=mobile] {
  #login-box {
    max-width: 80%;

    .login-banner {
      display: none;
    }
  }
}

.sign-in {
  height: 100%;
  background-image: url("~@/assets/image/framework/login-bg.jpeg");
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  ::v-deep input[type=password]::-ms-reveal {
    display: none;
  }

  #login-box {
    display: flex;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 5px #999;

    .login-banner {
      width: 250px;
      background-image: url("~@/assets/image/framework/login-banner.jpeg");
      background-size: cover;
    }

    .login-form {
      width: 300px;
      padding: 50px 35px 30px;
      overflow: hidden;

      .title-container {
        position: relative;

        .title {
          font-size: 20px;
          color: #666;
          margin: 0 auto 20px;
          text-align: center;
          font-weight: bold;
          @include text-overflow();
        }
      }

      ::v-deep .el-input {
        display: inline-block;
        height: 42px;
        width: 100%;

        input {
          height: 42px;
        }

        .el-input__prefix {
          left: 10px;
        }

        .el-input__suffix {
          right: 10px;
        }
      }

      .el-checkbox {
        margin: 20px 0;
      }
    }
  }

  footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 20px;
  }
}
</style>
