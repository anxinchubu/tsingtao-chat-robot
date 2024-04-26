<template>
  <div class="container">
    <!-- <Chat></Chat> -->
    <el-icon @click="handleClick" color="green" :size="50">
      <ChatRound />
    </el-icon>
    <div v-if="showBubble" class="custom-div">
      <div class="bubble-header">
        <el-icon @click="refresh" color="white" :size="25" style="margin-left:350px ">
          <Refresh />
        </el-icon>

      </div>
      <div class="chat-body" :loading="loading">

        <template v-for="item in chatList" :key="item.index">
          <div :class="item.divType">
            <el-input type="textarea" autosize v-model="item.text" readonly="true" class="red-input-bg"
              style="background-color: red; border: none; border-radius: 6px; font-size: 16px; line-height: 24px;"
              resize="none">
            </el-input>
          </div>
        </template>
      </div>

      <div class="input-container">
        <div class="input-body">
          <el-input class="box-input" placeholder="请输入内容" v-model="inputValue" :disabled="disabled"
            @keyup.enter="submit">
          </el-input>
          <el-icon class="send-button" @click="submit" color="green" :size="30" :class="{ 'disabled': disabled }">
            <Position />
          </el-icon>
        </div>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import { test, test2 } from "@/api/index"

export default {

  name:"ChatRobot",
  data() {
    return {
      showBubble: false,
      inputValue: "",
      disabled: false,
      index: 0,
      chatList: [{
        index: 0,
        divType: "robot-container",
        textType: "robot-text",
        text: "您好！我是小啤，请问有什么可以帮您的^_^？",
      }],
      loading: false,
      contextNum: 3,
      contextList: [],
      inputSave: ""
    };
  },
  methods: {
    handleClick() {
      // 点击按钮后的操作
      this.showBubble = !this.showBubble;
    },
    async submit() {
      this.disabled = true
      this.inputSave = this.inputValue
      this.inputValue = ""
      console.log("this.inputSave",this.inputSave)

      this.index += 1
      const newUserItem = {
        index: this.index,
        divType: "user-container",
        textType: "user-text",
        text: this.inputSave,
      }
      this.chatList.push(newUserItem)

      let queryParams = {
        "query": this.inputSave,
        "knowledge_base_name": "Tsingtao It Base",
        "top_k": 3,
        "score_threshold": 1,
        "history": this.contextList,
        "stream": false,
        "model_name": "qwen-api",
        "temperature": 0.7,
        "max_tokens": 0,
        "prompt_name": "default"
      }

      console.log(queryParams)


      this.index += 1
      const newLoadingItem = {
        index: this.index,
        divType: "robot-container",
        textType: "robot-text",
        text: "小啤正在请求资源...",
      }
      console.log("newLoadingItem", newLoadingItem)
      this.chatList.push(newLoadingItem)

      // test().then(response => {
      //   if (response) {
      //     console.log("response", response)
      //   }
      // })

      try {
        await test2(queryParams).then(response => {
          if (response) {
            console.log("response=====>", response)
            console.log("response.data=====>", response.data)

            // const data= '{"answer": "抱歉，我不理解\"niha\"是什么意思，请您提供更多信息或者换个提问方式，我会尽力帮您解答。\n", "docs": ["<span style='color:red'>未找到相关文档,该回答为大模型自身能力解答！</span>"]}'
            // const answerRegex = /"answer":\s*"([^"]*)\\n"/;
            const answerRegex = /"answer":\s*"([^"]*)"/;

            const match = response.data.match(answerRegex);
            console.log("match=====>", match, typeof (match))

            const cleanedString = match[1].replace(/\\[rn]/g, '');
            // const cleanedString = match[1].replace(/[\n\r\\]/g, '');

            // console.log("cleanedString=====>", cleanedString,typeof(cleanedString))

            // const answerRegex = /"answer":\s*"([^"]*)"/;
            // const match = cleanedString.match(answerRegex);
            // console.log("match=====>", match, typeof (match))
            let answerValue = null

            if (cleanedString) {
              answerValue = cleanedString;
              console.log(answerValue, typeof (answerValue)); // 输出：你好！有什么问题需要我帮助解答吗？
              this.chatList[this.index].text = answerValue

            } else {
              console.log('未找到 "answer" 的值。');
              this.chatList[this.index].text = "加载失败，请尝试重新提问.."
            }

            if (this.contextList.length > this.contextNum * 2) {
              this.contextList.splice(2); // 删除前两项
              console.log("长度超标，删除2元素", this.contextList);
            }
            this.contextList.push({
              "role": "user",
              "content": this.inputSave
            },{
              "role": "assistant",
              "content": this.chatList[this.index].text
            })

            // this.contextList.push({
            //   "role": "assistant",
            //   "content": this.chatList[this.index].text
            // })

          }


        })
      } catch (error) {
        console.log("请求失败！", error)
        console.log()
        this.chatList[this.index].text = "加载失败，请尝试重新提问.."
      }

      this.disabled = false

      console.log("this.contextList", this.contextList)


    },

    refresh() {
      this.loading = true

      this.chatList = [];
      const helloItem = {
        index: 0,
        divType: "robot-container",
        textType: "robot-text",
        text: "您好！我是小啤，请问有什么可以帮您的^_^？",
      }
      this.chatList.push(helloItem);
      this.disabled = false
      this.contextList = []
      this.loading = false


    }
  }
}

</script>

<style scoped>
.el-input .el-textarea__inner {
  background-color: red !important;
}

.container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 222222
}

.round-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgb(1, 144, 64);
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
}

/* 设置图标的颜色为白色 */
.icon-white {
  color: red;
}

.custom-div {
  margin-top: 20px;
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 400px;
  height: 80vh;
  /* 80% of the viewport height */
  background-color: write;
  border: 0 solid #e5e7eb;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 40px;
  /* 添加阴影效果 */
  border-radius: 8px;
  /* 圆角样式 */
}


.bubble-header {
  display: flex;
  align-items: center;
  /* 垂直居中 */
  height: 50px;
  background-color: rgb(1, 144, 64);
  border-top-left-radius: 8px;
  /* 左上角圆角 */
  border-top-right-radius: 8px;
  /* 右上角圆角 */
  border-bottom-left-radius: 0;
  /* 左下角直角 */
  border-bottom-right-radius: 0;
  /* 右下角直角 */
}


.chat-body {
  height: calc(80vh - 165px);
  overflow-y: scroll;
  margin: 0px;
  overflow-x: hidden;
  /* overflow: hidden; */
  max-width: 800px;
  /* scrollbar-width: none; */
  padding-top: 40px;
  padding-right: 12px;
  padding-left: 12px;
  /* scroll-behavior: smooth;
  flex-direction: column;
  flex-grow: 1; */
  /* min-width: 100%;
  width: 100%; */
  /* display: flex; */
  /* font-size: 16px;
  line-height: 24px; */
}

.input-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 8px;
  padding-bottom: 4px;
  padding-left: 20px;
  padding-right: 20px;
  border: 0 solid #e5e7eb;
  height: 60px;
}

.input-body {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #eeeeee;
  margin: 0px;
  background-color: rgb(255, 255, 255);
  color: rgb(48, 50, 53);
  box-shadow: 0 2px 6px -1px rgba(0, 0, 0, .1);
  font-size: 16px;
  line-height: 24px;
  border-radius: 8px;

}

.box-input {
  font-size: 16px;
  line-height: 24px;
  margin: 0px;
  color: red;
  height: 40px;
  background-color: transparent;
  font-weight: 300;
  border: transparent;
}

.send-button {
  margin-left: 5px;
  margin-right: 5px;
  /* font-size: 16px;
  height: 40px;
  width: 40px;
  margin-right: 5px;
  line-height: 24px;
  background-color: #007bff;
  color: #000000;
  padding: 0px;
  border: none;
  cursor: pointer; */
}




.robot-container {
  margin-right: 40px;
  /* justify-content: flex-start; */
  /* align-items: flex-start; */
  border: 0 solid #e5e7eb;
  /* height: 40px; */
  /* display: flex; */
  margin-bottom: 15px;
  position: relative;
  
  /* 相对定位 */
}

.user-container {
  margin-left: 50px;
  margin-bottom: 15px;


}



.robot-text {
  position: absolute;
  /* 绝对定位 */
  background-color: rgb(247, 248, 255);
  border-radius: 6px;
  color: rgb(48, 50, 53);
  padding: 8px 16px;
  max-width: 200px;
  display: inline-block;
  height: 200px;
  word-wrap: break-word;
  /* height:auto; */
  /* overflow-wrap: break-word; */
  /* display: inline-block;  */
  /* 设置为 inline-block */
  /* background-color: red; */

}

.user-text {}

.disabled {
  opacity: 0.5;
  /* 降低不可点击图标的不透明度 */
  pointer-events: none;
  /* 禁用鼠标事件 */
}

/* 删除边框并设置背景颜色 */
.el-input__inner {
  border: none;
  /* 删除边框 */
  background-color: #f0f2f5;
  /* 设置背景颜色 */
}

/* 如果你想要在聚焦时也改变背景颜色，可以添加以下代码 */
.el-input__inner:focus {
  background-color: #d3dce6;
  /* 聚焦时的背景颜色 */
}
</style>
