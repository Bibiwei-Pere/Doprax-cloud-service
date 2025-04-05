<script setup>
import { ref, onMounted } from "vue";
import { Moon, Sun } from "lucide-vue-next"; // or use `lucide-vue` if using older version

const isDark = ref(false);

onMounted(() => {
  const storedTheme = localStorage.getItem("dashboard-theme");
  if (storedTheme === "dark") {
    document.documentElement.classList.add("dark");
    isDark.value = true;
  }
});

const toggleTheme = () => {
  const newTheme = isDark.value ? "light" : "dark";
  isDark.value = !isDark.value;
  localStorage.setItem("dashboard-theme", newTheme);
  document.documentElement.classList.toggle("dark");
};
</script>

<template>
  <button
    @click="toggleTheme"
    class="flex items-center cursor-pointer text-foreground hover:bg-blue-700 hover:text-white bg-border h-full p-2 rounded-full"
  >
    <component :is="isDark ? Sun : Moon" class="w-5 h-5" />
  </button>
</template>
