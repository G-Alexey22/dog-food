import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import App from "./App";
import { FirstPage } from "./Pages/FirstPage";
import { Catalog } from "./Pages/Catalog";
import { Favorites } from "./Pages/Favorites";
import { Basket } from "./Pages/Basket";
import { Signup } from "./Pages/Signup";
import { Signin } from "./Pages/Signin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <FirstPage />,
      },
      {
        path: "products",
        element: <Catalog />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "basket",
        element: <Basket />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
