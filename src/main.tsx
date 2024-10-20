import { ITEM_DETAILS_PATH } from "@config/paths.ts";
import theme from "@config/theme.ts";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { itemDetailsLoader } from "./loaders/itemDetailsPageLoader.ts";
import ErrorPage from "./routes/ErrorPage.tsx";
import ItemDetailsPage from "./routes/ItemDetailsPage.tsx";
import Root from "./routes/Root.tsx";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@styles/global.css";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: `${ITEM_DETAILS_PATH}/:persistentId`,
    element: <ItemDetailsPage />,
    loader: itemDetailsLoader,
    errorElement: <ErrorPage />,
  },
]);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Notifications />
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>,
);
