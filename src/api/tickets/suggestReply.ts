export async function suggestReply(id: string): Promise<{ success: boolean; data: { reply: string } }> {
  return {
    success: true,
    data: {
      reply: `Thanks for reaching out. I am reviewing ticket ${id.slice(-6).toUpperCase()} and will follow up with the next step shortly.`,
    },
  };
}
