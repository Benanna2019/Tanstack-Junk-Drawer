import { loaderClient } from "@/loaders";
import SideBar from "../components/sidebar";
import { Route, RouterContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { actionClient } from "@/actions";
import { fetchInvoicesAndCustomers } from "@/fetchers/invoices";
import { createLoaderOptions } from "@tanstack/loaders";
import { useLoaderInstance } from "@tanstack/react-loaders";

export const routerContext = new RouterContext<{
  loaderClient: typeof loaderClient;
  actionClient: typeof actionClient;
}>();

export const rootRoute = routerContext.createRootRoute({
  beforeLoad: () => {
    const loaderOptions = createLoaderOptions({
      key: "invoices",
    });

    return { loaderOptions };
  },
  loader: async ({
    preload,
    context: { loaderClient },
    routeContext: { loaderOptions },
  }) => {
    await loaderClient.load({
      ...loaderOptions,
      preload,
    });
  },
  component: ({ useLoader, useRouteContext }) => {
    const { loaderOptions } = useRouteContext();
    const {
      data: {
        invoices: { invoiceListItems },
      },
    } = useLoaderInstance(loaderOptions);
    return (
      <>
        <SideBar invoiceListItems={invoiceListItems} />
        {/* Start rendering router matches */}
        <TanStackRouterDevtools position="bottom-right" />
      </>
    );
  },
});

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => {
    return (
      <div className="p-2">
        <h3>Welcome Home!</h3>
      </div>
    );
  },
});
