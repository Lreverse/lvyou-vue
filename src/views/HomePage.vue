<template>
    <el-container class="container">
        <el-header height="150px">
            <el-row class="menu" type="flex" justify="end">
                <div class="logo">
                    <img src="@/assets/logo.png" alt="Logo">
                </div>
                <div class="menu-button"><el-button type="text" @click="showWelcome" class="button-text">主页</el-button>
                </div>
                <div class="menu-button"><el-button type="text" @click="showAbout" class="button-text">关于</el-button>
                </div>
                <div class="menu-button"><el-button type="text" @click="navigateTo('/login')"
                        class="button-text">登录/注册</el-button></div>
            </el-row>
        </el-header>

        <el-main class="main">
            <div class="welcome-box" :class="{ hidden: isAboutVisible }">
                <h2>欢迎来到驴友网站</h2>
                <span>在这里找到属于自己的驴友吧^_^</span>
            </div>

            <div class="about-box" :class="{ hidden: !isAboutVisible }">
                <h2>关于我们</h2>
                <ul class="mg">
                    <li>课程：软件工程</li><br>
                    <li>成员：刘禹航、杨萌宇、林奕培</li><br>
                    <li>专业：网络空间安全</li><br>
                </ul>
                <div class="icon">
                    <ul>
                        <li><a href="https://wx.qq.com/" target="_blank"><i class="fab fa-weixin"></i></a></li>
                        <li><a href="https://github.com/liuyuhangyuliu/lvyou-vue" target="_blank"><i class="fab fa-github"></i></a></li>
                        <li><a href="https://xn--flw351e.ml/" target="_blank"><i class="fab fa-google"></i></a></li>
                    </ul>
                </div>
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
            isAboutVisible: false,
        }
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        },

        showWelcome() {
            this.isAboutVisible = false;
        },

        showAbout() {
            this.isAboutVisible = true;
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
    .button-text:hover {
        color: rgb(12, 61, 140);
    }
}

/* 欢迎文本 */
.welcome-box {
    position: flex;
    padding: 100px;
    padding-top: 130px;
    padding-left: 150px;
    width: 400px;

    h2 {
        font-size: 45px;
        font-style: italic;
        border-bottom: 2px solid rgb(1, 13, 1);
        padding-bottom: 5px;
        margin-bottom: 10px;
    }
}

/* 关于文本 */
.about-box {
    position: flex;
    padding: 100px;
    padding-top: 60px;
    padding-left: 150px;
    width: 400px;

    h2 {
        font-size: 40px;
        font-style: italic;
    }

    .mg {
        font-size: 20px;
        list-style: square;
    }
}

.hidden {
    display: none;
}

.about-box .icon ul {
    display: flex;
    padding-top: 150px;
    padding: 0;
}

.about-box .icon li {
    list-style: none;
    margin: 0 18px;
}

.about-box .icon li a {
    position: relative;
    display: block;
    color: white;
    width: 64px;
    height: 64px;
    font-size: 36px;
    text-align: center;
    line-height: 64px;
    border-radius: 50%;
    transition: 0.6s;
}

.about-box .icon li a:hover {
    text-shadow: 0 0 10px rgb(3, 56, 76);
}

.about-box .icon li a::before {
    content: "";
    background: transparent;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 50%;
    transition: 0.6s;
    transform: scale(0.8);
    z-index: -1;
}

.about-box .icon li a:hover::before {
    box-shadow: 0 0 14px 2px rgb(161, 181, 188);
    transform: scale(1.06);
}

/* 页脚 */
.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
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