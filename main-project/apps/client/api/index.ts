import type { AxiosInstance } from "axios";
import { Manager, type Socket } from "socket.io-client";
import type { ServerToClientEvents, ClientToServerEvents } from "io-types";
import axios from "axios";
import { constants } from "../constants/contsnts";
import { exampleLib } from "../lib/api/example/index";

class Api {
  private httpClient: AxiosInstance;
  private ioClient: Socket<ServerToClientEvents, ClientToServerEvents>;

  constructor(private readonly baseUrl: string = constants.URL) {
    this.initializeHttpClient();
    this.initializeSocketIO();
  }

  private initializeHttpClient(): void {
    const url = new URL(this.baseUrl);
    this.httpClient = axios.create({
      baseURL: url.toString(),
      timeout: 10000,
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  private initializeSocketIO(): void {
    const url = new URL(this.baseUrl);
    this.ioClient = new Manager(url.toString(), {
      autoConnect: true,
    }).socket("/");
  }

  setHeader(token: string): void {
    this.httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.ioClient.io.opts.extraHeaders = {
      Authorization: `Bearer ${token}`,
    };
  }

  api = () => ({
    example: {
      getExample: () => exampleLib.getExample(this.httpClient),
      saveExample: (example: { data: string }) =>
        exampleLib.saveExample(this.httpClient, example),
    },
  });

  io: () => { a: "" };
  
}

export const api = new Api("");
