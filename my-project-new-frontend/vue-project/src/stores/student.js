import { defineStore } from 'pinia'
import {ref} from "vue";

export const  useStudentStore= defineStore('studentData',{
    // 开启数据持久化
    persist: true,
    state:()=>{
        return {
            studentData: ref([]),
            records:ref([])
        }
    },
    actions:{
        increment(studentData){
            this.studentData = studentData;
            this.records = studentData.records;
        }
    }
})