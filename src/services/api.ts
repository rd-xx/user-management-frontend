import { SignInParameters, SignUpParameters, User } from '@/types/api.types';
import apiRoutes from '@/utils/apiRoutes';
import axios from 'axios';

function buildAxiosOptions(jwt: string) {
  return {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  };
}

export async function isJwtValid(jwt: string) {
  return await axios
    .get(apiRoutes.user.read.collection(), buildAxiosOptions(jwt))
    .then(() => true)
    .catch(() => false);
}

export async function signUp(parameters: SignUpParameters) {
  const response = await axios.post(apiRoutes.user.sign.up(), {
    firstName: parameters.firstName,
    lastName: parameters.lastName,
    email: parameters.email,
    password: parameters.password,
    birthDate: parameters.birthDate
  });

  return response.data.result as User;
}

export async function signIn(parameters: SignInParameters) {
  const response = await axios.post(apiRoutes.user.sign.in(), {
    email: parameters.email,
    password: parameters.password
  });

  return response.data.result as string;
}

export async function getUsers(jwt: string) {
  const response = await axios.get(
    apiRoutes.user.read.collection(),
    buildAxiosOptions(jwt)
  );

  return response.data.result as User[];
}

export async function getUser(jwt: string, userId: string) {
  const response = await axios.get(
    apiRoutes.user.read.single(userId),
    buildAxiosOptions(jwt)
  );

  return response.data.result as User;
}
