import type { AxiosInstance } from "axios";
import { Manager, type Socket } from "socket.io-client";
// import type { ServerToClientEvents, ClientToServerEvents } from "io-types";
import axios from "axios";
import { constants } from "../constants/contsnts";
import { exampleLib } from "../lib/api/example/index";

class Api {
  private httpClient: AxiosInstance;
  // private ioClient: Socket<ServerToClientEvents, ClientToServerEvents>;

  constructor(private readonly baseUrl: string = constants.URL) {
    this.initializeHttpClient();
    // this.initializeSocketIO();
  }

  private initializeHttpClient(): void {
    this.httpClient = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  // private initializeSocketIO(): void {
  //   this.ioClient = new Manager(this.baseUrl, {
  //     autoConnect: true,
  //   }).socket("/");
  // }

  // setHeader(token: string): void {
  //   this.httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  //   // this.ioClient.io.opts.extraHeaders = {
  //   //   Authorization: `Bearer ${token}`,
  //   // };
  // }

  api = () => ({
    auth: {
      me: () => this.httpClient.get("/users/me"),
      logout: () => this.httpClient.get("/auth/logout")
    },
    users: {
      ban: () => {},
      unban: () => {},
      search: (search: string) =>
        this.httpClient.get(`/users/search?search=${search}`),
      findAll: (type?: "Pending" | "Accepted" | "Banned") =>
        this.httpClient.get(`/users?type=${type}`),
      addFriend: (friendUid: string) =>
        this.httpClient.post(`${friendUid}/add`),
      acceptFriend: (friendUid: string) =>
        this.httpClient.post(`${friendUid}/accept`),
    },
  });
  io: () => { a: "" };
}

export const api = new Api();
