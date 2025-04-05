<template>
  <div ref="dropdownRef" class="relative w-full">
    <button
      type="button"
      :aria-invalid="hasError"
      @click="toggleDropdown"
      :class="[
        'w-full text-left hover:border-gray-200 focus:outline-none focus:border-blue-600 h-9 border-b-2 transition dark:border-white bg-transparent text-foreground dark:focus:border-blue-600',
        hasError && 'border-red-500 focus:border-red-500 dark:focus:border-red-500',
      ]"
    >
      {{ selectedLabel }}
    </button>

    <ul
      v-if="isOpen"
      class="absolute z-50 py-3 px-1 mt-2 w-full bg-background-2 border rounded-xl shadow-lg overflow-auto"
    >
      <li
        v-for="option in options"
        :key="isStringArray ? option : option.value"
        @click="selectOption(option)"
        class="flex text-foreground-reverse items-center justify-between px-4 py-2 hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer"
      >
        <p
          :class="{
            'font-medium text-foreground-reverse': modelValue === (isStringArray ? option : option.value),
          }"
        >
          {{ isStringArray ? option : option.label }}
        </p>
        <Checkbox :checked="modelValue === (isStringArray ? option : option.value)" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import Checkbox from "./Checkbox.vue";
import { onClickOutside } from "@vueuse/core";

const dropdownRef = ref(null);
onClickOutside(dropdownRef, () => {
  isOpen.value = false;
});

const props = defineProps({
  modelValue: [String, Number],
  options: {
    type: Array,
    required: true,
  },
  hasError: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  console.log("Dropdown toggled. Open state:", isOpen.value);
};

const isStringArray = computed(() => {
  const isString = typeof props.options?.[0] === "string";
  console.log("Is String Array:", isString);
  return isString;
});

const selectedLabel = computed(() => {
  console.log("Computing label for modelValue:", props.modelValue);
  if (!props.modelValue) return "Select a region";

  if (isStringArray.value) return props.modelValue;

  const selected = props.options.find((opt) => opt.value === props.modelValue);
  return selected?.label || "Select a region";
});

const selectOption = (option) => {
  const value = isStringArray.value ? option : option.value;
  console.log("Option selected:", option, "Resolved value:", value);
  emit("update:modelValue", value);
  isOpen.value = false;
};

// Watcher for modelValue to trace binding
watch(
  () => props.modelValue,
  (newVal) => {
    console.log("modelValue changed to:", newVal);
  },
  { immediate: true }
);
</script>
