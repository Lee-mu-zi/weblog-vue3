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
                    <span style="font-size: small; ">
                        {{ item.name }}
                    </span>

                </el-menu-item>
            </template>
        </el-menu>

        <!-- 下方菜单 -->
        <el-menu :default-active="defaultActive" @select="handleSelect" :collapse="isCollapse"
            :collapse-transition="false">

            <div class="flex items-center justify-center manage">分类</div>
            <el-menu-item @click="addCategoryBtnClick">
                <el-icon>
                    <Plus />
                </el-icon>
                <span style="font-size: small; ">新建分类</span>
            </el-menu-item>

            <el-menu-item @click="router.push('/admin/category/list')">
                <el-icon>
                    <svg t="1718872487764" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="3278" width="200" height="200">
                        <path
                            d="M911.7 604.1L822 514.4c28.4-35.4 45.5-80.3 45.5-129.3 0-114.2-92.6-206.7-206.8-206.7-114.2 0-206.8 92.5-206.8 206.7s92.6 206.7 206.8 206.7c43.9 0 84.6-13.8 118.1-37.1l91.1 91.1c4.1 4.1 9.6 6.1 15.5 6.1 7.7 0 16-3.4 22.5-9.9 11.5-11.5 13.2-28.5 3.8-37.9z m-251-71.3c-81.5 0-147.7-66.2-147.7-147.6 0-81.4 66.2-147.6 147.7-147.6s147.8 66.2 147.8 147.6c0 81.4-66.3 147.6-147.8 147.6zM158.5 276.9h216.6c10.9 0 19.7-8.8 19.7-19.7v-19.7c0-10.9-8.8-19.7-19.7-19.7H158.5c-10.8 0-19.7 8.8-19.7 19.7v19.7c0 10.9 8.9 19.7 19.7 19.7zM158.5 592h256c10.9 0 19.7-8.9 19.7-19.7v-19.7c0-10.9-8.8-19.7-19.7-19.7h-256c-10.8 0-19.7 8.8-19.7 19.7v19.7c0 10.9 8.9 19.7 19.7 19.7zM847.8 808.6H158.5c-10.8 0-19.7 8.8-19.7 19.7V848c0 10.8 8.8 19.7 19.7 19.7h689.3c10.8 0 19.7-8.8 19.7-19.7v-19.7c0-10.9-8.9-19.7-19.7-19.7z"
                            fill="#666666" p-id="3279"></path>
                    </svg>
                </el-icon>
                <span style="font-size: small; ">分类列表</span>
            </el-menu-item>

            <template v-for="(item, index) in categoryTableData" :key="index">
                <el-menu-item @click="goCategoryArticleListPage(item.id, item.name)" :index="item.path">
                    <el-icon>
                        <Folder />
                    </el-icon>
                    <span style="font-size: small;">
                        {{ item.name }}
                    </span>
                    <div @click.stop="" style="display: flex; align-items: center; margin-left: auto; ">
                        <el-popover placement="right" :width="50" trigger="click">
                            <template #reference>
                                <svg t="1719111143635" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="1496" width="20" height="20">
                                    <path
                                        d="M245.578138 574.513776c-46.517453 0-84.362386-37.844933-84.362386-84.362386 0-46.520523 37.844933-84.367503 84.362386-84.367503 46.518476 0 84.36341 37.84698 84.36341 84.367503C329.941548 536.668843 292.096614 574.513776 245.578138 574.513776zM245.578138 446.645526c-23.986297 0-43.500746 19.516496-43.500746 43.50484 0 23.986297 19.514449 43.500746 43.500746 43.500746 23.986297 0 43.50177-19.514449 43.50177-43.500746C289.079908 466.162022 269.564435 446.645526 245.578138 446.645526z"
                                        fill="#FF9000" p-id="1497"></path>
                                    <path
                                        d="M523.411911 574.513776c-46.517453 0-84.362386-37.844933-84.362386-84.362386 0-46.520523 37.844933-84.367503 84.362386-84.367503 46.520523 0 84.367503 37.84698 84.367503 84.367503C607.779414 536.668843 569.932434 574.513776 523.411911 574.513776zM523.411911 446.645526c-23.985274 0-43.500746 19.516496-43.500746 43.50484 0 23.986297 19.514449 43.500746 43.500746 43.500746 23.988344 0 43.505863-19.514449 43.505863-43.500746C566.917774 466.162022 547.401278 446.645526 523.411911 446.645526z"
                                        fill="#FF9000" p-id="1498"></path>
                                    <path
                                        d="M801.246707 574.513776c-46.517453 0-84.362386-37.844933-84.362386-84.362386 0-46.520523 37.844933-84.367503 84.362386-84.367503 46.520523 0 84.367503 37.84698 84.367503 84.367503C885.61421 536.668843 847.76723 574.513776 801.246707 574.513776zM801.246707 446.645526c-23.985274 0-43.500746 19.516496-43.500746 43.50484 0 23.986297 19.514449 43.500746 43.500746 43.500746 23.988344 0 43.505863-19.514449 43.505863-43.500746C844.75257 466.162022 825.235051 446.645526 801.246707 446.645526z"
                                        fill="#FF9000" p-id="1499"></path>
                                </svg>
                            </template>
                            <template v-for="(item, index) in gridData" :key="index">
                                <el-tooltip class="box-item" effect="dark" content="暂未启用" placement="top">
                                    <el-menu-item @click="" :index="item.path" style="padding: 0%;">
                                        <svg t="1719123465773" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                            xmlns="http://www.w3.org/2000/svg" p-id="5416" width="20" height="20">
                                            <path
                                                d="M873.813333 1024H150.186667C68.266667 1024 0 955.733333 0 873.813333V150.186667C0 68.266667 68.266667 0 150.186667 0h720.213333C955.733333 0 1024 68.266667 1024 150.186667v720.213333c0 85.333333-68.266667 153.6-150.186667 153.6z"
                                                fill="#FDDFDF" p-id="5417"></path>
                                            <path
                                                d="M512 774.826667c-126.293333 0-235.52-88.746667-259.413333-211.626667-23.893333-122.88 40.96-245.76 157.013333-293.546667 133.12-58.026667 290.133333 3.413333 344.746667 139.946667 58.026667 133.12-6.826667 290.133333-139.946667 344.746667-30.72 13.653333-68.266667 20.48-102.4 20.48z m0-484.693334c-122.88 0-221.866667 98.986667-221.866667 221.866667s98.986667 221.866667 221.866667 221.866667 221.866667-98.986667 221.866667-221.866667-98.986667-221.866667-221.866667-221.866667z m0 0"
                                                fill="#FF3737" p-id="5418"></path>
                                            <path
                                                d="M679.253333 699.733333c-6.826667 0-10.24-3.413333-13.653333-6.826666l-331.093333-331.093334c-6.826667-6.826667-6.826667-20.48 0-30.72 6.826667-6.826667 20.48-6.826667 30.72 0l331.093333 331.093334c6.826667 6.826667 6.826667 13.653333 3.413333 23.893333-6.826667 6.826667-13.653333 13.653333-20.48 13.653333z m0 0"
                                                fill="#FF3737" p-id="5419"></path>
                                        </svg>
                                        <el-icon size="1em">
                                            <component :is="item.icon"></component>
                                        </el-icon>
                                        <span style="font-size: xx-small; ">
                                            {{ item.name }}
                                        </span>
                                    </el-menu-item>
                                </el-tooltip>
                            </template>
                        </el-popover>

                    </div>
                </el-menu-item>
            </template>
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
import { getCategoryPageList, addCategory } from '@/api/admin/category'
import { showMessage } from '@/composables/util'
import FormDialog from '@/components/FormDialog.vue'



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
    // {
    //     'name': '分类管理',
    //     'icon': 'FolderOpened',
    //     'path': '/admin/category/list',
    // },
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

// 查询条件：开始结束时间
const startDate = reactive({})
const endDate = reactive({})
// 分页查询的分类名称
const searchCategoryName = ref('')
// 分类表格数据
const categoryTableData = ref([])
// 当前页码
const current = ref(1)
// 总数据量
const total = ref(0)
// 每页显示数量
const size = ref(10)

// 获取所有分类
function getCategoryTableData() {
    getCategoryPageList({ current: current.value, size: size.value, startDate: startDate.value, endDate: endDate.value, name: searchCategoryName.value })
        .then((res) => {
            if (res.success == true) {
                categoryTableData.value = res.data
                current.value = res.current
                size.value = res.size
                total.value = res.total
            }
        })

}
getCategoryTableData()

// 跳转分类文章列表页
const goCategoryArticleListPage = (id, name) => {
    // 跳转时通过 query 携带参数（分类 ID、分类名称）
    router.push({ path: '/admin/article/getArticlesByCategory', query: { id, name } })
}


// 对话框是否显示
// const dialogVisible = ref(false)
const formDialogRef = ref(null)
// 新增分类按钮点击事件
const addCategoryBtnClick = () => {
    formDialogRef.value.open()
    console.log('打开成功')
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
        { min: 1, max: 40, message: '分类名称字数要求大于 1 个字符，小于 20 个字符', trigger: 'blur' },
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
                // getCategoryTableData()
                location.reload()
            } else {
                // 获取服务端返回的错误消息
                let message = res.message
                // 提示错误消息
                showMessage(message, 'error')
            }
        }).finally(() => formDialogRef.value.closeBtnLoading()) // 隐藏提交按钮 loading
    })
}


// 分类更多设置
const gridData = [
    {
        'icon': 'EditPen',
        'name': '编辑',
    },
    {
        'icon': 'DeleteFilled',
        'name': '删除',
    },
    {
        'icon': 'DocumentAdd',
        'name': '新增文章',
    },

]



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

<style>
.el-popover.el-popper {
    min-width: 120;
}
</style>
