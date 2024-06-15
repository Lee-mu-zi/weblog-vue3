<template>
    <!-- transition-all添加 Tailwind CSS 提供的动画  duration-1000设置折叠栏折叠速度 -->
    <div class="fixed overflow-y-auto bg-current h-screen text-white menu-container transition-all duration-200"
        :style="{ width: menuStore.menuWidth }">

        <!-- 顶部 Logo, 指定高度为 64px, 和右边的 Header 头保持一样高 -->
        <!-- <div class="flex items-center justify-center h-[64px]"> -->
        <!-- <img src="@/assets/logo.svg" class="h-[60px]" @click="$router.push('/')"> -->
        <!-- 通过下面的语句更换折叠或者展开时的管理界面的logo 暂时无用 注释 -->
        <!-- <img src=" @/assets/weblog-logo-new.svg" class="h-[60px]" v-if="menuStore.menuWidth == '250px'"> -->
        <!-- <img src="@/assets/logo.svg" class="h-[60px]" v-else> -->
        <!-- </div> -->

        <!-- 下方菜单 -->
        <el-menu :default-active="defaultActive" @select="handleSelect" :collapse="isCollapse"
            :collapse-transition="false">

            <div class="flex items-center justify-center manage">博客后台</div>

            <template v-for="(item, index) in menus" :key="index">
                <el-menu-item :index="item.path">
                    <el-icon>
                        <!-- 动态图标 -->
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span style="font-size: small; ">{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>

        <!-- 下方菜单 -->
        <el-menu :default-active="defaultActive" @select="handleSelect" :collapse="isCollapse"
            :collapse-transition="false">

            <div class="flex items-center justify-center manage">分类</div>
            <el-menu-item @click="open">
                <el-icon>
                    <Plus />
                </el-icon>
                <span>新建分类</span>
            </el-menu-item>

            <el-menu-item @click="open">
                <el-icon>
                    <FolderOpened />
                </el-icon>
                <span>分类列表</span>
            </el-menu-item>
        </el-menu>




    </div>

    <!-- 添加分类 -->
    <FormDialog ref="formDialogRef" title="添加文章分类" destroyOnClose @submit="onSubmit">
        <el-form ref="formRef" :rules="rules" :model="form">
            <el-form-item label="分类名称" prop="name" label-width="80px" size="large">
                <el-input v-model="form.name" placeholder="请输入分类名称" maxlength="20" show-word-limit clearable />
            </el-form-item>
        </el-form>
    </FormDialog>

</template>


<script setup>
import { ref, computed, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMenuStore } from '@/stores/menu'
import FormDialog from '@/components/FormDialog.vue'
import { ElMessage, ElMessageBox } from 'element-plus'


// 引入 useMenuStore
const menuStore = useMenuStore()
//是否折叠
const isCollapse = computed(() => !(menuStore.menuWidth == '250px'))
const route = useRoute()
const router = useRouter()

// 根据路由地址判断哪个菜单被选中
const defaultActive = ref(route.path)

// 菜单选择事件
const handleSelect = (path) => {
    router.push(path)
}
const menus = [
    {
        'name': '后台管理',
        'icon': 'Monitor',
        'path': '/admin/index'
    },
    {
        'name': '文章管理',
        'icon': 'Document',
        'path': '/admin/article/list',
    },
    {
        'name': '分类管理',
        'icon': 'FolderOpened',
        'path': '/admin/category/list',
    },
    {
        'name': '标签管理',
        'icon': 'PriceTag',
        'path': '/admin/tag/list',
    },
    {
        'name': '知识库管理',
        'icon': 'Collection',
        'path': '/admin/wiki/list',
    },
    {
        'name': '博客设置',
        'icon': 'Setting',
        'path': '/admin/blog/setting',
    },
    {
        'name': 'Loading',
        'icon': 'Loading',
        'path': '/admin/blog/loading',
    },
]

const formDialogRef = ref(null)
// 新增分类按钮点击事件
const addCategoryBtnClick = () => {

    // formDialogRef.value.open()
    // console.log('打开成功')
}
// 表单引用
const formRef = ref(null)
// 添加文章分类表单对象
const form = reactive({
    name: ''
})

// 规则校验
const rules = {
    name: [
        {
            required: true,
            message: '分类名称不能为空',
            trigger: 'blur',
        },
        { min: 1, max: 20, message: '分类名称字数要求大于 1 个字符，小于 20 个字符', trigger: 'blur' },
    ]
}

const onSubmit = () => {
    // 先验证 form 表单字段
    formRef.value.validate((valid) => {
        if (!valid) {
            console.log('表单验证不通过')
            return false
        }

        // 显示提交按钮 loading
        formDialogRef.value.showBtnLoading()

        addCategory(form).then((res) => {
            if (res.success == true) {
                showMessage('添加成功')
                // 将表单中分类名称置空
                form.name = ''
                // 隐藏对话框
                formDialogRef.value.close()
                // 重新请求分页接口，渲染数据
                getTableData()
            } else {
                // 获取服务端返回的错误消息
                let message = res.message
                // 提示错误消息
                showMessage(message, 'error')
            }
        }).finally(() => formDialogRef.value.closeBtnLoading()) // 隐藏提交按钮 loading

    })
}

const open = () => {
    ElMessageBox.alert('暂时未启用', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: 'OK',
    })
}



</script>

<style scoped>
.manage {
    background-color: #6b86b3;
    height: 2em;
}

.el-menu-item {
    height: 36px;
}
</style>
