<script setup>
import { RouterView } from "vue-router";
import ThemeToggle from "./components/utilities/ThemeToggle.vue";
import { Toaster } from "vue-sonner";
</script>

<template>
  <main class="min-h-screen max-w-screen-2xl mx-auto">
    <nav
      class="flex z-10 border-b border-border-gray bg-background-2 sticky top-0 justify-between py-4 px-4 lg:px-9 items-center"
    >
      <h2>Cloud Service Deployment</h2>
      <ThemeToggle />
    </nav>
    <RouterView />
    <Toaster />
  </main>
</template>
