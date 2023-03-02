import apiRoutes from '../utils/apiRoutes';
import { User } from '../types/api.types';
import axios from 'axios';

function buildAxiosOptions(jwt: string) {
  return {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
}

export async function isJwtValid(jwt: string) {
  return await axios
    .get(apiRoutes.user.read.collection(), buildAxiosOptions(jwt))
    .then(() => true)
    .catch(() => false);
}

export async function signUp(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  birthDate: string
) {
  const response = await axios.post(apiRoutes.user.sign.up(), {
    firstName,
    lastName,
    email,
    password,
    birthDate,
  });

  return response.data.result;
}

export async function signIn(email: string, password: string) {
  const response = await axios.post(apiRoutes.user.sign.in(), {
    email,
    password,
  });

  return response.data.result;
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
