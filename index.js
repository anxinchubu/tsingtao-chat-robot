import ChatRobot from "./src/components/chat/index.vue";

export { ChatRobot };

const component = [ChatRobot];

const Chat = {
	install(App) {
		component.forEach((item) => {
			App.component(item.name, item);
		});
	},
};

export default Chat;


// import YButton from './src/components/button/button.vue';

// const components = [
// 	YButton,
  
// ]
// const install = function(Vue, opts = {}) {
// 	components.forEach(component => {
// 	    Vue.component(component.name, component);
//     });
// }
// if (typeof window !== 'undefined' &amp;&amp; window.Vue) {
//   install(window.Vue);
// }
 
// export default {
// 	install,

// }
