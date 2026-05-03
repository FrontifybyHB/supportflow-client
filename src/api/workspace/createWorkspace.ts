import { createBusiness, type CreateBusinessInput } from "@/api/business";

export type CreateWorkspaceInput = CreateBusinessInput;

export async function createWorkspace(input: CreateWorkspaceInput) {
  return createBusiness(input);
}
