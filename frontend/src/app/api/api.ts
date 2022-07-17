import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ChartData {
  name: string;
  number: number;
}

export interface CreateTask1 {
  id: string;
  product_name: string;
  group: string;
  reglament: string;
  code: string;
}

export interface CreateTask2 {
  id: string;
  product_name: string;
}

export interface Task1Results {
  answer: boolean;
  coordinates_license: number[][];
  coordinates_producer: number[][];
  error_cell_number: number;
  recommended_error_cell_content: string[];
  table: ChartData[];
}

export interface Task2Results {
  recommendation_groups: string[];
  recommendation_reglament: string[];
  recommendation_code: string[];
  coordinates_license: number[][];
  coordinates_producer: number[][];
  table: ChartData[];
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://nustmisisdeathsquad.ru:8080" }),
  endpoints: (build) => ({
    createTask1: build.mutation<Task1Results, CreateTask1>({
      query: (body) => ({
        url: `task1`,
        method: "POST",
        body,
      }),
    }),
    createTask2: build.mutation<Task2Results, CreateTask2>({
      query: (body) => ({
        url: `task2`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateTask1Mutation, useCreateTask2Mutation } = api;
