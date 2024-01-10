import { Customer } from "@/types";
import axios from "axios";
import type { Invoice, InvoiceDetails } from "../../models/invoiceserver";
import { queryOptions } from "@tanstack/react-query";

export const fetchInvoicesAndCustomers = async () => {
  console.log("Fetching invoices...");
  await new Promise((r) => setTimeout(r, 500));
  const invoices = await axios
    .get<InvoicesType>("http://localhost:8080/invoices")
    .then((r) => r.data);
  const customers = await axios
    .get<Customer[]>("http://localhost:8080/customers")
    .then((r) => r.data);
  return { invoices, customers };
};

export const fetchInvoiceById = async (invoiceId: string) => {
  console.log(`Fetching invoice by id ${invoiceId}...`);
  await new Promise((r) => setTimeout(r, 500));
  const invoice = await axios
    .get<InvoiceDetails>(`http://localhost:8080/invoices/${invoiceId}`)
    .then((r) => r.data);
  return {
    data: invoice,
  };
};

export const invoicesQueryOptions = () =>
  queryOptions({
    queryKey: ["invoices"],
    queryFn: () => fetchInvoicesAndCustomers(),
  });

export const invoiceByIdQueryOptions = (invoiceId: string) =>
  queryOptions({
    queryKey: ["invoices", invoiceId],
    queryFn: () => fetchInvoiceById(invoiceId),
  });

export type InvoicesType = {
  overdueAmount: number;
  dueSoonAmount: number;
  invoiceListItems: {
    totalAmount: number;
    totalDeposits: number;
    daysToDueDate: number;
    dueStatus: "paid" | "due" | "overdue" | "overpaid";
    dueStatusDisplay: string;
    id: string;
    name: string;
    number: number;
  }[];
};
