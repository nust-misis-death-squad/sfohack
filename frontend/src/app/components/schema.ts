import * as yup from "yup";
import { CreateTask1, CreateTask2 } from "../api/api";

export const createTask1Form: yup.SchemaOf<CreateTask1> = yup.object({
  id: yup.string().required(),
  product_name: yup.string().required(),
  group: yup.string().required(),
  reglament: yup.string().required(),
  code: yup.string().required(),
});

export const createTask2Form: yup.SchemaOf<CreateTask2> = yup.object({
  id: yup.string().required(),
  product_name: yup.string().required(),
});
