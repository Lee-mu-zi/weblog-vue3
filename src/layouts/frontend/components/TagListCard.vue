<template>
    <div v-if="tags.length > 0"
        class="w-full p-5 mb-3 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <!-- 标签标题 -->

        <h2 class=" flex items-center mb-2 font-bold text-gray-900 uppercase dark:text-white">
            <svg t="1716907658915" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="15737" width="30" height="30">
                <path d="M552.96 327.68m-163.84 0a163.84 163.84 0 1 0 327.68 0 163.84 163.84 0 1 0-327.68 0Z"
                    fill="#FFCE00" p-id="15738"></path>
                <path
                    d="M798.6176 278.31296l-14.40768 218.51136a30.64832 30.64832 0 0 1-8.77568 19.456l-298.38336 301.056a30.57664 30.57664 0 0 1-43.23328 0.21504l-0.21504-0.21504L226.7136 608.58368a30.55616 30.55616 0 0 1 0-43.008l298.3424-301.056a30.64832 30.64832 0 0 1 20.3776-9.02144l221.37856-9.728h1.29024A30.5664 30.5664 0 0 1 798.72 276.2752a19.64032 19.64032 0 0 1-0.1024 2.03776zM559.104 315.00288c-14.97088 15.09376-236.31872 238.44864-272.50688 274.91328 30.72 30.99648 134.99392 136.192 166.2464 167.70048l272.42496-274.86208c1.15712-17.408 8.50944-129.35168 11.61216-175.5136z"
                    fill="#333333" p-id="15739"></path>
            </svg>
            标签
        </h2>

        <!-- 标签列表 -->
        <span @click="goTagArticleListPage(tag.id, tag.name)" v-for="(tag, index) in tags" :key="index"
            class="inline-block mb-1 cursor-pointer bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded hover:bg-green-200 hover:text-green-900 dark:bg-green-900 dark:text-green-300">
            {{ tag.name }}
        </span>
    </div>
</template>

<script setup>
import { getTagList } from '@/api/frontend/tag'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 所有标签
const tags = ref([])
getTagList().then((res) => {
    if (res.success) {
        tags.value = res.data
    }
})

// 跳转标签文章列表页
const goTagArticleListPage = (id, name) => {
    // 跳转时通过 query 携带参数（标签 ID、标签名称）
    router.push({ path: '/tag/article/list', query: { id, name } })
}
</script>
