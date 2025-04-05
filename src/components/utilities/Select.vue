<template>
  <select
    v-bind="$attrs"
    :class="[
      'w-full hover:border-gray-200 focus:outline-none focus:border-blue-600 h-9 border-b-2 transition dark:border-white bg-transparent text-foreground dark:focus:border-blue-600',
      hasError && 'border-red-500 focus:border-red-500 dark:focus:border-red-500',
    ]"
    @change="$emit('update:modelValue', $event.target.value)"
    :value="modelValue"
  >
    <slot />
  </select>
</template>

<script setup>
defineProps({
  modelValue: [String, Number],
  hasError: Boolean,
});

defineEmits(["update:modelValue"]);
</script>
