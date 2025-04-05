<script setup>
import { ref } from "vue";
import { useFormContext, Field, ErrorMessage } from "vee-validate";
import Image from "../icons/Image.vue";
import Delete from "../icons/Delete.vue";
import Cloud from "../icons/Cloud.vue";
import Label from "../utilities/Label.vue";
import Input from "../utilities/Input.vue";
import Textarea from "../utilities/Textarea.vue";
import Select from "../utilities/Select.vue";
import { regions } from "@/assets/data";
import { useUploadImage } from "@/hooks/useDeploy";
import { Loader } from "lucide-vue-next";

const { setFieldValue, values } = useFormContext();
const { mutation } = useUploadImage();

const props = defineProps({
  user: Object,
  isEdit: Boolean,
});

const fileInputRef = ref(null);

const triggerFileInput = () => fileInputRef.value?.click();

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0];
  if (!selectedFile) return;
  const formData = new FormData();
  formData.append("file", selectedFile);

  mutation.mutate(formData, {
    onSuccess: (response) => {
      setFieldValue("image", response.data.data.signedUrl);
    },
  });
};

const handleDelete = () => {
  setFieldValue("image", null);
};
</script>

<template>
  <div class="flex flex-col gap-8 max-w-[1000px] w-full">
    <div class="flex flex-col gap-2">
      <h3>Service Basics</h3>
      <p>Provide basic information about your cloud service</p>
    </div>
    <div
      v-if="mutation.isPending.value"
      class="flex flex-col gap-2 justify-center items-center dark:bg-black text-gray-600 bg-gray-100 h-[100px] max-w-[110px] w-full overflow-hidden rounded-xl"
    >
      <Loader class="w-10 h-10 animate-spin" />
    </div>

    <div class="flex flex-col gap-7">
      <div v-if="!mutation.isPending.value">
        <div v-if="!isEdit" class="flex gap-4 items-center">
          <div
            v-if="values.image"
            class="flex items-center text-gray-600 bg-gray-100 h-[100px] max-w-[110px] w-full overflow-hidden rounded-xl"
          >
            <img :src="values.image" alt="avatar" class="h-full w-full object-cover" />
          </div>
          <div
            v-else
            class="flex flex-col gap-2 justify-center items-center dark:bg-black text-gray-600 bg-gray-100 h-[100px] max-w-[110px] w-full overflow-hidden rounded-xl"
          >
            <Image class="w-4 h-4" />
            <p class="text-xs">Cover Image</p>
          </div>
          <div class="flex w-full gap-2">
            <button
              type="button"
              class="max-w-14 w-full border hover:border-foreground-reverse rounded-lg h-14"
              @click="triggerFileInput"
            >
              <Cloud class="mx-auto w-5 h-5" />
            </button>
            <button
              type="button"
              class="max-w-14 w-full border hover:text-blue-600 hover:border-foreground-reverse rounded-lg h-14"
              @click="handleDelete"
            >
              <Delete class="mx-auto w-5 h-5" />
            </button>
          </div>

          <input
            ref="fileInputRef"
            id="file-upload"
            name="file-upload"
            type="file"
            accept="image/png, image/jpeg"
            class="hidden"
            @change="handleFileChange"
          />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <Label :required="true" for="serviceName">Service Name</Label>

        <Field name="serviceName" v-slot="{ field, errorMessage }">
          <Input v-bind="field" :hasError="Boolean(errorMessage)" />
        </Field>
        <ErrorMessage class="text-red-500 text-sm" name="serviceName" />
      </div>

      <div class="flex flex-col gap-2">
        <Label for="description">Description</Label>
        <Field name="description" v-slot="{ field }">
          <Textarea v-bind="field" />
        </Field>
      </div>

      <div class="flex flex-col gap-2">
        <Label :required="true" for="region">Region</Label>
        <Field name="region" v-slot="{ field, errorMessage }">
          <Select
            :modelValue="field.value"
            @update:modelValue="field.onChange"
            :hasError="Boolean(errorMessage)"
            :options="regions"
          />
        </Field>
        <ErrorMessage class="text-red-500 text-sm" name="region" />
      </div>
    </div>
  </div>
</template>
