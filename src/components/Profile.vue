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
                                            <el-upload class="avatar-uploader" :action="uploadAvatar"
                                                :on-success="handleAvatarSuccess" :show-file-list="false">

                                                <i class="el-icon-plus avatar-uploader-icon">&nbsp;点击上传头像</i>
                                            </el-upload>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col class="username" :span="4" :offset="2">
                                    <h1 style="font-size: larger;"> <b>{{ user.username }}</b></h1>
                                </el-col>
                                <el-col class="change_cover" :span="4" :offset="7">
                                    <!--标签属性里不允许出现引号和空格-->
                                    <el-upload :action="uploadCover" :on-success="handleCoverSuccess"
                                        :show-file-list="false">
                                        <el-button type="primary" class="el-button-semi-transparent">设置封面</el-button>
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
                <el-tab-pane label="我管理的行程">
                    <el-empty v-show="schedulesIAdmin.length === 0"></el-empty>
                    <el-card v-for="(schedule, index) in schedulesIAdmin" :key="index"
                        style="margin-bottom: 10px;margin: 20px 20px 20px 20px;background-color: azure;">
                        <el-row class="header">
                            <el-col :span="8">
                                <el-avatar :src="schedule.userBO.avatarSrc"></el-avatar>
                                <span id="username"
                                    style="position:absolute;margin-left:10px;font-size: 16px;font-weight: bold;font-family: 'Courier New', Courier, monospace;">
                                    {{ schedule.userBO.username }}
                                </span>

                            </el-col>

                        </el-row>
                        <el-row class="content">
                            <b>
                                {{ schedule.title }}
                            </b>
                        </el-row>
                        <el-row class="description">


                            {{ schedule.description }}
                            <div style="text-align: end;">
                                <el-button type="primary"
                                    @click="dialogForm1Visible = true, getSchedule(schedule.scheduleId)">修改信息</el-button>
                                <el-button type="primary"
                                    @click="dialogTableVisible = true, getMember(schedule.scheduleId)">成员管理</el-button>
                            </div>


                        </el-row>

                    </el-card>
                    <el-dialog title="行程信息" :visible.sync="dialogForm1Visible" >
                        <el-form :model="form" label-position="right" style="margin-right: 60px;">
                            <el-form-item label="标题" :label-width="formLabelWidth">
                                <el-input v-model="form.title"></el-input>
                            </el-form-item>
                            <el-form-item label="目的地" :label-width="formLabelWidth">
                                <el-input v-model="form.destination"></el-input>
                            </el-form-item>
                            <el-form-item label="描述" :label-width="formLabelWidth">
                                <el-input v-model="form.description" placeholder="一句话描述行程"></el-input>
                            </el-form-item>
                            <el-form-item label="出发地" :label-width="formLabelWidth">
                                <el-input v-model="form.departLocation"></el-input>
                            </el-form-item>
                            <el-form-item label="出发时间" :label-width="formLabelWidth">

                                <el-date-picker v-model="form.departAt" type="datetime" placeholder="选择日期时间">
                                </el-date-picker>



                            </el-form-item>
                            <el-form-item label="队伍人数" :label-width="formLabelWidth">
                                <el-input-number v-model="form.maxNumber" :min="1" :max="1000"
                                    label="队伍总人数"></el-input-number>
                            </el-form-item>
                            <el-form-item label="当前人数" :label-width="formLabelWidth">
                                <el-input v-model="form.currentNumber" :disabled="true" style="width: 30%;"></el-input>
                            </el-form-item>
                            <el-form-item label="队伍状态" :label-width="formLabelWidth">
                                <el-switch v-model="state" active-text="接受申请" inactive-text="对外关闭"
                                    v-if="form.currentNumber < form.maxNumber">
                                </el-switch>
                                <el-switch v-model="state" v-else active-text="接受申请" inactive-text="对外关闭"
                                    disabled></el-switch>
                            </el-form-item>
                            <el-form-item label="详情" :label-width="formLabelWidth">
                                <el-input type="textarea" v-model="form.details" autosize></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogForm1Visible = false">取 消</el-button>
                            <el-button type="primary"
                                @click="dialogForm1Visible = false, submitSchedule(form)">确认修改</el-button>
                        </div>
                    </el-dialog>
                    <el-dialog title="队伍成员" :visible.sync="dialogTableVisible" width="70%">
                        <el-table :data="tableData" style="width: 100%" border>
                            <el-table-column prop="username" label="头像" width="120">
                                <template slot-scope="scope">
                                    <el-avatar :src="scope.row.avatarSrc"></el-avatar>
                                    <el-tag type="success" v-if="scope.row.username === user.username"
                                        style=" left: 10px;top: -12px;position: relative;">我</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column prop="username" label="用户名" width="180">
                            </el-table-column>
                            <el-table-column prop="joinAt" label="加入时间" width="180">
                                <template slot-scope="scope">{{ scope.row.joinAt.toString().replace('T', ' ')
                                    }}</template>
                            </el-table-column>
                            <el-table-column prop="role" label="权限">
                                <template slot-scope="scope">
                                    <div v-show="scope.row.role === 'OWNER'">创建者</div>
                                    <div v-show="scope.row.role === 'ADMIN'">管理员</div>
                                    <div v-show="scope.row.role === 'USER'">普通成员</div>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="200">
                                <template slot-scope="scope">
                                    <el-button size="small" v-if="scope.row.role === 'USER'"
                                        @click="handleEdit(scope.$index, scope.row)">设置为管理员</el-button>
                                    <el-button size="mini" type="danger"
                                        @click="handleDelete(scope.$index, scope.row)" v-show="!(scope.row.role === 'OWNER' || scope.row.role === 'ADMIN' || scope.row.username === user.username)">移除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-row style="margin-top: 30px;text-align: justify;">
                            <el-col :span="20" :push="5">
                                <span style="margin-right: 60px;"><b>添加成员</b></span>
                                <el-autocomplete v-model="username" :fetch-suggestions="querySearch" @select="handleSelect"
                            label="添加成员"
                            placeholder="根据用户名或邮箱搜索"
                            style="margin-right: 120px;"
                            >
                        </el-autocomplete>
                            <el-button type="primary" @click="addUser">添加成员</el-button>
                            </el-col>
                            
                            
                        </el-row>
                        
                    </el-dialog>
                </el-tab-pane>
                <el-tab-pane label="我参加的行程">
                    <el-empty v-show="schedulesIJoin.length === 0"></el-empty>
                    <el-card v-for="(schedule, index) in schedulesIJoin" :key="index"
                        style="margin-bottom: 10px;margin: 20px 20px 20px 20px;background-color: azure;">
                        <el-row class="header">
                            <el-col :span="8">
                                <el-avatar :src="schedule.userBO.avatarSrc"></el-avatar>
                                <span id="username"
                                    style="position:absolute;margin-left:10px;font-size: 16px;font-weight: bold;font-family: 'Courier New', Courier, monospace;">
                                    {{ schedule.userBO.username }}
                                </span>

                            </el-col>

                        </el-row>
                        <el-row class="content">
                            <b>
                                {{ schedule.title }}
                            </b>
                        </el-row>
                        <el-row class="description">

                            {{ schedule.description }}

                        </el-row>
                    </el-card>
                </el-tab-pane>
               
            </el-tabs>
        </el-col>

    </el-col>

</template>

<script>
export default {
    name: 'Profile',
    data() {
        return {
            options: [],
            uploadAvatar: '',
            uploadCover: '',
            user: {},
            schedulesIJoin: [],
            schedulesIAdmin: [],
            tableData: [],
            dialogForm1Visible: false,
            dialogTableVisible: false,
            form: {
                title: '',
                destination: '',
                description: '',
                departAt: '',
                maxNumber: '',
                currentNumber: '',
                departlocation: '',
                details: '',
                state: ''
            },
            formLabelWidth: '120px',
            state: '',
            scheduleId: '',
            username: '',
            //loading: false

        }
    },
    mounted() {

        const user = JSON.parse(localStorage.getItem('user'))
        const uid = user.uid;
        const token = user.accessToken;

        this.getFetch("/api" + this.$route.path, "token")
            .then((data) => { this.user = data.data; });
        this.uploadAvatar = "/api/uploadAvatar?uid=" + uid;
        this.uploadCover = "/api/uploadCover?uid=" + uid;

        this.getFetch("/api/schedule/mySchedule/" + uid, token)
            .then(data => {
                this.schedulesIJoin = data.data.user;
                this.schedulesIAdmin = data.data.admin;
                //console.log(this.schedulesIAdmin);
                //console.log(data);
            })
    },
    computed: {

    },
    methods: {
        addUser(){
            if(this.username === '') return;
            const body = {
                username: this.username,
                scheduleId: this.scheduleId
            }
            this.postFetch("/api/join","token",body)
            .then(data =>{
                console.log(data);
                if(data.code === '000'){
                    this.getMember(this.scheduleId);
                    this.$message({
                            message: '添加成功~',
                            type: 'success'

                        });
                        this.username = '';
                }else if(data.code === 'B001'){
                    this.$message({
                            message: '该成员已在队伍中~',
                            type: 'warning'

                        });
                        this.username = '';
                }
                
            })
        },
        handleSelect(item){
            console.log(item);
            this.username = item.value;
        },
        querySearch(query, callback) {
            if (query != null && query.length != 0) {
                
                this.getFetch("/api/query/"+query, "token")
                    .then(data => {
                        const list = [];
                        for (let v of data.data) {
                            list.push({ value: v.username })
                        }
                        callback(list)
                    })
            }
        },
        handleEdit(index, row) {
            const user = JSON.parse(localStorage.getItem('user'))
            const uid = user.uid;
            const token = user.accessToken;
            const username = row.username;
            console.log(this.scheduleId);
            const scheduleId = this.scheduleId;
            this.Fetch("/api/join/member?username=" + username + "&scheduleId=" + scheduleId, "token", {}, "put")
                .then(data => {
                    console.log(data);
                    this.getMember(this.scheduleId);
                })

        },
        handleDelete(index, row) {
            const user = JSON.parse(localStorage.getItem('user'))
            const uid = user.uid;
            const token = user.accessToken;
            const username = row.username;
            const scheduleId = this.scheduleId;
            this.Fetch("/api/join/member?username=" + username + "&scheduleId=" + scheduleId, "token", {}, "delete")
                .then(data => {
                    console.log(data);
                    this.getMember(this.scheduleId);
                })
        },

        getMember(scheduleId) {
            const user = JSON.parse(localStorage.getItem('user'))
            const uid = user.uid;
            const token = user.accessToken;
            this.scheduleId = scheduleId;

            this.getFetch("/api/schedule/member/" + scheduleId, token)
                .then(data => {
                    this.tableData = data.data;
                })
        },
        submitSchedule(form) {
            const user = JSON.parse(localStorage.getItem('user'))
            const uid = user.uid;
            const token = user.accessToken;

            if (this.state == true) {
                form.state = 'OPEN';
            } else {
                form.state = 'CLOSE';
            }

            this.Fetch("/api/schedule", token, form, "put")
                .then(data => {
                    if (data.code === '000') {
                        this.$message({
                            message: '修改成功~',
                            type: 'success'

                        });
                    }
                    //console.log(data);
                })
        },
        getSchedule(scheduleId) {
            const user = JSON.parse(localStorage.getItem('user'))
            const uid = user.uid;
            const token = user.accessToken;
            this.getFetch("/api/schedule/scheduleInfo/" + scheduleId, token)
                .then((data) => {
                    console.log(data);
                    this.form = data.data;
                    if (this.form.state == 'OPEN') {
                        this.state = true;
                    } else {
                        this.state = false;
                    }
                })
        },
        handleAvatarSuccess(resp) {
            // console.log(resp);
            // console.log(file);
            this.user.avatarSrc = resp.data;
            localStorage.setItem('user', JSON.stringify(this.user));
            this.$message({
                message: '上传成功~',
                type: 'success'

            });
        },
        handleCoverSuccess(resp) {
            // console.log(resp);
            // console.log(file);
            this.user.coverSrc = resp.data;
            localStorage.setItem('user', JSON.stringify(this.user));
            this.$message({
                message: '上传成功~',
                type: 'success'

            });
        }
    }
}
</script>

<style scoped>
.el-form-item {
    text-align: justify;
}

/* 半透明背景的按钮 */
.el-button-semi-transparent {
    background-color: rgba(0, 0, 0, 0.5);
    /* 背景颜色和透明度 */
    border-color: rgba(0, 0, 0, 0.5);
    /* 边框颜色和透明度 */
    color: white;
    /* 文字颜色 */
}

/* 当鼠标悬停在按钮上时，可以保持透明度或改变 */
.el-button-semi-transparent:hover {
    background-color: rgba(0, 0, 0, 0.6);
    /* 可以调整透明度 */
    border-color: rgba(0, 0, 0, 0.6);
    /* 可以调整透明度 */
}

/* 当按钮被激活（按下）时，也可以保持透明度或改变 */
.el-button-semi-transparent:active {
    background-color: rgba(0, 0, 0, 0.7);
    /* 可以调整透明度 */
    border-color: rgba(0, 0, 0, 0.7);
    /* 可以调整透明度 */
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

.content,
.description,
.header {
    text-align: justify;
    margin-bottom: 10px;
}
</style>