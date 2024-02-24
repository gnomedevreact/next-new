export interface IMessage {
  id: string;
  message: string;
  to_id: string;
  from_id: string;
  roomId: string;
  image: boolean;
}

export interface IUserRoom {
  id: string;
  email: string;
}

export interface IRoomResponse {
  id: string;
  messages: IMessage[];
  users: IUserRoom[];
}

export interface IRoomCreate {
  id: string;
}
