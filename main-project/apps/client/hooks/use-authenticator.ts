import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { setIsAuth, setUser } from "../store/slices/user.slice";
import { useAppDispatch } from "../store/store";

export default function useAuthenticator() {
  const dispatch = useAppDispatch();
  const mutation = useMutation({
    mutationFn: async () => api.api().auth.me(),
    mutationKey: ["me"],
    onSuccess: (data) => {
      dispatch(setIsAuth(true));
      dispatch(setUser(data?.data));
    }
  });
  return {
    mutation,
  };
}
