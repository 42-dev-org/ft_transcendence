import GameModel from "./services/game.model.service";


export interface player {
  userID: string;
  socketId: string;
}

export interface Game {
  gameId: string;
  interval: NodeJS.Timeout;
  gameModel: GameModel;
  type: 'invite' | 'random' | 'bot';
  width: number;
  height: number;
  players: {
    userId: string;
    lastName: string;
    profileImage: string;
    login: string;
    score: number;
    winner: boolean;
  }[];
}
