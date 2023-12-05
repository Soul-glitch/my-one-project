<script setup>
import {ref, reactive, computed} from 'vue';
import {EditPen, Lock, Message} from "@element-plus/icons-vue";
import {get, post} from "@/net";
import {ElMessage} from "element-plus";
import router from "@/router";

const active = ref(0)
const coldTime = ref(0)
const formRef = ref()


const form = reactive({
  email: '',
  code: '',
  password: '',
  password_repeat: '',
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

const rules = {
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

//判断邮箱
const isEmailValid = computed(() => /^[\w-]+(.[\w-]+)*@[\w-]+(.[\w-]+)+$/.test(form.email))

function confirmReset(){
  formRef.value.validate((valid)=>{
    if(valid){
      post('/api/auth/reset-confirm',{
        email: form.email,
        code:form.code
      },()=>{
        active.value++
      })
    }
  })
}

function doRest(){
  formRef.value.validate((valid)=>{
    if(valid){
    post('/api/auth/reset-password',{...form},()=>{
      ElMessage.success('The password was reset successfully')
      router.push('/')
      active.value++
    })
    }
  })
}

</script>

<template>
  <div style="text-align: center">
    <div style="margin-top: 30px;font-size: 14px">
      <el-steps :active="active" finish-status="success" align-center>
        <!--        验证电子邮件-->
        <el-step title="Verify email"></el-step>
        <el-step title="Reset password"></el-step>
      </el-steps>
    </div>
    <div style="margin: 0 20px" v-if="active===0">
      <div style="margin-top: 80px">
        <div style="font-size: 25px;font-weight: bold">Reset password</div>
        <div style="font-size:14px;color: grey">Please enter the email address where you want to reset your password
        </div>
      </div>
      <div style="margin-top: 50px">
        <el-form :model="form"  :rules="rules" ref="formRef">
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
                <el-button @click="askCode" :disabled="!isEmailValid||coldTime>0" type="success">
                  <!--冷却时间大于0 显示getcode 否则try again in...-->
                  {{ coldTime > 0 ? `again in ${coldTime} seconds` : 'get code' }}
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
      <div style="margin-top: 80px">
        <el-button @click="confirmReset" style="width: 270px" type="warning" plain>Reset your password</el-button>
      </div>
    </div>
    <div style="margin: 0 20px" v-if="active===1">
      <div style="margin-top: 80px">
        <div style="font-size: 25px;font-weight: bold">Reset password</div>
        <div style="font-size:14px;color: grey">Please fill in your new password</div>
      </div>
      <div style="margin-top: 50px">
        <el-form :model="form" :rules="rules" ref="formRef">
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
        </el-form>
      </div>
      <div style="margin-top: 80px">
        <el-button @click="doRest" style="width: 270px" type="danger" plain>Reset password immediately</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>