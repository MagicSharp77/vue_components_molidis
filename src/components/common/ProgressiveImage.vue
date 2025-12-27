<template>
  <div class="progressive-image-wrapper">
    <img :src="placeholderSrc" class="image placeholder" :class="{ loaded: isLoaded }" :alt="alt" />
    <img :src="src" class="image real" @load="onImageLoad" :class="{ loaded: isLoaded }" :alt="alt" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 定义组件接收的props
defineProps({
  // 占位图的URL
  placeholderSrc: {
    type: String,
    required: true
  },
  // 最终高清图的URL
  src: {
    type: String,
    required: true
  },
  // alt 文本
  alt: {
    type: String,
    default: 'Image'
  },
  // 图片的宽度
  width: {
    type: Number,
    default: 100
  },
  // 图片的高度
  height: {
    type: Number,
    default: 100
  }
})

// 控制图片加载状态
const isLoaded = ref(false)

// 当高清图加载完成后，调用此方法
const onImageLoad = () => {
  isLoaded.value = true
}
</script>

<style scoped lang="scss">
.progressive-image-wrapper {
  position: relative;
  width: v-bind('width + "px"');
  height: v-bind('height + "px"');
  // background-color: #f0f0f0;
  /* 图片加载前的默认底色 */
  // overflow: hidden; /* 防止放大后的模糊图溢出边框 */
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // object-fit: cover; /* 保证图片不变形地填满容器 */
  transition: opacity 0.5s ease-in-out;
  /* 添加0.5秒的淡入淡出过渡效果 */
}

.placeholder {
  filter: blur(20px);
  /* 关键：给占位图加上模糊效果 */
  transform: scale(1.1);
  /* 稍微放大一点，模糊后边缘更好看 */
  opacity: 1;

  /* 当高清图加载完后，模糊图淡出 */
  &.loaded {
    opacity: 0;
  }
}

.real {
  opacity: 0;
  /* 高清图初始时完全透明 */

  /* 当加载完成后，高清图淡入显示 */
  &.loaded {
    opacity: 1;
  }
}
</style>
