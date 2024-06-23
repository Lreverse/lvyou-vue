<template>
  <div class="page flex-center">
    <div class="sign-box">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <h3 class="title">注册</h3>
        <el-link class="switch" type="primary" @click="switchType">{{ text }}</el-link>
        <div v-if="type === 'username'">
          <el-form-item label="用户名" prop="username" size="large">
            <el-input ref="input_user" v-model="form.username" placeholder="请输入用户名" @keyup.native.enter="focusNextInput('input_pwd')"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" size="large">
            <el-input ref="input_pwd" v-model="form.password" type="password" placeholder="请输入密码" @keyup.native.enter="register"></el-input>
          </el-form-item>
        </div>
        <div v-if="type === 'email'">
          <el-form-item label="邮箱地址" size="large">
            <el-input ref="input_mail" v-model="form.mailAddress" placeholder="邮箱" @keyup.native.enter="focusNextInput('input_code')"></el-input>
          </el-form-item>
          <el-form-item label="验证码" size="large">
            <el-input ref="input_code" v-model="form.code" placeholder="请输入验证码" @keyup.native.enter="register">
              <template #append>
                <el-button type="primary" @click="sendVerifyCode" plain>发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>
        </div>

        <div class="bottom_part">
          <div class="btn_part">
            <el-button type="primary" class="btn" @click="register">注册</el-button>
          </div>
          <div class="txt-r">
            <el-link type="primary"><router-link to="/login">已有帐号？去登录</router-link></el-link>
          </div>
        </div>

      </el-form>
    </div>
  </div>

</template>

<script>


import router from "../router/index.js"

export default {

  name: "Register",
  data() {

    return {
      type: 'username',
      text: "邮箱验证码注册",
      form: {
        mailAddress: '',
        code: '',
        username: '',
        password: ''

      },
      // rules : {
      //   username : {
      //     required : true,
      //     message : "请输入用户名",
      //     trigger : ['change']
      //   },
      //   password : {
      //     required : true,
      //     message : "长度至少为2位",
      //     min : 2,
      //     trigger : ['change']
      //   },
      //   cfmpassword: [
      //     {
      //       required : true,
      //       message : "请确认密码",
      //       trigger : ['change']
      //     },
      //     {
      //       validator : validateCfmPassword,
      //       trigger: ['change','blur']
      //     }
      //   ]
      // }

    }
  },
  methods: {
    register() {
      if (this.type === 'username') {
        let requestInstance = new Request('http://127.0.0.1:8081/api/user/register', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(this.form)
        })
        fetch(requestInstance).then(response => {

          let result = response.json()
          result.then(res => {
            localStorage.setItem('user', JSON.stringify(res.data))
            console.log(res);
            if (res.code === '000') {
              this.$router.replace('/home')

              this.$message({
                message: '注册成功！',
                type: 'success'
              });

            }
          })
        })
      } else if (this.type === 'email') {
        let requestInstance = new Request('http://127.0.0.1:8081/api/user/registerByMail', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(this.form)
        })
        fetch(requestInstance).then(response => {

          let result = response.json()
          result.then(res => {
            localStorage.setItem('user', JSON.stringify(res.data))
            console.log(res);
            if (res.code === '000') {
              this.$router.replace('/home')

              this.$message({
                message: '登录成功！',
                type: 'success'
              });

            }
          })
        })
      }
    },

    switchType() {
      if (this.type === 'username') {
        this.text = "用户名密码注册"
        this.type = "email"
      } else {
        this.text = "邮箱验证码注册"
        this.type = "username"
      }
    },

    sendVerifyCode() {
      let requestInstance = new Request('http://127.0.0.1:8081/api/user/register/verifyCode/' + this.form.mailAddress, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        }

      })
      fetch(requestInstance).then(response => {

        let result = response.json()
        result.then(res => {
          console.log(res);
          if (res.code === '000') {
            //this.$router.replace('/')

            this.$message({
              message: '发送验证码成功！',
              type: 'success'
            });

          }
        })
      })
    },

    focusNextInput(refName) {
      const nextInput = this.$refs[refName]
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

}
</script>

<style scoped>
@import url(./index.css);
</style>