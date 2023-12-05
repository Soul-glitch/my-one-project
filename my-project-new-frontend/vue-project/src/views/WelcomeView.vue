<script setup>
import tou from '../assets/tou.jpg';
</script>

<template>
  <div style="width: 100vw;height: 100vh;overflow: hidden;display: flex">
    <div style="flex: 1;background-color: black">
      <el-image style="width: 100%;height: 100%;" fit="cover" :src="tou"/>
    </div>
    <div class="welcome-title">
      <div>this is title</div>
      <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
      <div>veniam labore enim quasi praesentium laboriosam aliquam ipsum facere?</div>
    </div>
    <div class="right-card">
      <router-view v-slot="{ Component }">
<!--        Ò³Ãæ¹ý¶É¶¯»­-->
        <transition name="el-fade-in-linear"  mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>
    </div>

  </div>
</template>

<style scoped>
.welcome-title {
  position: absolute;
  bottom: 30px;
  left: 30px;
  color: white;
  text-shadow: 0 0 10px black;
}

.right-card {
  width: 400px;
  z-index: 1;
  background-color: white;
}
</style>