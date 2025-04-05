<script setup>
import ServiceForm from "../utilities/ServiceForm.vue";
import Edit from "../icons/Trash.vue";
import Delete from "../icons/Delete2.vue";
import DeleteModal from "@/components/modals/Delete.vue";
import { useDeployStore } from "@/stores/deploy";
import { ref } from "vue";
import { useDeleteUser } from "@/hooks/useDeploy";

const deployStore = useDeployStore();
const deleteMutation = useDeleteUser();
const showDeleteModal = ref(false);

const handleDelete = () => {
  console.log("asdsdd");
  if (deployStore.deployedData) {
    deleteMutation.mutate(
      { id: deployStore.deployedData.id },
      {
        onSuccess: () => {
          showDeleteModal.value = false;
        },
      }
    );
  } else return;
};

defineProps({
  service: Object,
});
const emit = defineEmits(["close"]);
</script>

<template>
  <section>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div
        class="w-full max-w-[95%] mt-[68px] sm:mt-0 pb-24 mx-auto sm:mx-0 sm:max-w-[480px] h-full bg-background-2 overflow-y-auto"
      >
        <div
          class="flex justify-between items-center mb-6 px-4 md:px-6 py-4 sticky top-0 bg-background-2 border-b border-border-gray"
        >
          <h2>Cloud service details</h2>
          <div class="flex gap-5">
            <button
              @click="
                () => {
                  emit('close');
                  $emit('edit');
                }
              "
              class="p-2 hover:bg-border rounded-full"
            >
              <Edit class="w-5 h-5" />
            </button>
            <button @click="() => (showDeleteModal = true)" class="p-2 hover:bg-border rounded-full">
              <Delete class="w-5 h-5" />
            </button>
            <button
              @click="$emit('close')"
              class="p-2 bg-border w-[40px] dark:text-white dark:hover:text-black hover:bg-gray-200 rounded-full"
            >
              ✕
            </button>
          </div>
        </div>

        <ServiceForm :values="service" :isEdit="true" />
      </div>

      <DeleteModal
        :visible="showDeleteModal"
        :loading="deleteMutation.isPending.value"
        @cancel="showDeleteModal = false"
        @confirm="handleDelete"
        title="Delete this cloud service"
        description="Are you sure you want to delete this cloud service?"
        confirmText="Yes delete"
        cancelText="No, cancel"
        icon="delete"
      />
    </div>
  </section>
</template>
