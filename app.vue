<script setup>
  const loading = ref(true)

  onMounted(() => {
   setTimeout(() => loading.value = false, 1400)
  })
 
</script>
<template>
  <div v-if="loading" class="fixed z-50 top-0 left-0 w-full h-full bg-white grid content-center">
    <Loading class="m-auto !border-t-gray-500"/>
  </div>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
