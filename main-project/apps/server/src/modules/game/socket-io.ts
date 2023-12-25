import { User } from 'db';

declare module 'socket.io' {
    interface Socket {
        user: User | null;
        inGame:  boolean
    }
}