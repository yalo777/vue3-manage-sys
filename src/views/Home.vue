<script setup>
// import { WindowStore } from '@/store/window'
// import { WindowStore } from '../store/window'

// const windows = WindowStore()
// size = windows.getSize()
</script>

<template>
  <div class="backdrop">
    <h1 style="color: aliceblue; font-size: 2vw;">Hello World</h1>
    <el-button :type="primary"><router-link to="/auth/login" style="font-size: 1vw;">Go Login</router-link></el-button>
  </div>
</template>
<style>

.backdrop {
  display:Flexbox;   /* 设置布局 */
  position: absolute;	
  height:20%;
  width: 20%;		
  top: 35%;
  left: 38%;
  z-index: 1;
}

.backdrop::before {
  content: "";
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 1px solid #4738b7;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: -1;
}

</style>