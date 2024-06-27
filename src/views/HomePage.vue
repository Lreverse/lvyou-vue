<template>
    <el-container class="container">
        <el-header height="150px">
            <el-row class="menu" type="flex" justify="end">
                <div class="logo">
                    <img src="@/assets/logo.png" alt="Logo">
                </div>
                <div class="menu-button"><el-button type="text" @click="navigateTo('/')" class="button-text">主页</el-button></div>
                <div class="menu-button"><el-button type="text" @click="navigateTo('/about')" class="button-text">关于</el-button></div>
                <div class="menu-button"><el-button type="text" @click="navigateTo('/login')" class="button-text">登录</el-button></div>
            </el-row>
        </el-header>

        <el-main class="main">
            <div class="text-box">
                <h2>欢迎来到驴友网站</h2>
                <span>可以在这里找到自己的驴友</span>
            </div>
        </el-main>

        <div class="footer">
            <h5>@SE-2024</h5>
        </div>

    </el-container>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: "/",
        }
    },
    methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  }
}
</script>

<style scoped>
.container {
    height: 100%;
    background-image: url("../assets/bg.jpg");
    background-size: 100% 100%;
}
.logo {
    position: absolute;
    left: 0;
    margin: 30px;
}
.menu-button {
    margin: 20px;
    margin-top: 30px;
    .button-text {
        color: rgb(0, 0, 0);
    }
}
.text-box {
    position: flex;
    padding: 100px;
    padding-top: 150px;
    padding-left: 150px;
    width: 400px;
    h2 {
        font-size: 45px;
        font-style: italic;
        border-bottom: 2px solid rgb(1, 13, 1);
        margin: 0;
    }
}
.text h2 {
    font-size: 70px;
    text-align: center;
    border-bottom: 2px solid rgb(0, 90, 128);
}
.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 80px;
    background-color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    h5 {
        font-weight: 100;
        color: rgb(228, 222, 222);
    }
}
</style>