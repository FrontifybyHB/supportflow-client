export type User = {
  _id: string;
  id?: string;
  name: string;
  email: string;
  role: "admin" | "agent" | "customer" | "superadmin";
  businessId?: string | null;
  isActive?: boolean;
  isEmailVerified?: boolean;
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type GoogleLoginInput = {
  idToken: string;
  businessName?: string;
};

export type AuthSession = {
  user: User;
  accessToken: string;
};

export type LoginVerificationRequired = {
  needsVerification: true;
  userId: string;
  message: string;
};

export type LoginResult = AuthSession | LoginVerificationRequired;
