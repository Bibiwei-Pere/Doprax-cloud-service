<script setup>
import { ref, computed } from "vue";
import Basics from "../components/steps/Basics.vue";
import Resources from "../components/steps/Resources.vue";
import Network from "../components/steps/Network.vue";
import Review from "../components/steps/Review.vue";
import { Form } from "vee-validate";
import Button from "../components/utilities/Button.vue";
import { deploySchema } from "@/assets/schema";
import { stepsData } from "@/assets/data";
import { usePostUser } from "@/hooks/useDeploy";
import { Loader2 } from "lucide-vue-next";
import Success from "../components/modals/Success.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const currentStep = ref(0);
const mutation = usePostUser();
const steps = [Basics, Resources, Network, Review];
const currentComponent = computed(() => steps[currentStep.value]);

const currentSchema = computed(() => deploySchema[currentStep.value]);

function nextStep() {
  if (currentStep.value === 3) return;
  currentStep.value++;
  scrollToTop();
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--;
    scrollToTop();
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
</script>

<template>
  <section class="px-4 py-9 lg:p-10">
    <div
      v-if="mutation.status.value === 'success'"
      class="bg-background-2 dark:border lg:min-h-[80vh] h-full flex flex-col gap-10 rounded-xl shadow-md mx-auto px-4 py-6 md:p-6 lg:p-9"
    >
      <Success
        @confirm="() => router.push('/service')"
        title="Cloud Service Successfully Deployed"
        description="Click on the button below to view and manage your cloud service"
        confirmText="View cloud service"
        icon="check"
      />
    </div>

    <div
      v-else
      class="bg-background-2 dark:border flex flex-col gap-10 rounded-xl shadow-md mx-auto px-4 py-6 md:p-6 lg:p-9"
    >
      <h1>Configure New Cloud Service</h1>
      <div class="flex flex-col gap-16">
        <div class="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10">
          <div
            v-for="step in stepsData"
            :key="step.id"
            class="pl-4 lg:pl-0 py-2 lg:py-0 lg:pt-6 flex flex-col gap-1 border-l-[5px] lg:border-l-0 lg:border-t-[5px]"
            :class="{
              'border-blue-600': currentStep === step.id,
              'border-gray-200 dark:border-white': currentStep !== step.id,
            }"
          >
            <h5
              :class="{
                'text-blue-600 hover:text-gray-600': currentStep === step.id,
              }"
            >
              Step {{ step.id + 1 }}
            </h5>
            <h4>{{ step.label }}</h4>
            <p>{{ step.description }}</p>
          </div>
        </div>

        <Form
          :initial-values="{
            region: 'US West (N. California)',
            resources: {
              vCPU: 2,
              memory: 4,
              storage: 100,
            },
            instanceType: 'standard',
            network: {
              vpc: 'Development VPC',
              subnet: 'Development Subnet (AZ-b)',
              publicIp: true,
            },
            securityGroups: ['Web Traffic (80, 443)'],
          }"
          :validation-schema="currentSchema"
          keep-values
          v-slot="{ values, validate }"
        >
          <component :is="currentComponent" />
          <div class="flex border-t-2 justify-between mt-16 lg:mt-24 pt-5">
            <Button variant="secondary" @click="prevStep" :disabled="currentStep === 0">Back</Button>
            <Button
              v-if="currentStep !== 3"
              @click="
                async () => {
                  const result = await validate();
                  if (result.valid) nextStep();
                }
              "
            >
              Next
            </Button>

            <Button
              :disabled="mutation.isPending.value"
              class="flex gap-2 items-center"
              v-if="currentStep === 3"
              @click="() => mutation.mutate(values)"
              >Deploy
              <Loader2 v-if="mutation.isPending.value" class="w-4 h-4 animate-spin" />
            </Button>
          </div>
        </Form>
      </div>
    </div>
  </section>
</template>
