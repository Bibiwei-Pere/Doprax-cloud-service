<template>
  <div
    class="w-5 h-5 flex items-center justify-center rounded-md border-2 cursor-pointer transition-colors"
    :class="{
      'bg-blue-600 text-white border-blue-600': checked,
      'bg-white border-gray-300': !checked,
    }"
    @click="$emit('update:checked', !checked)"
    role="checkbox"
    :aria-checked="checked.toString()"
    tabindex="0"
  >
    <Check v-if="checked" class="w-4 h-4" />
  </div>
</template>

<script setup>
import { Check } from "lucide-vue-next";

defineProps({
  checked: Boolean,
});

defineEmits(["update:checked"]);
</script>
