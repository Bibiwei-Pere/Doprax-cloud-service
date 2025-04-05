<script setup>
const props = defineProps({
  htmlFor: String,
  required: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <label :for="htmlFor" class="flex cursor-pointer text-[15px] font-medium gap-3 text-foreground">
    <slot />
    <span v-if="props.required" class="text-red-600">*</span>
  </label>
</template>
