<template>
  <div class="product-image">
    <ProgressiveImage :placeholder-src="image + placeholderParams" :src="image" alt="演示图片" />
    <ProgressiveImage :placeholder-src="image + placeholderParams" :src="image" alt="演示图片" />
  </div>
</template>

<script setup lang="ts">
import ProgressiveImage from '@/components/common/ProgressiveImage.vue'
const image = 'https://bucket-zxq-file-public-prod-1.oss-cn-shenzhen.aliyuncs.com/diancan/upload/2025-09-17/6a4e64dccd084ae083f85dcdaa7bf20b.png'
const placeholderParams = '?x-oss-process=image/resize,w_50/quality,q_10'
</script>

<style scoped lang="scss">
.product-image {
  width: 500px;
  height: 300px;
  position: relative;
}
</style>
