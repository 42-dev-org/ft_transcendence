import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../api";

export default function useAuthenticator() {
  const mutation = useMutation({
    mutationFn: async () => api.api().auth.me(),
    mutationKey: ["me"],
  });
  return {
    mutation,
  };
}
