import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { sendChatMessage } from "@/api/chat";
import { identifyCustomer } from "@/api/customer";

export const useIdentifyCustomer = () => {
  return useMutation({
    mutationFn: identifyCustomer,
    onError: () => toast.error("Could not identify customer"),
  });
};

export const useSendChatMessage = () => {
  return useMutation({
    mutationFn: sendChatMessage,
    onError: () => toast.error("Could not send chat message"),
  });
};
