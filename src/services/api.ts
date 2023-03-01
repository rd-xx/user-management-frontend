import apiRoutes from '../utils/apiRoutes';
import axios from 'axios';

export async function isJwtValid(jwt: string) {
  return await axios
    .get(apiRoutes.user.read.collection(), {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
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
