export type User = {
  id?: string;
  username?: string;
  createdAt?: Date;
}

export type Message = {
  message: string
  userId: string
}