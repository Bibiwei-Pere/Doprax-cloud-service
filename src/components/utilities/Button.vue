<script setup>
import { computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  variant: {
    type: String,
    default: "primary",
  },
  class: {
    type: [String, Array, Object],
    default: "",
  },
});

defineEmits(["click"]);

const variantClasses = computed(() => {
  switch (props.variant) {
    case "secondary":
      return "bg-[#F3F4F6] disabled:cursor-not-allowed disabled:opacity-50 disabled:ring-1 disabled:ring-gray-300 border-gray-300 dark:text-gray-600 dark:hover:text-black text-gray-400 hover:text-gray-600 hover:border-gray-400 disabled:border-gray-300  focus:text-gray-600 focus:border-gray-400";
    case "destructive":
      return "bg-red-500 border-transparent text-white hover:bg-red-600 bg-[#F3F4F6] disabled:cursor-not-allowed disabled:opacity-50 disabled:ring-1 disabled:ring-red-300 border-red-300 hover:border-red-400 disabled:border-red-300  focus:border-red-400";
    default:
      return "bg-blue-600 opacity-90 hover:opacity-100 text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:ring-blue-400 border border-transparent ";
  }
});
</script>

<template>
  <button
    :type="type"
    :class="[
      'px-4 sm:px-5 text-sm sm:text-[15px] py-[10px] sm:py-3 rounded-lg border shadow duration-200 ease-in-out focus:outline-none',
      variantClasses,
      props.class,
    ]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
