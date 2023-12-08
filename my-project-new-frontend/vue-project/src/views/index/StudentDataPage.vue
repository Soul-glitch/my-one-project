<script setup>

import {useStudentStore} from "@/stores/student";
import {ref, reactive} from "vue";
import {User} from "@element-plus/icons-vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {get,post} from '@/net';
import AddStudentDialog from "@/components/AddStudentDialog.vue";
import {openSuccess} from "@/opn/OpenTitle";


const studentStore = useStudentStore()
const selectvalue = ref(5)
const centerDialogVisible = ref(false)
const form = reactive({
  sno: ''
})
const formRef = ref()


const rules = {
  sno: [
    {message: '请输入学号', trigger: 'blur'},
    {max: 20, type: 'text', message: '所输入姓名太长', trigger: ['blur', 'change']}
  ],
}
const options = [
  {
    value: 5,
    label: '5/页'
  },
  {
    value: 10,
    label: '10/页'
  },
  {
    value: 15,
    label: '15/页'
  },
]

const totalPage = ref([]);
const pageNum = ref(0);
const dataShow = ref([]);
const currentPage = ref(0);

function created() {
  get(`/api/student/data?pageNum=${selectvalue.value}&pageSize=${selectvalue.value}`, (data) => {
    console.log(data)
    studentStore.increment(data);
  })
  pageNum.value = Math.ceil(studentStore.records.length / selectvalue.value)
  for (let i = 0; i < pageNum.value; i++) {
    totalPage.value[i] = studentStore.records.slice(selectvalue.value * i, selectvalue.value * (i + 1))
  }
  dataShow.value = totalPage.value[currentPage.value]
}

created()
const nextPage = () => {
  if (currentPage.value === pageNum - 1) return;
  dataShow.value = totalPage.value[++currentPage.value]
}
const prePage = () => {
  if (currentPage.value === 0) return;
  dataShow.value = totalPage.value[--currentPage.value]
}
const page = (i) => {
  dataShow.value = totalPage.value[i - 1]
}


function condition() {
  if (form.sno === '') {
    created()
  }else {
    get(`/api/student/condition?sno=${form.sno}`, (data) => {
      dataShow.value = data;
      openSuccess("数据查询成功")
    })
  }
}
const open = (row) => {
  ElMessageBox.alert('删除用户信息', '确认窗口', {
    confirmButtonText: 'OK',
    callback: () => {
      deleteStudent(row)
    },
  })
}

function deleteStudent(row){
  post('/api/student/delete',{...row},()=>{
    openSuccess("信息删除成功")
    created()
  })
}
const editForm = reactive({
  sno:'',
  sname:'',
  sage:'',
  ssex:''
})
function editStudent(row){
  editForm.sno.value = row.sno;

}

//数据修改
const handleEdit = (index, row) => {
  console.log(index, row)
  centerDialogVisible.value = true
  editStudent(row)
}
const handleDelete = (index, row) => {
  console.log(index, row)
  open(row)
}

</script>

<template>
  <div>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:''}">主页</el-breadcrumb-item>
        <el-breadcrumb-item>
          学生信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-top: 30px">
      <el-form :model="form" ref="formRef" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item prop="sno">
              <el-input v-model="form.sno" maxlength="10" type="text" placeholder="学号">
                <template #prefix>
                  <el-icon>
                    <User/>
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button @click="condition" type="success">查找对应数据</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <AddStudentDialog/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div style="margin-top: 20px">
      <el-table :data="dataShow" style="width:100%;text-align: center">
        <el-table-column prop="sno" label="学号"/>
        <el-table-column prop="sname" label="姓名"/>
        <el-table-column prop="ssex" label="性别"/>
        <el-table-column prop="sage" label="年龄"/>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="warning" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <!--            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
            <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-row>
        <el-col :span="8">
          <el-select v-model="selectvalue" class="m-2" placeholder="Select" size="small">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-pagination layout="prev, pager, next"
                         :total="pageNum"
                         prev-click="prePage"
                         on-next-click="nextPage"/>
        </el-col>
      </el-row>
    </div>
  </div>
<!--  修改对话框-->
  <div>
    <el-dialog
        v-model="centerDialogVisible"
        title="修改信息"
        width="30%"
        align-center
    >
      <div>
        <el-form :model="editForm">
          <el-form-item prop="sno" label="学号">
            <el-input v-model="editForm.sno"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">
          Confirm
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>