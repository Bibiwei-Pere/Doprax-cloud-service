<script setup>
const props = defineProps({
  values: Object,
  isEdit: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      :class="{
        'border-b pb-10 md:px-6 sm:grid-cols-1 sm:gap-2': isEdit,
      }"
      class="grid gap-2 sm:gap-0 sm:grid-cols-[40%,1fr] px-4 lg:px-8 py-5 border-border-gray sm:border-y"
    >
      <p>Cover Image</p>
      <img :src="values.image" alt="Cover Image" class="h-[110px] bg-black w-[100px] object-cover rounded-md" />
    </div>
    <div
      v-for="field in values.reviewData"
      :key="field.label"
      :class="{
        'border-b h-auto pb-5 sm:grid-cols-1 sm:gap-2': isEdit,
      }"
      class="grid gap-3 sm:gap-0 sm:grid-cols-[40%,1fr] px-4 lg:px-8 py-1 h-16 border-border-gray sm:border-b"
    >
      <p>{{ field.label }}</p>
      <h6>{{ field.value }}</h6>
    </div>

    <div
      :class="{
        'border-b h-auto pb-5 sm:grid-cols-1 sm:gap-2': isEdit,
      }"
      class="grid gap-3 sm:gap-0 sm:grid-cols-[40%,1fr] px-4 lg:px-8 pt-3 pb-7 relative border-border-gray sm:border-b"
    >
      <p>Network</p>
      <div class="flex flex-col flex-wrap gap-2 sm:gap-3">
        <h6 v-for="group in values.networkData" :key="group">{{ group.label }}: {{ group.value }}</h6>
      </div>
    </div>

    <div
      :class="{
        'h-auto pb-5 sm:grid-cols-1 sm:gap-2': isEdit,
      }"
      class="grid gap-3 sm:gap-0 sm:grid-cols-[40%,1fr] px-4 lg:px-8 pt-3 pb-7 relative"
    >
      <p>Security Groups</p>
      <div class="flex flex-col flex-wrap gap-2">
        <h6 v-for="group in values.securityGroups" :key="group" class="border border-border-gray p-2 sm:p-3 rounded-lg">
          {{ group }}
        </h6>
      </div>
    </div>
  </div>
</template>
