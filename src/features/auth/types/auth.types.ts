export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "agent" | "customer";
};

export type LoginInput = {
  email: string;
  password: string;
};

export type AuthSession = {
  user: User;
  accessToken: string;
};
