<template>
  <div class="main">
    <el-container>
      <el-aside width="250px">
        <div class="logo">
          <img id="logo" src="../assets/logo.png" alt="">
        </div>
        <el-menu :default-active="active" class="menu" router>
          <el-menu-item index="/home">
            <i><img class="icon" src="../assets/home.png" alt=""></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-menu-item index="/notice">
            <i><img class="icon" src="../assets/message.png" alt=""></i>
            <span slot="title">通知</span>
          </el-menu-item>
          <!-- <el-menu-item index="/search">
            <i><img class="icon" src="../assets/search.png" alt=""></i>
            <span slot="title">搜索</span>
          </el-menu-item> -->
          <el-menu-item index="/create">
            <i><img class="icon" src="../assets/create.png" alt=""></i>
            <span slot="title">新建</span>
          </el-menu-item>
          <el-menu-item :index="path">
            <i><img class="icon" src="../assets/profile.png" alt=""></i>
            <span slot="title">主页</span>
          </el-menu-item>
          <el-menu-item id="more">
            <i><img class="icon" src="../assets/more.png" alt=""></i>
            <span slot="title">
              <el-dropdown @command="handleCommand">
                <span style="font-size: 20px;color: black;">更多</span>
                <el-dropdown-menu slot="dropdown">

                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </el-menu-item>


        </el-menu>
      </el-aside>
      <el-container>

        <el-main>
          <router-view></router-view>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>


<script>
export default {

  name: 'PageContainer',
  data() {

    return {

      path: '',
      active: ''
    }
  },
  computed: {
    defaultActive() {
      console.log('/' + this.$route.path.split('/').reverse()[1]);
      const path = '/' + this.$route.path.split('/').reverse()[1];
      if (path === '/profile') {
        console.log(this.path)
        return this.path;
      } else {
        return '/' + this.$route.path.split('/').reverse()[0];
      }

    }
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user);
    //console.log(user.username);
    this.path = "/profile/" + user.username;
    const path = '/' + this.$route.path.split('/').reverse()[1];
    if (path === '/profile') {
      console.log(this.path)
      this.active = this.path;
    } else {
      this.active = '/' + this.$route.path.split('/').reverse()[0];
    }
  },
  methods: {
    handleCommand(command) {

      if (command === 'logout') {
        const user = JSON.parse(localStorage.getItem('user'));
        this.uid = user.uid;
        const token = user.accessToken;
        this.getFetch("http://127.0.0.1:8081/api/user/logout", token)
          .then(data => {
            localStorage.removeItem('user');
            this.$router.replace('/login');
            this.$message({
              message: '退出登录',
              type: 'success'
            });
          })
        // fetch("http://127.0.0.1:8081/api/user/logout")
        //   .then(response => response.json())
        //   .then((data) => {
        //     console.log(data);

        //   })
        // localStorage.removeItem('user');
        // this.$router.replace('/login');
        // this.$message({
        //   message: '退出登录',
        //   type: 'success'
        // });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-container,
.main {

  height: 100%;
}

.icon {
  width: 30px;

  margin-right: 12px;
}

.el-menu {
  padding: 0;
  margin-bottom: 0;
  border-right: none;

}

#more {
  margin-top: 200px;
}

.el-aside {

  color: #333;
  text-align: center;
  line-height: 200px;
  border-right-color: #e2dede;
  border-right-width: 0.8px;
  border-right-style: solid;
}

.el-main {

  color: #333;
  text-align: center;
  /* line-height: 160px; */
}

body>.el-container {
  margin-bottom: 40px;
}

.el-menu-item {
  height: 60px;
  text-align: justify;
  font-size: 20px;
  margin-left: 10px;
  font-family: "Microsoft YaHei", "微软雅黑";
}

.icon {
  margin-bottom: 5px;
}

#logo {
  width: 70px;
  margin-right: 100px;
}
</style>
