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
          <el-form-item label="确认密码" prop="cfmpassword" size="large">
            <el-input
                v-model="form.cfmpassword"
                type="password"
                placeholder="请确认密码"
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
      const validateCfmPassword = (rule,value,callback) =>{
        if(value !== this.form.password ){
          callback(new Error("两次输入密码不一致"));
        }
        callback();
      }
      return{
        form : {
          username : '',
          password : '',
          cfmpassword : ''
        },
        rules : {
          username : {
            required : true,
            message : "请输入用户名",
            trigger : ['change']
          },
          password : {
            required : true,
            message : "长度至少为2位",
            min : 2,
            trigger : ['change']
          },
          cfmpassword: [
            {
              required : true,
              message : "请确认密码",
              trigger : ['change']
            },
            {
              validator : validateCfmPassword,
              trigger: ['change','blur']
            }
          ]
        }
  
      }
    },
    methods : {
    //   register(){
    //     let _this = this;
    //     this.$refs.form.validate((valid => {
    //       if(valid){
  
    //         axios({
    //           method : "post",
    //           url : "http://localhost/user/register",
    //           data : {
    //             "username" :  _this.form.username,
    //             "password" : _this.form.password
    //           }
    //         }).then(function(resp){
    //           if(resp.data.code === 200){
    //             _this.$message({
    //               message : '注册成功',
    //               type : 'success'
    //             })
    //             router.push("/user/login");
    //           }else if(resp.data.code === 400){
    //             _this.$message({
    //               message : '用户名已存在',
    //               type : 'error'
    //             })
    //             //_this.form.username = '';
    //           }
    //         })
    //       }
    //     }))
    //   }
    }
  
  }
  </script>
  
  <style scoped>
  @import url(./index.css);
  </style>