export type User = {
  id?: string;
  username?: string;
  createdAt?: Date;
}

export type Group = {
  id: string;
  name: string;
}

export type Message = {
  id: string;
  message: string
  userId: string
}