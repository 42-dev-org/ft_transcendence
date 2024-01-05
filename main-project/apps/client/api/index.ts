import type { AxiosInstance } from "axios";
import { Manager, type Socket } from "socket.io-client";
// import type { ServerToClientEvents, ClientToServerEvents } from "io-types";
import axios from "axios";
import { constants } from "../constants/contsnts";
import { exampleLib } from "../lib/api/example/index";
import { log } from "console";

const ConversationTypes = {
  Group: "Group",
  Single: "Single",
} as const;

export interface MutUserType {
  user: string;
  conversation: string;
  until: string;
}
export interface updateUserMemberShip {
  user: string;
  conversation: string;
}

const ChatVisibility = {
  Public: "Public",
  Private: "Private",
  Protected: "Protected",
} as const;

class Api {
  private httpClient: AxiosInstance;
  private ioClient: Socket<any, any>;

  constructor(private readonly baseUrl: string = constants.URL) {
    this.httpClient = this.initializeHttpClient();
    this.ioClient = this.initializeSocketIO();
    this.ioClient.on("connect", () => {
      console.log("connected");
    });
  }

  private initializeHttpClient() {
    return axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  private initializeSocketIO() {
    return new Manager(this.baseUrl, {
      withCredentials: true,
      autoConnect: true,
    }).socket("/chat");
  }

  api = () => ({
    auth: {
      me: () => this.httpClient.get("/users/me"),
      logout: () => this.httpClient.get("/auth/logout"),
    },
    chat: {
      leaveGroup: (uid: string) =>
        this.httpClient.post("/conversations/left", { conversation: uid }),
      create: (conf: {
        type?: keyof typeof ConversationTypes;
        password?: string;
        visibility?: keyof typeof ChatVisibility;
        name?: string;
        participants: string[];
      }) =>
        this.httpClient.post("/conversations", {
          ...conf,
        }),
      getConversations: (type: "group" | "single") =>
        this.httpClient.get("conversations/me?type=" + type),
      getConversation: (uid: string, type: "Single" | "Group") =>
        this.httpClient.get("conversations/" + uid + "?type=" + type),
      mutParticipant: (conf: MutUserType) =>
        this.httpClient.patch("/conversations/mut-participant", {
          ...conf,
        }),
      unmutParticipant: (conf: updateUserMemberShip) =>
        this.httpClient.patch("/conversations/unmut-participant", {
          ...conf,
        }),
      banParticipant: (conf: updateUserMemberShip) =>
        this.httpClient.patch("/conversations/ban-participant", {
          ...conf,
        }),
      unbanParticipant: (conf: updateUserMemberShip) =>
        this.httpClient.patch("/conversations/unban-participant", {
          ...conf,
        }),
      addAdmin: (conf: updateUserMemberShip) =>
        this.httpClient.patch("/conversations/add-admin", {
          ...conf,
        }),
      removeAdmin: (conf: updateUserMemberShip) =>
        this.httpClient.patch("/conversations/delete-admin", {
          ...conf,
        }),
      addParticipant: (conf: updateUserMemberShip) =>
        this.httpClient.patch("/conversations/add-participant", {
          ...conf,
        }),
      removeParticipant: (conf: updateUserMemberShip) =>
        this.httpClient.patch("/conversations/delete-participant", {
          ...conf,
        }),
      changeInfos: (cnf: { conversation: string; name: string }) =>
        this.httpClient.patch("/conversations/" + cnf.conversation, {
          name: cnf.name,
        }),
      joinChannel: (conversation: string, password?: string) =>
        this.httpClient.patch("/conversations/join", {
          conversation,
          password,
        }),
    },
    users: {
      ban: (uid: string) => this.httpClient.post(`/users/${uid}/ban`),
      unban: (uid: string) => this.httpClient.post(`/users/${uid}/unban`),
      search: (search: string) =>
        this.httpClient.get(`/users/search?search=${search}`),
      findAll: (type?: "Pending" | "Accepted" | "Banned") =>
        this.httpClient.get(`/users${type ? "?type=" + type : ""}`),
      addFriend: (friendUid: string) =>
        this.httpClient.post(`users/${friendUid}/add`),
      removeFriend: (friendUid: string) =>
        this.httpClient.post(`users/${friendUid}/remove`),
      acceptFriend: (friendUid: string) =>
        this.httpClient.post(`users/${friendUid}/accept`),
      getFriend: (friendUid: string) =>
        this.httpClient.get(`users/${friendUid}`),
      allExceptBanned: () => this.httpClient.get("/users/all"),
      leaderBorad: () => this.httpClient.get("/users/leaderboard"),
      updateProfileImage: (form: any) =>
        this.httpClient.post("users/me/profile-image", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
      updateInfos: (form: {
        firstName: string;
        lastName: string;
        login: string;
      }) => {
        return this.httpClient.post("/users/me", {
          ...form,
        });
      },
    },
    otp: {
      getImage: () => this.httpClient.get("/auth/otp"),
    },
  });
  io() {
    return this.ioClient;
  }
}

export const api = new Api();
