<script setup>
import router from "@/router";
import {logout} from "@/net";
import {CirclePlusFilled, Coin, Location, Lock, Plus} from "@element-plus/icons-vue";
import {useUserStore} from "@/stores/user";

const username = useUserStore()
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}

function userLogout() {
  logout(() => {
    router.push('/')
  })
}


</script>

<template>
  <div style="width: 100%;">
    <div class="common-layout">
      <el-container>
        <el-header>
          <div style="margin-top: 20px">
            <el-row>
              <el-col :span="5" style="text-align: center;">
                <el-icon>
                  <Coin style="width: 20px;height: 20px"/>
                </el-icon>
              </el-col>
              <el-col :span="14"></el-col>
              <el-col :span="5" style="text-align: right">
                <el-dropdown>
                  <span>当前用户：{{ username.username }}</span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item :icon="Plus" @click="userLogout">退出登录</el-dropdown-item>
                      <el-dropdown-item :icon="CirclePlusFilled">Action 2</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </el-col>
            </el-row>
          </div>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <div @click="router.push('index')" style="text-align: center;font-size: 25px">主页菜单</div>
            <el-menu @open="handleOpen" @close="handleClose">
              <el-sub-menu index="1">
                <template #title>
                  <el-icon>
                    <location/>
                  </el-icon>
                  <div>第一组</div>
                </template>
                <el-menu-item-group title="子菜单一号">
                  <el-menu-item index="1-1" @click="router.push('/userdata')">用户管理</el-menu-item>
                  <el-menu-item index="1-2">产品管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="子菜单二号">
                  <el-menu-item index="1-3">item one</el-menu-item>
                  <el-menu-item index="1-4">item two</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon>
                    <location/>
                  </el-icon>
                  <span>系统信息</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1">服务器接口文档</el-menu-item>
                  <el-menu-item index="2-2">消息队列管理</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
            </el-menu>
          </el-aside>
          <el-main>
            <div style="margin-top: 30px">
              <router-view v-slot="{ Component }">
                <!--        页面过渡动画-->
                <transition name="el-fade-in-linear" mode="out-in">
                  <component :is="Component"/>
                </transition>
              </router-view>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>

</template>

<style scoped>

</style>