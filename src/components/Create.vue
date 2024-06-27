<template>
  <el-col :span="14" :offset="4">
    <el-card style="text-align: justify;margin-top: 50px;">
      <el-steps :active="active" simple>
        <el-step title="上传封面" icon="el-icon-picture"></el-step>
        <el-step title="编辑信息" icon="el-icon-edit"></el-step>


      </el-steps>


      <el-form ref="form" :model="form" label-width="80px">
        <div v-show="active === 1">
          <el-upload class="upload" :on-success="handleSuccess" drag action="/api/uploadScheduleImage" multiple style="text-align: center;margin-top: 100px;">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
        <div v-show="active === 2">
          <el-form-item label="标题" style="margin-top: 50px;">
            <el-input v-model="form.title" size="small"></el-input>
          </el-form-item>
          <el-form-item label="目的地">
            <el-input v-model="form.destination"></el-input>
          </el-form-item>
          <el-form-item label="描述" >
            <el-input v-model="form.description" placeholder="一句话描述行程"></el-input>
          </el-form-item>
          <el-form-item label="出发地">
            <el-input v-model="form.departLocation"></el-input>
          </el-form-item>
          <el-form-item label="出发时间">
            <el-col :span="11">
              <el-date-picker v-model="form.departAt" type="datetime" placeholder="选择日期时间">
              </el-date-picker>

            </el-col>

          </el-form-item>
          <el-form-item label="队伍人数">
            <el-input-number v-model="form.maxNumber" :min="1" :max="1000"
              label="队伍人数"></el-input-number>
          </el-form-item>
          <el-form-item label="详情">
            <el-input type="textarea" v-model="form.details" autosize></el-input>
          </el-form-item>
         
        </div>
      </el-form>
      <el-button v-if="active < 2" class="button"  @click="next">下一步</el-button>
      <el-row v-if="active > 1"  style="text-align: end;">
        
          <el-button  type="primary" @click="onSubmit">立即创建</el-button>
      <el-button   @click="pre">上一步</el-button>
        
      </el-row>
      
    </el-card>
  </el-col>
</template>
<script>


export default {
  name: 'Create',
  data() {
    return {
      active: 1,
      form: {
        title: '',
        destination: '',
        description: '',
        departAt: '',
        maxNumber: '',
        departlocation: '',
        details: '',
        images: {}
      },
      
    }
  },
  methods: {
    handleSuccess(resp){
      //console.log(resp.data.image1)
      const length = Object.keys(this.form.images).length;
      this.form.images[length+1] = resp.data.image1;
      //this.form.images[](resp.data)
      console.log(this.form.images);
    },
    next() {
      if (this.active++ > 1) this.active = 1
    },

    pre() {
      if (this.active-- < 2) this.active = 1
    },

    onSubmit() {
      const user = JSON.parse(localStorage.getItem('user'))
      const token = user.accessToken;

      this.postFetch("/api/schedule",token,this.form)
      .then(res => {
          console.log(res);
          if (res.code === '000') {
            this.$router.replace('/home')

            this.$message({
              message: '创建行程成功！',
              type: 'success'
            });

          }
        })

      // let requestInstance = new Request('/api/schedule', {
      //   method: 'post',
      //   headers: {
      //     'Content-Type': 'application/json;charset=utf-8',
      //     'Authorization': token
      //   },
      //   body: JSON.stringify(this.form)
      // })
      // fetch(requestInstance).then(response => {

      //   let result = response.json()
        
      // })
    }
  }
}
</script>

<style scoped>
.button{
  margin-top: 129px;
  margin-left: 569px;

}
</style>