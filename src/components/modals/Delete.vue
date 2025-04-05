<script setup>
import { Loader2 } from "lucide-vue-next";
import Button from "../utilities/Button.vue";
import Delete from "../icons/Delete2.vue";

const props = defineProps({
  visible: Boolean,
  loading: Boolean,
  title: String,
  description: String,
  confirmText: String,
  cancelText: String,
  icon: String,
});
</script>

<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex items-center px-4 justify-center bg-black/50">
    <div
      class="w-full bg-background-2 dark:border rounded-lg max-w-[550px] px-4 py-16 mx-auto flex flex-col gap-2 items-center justify-center"
    >
      <Delete v-if="icon === 'delete'" class="h-4 w-4 mx-auto text-red-600" />

      <h2 class="text-center mt-2">{{ title }}</h2>
      <p class="text-center mb-8">{{ description }}</p>

      <div class="flex gap-6">
        <Button variant="secondary" @click="$emit('cancel')">
          {{ cancelText }}
        </Button>
        <Button class="flex items-center gap-2" variant="destructive" @click="$emit('confirm')">
          {{ confirmText }}
          <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
        </Button>
      </div>
    </div>
  </div>
</template>
