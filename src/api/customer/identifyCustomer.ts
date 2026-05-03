import api from "@/api/config";
import type { ApiEnvelope } from "@/api/types";
import { unwrapApiData } from "@/api/types";

export interface IdentifyCustomerInput {
  businessId: string;
  name?: string;
  email?: string;
  phone?: string;
}

export interface IdentifyCustomerResult {
  customerToken: string;
  customerId: string;
  name: string;
}

export async function identifyCustomer(input: IdentifyCustomerInput): Promise<IdentifyCustomerResult> {
  const { data } = await api.post<ApiEnvelope<IdentifyCustomerResult>>("/api/v1/customer/identify", input);
  return unwrapApiData(data);
}
