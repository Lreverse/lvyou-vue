
<template>
   
    <el-row>
        <el-col :span="14" :offset="2">
            <el-card :body-style="{padding:'15px'}" v-for="schedule in schedules" :key="schedule.scheduleId">

                <el-row class="card-header">
                    <el-col>
                        <el-avatar
                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        <span id="username"
                            style="position:absolute;margin-left:10px;font-size: 16px;font-weight: bold;font-family: 'Courier New', Courier, monospace;">
                            {{schedule.userBO.username}}
                        </span>
                    </el-col>
                </el-row>
                <el-row class="card-image">
                    <el-col>
                      
                      <div class="block">
                            <el-carousel trigger="click" indicator-position="none" :autoplay=false>
                                <el-carousel-item   v-for="item in 4" :key="item" >
                                  <div style="height: 100%;"><img style="height: 100%;" src="../assets/palace.jpg" alt=""></div>
                                    
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </el-col>
                    
                </el-row>
                <el-row class="card-content">
                    <el-row style="line-height: 34px;margin-top: 10px;margin-bottom:10px;text-align: justify;font-size: large;font-weight: bold;">
                      <el-col :span="5"><router-link :to="{path: `/detail/${schedule.scheduleId}`}">{{schedule.title}}</router-link></el-col>
                     <el-col :span="5" :push="10"><el-tag>aaa</el-tag>&nbsp;<el-tag>aaa</el-tag></el-col>
                     
                    </el-row>
                    <el-row style="line-height: 16px;text-align: justify;font-family: 'Courier New', Courier, monospace;">
                      {{schedule.description}}
                    </el-row>
                </el-row>

            </el-card>

        </el-col>

    </el-row>

</template>
 
  <script>
         
  
  export default {


    
    name: 'Home',
    data () {
      return {
        schedules :null
      }
    },
    //TODO 详情页里后但返回的是schedule，没有用户名和头像
    //要么后端改 要么前端把信息传到后端
    methods:{

      beforeRouteLeave(to,from,next){
          
      }
    },
    mounted(){
      fetch("http://127.0.0.1:8081/api/schedule")
      .then(response => response.json())
      .then((data)=> this.schedules = data.data);
      //data.data 刚开始没写 我还奇怪数据库就两条数据，为什么给我渲染了三条
      //刚开始用的axios，但是不知道为什么报跨域的错误，我后端已经配置了
      //然后试了一下fetch可以，不过我fetch写的是127.0.0.1,axios写的是localhost是这个原因吗？
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   
   .card-header{
    line-height: 50px;
    text-align: justify;
    border-bottom-color: #e2dede;
    border-bottom-width: 0.8px;
    border-bottom-style: solid;
   }
 
   .el-card{
    height: 500px;
    margin-bottom: 50px;
   }
   .card-image{
    line-height: 350px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom-color: #e2dede;
    border-bottom-width: 0.8px;
    border-bottom-style: solid;
   }
   
    .card-content{
    line-height: 80px;
    }

   .el-carousel__item  {
    opacity: 1.0;
    margin: 0;
    
  }

</style>
  