<script setup>
import {ref, reactive} from "vue";
import {post} from '@/net'
import {ElMessage} from "element-plus";
import {openSuccess,openWarning} from "@/opn/OpenTitle";

const centerDialogVisible = ref(false)
const value = ref('选择一项')
const form = reactive({
  sno: '',
  sname: '',
  ssex: value.value,
  sage: ''
})
const formRef = ref();

const options = [
  {value: '男', label: '男'},
  {value: '女', label: '女'}
]

const validateSno = (rule, value, callback) => {
  if (value === '') {
    callback(new Error("学号不能为空"))
  } else if (!/^[0-9]{6,10}$/.test(value)) {
    callback(new Error("请输入正确学号格式"))
  } else {
    callback()
  }
}
const validateName = (rule, value, callback) => { //用户名校验规则
  if (value === '') {
    callback(new Error('姓名不能为空'))
  } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value)) {
    callback(new Error('姓名不能包含特殊字符'))
  } else {
    callback()
  }
}
const validateAge = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('年龄不能为空'))
  } else if (!/^(1[5-9]|[2-9][0-9]?)$/.test(value)) {
    callback(new Error('请输入正确年龄'))
  } else {
    callback()
  }
}
const rules = {
  sno: [
    {required: true, validator: validateSno, trigger: ['blur', 'change']},
    {min: 6, max: 10, message: '学号在6到10位之间', trigger: ['blur', 'change']}
  ],
  sname: [
    {required: true, validator: validateName, trigger: ['blur', 'change']},
    {min: 1, max: 10, message: '请输入正确姓名', trigger: ['blur', 'change']}
  ],
  sage: [
    {required: true, validator: validateAge, trigger: ['blur', 'change']},
    {min: 1, max: 3, message: '请输入正确年龄', trigger: ['blur', 'change']}
  ]
}

function addStudent() {
  formRef.value.validate((valid) => {
    if (valid) {
      post('/api/student/add', {...form}, () => {
        centerDialogVisible.value=false
        openSuccess("数据保存成功")
      })
    } else openWarning("数据错误!!!")
  })
}
</script>

<template>
  <div>
    <el-button type="primary" @click="centerDialogVisible = true">
      添加学生信息
    </el-button>
    <el-dialog v-model="centerDialogVisible"
               title="添加学生信息"
               width="50%"
               align-center
    >
      <div style="margin-right: 100px;margin-left: 100px">
        <el-form :model="form" :rules="rules" ref="formRef">
          <el-form-item label="学号" prop="sno" class="www">
            <el-input v-model="form.sno"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="sname" class="www">
            <el-input v-model="form.sname"></el-input>
          </el-form-item>
          <el-row class="www">
            <el-col :span="8">
              <el-form-item label="性别" required="true">
                <el-select v-model="value" class="m-2" placeholder="Select">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4"></el-col>
            <el-col :span="8">
              <el-form-item label="年龄" prop="sage">
                <el-input v-model="form.sage"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button @click="addStudent" type="primary">添加信息</el-button>
        </span>
      </template>
    </el-dialog>
  </div>

</template>

<style scoped>
.www {
  margin-top: 10px;
}
</style>