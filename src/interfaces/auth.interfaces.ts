export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload extends IUserRegister {
  token: string;
}

export interface IVerifyToken {
  id: string;
  username: string;
  email: string;
}
