<script setup>
import router from "@/router";
import {logout} from "@/net";

function userLogout() {
  logout(() => {
    router.push('/')
  })
}
</script>

<template>
  <div>
    <el-button @click="userLogout">logout</el-button>
  </div>
</template>

<style scoped>

</style>