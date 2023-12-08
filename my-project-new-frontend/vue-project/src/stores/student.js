import { defineStore } from 'pinia'
import {ref} from "vue";

export const  useStudentStore= defineStore('studentData',{
    // �������ݳ־û�
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