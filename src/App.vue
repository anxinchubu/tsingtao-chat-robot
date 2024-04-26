<template>
	<ChatRobot size="large" type="primary">我是测试组件</ChatRobot>

  <h1>成功</h1>
</template>

<script lang="ts">

import ChatRobot from "./components/chat/index.vue"

export default {
  components: {
    ChatRobot
  },
}
  
</script>


<style>
*{
  margin: 0;
  padding: 0;
}
</style>
