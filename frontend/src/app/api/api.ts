import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ChartData {
  name: string;
  number: number;
}

export interface CreateTask {
  id: string;
  product_name: string;
  group: string;
  reglament: string;
  code: string;
}

export interface Task1Results {
  answer: boolean;
  coordinates_license: number[][];
  coordinates_producer: number[][];
  error_cell_number: number;
  recommended_error_cell_content: string[];
  table: ChartData[];
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://nustmisisdeathsquad.ru:8080" }),
  endpoints: (build) => ({
    createTask1: build.mutation<Task1Results, CreateTask>({
      query: (body) => ({
        url: `task1`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateTask1Mutation } = api;
