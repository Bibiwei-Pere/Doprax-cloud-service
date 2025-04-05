<template>
  <textarea
    v-bind="$attrs"
    :class="[
      'w-full h-16 hover:border-gray-200 focus:outline-none focus:border-blue-600 border-b-2 transition dark:border-white bg-transparent text-foreground dark:focus:border-blue-600',
      hasError && 'border-red-500 focus:border-red-500 dark:focus:border-red-500',
    ]"
    @input="$emit('update:modelValue', $event.target.value)"
    :value="modelValue"
  />
</template>

<script setup>
defineProps({
  modelValue: String,
  hasError: Boolean,
});

defineEmits(["update:modelValue"]);
</script>
