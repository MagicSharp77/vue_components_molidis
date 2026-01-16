<template>
  <div class="blurhash-wrapper" :style="{ width: width, height: height }">
    <canvas ref="canvasRef" class="placeholder-canvas" :class="{ 'fade-out': isLoaded }" width="32" height="32"
      aria-hidden="true"></canvas>

    <img :src="src" :alt="alt" class="real-image" :class="{ 'fade-in': isLoaded }" @load="onLoad" @error="onError" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { decode } from 'blurhash'

const props = defineProps({
  src: { type: String, required: true },
  blurhash: { type: String, required: true }, // 后端传来的那串字符
  alt: { type: String, default: 'image' },
  width: { type: String, default: '100%' },
  height: { type: String, default: '100%' },
  punch: { type: Number, default: 1 } // 对比度增强参数，默认1
})

const isLoaded = ref(false)
const canvasRef = ref<HTMLCanvasElement | null>(null)

/**
 * 核心魔法：解码 BlurHash 并绘制到 Canvas
 */
const drawBlurHash = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  // 1. 获取 Canvas 上下文
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 2. 调用 blurhash 库的 decode 方法
  // 参数：(hash字符串, 宽, 高, 对比度)
  // 注意：这里写死 32x32 是为了性能，像素越少解码越快！
  // 反正最后 CSS 会把它拉伸模糊，不需要高分辨率。
  const pixels = decode(props.blurhash, 32, 32, props.punch)

  // 3. 将解码出来的像素数组 (Uint8ClampedArray) 转换成 imageData
  const imageData = ctx.createImageData(32, 32)
  imageData.data.set(pixels)

  // 4. 把画像素点画上去
  ctx.putImageData(imageData, 0, 0)
}

const onLoad = () => {
  isLoaded.value = true
}

const onError = () => {
  // 如果高清图挂了，我们至少还留着 Canvas 占位图，
  // 或者在这里处理错误逻辑
  console.error('Image load failed')
}

// 组件挂载时绘制
onMounted(() => {
  drawBlurHash()
})

// 监听 blurhash 变化（防止列表复用组件时数据不更新）
watch(() => props.blurhash, () => {
  drawBlurHash()
  isLoaded.value = false // 重置加载状态
})
</script>

<style scoped>
.blurhash-wrapper {
  position: relative;
  overflow: hidden;
  /* 防止拉伸溢出 */
  background: #eee;
  /* 最底层的兜底色 */
}

/* Canvas 和图片绝对重叠 */
.placeholder-canvas,
.real-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 关键：保持比例填充 */
  transition: opacity 0.5s ease-in-out;
}

/* Canvas 样式：虽然实际只有32x32像素，
   但 CSS width:100% 会把它强制拉伸，
   浏览器的插值算法会自动让它变模糊 */
.placeholder-canvas {
  opacity: 1;
  z-index: 1;
}

.placeholder-canvas.fade-out {
  opacity: 0;
}

.real-image {
  opacity: 0;
  z-index: 2;
}

.real-image.fade-in {
  opacity: 1;
}
</style>
