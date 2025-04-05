<script setup>
import { instanceLabelMap } from "@/assets/data";
import { CheckCircle } from "lucide-vue-next";
import { useFormContext } from "vee-validate";

const { values } = useFormContext();

const reviewData = [
  { label: "Service Name", value: values.serviceName || "--" },
  { label: "Description", value: values.description || "--" },
  { label: "Region", value: values.region || "--" },
  { label: "Instance Type", value: instanceLabelMap[values.instanceType] || values.instanceType || "--" },
  {
    label: "Resources",
    value: `${values.resources?.vCPU} vCPU, ${values.resources?.memory} GB Memory, ${values.resources?.storage} GB Storage`,
  },
];

const networkData = [
  { label: "VPC", value: values.network?.vpc || "--" },
  { label: "Subnet", value: values.network?.subnet || "--" },
  { label: "Public IP", value: values.network?.publicIp ? "Yes" : "No" },
];
</script>

<template>
  <div class="flex flex-col w-full gap-6">
    <div class="flex flex-col gap-3">
      <div class="flex gap-2">
        <CheckCircle class="h-7 w-7 text-green-600" />
        <h2>Review Configuration</h2>
      </div>
      <p>Please review your service configuration before deployment.</p>
    </div>

    <div class="bg-background-1 w-full dark:border rounded-xl">
      <h3 class="font-medium px-4 lg:px-8 py-6">Service Summary</h3>
      <div class="flex flex-col gap-4">
        <div class="grid gap-2 sm:gap-0 sm:grid-cols-[40%,1fr] px-4 lg:px-8 py-5 border-border-gray sm:border-y">
          <p>Cover Image</p>
          <img :src="values.image" alt="Cover Image" class="h-[110px] w-[100px] object-cover rounded-md" />
        </div>

        <div
          v-for="field in reviewData"
          :key="field.label"
          class="grid gap-2 sm:gap-0 sm:grid-cols-[40%,1fr] px-4 lg:px-8 pt-1 sm:pt-2 pb-1 sm:pb-6 border-border-gray sm:border-b"
        >
          <p>{{ field.label }}</p>
          <h6>{{ field.value }}</h6>
        </div>

        <div
          class="grid gap-2 sm:gap-0 sm:grid-cols-[40%,1fr] px-4 lg:px-8 pt-3 pb-7 relative border-border-gray sm:border-b"
        >
          <p>Network</p>
          <div class="flex flex-col flex-wrap gap-1 sm:gap-2">
            <span v-for="group in networkData" :key="group"> {{ group.label }}: {{ group.value }} </span>
          </div>
        </div>

        <div class="grid gap-2 sm:gap-0 sm:grid-cols-[40%,1fr] px-4 lg:px-8 pt-3 pb-7 relative">
          <p>Security Groups</p>
          <div class="flex flex-col flex-wrap gap-2">
            <span
              v-for="group in values.securityGroups"
              :key="group"
              class="border border-border-gray p-2 sm:p-3 rounded-lg"
            >
              {{ group }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-blue-50 px-6 py-5 rounded-lg mt-4">
      <p class="font-medium text-blue-800">Ready to deploy</p>
      <p class="text-sm text-blue-600 mt-2">
        Your service is ready for deployment. Click the Deploy button below to start the deployment process.
      </p>
    </div>
  </div>
</template>
