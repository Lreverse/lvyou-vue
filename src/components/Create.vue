<template>
    <el-col :span="14" :offset="4">
    <el-card style="text-align: justify;margin-top: 100px;">
        <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="标题">
    <el-input v-model="form.title" size="small"></el-input>
  </el-form-item>
  <el-form-item label="目的地">
    <el-input v-model="form.destination"></el-input>
  </el-form-item>
  <el-form-item label="出发地">
    <el-input v-model="form.departLocation"></el-input>
  </el-form-item>
  <el-form-item label="出发时间">
    <el-col :span="11">
        <el-date-picker
      v-model="form.departAt"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
      
    </el-col>
    
  </el-form-item>
  <el-form-item label="队伍人数">
    <el-input-number v-model="form.maxNumber" @change="handleChange" :min="1" :max="1000" label="队伍人数"></el-input-number>
  </el-form-item>
  

  <el-form-item label="详情">
    <el-input type="textarea" v-model="form.details"></el-input>
  </el-form-item>
  <el-form-item style="margin-top: 65px;margin-left: 160px;">
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
    </el-card>
    </el-col>
</template>
<script>
import router from '../router';

export default {
  name: 'Create',
  data () {
    return {
        form: {
          title: '',
          destination: '',
          departAt: '',
          maxNumber: '',
          departlocation: '',
          details: ''
        }
    }
  },
  methods: {
    onSubmit(){
        const token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwianRpIjoiYmFmZWU4NTctYWViYi00ZDI4LTg1NTItMTdhMjI5ODY2OWU4IiwiZXhwIjoxNzE3OTA3MjgzLCJpYXQiOjE3MTc5MDU0ODMsImlzcyI6ImxpdXl1aGFuZyJ9.244iv5RSwCJe56K0bKmSQqE8GCd1Z2MHX7x6_Tb3xkY"
        let requestInstance = new Request('http://127.0.0.1:8081/api/schedule', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': token
                },
                body: JSON.stringify(this.form)
})
            fetch(requestInstance).then(response => {
                
                let result = response.json()
                result.then(res => {
                    console.log(res);
                    if(res.code === '000'){
                        this.$router.replace('/')

                        this.$message({
                             message: '创建行程成功！',
                            type: 'success'
                        });
                        
                    }
                })
            })
    }
  }
}
</script>

<style></style>