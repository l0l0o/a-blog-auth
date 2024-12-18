export interface IUser {
  id: number;
  username: string;
  password: string;
  email: string;
}

export interface IUserCredentials {
  id: number;
  username: string;
}

export interface IUserDTO {
  username: string;
  password: string;
  email: string;
}
