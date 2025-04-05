<script setup>
import { CheckCircle } from "lucide-vue-next";
import Button from "../utilities/Button.vue";
import Cloud2 from "../icons/Cloud2.vue";

const props = defineProps({
  title: String,
  description: String,
  confirmText: String,
  icon: String,
});
</script>

<template>
  <div class="w-full max-w-[550px] px-4 py-16 mx-auto flex flex-col gap-2 items-center justify-center">
    <CheckCircle v-if="icon === 'check'" class="h-7 w-7 mx-auto text-green-600" />
    <Cloud2 v-else class="h-7 w-7 mx-auto text-green-600" />

    <h2 class="text-center">{{ title }}</h2>
    <p class="text-center mb-8">{{ description }}</p>

    <Button @click="$emit('confirm')">
      {{ confirmText }}
    </Button>
  </div>
</template>
