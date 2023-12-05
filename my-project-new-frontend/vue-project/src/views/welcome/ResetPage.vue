<script setup>
import {ref, reactive} from 'vue';
import {EditPen, Lock, Message} from "@element-plus/icons-vue";

const active = ref(0)
const form = reactive({
  email: '',
  code: '',
  password: '',
  password_repeat: '',
})
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
        <el-form :model="form">
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
                <el-button type="success">
                  get code
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
      <div style="margin-top: 80px">
        <el-button @click="active++" style="width: 270px" type="warning" plain>Reset your password</el-button>
      </div>
    </div>
    <div style="margin: 0 20px" v-if="active===1">
      <div style="margin-top: 80px">
        <div style="font-size: 25px;font-weight: bold">Reset password</div>
        <div style="font-size:14px;color: grey">Please fill in your new password</div>
      </div>
      <div style="margin-top: 50px">
        <el-form :model="form">
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
        <el-button @click="active++" style="width: 270px" type="danger" plain>Reset password immediately</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>