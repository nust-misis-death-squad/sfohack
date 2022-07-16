import { BrowserRouter, Route } from "react-router-dom";
import GroupPredictionPage from "./app/components/GroupPredictionPage";
import GroupPredictionResultsPage from "./app/components/GroupPredictionResultsPage";

export const ROUTER_CONFIG = {
  MAIN_PAGE: {
    path: "/",
    getPath: () => "/",
    exact: true,
    children: <GroupPredictionPage />,
  },
  RESULTS_PAGE: {
    path: "/results/:id",
    getPath: ({ id }: { id: string }) => `/results/${id}`,
    exact: true,
    children: <GroupPredictionResultsPage />,
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
