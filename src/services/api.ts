import apiRoutes from '../utils/apiRoutes';
import axios from 'axios';

export async function signIn(email: string, password: string) {
  const response = await axios.post(apiRoutes.user.sign.in(), {
    email,
    password,
  });

  return response.data.result;
}
