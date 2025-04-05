<script setup>
import { Field, ErrorMessage } from "vee-validate";
import Label from "../utilities/Label.vue";
import Input from "../utilities/Input.vue";
import Radio from "../utilities/Radio.vue";

const instanceTypes = [
  {
    label: "Standard (General Purpose)",
    value: "standard",
    description: "Balanced compute, memory, and networking",
  },
  {
    label: "Compute Optimized",
    value: "compute",
    description: "High performance processors",
  },
  {
    label: "Memory Optimized",
    value: "memory",
    description: "Fast performance for memory-intensive workloads",
  },
  {
    label: "Storage Optimized",
    value: "storage",
    description: "Low latency, high disk throughput",
  },
];

const resourceFields = [
  { key: "vCPU", label: "vCPU", name: "resources.vCPU" },
  { key: "memory", label: "Memory (GB)", name: "resources.memory" },
  { key: "storage", label: "Storage (GB)", name: "resources.storage" },
];
</script>

<template>
  <div class="flex flex-col gap-7 lg:gap-10 max-w-[1000px] w-full">
    <div class="flex flex-col gap-1 lg:gap-2">
      <h3>Resource Configuration</h3>
      <p>Configure the compute resources for your service</p>
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-1 mb-1">
        <h4>Instance Type</h4>
        <p>Select the type of instance that best fits your workload</p>
      </div>
      <Field name="instanceType" v-slot="{ value, handleChange }">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3" v-for="option in instanceTypes" :key="option.value">
            <div
              role="radio"
              tabindex="0"
              class="flex items-center gap-3 cursor-pointer"
              :aria-checked="value === option.value"
              @click="handleChange(option.value)"
              @keyup.enter.space="handleChange(option.value)"
            >
              <Radio :checked="value === option.value" />
              <Label class="flex flex-col cursor-pointer" :for="option.value"
                >{{ option.label }}
                <p class="text-sm relative -mt-2">{{ option.description }}</p>
              </Label>
            </div>
          </div>
        </div>
      </Field>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="fieldDef in resourceFields" :key="fieldDef.key" class="flex flex-col gap-2">
        <Label :required="true" :for="fieldDef.key">{{ fieldDef.label }}</Label>

        <Field :name="fieldDef.name" v-slot="{ field, errorMessage }">
          <Input type="number" min="1" v-bind="field" :hasError="!!errorMessage" />
          <ErrorMessage class="text-red-500 text-sm" name="fieldDef.name" />
        </Field>
      </div>
    </div>
  </div>
</template>
