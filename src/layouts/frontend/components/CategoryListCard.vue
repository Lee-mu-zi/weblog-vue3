<template>
    <div v-if="categories.length > 0"
        class="w-full p-5 mb-3 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <!-- 分类标题 -->
        <h2 class="flex items-center mb-2 font-bold text-gray-900 uppercase dark:text-white">
            <svg t="1716908414555" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="18894" width="25" height="25">
                <path
                    d="M345.6 793.6H166.4a12.8 12.8 0 0 1-12.8-12.8V38.4a12.8 12.8 0 0 1 12.8-12.8h179.2a12.8 12.8 0 0 1 12.8 12.8v742.4a12.8 12.8 0 0 1-12.8 12.8zM179.2 768h153.6V51.2H179.2v716.8z"
                    fill="#13227a" p-id="18895"></path>
                <path
                    d="M294.4 601.6H217.6a12.8 12.8 0 0 1-12.8-12.8v-115.2h25.6v102.4h51.2V115.2h-51.2v281.6H204.8V102.4a12.8 12.8 0 0 1 12.8-12.8h76.8a12.8 12.8 0 0 1 12.8 12.8v486.4a12.8 12.8 0 0 1-12.8 12.8z"
                    fill="#13227a" p-id="18896"></path>
                <path
                    d="M204.8 422.4h25.6v25.6H204.8zM256 729.6c-28.2368 0-51.2-22.9632-51.2-51.2s22.9632-51.2 51.2-51.2 51.2 22.9632 51.2 51.2-22.9632 51.2-51.2 51.2z m0-76.8c-14.1184 0-25.6 11.4816-25.6 25.6s11.4816 25.6 25.6 25.6 25.6-11.4816 25.6-25.6-11.4816-25.6-25.6-25.6zM460.8 281.6h25.6v25.6h-25.6z"
                    fill="#13227a" p-id="18897"></path>
                <path
                    d="M524.8 793.6H345.6a12.8 12.8 0 0 1-12.8-12.8V38.4a12.8 12.8 0 0 1 12.8-12.8h179.2a12.8 12.8 0 0 1 12.8 12.8v742.4a12.8 12.8 0 0 1-12.8 12.8z m-166.4-25.6h153.6V51.2H358.4v716.8z"
                    fill="#13227a" p-id="18898"></path>
                <path
                    d="M473.6 601.6h-76.8a12.8 12.8 0 0 1-12.8-12.8V102.4a12.8 12.8 0 0 1 12.8-12.8h76.8a12.8 12.8 0 0 1 12.8 12.8v153.6h-25.6V115.2h-51.2v460.8h51.2V332.8h25.6v256a12.8 12.8 0 0 1-12.8 12.8zM435.2 729.6c-28.2368 0-51.2-22.9632-51.2-51.2s22.9632-51.2 51.2-51.2 51.2 22.9632 51.2 51.2-22.9632 51.2-51.2 51.2z m0-76.8c-14.1184 0-25.6 11.4816-25.6 25.6s11.4816 25.6 25.6 25.6 25.6-11.4816 25.6-25.6-11.4816-25.6-25.6-25.6z"
                    fill="#13227a" p-id="18899"></path>
                <path
                    d="M685.44 793.6a12.8 12.8 0 0 1-12.4672-9.9456L512.32 79.5392a12.8256 12.8256 0 0 1 9.7024-15.3472l172.1472-38.2848a12.8128 12.8128 0 0 1 15.2576 9.6384l160.6528 704.1152a12.8256 12.8256 0 0 1-9.7024 15.3472l-172.1472 38.2848a13.0304 13.0304 0 0 1-2.7904 0.3072zM540.1472 86.3872l154.9568 679.1552 147.1616-32.7296L687.296 53.6576 540.1472 86.3872z"
                    fill="#13227a" p-id="18900"></path>
                <path
                    d="M693.0688 600.5632a12.8 12.8 0 0 1-12.4672-9.9456L575.36 129.2928a12.8256 12.8256 0 0 1 9.7024-15.3344l73.7792-16.4096a12.8 12.8 0 0 1 15.2576 9.6384l105.2544 461.3248a12.8256 12.8256 0 0 1-9.7024 15.3344l-73.7792 16.4096a13.1456 13.1456 0 0 1-2.8032 0.3072z m-89.8816-464.4224l99.5584 436.3648 48.7936-10.8544-99.5712-436.352-48.7808 10.8416zM749.3376 714.6752c-23.7952 0-44.0832-16.064-49.3312-39.0784a49.4592 49.4592 0 0 1 6.4768-37.6704 50.2528 50.2528 0 0 1 31.808-22.2976c3.648-0.8192 7.3856-1.2288 11.1104-1.2288a50.2144 50.2144 0 0 1 49.3312 39.0912 49.408 49.408 0 0 1-6.4768 37.6448 50.24 50.24 0 0 1-31.808 22.3104 50.8672 50.8672 0 0 1-11.1104 1.2288zM749.4016 640a25.6 25.6 0 0 0-5.568 0.6144 24.768 24.768 0 0 0-15.7312 10.9952 24.0384 24.0384 0 0 0-3.1488 18.2912c2.944 12.8896 16.64 21.4912 29.9392 18.56a24.768 24.768 0 0 0 15.7312-10.9952c3.4688-5.4912 4.5824-11.9808 3.1488-18.2784-2.5344-11.1232-12.7744-19.1872-24.3712-19.1872z"
                    fill="#13227a" p-id="18901"></path>
            </svg>
            分类
        </h2>
        <!-- 分类列表 -->
        <div
            class="text-sm font-medium text-gray-600 bg-white rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <a @click="goCategoryArticleListPage(category.id, category.name)" v-for="(category, index) in categories"
                :key="index"
                class="flex items-center w-full px-4 py-2 rounded-lg border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                <svg class="w-3.5 h-3.5 mr-1.5 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 21 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M2.539 17h12.476l4-9H5m-2.461 9a1 1 0 0 1-.914-1.406L5 8m-2.461 9H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.443a1 1 0 0 1 .8.4l2.7 3.6H16a1 1 0 0 1 1 1v2H5" />
                </svg>
                {{ category.name }}
            </a>
        </div>
    </div>
</template>

<script setup>
import { getCategoryList } from '@/api/frontend/category'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 引入路由
const router = useRouter()

// 跳转分类文章列表页
const goCategoryArticleListPage = (id, name) => {
    // 跳转时通过 query 携带参数（分类 ID、分类名称）
    router.push({ path: '/category/article/list', query: { id, name } })
}

// 所有分类
const categories = ref([])
getCategoryList().then((res) => {
    if (res.success) {
        categories.value = res.data
    }
})
</script>