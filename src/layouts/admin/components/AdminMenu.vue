<template>
    <!-- transition-all添加 Tailwind CSS 提供的动画  duration-1000设置折叠栏折叠速度 -->
    <div class="fixed overflow-y-auto bg-slate-800 h-screen text-white menu-container transition-all duration-200"
        :style="{ width: menuStore.menuWidth }">
        <!-- 顶部 Logo, 指定高度为 64px, 和右边的 Header 头保持一样高 -->
        <div class="flex items-center justify-center h-[64px]">
            <img src="@/assets/weblog-logo-new.svg" class="h-[60px]" @click="$router.push('/')">
            <!-- 通过下面的语句更换折叠或者展开时的管理界面的logo 暂时无用 注释 -->
            <!-- <img src=" @/assets/weblog-logo-new.svg" class="h-[60px]" v-if="menuStore.menuWidth == '250px'"> -->
            <!-- <img src="@/assets/logo.svg" class="h-[60px]" v-else> -->
        </div>

        <!-- 下方菜单 -->
        <el-menu :default-active="defaultActive" @select="handleSelect" :collapse="isCollapse"
            :collapse-transition="false">
            <template v-for="(item, index) in menus" :key="index">
                <el-menu-item :index="item.path">
                    <el-icon>
                        <!-- 动态图标 -->
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<style>
.el-menu {
    background-color: rgb(30 41 59 / 1);
    border-right: 0;
}

.el-sub-menu__title {
    color: #fff;
}

.el-sub-menu__title:hover {
    background-color: #ffffff10;
}

.el-menu-item.is-active {
    background-color: var(--el-color-primary);
    color: #fff;
}

.el-menu-item.is-active:hover {
    background-color: var(--el-color-primary);
}

.el-menu-item {
    color: #fff;
}

.el-menu-item:hover {
    background-color: #ffffff10;
}
</style>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMenuStore } from '@/stores/menu'

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


</script>