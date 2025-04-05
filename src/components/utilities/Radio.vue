<template>
  <div
    class="w-5 h-5 rounded-full border-2 cursor-pointer flex items-center justify-center transition-colors"
    :class="{
      'border-blue-600': checked,
      'border-gray-300': !checked,
    }"
  >
    <div v-if="checked" class="w-3 h-3 rounded-full bg-blue-600" />
  </div>
</template>

<script setup>
defineProps({
  checked: Boolean,
});
</script>
