import * as yup from "yup";

export const deploySchema = [
  yup.object({
    serviceName: yup.string().required("Service name is required"),
    description: yup.string(),
    region: yup.string().required("Region is required"),
    image: yup.string(),
  }),

  yup.object({
    instanceType: yup.string().required("Instance type is required"),
    resources: yup.object({
      vCPU: yup.number().typeError("vCPU is required").required().min(1),
      memory: yup.number().typeError("Memory is required").required().min(1),
      storage: yup.number().required().min(1),
    }),
  }),

  yup.object({
    network: yup.object({
      vpc: yup.string().required("VPC is required"),
      subnet: yup.string().required("Subnet is required"),
      publicIp: yup.boolean(),
    }),
  }),

  yup.object({
    securityGroups: yup
      .array()
      .of(yup.string())
      .min(1, "Select at least one security group")
      .required("Security group is required"),
  }),
];
