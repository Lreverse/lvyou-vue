<template>

  <el-row>
    <el-col :span="14" :offset="2">
      <el-card :body-style="{ padding: '15px' }">

        <!-- <el-row class="card-header">
                    <el-col>
                        <el-avatar
                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        <span id="username"
                            style="position:absolute;margin-left:10px;font-size: 16px;font-weight: bold;font-family: 'Courier New', Courier, monospace;">
                            {{schedule.userBO.username}}
                        </span>
                    </el-col>
                </el-row> -->
        <el-row class="card-image">
          <el-col>

            <div class="block">
              <el-carousel trigger="click" indicator-position="none" :autoplay="false">
                <el-carousel-item v-for="(value, key, index) in JSON.parse(this.schedule.images)" :key="index">
                  <div style="height: 100%;"><img style="height: 100%;" :src="value" alt=""></div>

                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>

        </el-row>
        <el-row class="card-content">
          <el-row
            style="line-height: 34px;margin-top: 10px;margin-bottom:10px;text-align: justify;font-size: large;font-weight: bold;">
            <el-col :span="5">{{ schedule.title }}</el-col>
            <el-col :span="5" :push="10">
              <el-button type="primary" round @click="submitApplication"
                v-if="schedule.applicationState === 'UNAPPLY'">申请组队</el-button>
              <el-tag type="success" v-if="schedule.applicationState === 'APPROVE'"><i
                  class="el-icon-check">申请通过</i></el-tag>
              <el-tag type="danger" v-if="schedule.applicationState === 'REJECT'"><i
                  class="el-icon-close">申请被拒绝</i></el-tag>
              <el-tag type="success" v-if="schedule.applicationState === 'UNCHECK'"><i
                  class="el-icon-video-play">申请审核中</i></el-tag>
            </el-col>

          </el-row>
          <el-row style="line-height: 16px;text-align: justify;font-family: 'Courier New', Courier, monospace;">
            {{ schedule.description }}
          </el-row>
        </el-row>
        <el-row class="detail" style="text-align: justify;">
          {{ schedule.details }}
        </el-row>

      </el-card>

    </el-col>

  </el-row>

</template>

<script>


import Stomp from 'stompjs';

export default {

  name: 'Detail',
  data() {
    return {

      schedule: {}

    }
  },
  mounted() {

    //this.connect();
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    this.getFetch("http://127.0.0.1:8081/api/schedule/" + this.$route.params.scheduleId + "?uid=" + user.uid, token)
      .then((data) => { this.schedule = data.data; });
    //data.data 刚开始没写 我还奇怪数据库就两条数据，为什么给我渲染了三条
    //刚开始用的axios，但是不知道为什么报跨域的错误，我后端已经配置了
    //然后试了一下fetch可以，不过我fetch写的是127.0.0.1,axios写的是localhost是这个原因吗？
  },
  methods: {
    submitApplication() {
      const user = JSON.parse(localStorage.getItem('user'))
      const token = user.accessToken;
      const body = {
        scheduleId: parseInt(this.$route.params.scheduleId),
        uid: user.uid
      }

      this.postFetch('http://127.0.0.1:8081/api/application', token, body).then(data => {
        console.log(data);
        if (data.code === '000') {


          this.$message({
            message: '成功提交申请！',
            type: 'success'
          });
        }
      })
    },
    connect(){
      let socket = new WebSocket('ws://127.0.0.1:8081/lvyou-websocket');
    var stompClient = Stomp.over(socket);
    stompClient.connect({}, frame => {
        console.log('Connected: ' + frame);
        const payload = { message: 'Hello, Server!' };
        stompClient.send('/app/hello', {}, JSON.stringify(payload));
        // 连接成功后订阅主题
        stompClient.subscribe('/topic/greetings', message => {
            console.log('Received: ' + message.body);
        });
    }, error => {
        console.error('Error connecting: ' + error);
    });
    }

  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-header {
  line-height: 50px;
  text-align: justify;
  border-bottom-color: #e2dede;
  border-bottom-width: 0.8px;
  border-bottom-style: solid;
}

.detail {
  margin-top: 20px;
  line-height: normal;
}

.el-card {
  padding-bottom: 50px;
  margin-bottom: 50px;
}

.card-image {
  line-height: 350px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom-color: #e2dede;
  border-bottom-width: 0.8px;
  border-bottom-style: solid;
}

.card-content {
  line-height: 80px;
}

.el-carousel__item {
  opacity: 1.0;
  margin: 0;

}

.el-tag {
  font-size: medium;
}
</style>