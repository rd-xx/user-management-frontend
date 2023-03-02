export type User = {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
};

export type SignUpParameters = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
};

export type SignInParameters = {
  email: string;
  password: string;
};
