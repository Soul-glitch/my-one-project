import { defineStore } from 'pinia'
import {ref} from "vue";
import {get} from "@/net";
export const  useDataStore= defineStore('tableData',{
    // �������ݳ־û�
    persist: true,
    state:()=>{
        return {
            tableData: ref([])
        }
    },
    actions:{
        increment(tableData){
            this.tableData = tableData;
        }
    }
})