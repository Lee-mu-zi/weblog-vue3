// 主js文件
import '@/assets/main.css'
import 'animate.css';
import 'nprogress/nprogress.css'

import { createApp } from 'vue'
import App from '@/App.vue'
// 导入路由
import router from '@/router'
// 导入全局路由守卫
import '@/permission'
// 导入 Element Plus 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入全局状态管理 Pinia
import pinia from '@/stores/index'
// 图片点击放大
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import TeaDesign from 'tea-design'
import 'tea-design/dist/style.css'


const app = createApp(App)

// const pinia = createPinia()
// pinia.use(piniaPluginPersistedstate)

app.use(VueViewer)

//导入Tea Design
app.use(TeaDesign)

// 应用路由
app.use(router)
app.mount('#app')
// 应用 Pinia
app.use(pinia)




// 引入图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


