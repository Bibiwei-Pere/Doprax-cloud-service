<script setup>
import { Field, ErrorMessage, useField } from "vee-validate";
import Label from "../utilities/Label.vue";
import Select from "../utilities/Select.vue";
import Checkbox from "../utilities/Checkbox.vue";

const securityGroups = ["Web Traffic (80, 443)", "SSH Access (22)", "Database (3306, 5432)", "Internal Only"];

const configureFields = [
  {
    key: "vpc",
    label: "Virtual Private Cloud (VPC)",
    name: "network.vpc",
    arr: ["Development VPC", "Development BPP"],
  },
  {
    key: "subnet",
    label: "Subnet",
    name: "network.subnet",
    arr: ["Development Subnet (AZ-b)", "Development Subnet AXS"],
  },
];

const {
  value: selectedGroups,
  errorMessage: securityGroupError,
  handleChange: updateSecurityGroups,
} = useField("securityGroups");
</script>

<template>
  <div class="flex flex-col gap-7 lg:gap-10 max-w-[1000px] w-full">
    <div class="flex flex-col gap-1 lg:gap-2">
      <h3>Network Settings</h3>
      <p>Configure the network settings for your cloud service.</p>
    </div>
    <div class="flex flex-col gap-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="fieldDef in configureFields" :key="fieldDef.key" class="flex flex-col lg:gap-2">
          <Label :required="true" :for="fieldDef.key">{{ fieldDef.label }}</Label>

          <Field :name="fieldDef.name" v-slot="{ field, errorMessage }">
            <Select
              :modelValue="field.value"
              @update:modelValue="field.onChange"
              :hasError="Boolean(errorMessage)"
              :options="fieldDef.arr"
            />

            <ErrorMessage class="text-red-500 text-sm" :name="fieldDef.name" />
          </Field>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <Field name="network.publicIp" v-slot="{ value, handleChange }">
          <div class="flex items-center gap-2">
            <Checkbox :checked="value" @update:checked="handleChange" />
            <Label for="publicIp">Assign public IP address</Label>
          </div>
        </Field>
        <p>Enable this to make your service accessible from the internet</p>
      </div>

      <div class="flex flex-col gap-3">
        <Label required>Security Groups</Label>

        <div class="flex items-center gap-3" v-for="option in securityGroups" :key="option">
          <Checkbox
            :checked="selectedGroups.includes(option)"
            @update:checked="
              (checked) => {
                const selected = [...selectedGroups];
                if (checked) {
                  selected.push(option);
                } else {
                  const index = selected.indexOf(option);
                  if (index !== -1) selected.splice(index, 1);
                }
                updateSecurityGroups(selected);
              }
            "
          />
          <Label :for="option">{{ option }}</Label>
        </div>

        <p v-if="securityGroupError" class="text-red-500 text-sm">{{ securityGroupError }}</p>
      </div>

      <!-- <div class="flex flex-col gap-3">
        <Label required>Security Groups</Label>
        <div class="flex items-center gap-3" v-for="option in securityGroups" :key="option">
          <input
            type="checkbox"
            :id="option"
            :value="option"
            :checked="selectedGroups.includes(option)"
            @change="
              (e) => {
                const selected = [...selectedGroups];
                if (e.target.checked) {
                  selected.push(option);
                } else {
                  const index = selected.indexOf(option);
                  if (index !== -1) selected.splice(index, 1);
                }
                updateSecurityGroups(selected);
              }
            "
            class="w-4 h-4"
          />
          <Label :for="option">{{ option }}</Label>
        </div>
        <p v-if="securityGroupError" class="text-red-500 text-sm">{{ securityGroupError }}</p>
      </div> -->
    </div>
  </div>
</template>
