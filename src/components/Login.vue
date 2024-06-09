<template>
   <div class="page flex-center">
    <div class="sign-box">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <h3 class="title">登录</h3>
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

        <div class="login_btn_part">
          <div ><el-button type="primary" class="btn" @click="login">登录</el-button></div>
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
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style></style>