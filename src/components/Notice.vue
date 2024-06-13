<template>
    <el-col :span="14" :offset="2">
        <el-card v-for="notice in notices" :key="notice">
            <el-row class="header">
                <el-col :span="8">
                    <router-link :to="{ path: `/profile/${JSON.parse(notice.createdBy).username}` }"><el-avatar :src="JSON.parse(notice.createdBy).avatarSrc"></el-avatar></router-link>
                    <span id="username"
                        style="position:absolute;margin-left:10px;font-size: 16px;font-weight: bold;font-family: 'Courier New', Courier, monospace;">
                        {{JSON.parse(notice.createdBy).username}}
                    </span>

                </el-col>
                <el-col :span="6" :offset="10">
                    <span style="font-size: smaller;font-weight: bold;font-family: 'Courier New', Courier, monospace;">{{notice.createdAt.toString().replace("T",' ')}}</span>
                </el-col>
            </el-row>
            <el-row class="content">
                申请加入<b><router-link :to="{ path: `/detail/${notice.scheduleId}` }">{{notice.scheduleTitle}}</router-link></b>
            </el-row>
            <el-row class="operation">
                
               <el-tag type="success" v-if="notice.state === 'APPROVE'"><i class="el-icon-check">已同意</i></el-tag>
               <el-tag type="danger" v-if="notice.state === 'REJECT'"><i class="el-icon-close">已拒绝</i></el-tag>
                <el-button type="success" v-if="notice.state === 'UNCHECK'">同意</el-button>
                <el-button type="danger" v-if="notice.state === 'UNCHECK'">拒绝</el-button>
            </el-row>
        </el-card>
    </el-col>


</template>

<script>


export default {
    name: 'Notice',
    data() {
        return {
            notices: [],
            createdBy:{}
        }
    },
    mounted(){
        const user = JSON.parse(localStorage.getItem('user'))
        const token = user.accessToken;
        this.getFetch("http://127.0.0.1:8081/api/application" + "?uid=" + user.uid, token)
      .then((data) => { this.notices = data.data;});
      
    }
}
</script>

<style scoped>
.header,
.content {
    line-height: 30px;
    text-align: justify;
    margin-bottom: 10px;
}

.operation {
    line-height: 30px;
    text-align: right;
}
</style>