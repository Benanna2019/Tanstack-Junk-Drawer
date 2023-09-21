import { fetchCustomerById, fetchCustomers } from "@/fetchers/customers";
import {
  fetchInvoiceById,
  fetchInvoicesAndCustomers,
} from "@/fetchers/invoices";
import { Loader, LoaderClient, typedClient } from "@tanstack/react-loaders";

const invoicesLoader = new Loader({
  key: "invoices",
  fn: async () => {
    return await fetchInvoicesAndCustomers();
  },
});

const invoiceLoader = new Loader({
  key: "invoice",
  fn: async (invoiceId: string) => {
    return fetchInvoiceById(invoiceId);
  },
  onInvalidate: async ({ client }) => {
    await typedClient(client).invalidateLoader({ key: "invoices" });
  },
});

const customersLoader = new Loader({
  key: "customers",
  fn: async () => {
    return fetchCustomers();
  },
});

const individualCustomerLoader = new Loader({
  key: "customer",
  fn: async (customerId: string) => {
    return fetchCustomerById(customerId);
  },
  onInvalidate: async ({ client }) => {
    await typedClient(client).invalidateLoader({ key: "customers" });
  },
});

export const loaderClient = new LoaderClient({
  loaders: [
    invoicesLoader,
    invoiceLoader,
    customersLoader,
    individualCustomerLoader,
  ],
});
