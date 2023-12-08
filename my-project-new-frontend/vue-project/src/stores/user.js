import { defineStore } from 'pinia'
import {ref} from "vue";

export const useUserStore = defineStore('username',{
    persist: true,
    state:()=>{
        return {
            username:'',

        }
    },
    actions:{
        increment(username){
            this.username = username

        },
    }
})