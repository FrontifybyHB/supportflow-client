import { ApiError } from "@/api/types";

export async function suggestReply(): Promise<{ success: boolean; data: { reply: string } }> {
  throw new ApiError("Suggested reply generation is not exposed by the current backend API.", {
    statusCode: 501,
  });
}
