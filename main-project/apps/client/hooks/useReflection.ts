import { ErrorPayload, LoadingPayload, updateError, updateLoading } from "@/store/slices/reflection.slice";
import { useAppDispatch } from "@/store/store";
import { useCallback } from "react";
  
  type HookType =
    | ({
        type: "loading";
      } & LoadingPayload)
    | ({ type: "error" } & ErrorPayload);
  
  const omitField = <T extends object, K extends keyof T>(
    obj: T,
    field: K
  ): Omit<T, K> => {
    const { [field]: _, ...rest } = obj;
    return rest;
  };
  
  export default function useReflection() {
    const dispatch = useAppDispatch();
    const reflector = useCallback(
      (conf: HookType) => {
        switch (conf.type) {
          case "error":
            dispatch(updateError(omitField(conf, "type")));
            break;
  
          case "loading":
            dispatch(updateLoading(omitField(conf, "type")));
            break;
          default:
            // Handle the case if none of the expected types is matched
            throw new Error("Invalid configuration type.");
        }
      },
      [dispatch]
    );
    return { reflector };
  }