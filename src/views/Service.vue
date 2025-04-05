<script setup>
import { useDeployStore } from "../stores/deploy";
import Delete from "../components/icons/Delete2.vue";
import Edit from "../components/icons/Trash.vue";
import Button from "../components/utilities/Button.vue";
import ServiceDetails from "../components/modals/ServiceDetails.vue";
import DeleteModal from "../components/modals/Delete.vue";
import Success from "../components/modals/Success.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { instanceLabelMap } from "@/assets/data";
import { Form } from "vee-validate";
import Basics from "../components/steps/Basics.vue";
import Resources from "../components/steps/Resources.vue";
import Network from "../components/steps/Network.vue";
import { useUpdateUser } from "@/hooks/useDeploy";
import { useDeleteUser } from "@/hooks/useDeploy";
import { deploySchema } from "@/assets/schema";
import { Loader2 } from "lucide-vue-next";
import { onMounted } from "vue";
import { nextTick } from "vue";

const router = useRouter();
const deployStore = useDeployStore();
const mutation = useUpdateUser();
const deleteMutation = useDeleteUser();

const showServiceDetails = ref(false);
const showDeleteModal = ref(false);
const showEditFormOnly = ref(false);
const selectedService = ref(null);

const openDetails = (values) => {
  selectedService.value = {
    image: values.image,
    reviewData: [
      { label: "Service Name", value: values.serviceName || "--" },
      { label: "Description", value: values.description || "--" },
      { label: "Region", value: values.region || "--" },
      { label: "Instance Type", value: instanceLabelMap[values.instanceType] || values.instanceType || "--" },
      {
        label: "Resources",
        value: `${values.resources?.vCPU} vCPU, ${values.resources?.memory} GB Memory, ${values.resources?.storage} GB Storage`,
      },
    ],
    networkData: [
      { label: "VPC", value: values.network?.vpc || "--" },
      { label: "Subnet", value: values.network?.subnet || "--" },
      { label: "Public IP", value: values.network?.publicIp ? "Yes" : "No" },
    ],
    securityGroups: values.securityGroups || [],
  };
  showServiceDetails.value = true;
};

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
</script>

<template>
  <section class="px-4 py-9 lg:p-10">
    <div
      v-if="showEditFormOnly"
      class="bg-background-2 min-h-[80vh] h-full dark:border flex flex-col gap-6 rounded-xl shadow-md mx-auto px-4 py-6 md:p-6 lg:p-9"
    >
      <Form
        :initial-values="deployStore.deployedData"
        :validation-schema="deploySchema"
        keep-values
        v-slot="{ values }"
        class="flex flex-col gap-20"
      >
        <Basics :isEdit="true" />
        <Resources />
        <Network />
        <div class="flex border-t-2 justify-end gap-4 pt-5">
          <Button variant="secondary" @click="() => (showEditFormOnly = false)">Cancel</Button>

          <Button
            :disabled="mutation.isPending.value"
            class="flex gap-2 items-center"
            @click="() => mutation.mutate(values)"
            >Save changes
            <Loader2 v-if="mutation.isPending.value" class="w-4 h-4 animate-spin" />
          </Button>
        </div>
      </Form>
    </div>

    <div
      v-else
      class="bg-background-2 min-h-[80vh] h-full dark:border flex flex-col gap-6 rounded-xl shadow-md mx-auto px-4 py-6 md:p-6 lg:p-9"
    >
      <h2>Your Cloud Services</h2>

      <Success
        v-if="!deployStore.deployedData"
        @confirm="() => router.push('/')"
        title="No cloud services yet"
        description="Click on the button below to create and manage a cloud service"
        confirmText="Create a cloud service"
      />

      <div v-else class="border border-border-gray rounded-lg py-5 sm:max-w-[500px] w-full">
        <div class="px-4 flex flex-col gap-2" v-if="deployStore.deployedData">
          <img :src="deployStore.deployedData?.image" class="h-20 w-20 object-cover mb-4 rounded-md border" />
          <h1>{{ deployStore.deployedData.serviceName || "--" }}</h1>
          <p>{{ deployStore.deployedData.description || "--" }}</p>
        </div>
        <div class="flex items-center justify-between gap-2 mt-4 p-4 border-t">
          <div class="flex gap-5">
            <button @click="() => (showEditFormOnly = true)" class="p-3 hover:bg-border rounded-full">
              <Edit class="w-5 h-5" />
            </button>
            <button @click="() => (showDeleteModal = true)" class="p-3 hover:bg-border rounded-full">
              <Delete class="w-5 h-5" />
            </button>
          </div>
          <Button @click="openDetails(deployStore.deployedData)" class="bg-blue-600 text-white px-4 py-2 rounded-md">
            View details
          </Button>
        </div>
      </div>

      <ServiceDetails
        v-if="showServiceDetails"
        :service="selectedService"
        @close="showServiceDetails = false"
        @edit="
          () => {
            showServiceDetails = false;
            nextTick(() => {
              showEditFormOnly = true;
            });
          }
        "
      />
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
  </section>
</template>
