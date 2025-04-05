import { defineStore } from "pinia";

export const useDeployStore = defineStore("deploy", {
  state: () => ({
    deployedData: null,
  }),
  actions: {
    setDeployedData(data) {
      this.deployedData = data;
    },
  },
  persist: true,
});
