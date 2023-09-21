import { DeferredPromise } from "@tanstack/router-core";
import * as z from "zod";

export class NotFoundError extends Error {}

export type PostType = {
  id: string;
  title: string;
  body: string;
};

export type Customer = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  name: string;
};

export type SearchCustomerType = {
  id: string;
  email: string;
  name: string;
}[];

export type CustomerIdFetcherType = {
  customers: {
    id: string;
    email: string;
    name: string;
  }[];
  // wrap in DeferredPromise<> to type it correctly when Awaited starts to work as expected
  customerDetails: {
    name: string;
    email: string;
    invoiceDetails: {
      totalAmount: number;
      totalDeposits: number;
      daysToDueDate: number;
      dueStatus: "paid" | "due" | "overdue" | "overpaid";
      dueStatusDisplay: string;
      id: string;
      number: number;
    }[];
  };
  customerInfo: {
    email: string;
    name: string;
  };
};

export type LineItemFields = {
  description: string;
  quantity: number;
  unitPrice: number;
};

export const customerQuerySchema = z.object({
  query: z.string().optional(),
});

export type CustomerSearch = z.infer<typeof customerQuerySchema>;
