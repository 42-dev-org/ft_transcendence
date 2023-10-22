import type { AxiosInstance } from "axios";
import type { Socket } from "socket.io-client";
import type { ServerToClientEvents } from 'socket.io-type';

class Api {
    private httpClient: AxiosInstance;
    private ioClient: Socket<ServerToClientEvents, ClientToServerEvents>;
    constructor(private readonlyurl: string) {

    }
}

export const api = new Api('')