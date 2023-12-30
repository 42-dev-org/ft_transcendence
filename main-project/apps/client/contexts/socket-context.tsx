"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import io, {
  type ManagerOptions,
  type SocketOptions,
  type Socket,
} from "socket.io-client";
import { useAppSelector } from "../store/store";

type SocketContextProps = {
  gameSocket: Socket;
};
const SocketContext = createContext<Partial<SocketContextProps>>({
  gameSocket: undefined,
});

const useSocket = () => {
  const context = useContext(SocketContext);
  
  if (context) return context as unknown as SocketContextProps;

  throw new Error(`useSocket must be used within a SocketContextProvider`);
};

type SocketProviderProps = { children: React.ReactNode };
const SocketProvider = ({ children }: SocketProviderProps) => {
  function reducer(state: SocketContextProps, _action: unknown) {
    return state;
  }
  
  const isAuth = useAppSelector((s) => s.user.isAuthenticated);
  const [{ gameSocket }] = useReducer(reducer, undefined, () => {
    const uri = "ws://localhost:8080/";
    const opts = {
      transports: ["websocket", "polling", "flashsocket"],
      autoConnect: true,
      withCredentials: true,
    } satisfies Partial<ManagerOptions & SocketOptions>;

    const [gameSocket] = [
      // TODO: pass opts from provider!
      io(uri, opts),
    ];
    return {
      gameSocket,
    } satisfies SocketContextProps;
  });

  useEffect(() => {
    return () => {
      gameSocket.disconnect();
    };
  }, [gameSocket]);
  return (
    <SocketContext.Provider value={{ gameSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
export { SocketProvider, useSocket };
