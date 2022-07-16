import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface CreateTask {
  id: number;
  product_name: string;
  group: string;
  reglament: string;
  code: number;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://nustmisisdeathsquad.ru:8080" }),
  endpoints: (build) => ({
    createTask1: build.mutation<void, CreateTask>({
      query: (body) => ({
        url: `task1`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateTask1Mutation } = api;
