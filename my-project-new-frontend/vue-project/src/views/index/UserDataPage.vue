<script setup>

import AddUserDialog from "@/components/AddUserDialog.vue";
import { get, post } from "@/net";
import { useDataStore } from "@/stores/table";
import { Message, User } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive, ref } from "vue";

const value = ref(5)
const form = reactive({
  username: '',
  email: '',
})
const formRef = ref()

const validateUsername = (rule, value, callback) => { //判断用户名
  if (value === '') {
    callback()
  } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value)) {
    callback(new Error('Usernames cannot contain special characters')) //用户名不能包含特殊字符
  } else {
    callback()
  }
}

const rules = {
  username: [ //用户名
    {validator: validateUsername, trigger: ['blur', 'change']},
    {min: 1, max: 10, message: 'The username must be between 2-8 characters long', trigger: ['blur', 'change']}
  ],
  email: [
    {message: 'Please enter your email address', trigger: 'blur'},
    {max: 20, type: 'email', message: 'Please enter a valid email address', trigger: ['blur', 'change']}
  ],
}


const options = [
  {
    value: 5,
    label: '5/页'
  }, {
    value: 10,
    label: '10/页'
  }, {
    value: 15,
    label: '15/页'
  }, {
    value: 20,
    label: '10/页'
  },
]

const tableData =  useDataStore()

function getTableData() {
  get(`/api/user/data`, function (data) {
    // console.log(data);
    tableData.increment(data);
    console.log(tableData.tableData)
  })
}

getTableData();

//根据条件查询用户信息
function condition() {
  // if(form.email!== ""){
  //   if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  //       .test(form.email)){
  //     ElMessage.warning("邮箱输入格式错误")
  //   }
  // }
  get(`/api/user/condition?username=${form.username}&email=${form.email}`, function (data) {
    console.log(data)
    tableData.increment(data);
    ElMessage.success("查询成功!")
  }, () => {
    ElMessage.warning("没有查询到相关信息");
  })
}

function deleteData(row) {
  post('/api/user/delete', {...row}, (data) => {
    ElMessage.success(data);
  })
}

//数据修改
const handleEdit = (index, row) => {
  console.log(index, row)

}

const open = (row) => {
  ElMessageBox.alert('删除用户信息', '确认窗口', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'OK',
    callback: () => {
      deleteData(row)
    },
  })
}

const handleDelete = (index, row) => {
  console.log(index, row)
  open(row)
  getTableData()
}


// //分页显示数据
// const totalPage = ref([])
// const currentPage = ref(0)//当前页
// const pageNum = ref(1)//页面显示数量
// pageNum.value = Math.ceil(tableData.tableData.length/value.value)
// function sil(){
//   let pageSize = value.value
//   for (let i = 0; i < pageNum.value; i++) {
//     // 每一页都是一个数组 形如 [['第一页的数据'],['第二页的数据'],['第三页数据']]
//     // 根据每页显示数量 将后台的数据分割到 每一页,假设pageSize为2， 则第一页是1-2条，即slice(0,2)，第二页是3-4条，即slice(3,4)以此类推
//     totalPage.value[i] = tableData.tableData.slice(pageSize*i,pageSize* (i + 1))
//   }
// }
// const datashow = ref(totalPage[currentPage.value])
// function nextPage() {
//   if (currentPage.value === pageNum.value - 1) return ;
//   datashow.value = totalPage[++currentPage.value];
// }
// function prePage() {
//   if (currentPage.value === 0) return ;
//   datashow.value= totalPage[--currentPage.value];
// }
</script>

<template>
  <div>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path:'/index'}">主页</el-breadcrumb-item>
        <el-breadcrumb-item>
          用户管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-top: 10px">
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item prop="username">
              <el-input v-model="form.username" maxlength="10" type="text" placeholder="username">
                <template #prefix>
                  <el-icon>
                    <User/>
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="email">
              <el-input v-model="form.email" type="email" placeholder="email address">
                <template #prefix>
                  <el-icon>
                    <Message/>
                  </el-icon>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button @click="condition" type="success">查找对应数据</el-button>
          </el-col>
          <el-col :span="4">
            <AddUserDialog></AddUserDialog>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div style="margin-top: 20px">
      <el-table :data="tableData.tableData" style="width:100%;text-align: center">
        <el-table-column prop="id" label="ID"/>
        <el-table-column prop="username" label="用户名称"/>
        <el-table-column prop="email" label="电子邮件"/>
        <el-table-column prop="date" label="注册日期" />
        <el-table-column prop="role" label="用户类别"/>
        <el-table-column prop="operate" label="操作">
          <template #default="scope">
            <el-button type="warning" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <!--            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
            <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-row>
        <el-col :span="5">
          <el-select v-model="value" class="m-2" placeholder="按照多少页显示" size="small">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-pagination layout="prev, pager, next" :total="pageNum" :current-page="currentPage"/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>

</style>