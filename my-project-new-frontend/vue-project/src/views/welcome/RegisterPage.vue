<script setup>
import {reactive, computed, ref} from "vue";
import {EditPen, Lock, Message, User} from "@element-plus/icons-vue";
import router from "@/router";
import {ElMessage} from "element-plus";
import {get, post} from "@/net";

//冷却时间
const coldTime = ref(0)
const formRef = ref()

const form = reactive({
  username: '',
  password: '',
  password_repeat: '',
  email: '',
  code: ''
})

const validatePassword = (rule, value, callback) => { //判断密码
  if (value === '') {
    callback(new Error('Please enter your password again'))
  } else if (value !== form.password) {
    callback(new Error('Inconsistencies between two password entries'))//两次输入的密码不一致
  } else {
    callback()
  }
}

const validateUsername = (rule, value, callback) => { //判断用户名
  if (value === '') {
    callback(new Error('Please enter a username'))
  } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value)) {
    callback(new Error('Usernames cannot contain special characters')) //用户名不能包含特殊字符
  } else {
    callback()
  }
}

//判断邮箱
const isEmailValid = computed(() => /^[\w-]+(.[\w-]+)*@[\w-]+(.[\w-]+)+$/.test(form.email))

//规则校验
const rules = {
  username: [ //用户名
    {validator: validateUsername, trigger: ['blur', 'change']},
    {min: 1, max: 10, message: 'The username must be between 2-8 characters long', trigger: ['blur', 'change']}
  ],
  password: [  //密码
    {required: true, message: 'Please enter your password', trigger: 'blur'},//密码必须输入
    {min: 6, max: 20, message: 'The password must be between 6-20 characters long', trigger: ['blur', 'change']}
  ],
  password_repeat: [ //重复密码
    {validator: validatePassword, trigger: ['blur', 'change']}
  ],
  email: [
    {required: true, message: 'Please enter your email address', trigger: 'blur'},
    {max: 20, type: 'email', message: 'Please enter a valid email address', trigger: ['blur', 'change']}
  ],
  code: [
    {required: true, message: 'Please enter the verification code you received', trigger: 'blur'},
  ]
}

function askCode() {  //获取验证码
  if (isEmailValid) {
    coldTime.value = 60
    get(`/api/auth/ask-code?email=${form.email}&type=register`, () => {
      ElMessage.success(`A verification code has been sent to ${form.email} mailbox`) //验证码发送成功
      setInterval(() => coldTime.value--, 1000) //每秒钟减去1
    }, (message) => {
      ElMessage.warning(message)
      coldTime.value = 0
    })
  } else {
    ElMessage.warning("Please enter a valid email！")
  }
}

function register(){
  //表单验证
  formRef.value.validate((valid)=>{
    if(valid){
      post('/api/auth/register',{...form},()=>{
        ElMessage('Registration is successful') //注册成功
        router.push('/')
      })
    }else {
      ElMessage.warning('Please fill out the form completely')  //请完整填写表单内容
    }
  })
}

</script>

<template>
  <div style="text-align: center;margin:0 20px">
    <div style="margin-top: 100px">
      <div style="font-size: 25px;font-weight: bold">Welcome to register</div>
      <div style="font-size: 14px;color: grey">Welcome to register on this website, please fill in the relevant
        information below
      </div>
    </div>
    <div style="margin-top: 50px">
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item prop="username">
          <el-input v-model="form.username" maxlength="10" type="text" placeholder="username">
            <template #prefix>
              <el-icon>
                <User/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" maxlength="20" type="password" placeholder="password">
            <template #prefix>
              <el-icon>
                <Lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password_repeat">
          <el-input v-model="form.password_repeat" maxlength="20" type="password" placeholder="Repeat the password">
            <template #prefix>
              <el-icon>
                <Lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="form.email" type="email" placeholder="email address">
            <template #prefix>
              <el-icon>
                <Message/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="40">
            <el-col :span="17">
              <el-input v-model="form.code" maxlength="6" typeof="text" placeholder="verification code">
                <template #prefix>
                  <el-icon>
                    <EditPen/>
                  </el-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="5">
              <el-button @click="askCode" :disabled="!isEmailValid||coldTime" type="success">
                <!--冷却时间大于0 显示getcode 否则try again in...-->
                {{ coldTime <= 0 ? 'get code' : `again in ${coldTime} seconds` }}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top: 80px">
      <el-button @click="register" style="width: 270px" type="warning" plain>Sign up</el-button>
    </div>
    <div style="margin-top: 20px">
      <span style="font-size: 14px;line-height: 15px;color: grey">have an account?</span>
      <el-link style="translate: 0 -1px" @click="router.push('/')">to sign in</el-link>
    </div>
  </div>
</template>

<style scoped>

</style>