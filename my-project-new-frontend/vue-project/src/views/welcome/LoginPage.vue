<script setup>
import {reactive, ref} from "vue";
import {User, Lock} from '@element-plus/icons-vue'
import {login} from "@/net";
import router from "@/router";

const formRef = ref()

const form = reactive({
  username: '',
  password: '',
  remember: false
})

const rule = {
  username: [
    {required: true, message: 'Please enter a username'}
  ],
  password: [
    {required: true, message: 'Please enter your password'}
  ]
}
const userLogin = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      login(form.username, form.password, form.remember, () => {
        router.push('/index')
      })
    }
  })
}
</script>

<template>
  <div style="text-align: center;margin: 0 20px">
    <div style="margin-top: 150px">
      <div style="font-size: 25px;font-weight: bold">Login</div>
      <div style="font-size: 14px;color: grey">Enter your username and password to log in</div>
    </div>
    <div style="margin-top: 50px">
      <el-form :model="form" :rules="rule" ref="formRef">
        <el-form-item prop="username">
          <el-input v-model="form.username" maxlength="17" type="text" placeholder="username/email">
            <template #prefix>
              <el-icon>
                <Lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" maxlength="20" placeholder="password">
            <template #prefix>
              <el-icon>
                <User/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12" style="text-align: left">
            <el-form-item prop="remember">
              <el-checkbox v-model="form.remember" label="Remember me"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="text-align: right">
            <el-link @click="router.push('/reset')">Forgot password?</el-link>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div style="margin-top: 40px;">
      <el-button @click="userLogin" style="width: 270px" type="success" plain>log in</el-button>
    </div>
    <el-divider>
      <span style="font-size: 13px;color: grey">No account?</span>
    </el-divider>
    <div>
      <el-button @click="router.push('/register')" style="width: 270px" type="warning" plain>Sign up now</el-button>
    </div>
  </div>

</template>

<style scoped>

</style>