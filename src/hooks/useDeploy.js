import { useDeployStore } from "@/stores/deploy";
import { useMutation } from "@tanstack/vue-query";
import axios from "axios";
import { toast } from "vue-sonner";

const axiosInstance = axios.create({
  baseURL: "https://reqres.in/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosInstance2 = axios.create({
  baseURL: "https://api.scholarly.pro",
  headers: {
    "Content-Type": "application/json",
  },
});

export function useUpdateUser() {
  const deployStore = useDeployStore();

  const mutation = useMutation({
    mutationFn: (data) => axiosInstance.put(`/users/${data.id}`, data),
    onError: () => toast.success("Failed to update cloud service, please try again"),
    onSuccess: (response, variables) => {
      deployStore.setDeployedData({
        ...response.data,
        image: variables.image,
      });
      toast.success("Cloud service successfully updated!");
    },
  });

  return mutation;
}

export function usePostUser() {
  const deployStore = useDeployStore();

  const mutation = useMutation({
    mutationFn: (data) => axiosInstance.post(`/users`, data), // Fixed URL typo: `/users}` -> `/users`
    onError: (error) => {
      console.error("Create Error:", error.response?.data || error.message);
    },
    onSuccess: (response, variables) => {
      deployStore.setDeployedData({
        ...response.data,
        image: variables.image,
      });
    },
  });

  return mutation;
}

export function useDeleteUser() {
  const deployStore = useDeployStore();
  return useMutation({
    mutationFn: (id) => axiosInstance.delete(`/users/${id}`),
    onError: () => {
      deployStore.setDeployedData(null);
      toast.success("Cloud service successfully deleted!");
    },
    onSuccess: () => {
      deployStore.setDeployedData(null);
      toast.success("Cloud service successfully deleted!");
    },
  });
}

export const useUploadImage = () => {
  const mutation = useMutation({
    mutationFn: (data) => {
      return axiosInstance2.post("/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onError: (error) => {
      console.log(error.response);
    },
    onSuccess: (response) => {
      console.log("Success:", response.data);
    },
  });

  return { mutation };
};
