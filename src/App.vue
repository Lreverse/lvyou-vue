<template>
  <router-view/>
 

 
 

</template>

<script>
import PageContainer from './components/PageContainer.vue';

export default {
  name: 'App',
  components:{
    
  }
}
</script>

<style>
html,body,#app{
  margin: 0;
  padding: 0;
  height:100%;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

a{
  text-decoration: none;
  color: black;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
