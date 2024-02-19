export interface IMessage {
  id: string;
  message: string;
  to_id: string;
  from_id: string;
  roomId: string;
}

export interface IUserRoom {
  id: string;
}

export interface IRoomResponse {
  id: string;
  messages: IMessage[];
  users: IUserRoom[];
}

export interface IRoomCreate {
  id: string;
}
