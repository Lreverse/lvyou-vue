<template>
    <el-col :span="14" :offset="2">
        <el-empty v-if="notices.length === 0"></el-empty>
        <el-card v-for="(notice, index) in notices" :key="index" v-show="notice.role != 'OWNER'">
            
            <div v-if="notice.applyId && notice.uid != uid">
                <el-row class="header">
                    <el-col :span="8">
                        <router-link :to="{ path: `/profile/${notice.createdBy.username}` }"><el-avatar
                                :src="notice.createdBy.avatarSrc"></el-avatar></router-link>
                        <span id="username"
                            style="position:absolute;margin-left:10px;font-size: 16px;font-weight: bold;font-family: 'Courier New', Courier, monospace;">
                            {{ notice.createdBy.username }}
                        </span>

                    </el-col>
                    <el-col :span="6" :offset="10">
                        <span
                            style="font-size: smaller;font-weight: bold;font-family: 'Courier New', Courier, monospace;">{{
                                notice.createdAt.toString().replace("T", ' ')}}</span>
                    </el-col>
                </el-row>
                <el-row class="content">
                    申请加入<b><router-link :to="{ path: `/detail/${notice.scheduleId}` }">{{ notice.scheduleTitle}}</router-link></b>
                </el-row>
                <el-row class="operation">

                    <el-tag type="success" v-if="notice.state === 'APPROVE'"><i class="el-icon-success" >已同意</i></el-tag>
                    <el-tag type="danger" v-if="notice.state === 'REJECT'"><i class="el-icon-error" >已拒绝</i></el-tag>
                    <el-button type="success" v-if="notice.state === 'UNCHECK'" @click="approve(notice)">同意</el-button>
                    <el-button type="danger" v-if="notice.state === 'UNCHECK'" @click="reject(notice)">拒绝</el-button>
                </el-row>
            </div>
            <div v-if="!notice.applyId ">
                <el-row class="header">
                    <el-col :span="4" style="margin-left: 4px;color: #67C23A;"><i>系统通知</i></el-col>
                    <el-col :span="6" :push="14">
                        <span
                            style="font-size: smaller;font-weight: bold;font-family: 'Courier New', Courier, monospace;">{{
                                notice.createdAt.toString().replace("T", ' ')}}</span>
                    </el-col>
                </el-row>
                <el-row class="text">
                    <span>您已加入<b><router-link :to="{ path: `/detail/${notice.scheduleId}` }" style="color: #409EFF;">{{ notice.scheduleTitle }}</router-link></b>的队伍</span>
                </el-row>
                
            </div>
            <div v-if="(notice.applyId && notice.uid === uid)">
                <el-row class="header">
                    <el-col :span="4" style="margin-left: 4px;color: #F56C6C;"><i>系统通知</i></el-col>
                    <el-col :span="6" :push="14">
                        <span
                            style="font-size: smaller;font-weight: bold;font-family: 'Courier New', Courier, monospace;">{{
                                notice.createdAt.toString().replace("T", ' ')}}</span>
                    </el-col>
                </el-row>
                <el-row class="text">
                    <span>您申请加入<b><router-link :to="{ path: `/detail/${notice.scheduleId}` }" style="color: #409EFF;">{{ notice.scheduleTitle }}</router-link></b>的队伍被拒绝</span>
                </el-row>
                
            </div>

        </el-card>
    </el-col>


</template>

<script>


export default {
    name: 'Notice',
    data() {
        return {
            notices: [],
            createdBy: {},
            uid: ''
        }
    },
    mounted() {
        this.uid = JSON.parse(localStorage.getItem('user')).uid;
        console.log(this.uid);
        const user = JSON.parse(localStorage.getItem('user'))
        const token = user.accessToken;
        this.getFetch("http://127.0.0.1:8081/api/notice" + "?uid=" + user.uid, token)
            .then((data) => { this.notices = data.data; console.log(this.notices)});

    },
    methods: {
        approve(notice){
             const body = notice;
             body.state = 'APPROVE';
            this.Fetch("http://127.0.0.1:8081/api/application","token",body,"put")
            .then((data) => {
                console.log(data)
            })
            //console.log(notice);
        },
        reject(notice){
            const body = notice;
            body.state = 'REJECT';
            this.Fetch("http://127.0.0.1:8081/api/application","token",body,"put")
            .then((data) => {
                console.log(data)
            })
        }
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
.el-card{
    margin-bottom: 30px;
}
.text{
    margin-left: 4px;
    text-align: justify;
    margin-bottom: 30px;
}

</style>