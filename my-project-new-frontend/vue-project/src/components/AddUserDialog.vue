<script setup>
import {ref, reactive} from 'vue'
import {ElMessage} from "element-plus";
import {get, post} from "@/net";
import {useDataStore} from "@/stores/table";

const centerDialogVisible = ref(false)
const formRef = ref()

const form = reactive({
  username: '',
  password: '123456',
  email: '',
  role: '',
  registerTime: Date.now(),
})

function getNowTime(){  //时间获取
  const yy = new Date().getFullYear()
  const MM = (new Date().getMonth() + 1) < 10 ? '0' + (new
  Date().getMonth() + 1) : (new Date().getMonth() + 1)
  const dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new
  Date().getDate()
  const HH = new Date().getHours() < 10 ? '0' + new Date().getHours() : new
  Date().getHours()
  const mm = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() :
      new Date().getMinutes()
  const ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() :
      new Date().getSeconds()
  console.log(yy + '-' + MM + '-' + dd + ' ' + HH + ':' + mm + ':' + ss+".0000")
  return  yy + '-' + MM + '-' + dd + ' ' + HH + ':' + mm + ':' + ss;
}

const validateUsername = (rule, value, callback) => { //用户名校验规则
  if (value === '') {
    callback(new Error('Please enter a username'))
  } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value)) {
    callback(new Error('Usernames cannot contain special characters')) //用户名不能包含特殊字符
  } else {
    callback()
  }
}
//表单规则校验
const rules = {
  username: [ //用户名
    {required: true, validator: validateUsername, trigger: ['blur', 'change']},
    {min: 1, max: 10, message: 'The username must be between 2-8 characters long', trigger: ['blur', 'change']}
  ],
  password: [  //密码
    {required: true, message: 'Please enter your password', trigger: 'blur'},//密码必须输入
    {min: 6, max: 20, message: 'The password must be between 6-20 characters long', trigger: ['blur', 'change']}
  ],
  email: [
    {required: true, message: 'Please enter your email address', trigger: 'blur'},
    {max: 20, type: 'email', message: 'Please enter a valid email address', trigger: ['blur', 'change']}
  ]
}

function getTableData() {
  get('/api/user/data', function (data) {
    // console.log(data);
    useDataStore().increment(data);
  })
}

function addUser() {
  console.log(form.registerTime)
  formRef.value.validate((valid) => {
    if (valid) {
      post('/api/user/adduser',{...form},()=>{
        ElMessage('添加用户信息成功')
      })
      centerDialogVisible.value = false
    } else  ElMessage.warning("请将表单填写完整")
  })
}
getTableData()
</script>

<template>
  <el-button type="primary" @click="centerDialogVisible = true">
    添加用户信息
  </el-button>
  <el-dialog
      v-model="centerDialogVisible"
      title="添加用户信息"
      width="50%"
      align-center
  >
    <div style="margin-right: 20px">
      <!--      表单内容-->
      <el-form :model="form" label-width="100px" :rules="rules" ref="formRef">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="用户类别">
          <el-select v-model="form.role" placeholder="选择用户类别">
            <el-option label="普通用户" value="user"/>
            <el-option label="管理员" value="admin"/>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
              v-model="form.registerTime"
              type="date"
              placeholder="选择一个时间"
              style="width: 100%"
          />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addUser">
          添加信息
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>