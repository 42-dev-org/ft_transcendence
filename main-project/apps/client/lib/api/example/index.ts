import type { AxiosInstance } from "axios";

export const exampleLib = {
  getExample: (api: AxiosInstance) => api.get("/example"),
  saveExample: (api: AxiosInstance, payload: { data: string }) =>
    api.post("/example", payload),
};
