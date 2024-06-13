<template>
    <el-col :span="20">
        <div class="panel">

            <div class="profile">


                <el-row class="profile_header">
                    <el-col :span="23" style="padding-left: 60px">
                        <el-card class="card">
                            <el-row class="header_cover">
                                <img id="user_cover" :src="user.coverSrc" alt="">
                            </el-row>
                            <el-row class="main_content">
                                <el-col :span="4" :offset="2">
                                    <div class="header_avatar">
                                        <img id="user_avatar" :src="user.avatarSrc" alt="">
                                        <div class="overlay">
                                            <el-upload class="avatar-uploader"
                                                :action="uploadAvatar"
                                                :on-success="handleAvatarSuccess"
                                                :show-file-list="false"
                                                >
                                                
                                                <i  class="el-icon-plus avatar-uploader-icon">&nbsp;点击上传头像</i>
                                            </el-upload>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col class="username" :span="4" :offset="2">
                                   <h1 style="font-size: larger;"> <b>{{user.username}}</b></h1>
                                </el-col>
                                <el-col class="change_cover" :span="4" :offset="7">
                                    <!--标签属性里不允许出现引号和空格-->
                                    <el-upload :action="uploadCover" :on-success="handleCoverSuccess" :show-file-list="false">
                                        <el-button type="primary"  class="el-button-semi-transparent">设置封面</el-button>
                                    </el-upload>

                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                </el-row>


            </div>
        </div>
        <el-col :span="23" style="padding-left: 60px">
            <el-tabs type="border-card" class="tab">
                <el-tab-pane label="我参加的行程">用户管理<br>aa<br>aa<br>aa<br>aa<br>aa<br>aa<br>aa<br>aa<br>aa<br>aa<br>aa<br>aa<br>aa<br>aa<br>aa<br>aa<br>aa</el-tab-pane>
                <el-tab-pane label="我发出的申请">配置管理</el-tab-pane>
                <el-tab-pane label="角色管理">角色管理</el-tab-pane>
                <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
            </el-tabs>
        </el-col>

    </el-col>

</template>

<script>
export default {
    name: 'Profile',
    data() {
        return {
            uploadAvatar:'',
            uploadCover: '',
            user: {}
        }
    },
    mounted(){
        this.getFetch("http://127.0.0.1:8081/api" + this.$route.path ,"token")
      .then((data) => { this.user = data.data; });
        this.uploadAvatar = "http://127.0.0.1:8081/api/uploadAvatar?uid=" + uid;
        this.uploadCover = "http://127.0.0.1:8081/api/uploadCover?uid=" + uid;
    },
    methods: {
        handleAvatarSuccess(resp){
            // console.log(resp);
            // console.log(file);
            this.user.avatarSrc = resp.data;
            localStorage.setItem('user',JSON.stringify(this.user));
            this.$message({
                    message: '上传成功~',
                    type: 'success'
                
                });
        },
        handleCoverSuccess(resp){
            // console.log(resp);
            // console.log(file);
            this.user.coverSrc = resp.data;
            localStorage.setItem('user',JSON.stringify(this.user));
            this.$message({
                    message: '上传成功~',
                    type: 'success'
                
                });
        }
    }
}
</script>

<style scoped>
/* 半透明背景的按钮 */
.el-button-semi-transparent {
  background-color: rgba(0, 0, 0, 0.5); /* 背景颜色和透明度 */
  border-color: rgba(0, 0, 0, 0.5); /* 边框颜色和透明度 */
  color: white; /* 文字颜色 */
}

/* 当鼠标悬停在按钮上时，可以保持透明度或改变 */
.el-button-semi-transparent:hover {
  background-color: rgba(0, 0, 0, 0.6); /* 可以调整透明度 */
  border-color: rgba(0, 0, 0, 0.6); /* 可以调整透明度 */
}

/* 当按钮被激活（按下）时，也可以保持透明度或改变 */
.el-button-semi-transparent:active {
  background-color: rgba(0, 0, 0, 0.7); /* 可以调整透明度 */
  border-color: rgba(0, 0, 0, 0.7); /* 可以调整透明度 */
}



.header_avatar {
    padding: 2px;
    width: 150px;
    background-color: whitesmoke;
    border-radius: 8px;
    height: 150px;
}

.tab {
    margin-top: 40px;
    border-radius: 8px;
}

.username {
    position: relative;
    top: 114px;
}

.change_cover {
    position: relative;
    top: 54px;
}

#user_cover {
    position: absolute;
    width: 100%;
    clip: rect(0px, 1408px, 300px, 0);
    border-radius: 8px;
    /*只能裁剪absolute的元素*/
    /*top:从原图上侧到要裁剪区域上侧的距离*/
    /*right：     左侧           右侧*/
    /*bottom：       上侧          下侧*/
    /*left：        左侧            左侧*/
}

#user_avatar {
    height: 150px;
    width: 150px;
    border-radius: 8px;


}


.card {
    height: 387px;
}

.main_content {
    position: relative;
    top: 186px;
}

.header_cover {
    text-align: justify;
}

.header_avatar {
    width: 150px;
    height: 150px;

    overflow: hidden;
    position: relative;
    display: inline-block;
    transition: all 0.3s ease;
}

.header_avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}



.header_avatar .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.header_avatar:hover .overlay {
    opacity: 1;
}


</style>