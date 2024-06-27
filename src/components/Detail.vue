<template>

  <el-row>
    <el-col :span="14" :offset="2">
      <el-card :body-style="{ padding: '15px' }">

        <el-row class="card-header">
          <el-col>
            <el-avatar :src="schedule.user.avatarSrc"></el-avatar>
            <span id="username"
              style="position:absolute;margin-left:10px;font-size: 16px;font-weight: bold;font-family: 'Courier New', Courier, monospace;">
              {{ schedule.user.username }}
            </span>
          </el-col>
        </el-row>
        <el-row class="card-image" v-show="JSON.stringify(schedule.images) !== '{}'">
          <el-col>

            <div class="block">
              <el-carousel trigger="click" indicator-position="none" :autoplay="false">
                <el-carousel-item v-for="(value, key, index) in this.schedule.images" :key="index">
                  <div style="height: 100%;"><img style="height: 100%;" :src="value" alt=""></div>

                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>

        </el-row>
        <el-row class="card-content">
          <el-row
            style="line-height: 34px;margin-top: 35px;margin-bottom:10px;text-align: justify;font-size: large;font-weight: bold;">
            <el-col :span="6">{{ schedule.title }}</el-col>
            <el-col :span="5" :push="13" v-if="uid != schedule.createdBy">
              <el-button type="primary" round @click="submitApplication"
                v-if="(schedule.applicationState === 'UNAPPLY' || schedule.applicationState === 'REJECT')&& schedule.state === 'OPEN'">申请组队</el-button>

              <el-tag type="success"
                v-if="schedule.applicationState === 'INVITED' || schedule.applicationState === 'APPROVE'"><i
                  class="el-icon-success">已加入队伍</i></el-tag>
              <el-tag type="danger" v-if="schedule.state === 'CLOSE'"><i
                  class="el-icon-error">队伍已关闭</i></el-tag>
              <el-tag type="success" v-if="schedule.applicationState === 'UNCHECK'"><i
                  class="el-icon-video-play">申请审核中</i></el-tag>
            </el-col>

          </el-row>
          <el-row style="line-height: 16px;text-align: justify;font-family: 'Courier New', Courier, monospace;">
            {{ schedule.description }}
          </el-row>
          <el-row style="text-align: justify;">
            <el-descriptions class="margin-top" title="行程信息" :column="3" :size="size" border>
              
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-user"></i>
                  创建者
                </template>
                {{schedule.user.username}}
              </el-descriptions-item>
              <!-- <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-mobile-phone"></i>
                  手机号
                </template>
                18100000000
              </el-descriptions-item> -->
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-location-outline"></i>
                  目的地
                </template>
                {{schedule.destination}}
              </el-descriptions-item>
              <!-- <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  备注
                </template>
                <el-tag size="small">学校</el-tag>
              </el-descriptions-item> -->
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-office-building"></i>
                  出发地
                </template>
                {{schedule.departLocation}}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-watch"></i>
                  出发时间
                </template>
                {{schedule.departAt.toString().replace("T", ' ')}}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-user-solid"></i>
                  当前人数
                </template>
                {{schedule.currentNumber}}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-user-solid"></i>
                  队伍规模
                </template>
                {{schedule.maxNumber}}
              </el-descriptions-item>
            </el-descriptions>
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

      schedule: {},
      uid: ''

    }
  },
  mounted() {

    //this.connect();
    const user = JSON.parse(localStorage.getItem('user'));
    this.uid = user.uid;
    const token = user.accessToken;
    this.getFetch("/api/schedule/" + this.$route.params.scheduleId + "?uid=" + user.uid, token)
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

      this.postFetch('/api/application', token, body).then(data => {
        console.log(data);
        if (data.code === '000') {


          this.$message({
            message: '成功提交申请！',
            type: 'success'
          });
          this.schedule.applicationState = 'UNCHECK'
        }
      })
    },
    connect() {
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