<template>
   <div class="page flex-center">
    <div class="sign-box">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <h3 class="title">登录</h3>
        <a href="javascript:;" @click="switchType">{{ text }}</a>
        <div v-if="type === 'username'">
        <el-form-item label="用户名" prop="username" size="large" >
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" size="large">
          <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        </div>
        <div v-if="type === 'email'">
            <el-form-item label="邮箱地址"  size="large" >
          <el-input v-model="form.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="验证码"  size="large">
          <el-input
              v-model="form.verifyCode"
             
              placeholder="请输入验证码"
          >
       
        </el-input>
         <el-button>qq</el-button>
        </el-form-item>
        </div>
        <div class="login_btn_part">
          <div><el-button type="primary" class="btn" @click="login">登录</el-button></div>
          <div class="txt-r">
            <router-link to="/register">没有帐号？去注册</router-link>
          </div>
        </div>

      </el-form>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
        type : 'username',
        text: '邮箱验证码登录',
        form : {
        username : '',
        password : '',
      }
    //   rules : {
    //     username : {
    //       required : true,
    //       message : "请输入用户名",
    //       trigger : ['change']
    //     },
    //     password : {
    //       required : true,
    //       message : "长度至少为2位",
    //       min : 2,
    //       trigger : ['change']
    //     }


      

    }
  },
  methods :{
    switchType(){
        if(this.type === 'username'){
            this.text = "用户名密码登录"
            this.type = 'email'
        }else{
            this.text = "邮箱验证码登录"
            this.type = 'username'
        }
    }
  }
}
</script>

<style>
@import url(./index.css);
</style>