import { defineStore } from 'pinia'
export const useUserStore = defineStore('username',{
    state:()=>{
        return {
            username:''
        }
    },
    actions:{
        increment(username){
            this.username = username
        }
    }
})