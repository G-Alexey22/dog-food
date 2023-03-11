import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  useLocation,
  useRoutes,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import App from "./App";
import { First } from "./Pages/First";
import { Catalog } from "./Pages/Catalog";
import { Favorites } from "./Pages/Favorites";
import { Basket } from "./Pages/Basket";
import { Signup } from "./Pages/Signup";
import { Signin } from "./Pages/Signin";
import { Products } from "./Pages/Products";
import { User } from "./Pages/User";
import { Error } from "./Pages/Error";
import { AnimatePresence } from "framer-motion";

const AppRouter = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <First />,
        },
        {
          path: "products",
          element: <Catalog />,
        },
        {
          path: "products/:productId",
          element: <Products />,
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
        {
          path: "user",
          element: <User />,
        },
        {
          path: "*",
          element: <Error />,
        },
      ],
    },
  ]);

  const location = useLocation();

  if (!element) return null;
  return (
    <AnimatePresence mode="wait">
      {React.cloneElement(element, { key: location.pathname })}
    </AnimatePresence>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
