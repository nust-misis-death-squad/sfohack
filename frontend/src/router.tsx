import { BrowserRouter, Route } from "react-router-dom";
import Task1Page from "./app/components/Task1Page";
import Task1ResultsPage from "./app/components/Task1ResultsPage";
import SelectTaskPage from "./app/components/SelectTaskPage";
import Task2Page from "./app/components/Task2Page";
import Task2ResultsPage from "./app/components/Task2ResultsPage";

export const ROUTER_CONFIG = {
  MAIN_PAGE: {
    path: "/",
    getPath: () => "/",
    exact: true,
    children: <SelectTaskPage />,
  },
  TASK1_RESULTS_PAGE: {
    path: "/task1/results/:id",
    getPath: ({ id }: { id: string }) => `/task1/results/${id}`,
    exact: true,
    children: <Task1ResultsPage />,
  },
  TASK1_PAGE: {
    path: "/task1",
    getPath: () => "/task1",
    exact: true,
    children: <Task1Page />,
  },
  TASK2_RESULTS_PAGE: {
    path: "/task2/results/:id",
    getPath: ({ id }: { id: string }) => `/task2/results/${id}`,
    exact: true,
    children: <Task2ResultsPage />,
  },
  TASK2_PAGE: {
    path: "/task2",
    getPath: () => "/task2",
    exact: true,
    children: <Task2Page />,
  },
};

export default function AppRouter() {
  return (
    <BrowserRouter>
      {Object.entries(ROUTER_CONFIG).map(([key, route]) => (
        <Route exact={route.exact} path={route.path} key={key}>
          {route.children}
        </Route>
      ))}
    </BrowserRouter>
  );
}
