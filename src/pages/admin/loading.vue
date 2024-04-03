<template>
    <h1>111{{ userStore.userInfo.avatar }}</h1>
</template>

<script setup>
import { useUserStore } from '@/stores/user.js'

// 引入了用户 Store
const userStore = useUserStore()

</script>