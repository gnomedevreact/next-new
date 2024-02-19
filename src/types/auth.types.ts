export interface IUser {
  id: string;
  email: string;
  isAdmin: boolean;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
}

export interface IFormData {
  email: string;
  password: string;
}
