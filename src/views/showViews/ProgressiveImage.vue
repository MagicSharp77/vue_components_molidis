<template>
  <div class="product-image-area">
    <!-- <img :src="image3" alt="这是加载不了的示例图片" /> -->
    <ProgressiveImage :placeholder-src="image1 + placeholderParams" :src="image1" alt="长方形图片" :width="500"
      :height="300" />
    <ProgressiveImage :placeholder-src="image2 + placeholderParams" :src="image2" alt="正方形图片" :width="200"
      :height="200" />
  </div>
</template>

<script setup lang="ts">
import ProgressiveImage from '@/components/common/ProgressiveImage.vue'
const image1 = 'https://bucket-zxq-file-public-prod-1.oss-cn-shenzhen.aliyuncs.com/diancan/upload/2025-09-17/6a4e64dccd084ae083f85dcdaa7bf20b.png'
const image2 = 'https://bucket-zxq-file-public-prod-1.oss-cn-shenzhen.aliyuncs.com/diancan/upload/2025-10-14/ab819dce95474899ba35c7ffc5280e97.png'
// const image3 = '@/assets/logo.svg'

const placeholderParams = '?x-oss-process=image/resize,w_50/quality,q_10'
</script>

<style scoped lang="scss">
.product-image-area {
  display: flex;
}
</style>
