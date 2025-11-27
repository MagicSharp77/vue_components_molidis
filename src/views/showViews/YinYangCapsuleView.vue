<template>
  <YinYangCapsule
    :count="count"
    @click-left="clickLeft"
    @click-right="clickRight"
  />
</template>

<script setup lang="ts">
import YinYangCapsule from '@/components/common/YinYangCapsule.vue'
import { ref } from 'vue'

const count = ref(0)
const clickLeft = () => {
  count.value--
  console.log('left clicked, count:', count.value)
}
const clickRight = () => {
  count.value++
  console.log('right clicked, count:', count.value)
}
</script>
