import { Link, Outlet, useMatches, useParams } from "@tanstack/react-router";
import type {
  ParseRoute,
  RouteIds,
  RegisteredRouter,
} from "@tanstack/react-router";
// import clsx from "clsx";
// import { useSpinDelay } from "spin-delay";
import {
  FullFakebooksLogo,
  //   LogoutIcon,
  //   SpinnerIcon,
  UpRightArrowIcon,
} from "./icons";
import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import { useLoaderInstance } from "@tanstack/react-loaders";

export default function SideBar({
  invoiceListItems,
}: {
  invoiceListItems: any;
}) {
  const { isSignedIn } = useUser();

  const routes = useMatches();
  const params = useParams({ strict: false });
  console.log("params", params);
  const isInvoiceIdRoute = routes.some(
    (r) => r.routeId === "/sales/invoices/$invoiceId"
  );

  const invoicesToRender =
    isInvoiceIdRoute && params.invoiceId
      ? invoiceListItems.filter(
          (invoice: any) => invoice.id === params.invoiceId
        )
      : null;

  console.log("isInvoiceIdRoute", isInvoiceIdRoute);
  console.log("routes", routes);
  return (
    <div className="relative flex h-screen rounded-lg bg-white text-gray-600">
      <div className="border-r border-gray-100 bg-gray-50">
        <div className="p-4">
          <div className="flex flex-wrap items-center gap-1">
            <Link
              to="."
              preload="intent"
              className="my-1 py-1 px-2 pr-16 text-[length:14px]"
              activeProps={{
                className: "rounded-md bg-gray-100",
              }}
            >
              <FullFakebooksLogo size="sm" position="left" />
            </Link>
            {/* <Spinner visible={showSpinner} /> */}
          </div>
          <div className="h-7" />
          <div className="flex flex-col font-bold text-gray-800">
            <Link
              to="/"
              preload="intent"
              className="my-1 py-1 px-2 pr-16 text-[length:14px]"
              activeProps={{
                className: "rounded-md bg-gray-100",
              }}
            >
              Dashboard
            </Link>
            {/* <NavItem to="accounts">Accounts</NavItem>*/}
            <Link
              to="/sales"
              preload="intent"
              className="my-1 py-1 px-2 pr-16 text-[length:14px]"
              activeProps={{
                className: "rounded-md bg-gray-100",
              }}
            >
              Sales
            </Link>
            {/*<NavItem to="expenses">Expenses</NavItem>
            <NavItem to="reports">Reports</NavItem> */}
            {isInvoiceIdRoute && (
              <>
                {invoicesToRender.map((invoice: any) => (
                  <Link
                    key={invoice.id}
                    to="/sales/invoices/$invoiceId"
                    params={{ invoiceId: invoice.id }}
                    preload="intent"
                    className="my-1 py-1 px-2 pr-16 text-[length:14px]"
                    activeProps={{
                      className: "rounded-md bg-gray-100",
                    }}
                  >
                    {invoice.name}
                  </Link>
                ))}
              </>
            )}
            <a
              href="https://github.com/FrontendMasters/advanced-remix"
              className="my-1 flex gap-1 py-1 px-2 pr-16 text-[length:14px]"
            >
              GitHub <UpRightArrowIcon />
            </a>
            {/* if the this is an invoice route map over list of invoicelineitems and display invoice ids */}

            {isSignedIn ? <SignOutButton /> : <SignInButton />}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

// function Spinner({ visible }: { visible: boolean }) {
//   return (
//     <SpinnerIcon
//       className={clsx("animate-spin transition-opacity", {
//         "opacity-0": !visible,
//         "opacity-100": visible,
//       })}
//     />
//   );
// }
