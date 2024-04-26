import { createApp } from "vue";
import App from "./App.vue";
import Chat from "./components/chat/index.vue" //导入
// 全局引入
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";


const app = createApp(App);
// 应用ElementPlus插件
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(Chat) //注册

app.mount("#app");




