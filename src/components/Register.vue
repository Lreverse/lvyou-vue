<template>
    <div class="page flex-center">
      <div class="sign-box">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <h3 class="title">注册</h3>
          <el-form-item label="用户名" prop="username" size="large">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" size="large">
            <el-input
                v-model="form.password"
                type="password"
                placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          
          <div class="btn_part">
            <div><el-button type="primary" class="btn" @click="register">注册</el-button></div>
            <div class="txt-r">
              <router-link to="/login">已有帐号？去登录</router-link>
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
    data () {
     
      return{
        form : {
          username : '',
          password : ''
          
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
    methods : {
        register(){
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
                        localStorage.setItem('user',JSON.stringify(res.data))
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
        }
    }
  
  }
  </script>
  
  <style scoped>
  @import url(./index.css);
  </style>