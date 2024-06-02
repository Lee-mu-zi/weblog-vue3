<template>
    <!-- 固钉组件，通过设置 offset 属性来改变吸顶距离，默认值为 0。 -->
    <el-affix :offset="0">
        <!-- 设置背景色为白色、高度为 64px，padding-right 为 4， border-bottom 为 slate 200 -->
        <div class="bg-white h-[64px] flex pr-4 border-b border-slate-100">
            <!-- 左边栏收缩、展开 -->
            <div class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 hover:bg-gray-200"
                @click="handleMenuWidth">
                <el-icon>
                    <Fold v-if="menuStore.menuWidth == '250px'" />
                    <Expand v-else />
                </el-icon>
            </div>
            <!-- 右边容器，通过 ml-auto 让其在父容器的右边 -->
            <div class=" ml-auto flex">
                <!-- 点击刷新页面 -->
                <el-tooltip class="box-item" effect="dark" content="刷新" placement="bottom">
                    <div class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 hover:bg-gray-200"
                        @click="handleRefresh">
                        <el-icon>
                            <Refresh />
                        </el-icon>
                    </div>
                </el-tooltip>
                <!-- 点击跳转前台首页 -->
                <el-tooltip class="box-item" effect="dark" content="跳转前台" placement="bottom">
                    <div class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 hover:bg-gray-200"
                        @click="router.push('/')">
                        <el-icon>
                            <Monitor />
                        </el-icon>
                    </div>
                </el-tooltip>

                <!-- 点击全屏展示 -->
                <el-tooltip class="box-item" effect="dark" content="全屏" placement="bottom" v-if="!isFullscreen">
                    <div class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 mr-2 hover:bg-gray-200"
                        @click="toggle">
                        <el-icon>
                            <FullScreen />
                        </el-icon>
                    </div>
                </el-tooltip>
                <!-- 点击退出全屏 -->
                <el-tooltip class="box-item" effect="dark" content="退出全屏" placement="bottom" v-else>
                    <div class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 mr-2 hover:bg-gray-200"
                        @click="toggle">
                        <el-icon>
                            <Close />
                        </el-icon>
                    </div>
                </el-tooltip>

                <!-- 登录用户头像 -->
                <!-- <el-dropdown class="flex items-center justify-center" @command="handleCommand"> 更改了代码 @command暂时不需要-->

                <el-dropdown class="flex items-center justify-center">
                    <span class="el-dropdown-link flex items-center justify-center text-gray-700 text-xs">
                        <!-- 头像 Avatar -->
                        <el-avatar class="mr-2" :size="25"
                            src="https://iconfont.alicdn.com/p/illus/preview_image/1SAIt26l6ecK/1617a7b2-ddc8-4a87-9353-c7a53d84e37e.png" />
                        {{ userStore.userInfo.username }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <!-- <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="updatePassword" @click="changePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template> -->
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="updatePassword">修改密码</el-dropdown-item>
                            <!-- <el-dropdown-item command>退出登录</el-dropdown-item> -->
                            <el-dropdown-item @click="userLogout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </el-affix>

    <!-- 修改密码 -->
    <!-- <el-dialog v-model="dialogVisible" title="修改密码" width="40%" :draggable="true" :close-on-click-modal="false"
        :close-on-press-escape="false">
        <el-form ref="formRef" :rules="rules" :model="form">
            <el-form-item label="用户名" prop="username" label-width="120px">
                <el-input size="large" v-model="form.username" placeholder="请输入用户名" clearable disabled />
            </el-form-item>
            <el-form-item label="密码" prop="password" label-width="120px">
                <el-input size="large" type="password" v-model="form.password" placeholder="请输入密码" clearable
                    show-password />
            </el-form-item>
            <el-form-item label="确认密码" prop="rePassword" label-width="120px">
                <el-input size="large" type="password" v-model="form.rePassword" placeholder="请确认密码" clearable
                    show-password />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="onSubmit">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog> -->

    <FormDialog ref="formDialogRef" title="修改密码" destroyOnClose @submit="onSubmit">
        <el-form ref="formRef" :rules="rules" :model="form">
            <el-form-item label="用户名" prop="username" label-width="120px">
                <el-input size="large" v-model="form.username" placeholder="请输入用户名" clearable disabled />
            </el-form-item>
            <el-form-item label="密码" prop="password" label-width="120px">
                <el-input size="large" type="password" v-model="form.password" placeholder="请输入密码" clearable
                    show-password />
            </el-form-item>
            <el-form-item label="确认密码" prop="rePassword" label-width="120px">
                <el-input size="large" type="password" v-model="form.rePassword" placeholder="请确认密码" clearable
                    show-password />
            </el-form-item>
        </el-form>
    </FormDialog>
</template>


<script setup>
import { useMenuStore } from '@/stores/menu'
// 引入 useFullscreen
import { useFullscreen } from '@vueuse/core'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { showModel, showMessage } from '@/composables/util.js'
import { ref, reactive, watch } from 'vue'
import { updateAdminPassword } from '@/api/admin/user.js'
import FormDialog from '@/components/FormDialog.vue'

// 引入了用户 Store
const userStore = useUserStore()
// 引入路由
const router = useRouter()

// 引入了菜单 store
const menuStore = useMenuStore()

// icon 点击事件
const handleMenuWidth = () => {
    // 动态设置菜单的宽度大小
    menuStore.handleMenuWidth()
}

// isFullscreen 表示当前是否处于全屏；toggle 用于动态切换全屏、非全屏
const { isFullscreen, toggle } = useFullscreen()

// 刷新页面
const handleRefresh = () => location.reload()

// 对话框是否显示
const dialogVisible = ref(false)

// 表单引用
const formRef = ref(null)

//修改用户密码表单对象
const form = reactive({
    username: userStore.userInfo.username || '',
    password: '',
    rePassword: ''
})



//适用于带有@command修饰的
// // 下拉菜单事件处理
// const handleCommand = (command) => {
//     // 更新密码
//     if (command == 'updatePassword') {
//         // 显示修改密码对话框
//         dialogVisible.value = true
//     } else if (command == 'logout') { // 退出登录
//         logout()
//     }
// }

// 推出事件处理 
// const handleCommand = (command) => {
//     logout()
// }

// 规则校验
const rules = {
    username: [
        {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '密码不能为空',
            trigger: 'blur',
        },
    ],
    rePassword: [
        {
            required: true,
            message: '确认密码不能为空',
            trigger: 'blur',
        },
    ]
}

//登出逻辑编写
function logout() {
    showModel('是否确认要退出登录？').then(() => {
        userStore.logout()
        showMessage('退出登录成功！')
        // 跳转登录页
        router.push('/login')
    })
}


const onSubmit = () => {
    // 先验证 form 表单字段
    formRef.value.validate((valid) => {
        if (!valid) {
            console.log('表单验证不通过')
            return false
        }

        if (form.password != form.rePassword) {
            showMessage('两次密码输入不一致，请检查！', 'warning')
            return
        }

        // 显示提交按钮 loading
        formDialogRef.value.showBtnLoading()

        // 调用修改用户密码接口
        updateAdminPassword(form).then((res) => {
            console.log(res)
            // 判断是否成功
            if (res.success == true) {
                showMessage('密码重置成功，请重新登录！')
                // 退出登录
                userStore.logout()

                // 隐藏对话框
                dialogVisible.value = false

                // 跳转登录页
                router.push('/login')
            } else {
                // 获取服务端返回的错误消息
                let message = res.message
                if (message == '新密码不能与旧密码重复') {

                }
                // 提示消息
                showMessage(message, 'error')
            }
        })
    })
}

// 监听 Pinia store 中的某个值的变化
watch(() => userStore.userInfo.username, (newValue, oldValue) => {
    // 在这里处理变化后的值
    console.log('新值:', newValue);
    console.log('旧值:', oldValue);

    // 可以在这里执行任何你需要的逻辑
    // 重新将新的值，设置会 form 对象中
    form.username = newValue
});

const formDialogRef = ref(null)

// 新增修改密码按钮点击事件
const updatePassword = () => {
    formDialogRef.value.open()
}

// 用户推出操作
const userLogout = () => {
    logout()
}





</script>