import { useAppDispatch, useAppSelector } from '../utils/stores';
import { selectSession, setJwt } from '../slices/session.slice';
import FormField from '@/components/ui/FormField';
import { signIn, signUp } from '@/services/api';
import AlertUser from '@/components/ui/Alert';
import UserForm from '@/components/ui/Form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '@/components/Page';
import routes from '@/utils/routes';
import { AxiosError } from 'axios';
import * as yup from 'yup';
import luxon from 'luxon';

const validationSchema = yup.object().shape({
  firstName: yup.string().required().label('First name'),
  lastName: yup.string().required().label('Last name'),
  email: yup.string().email().required().label('E-mail'),
  password: yup.string().min(8).required().label('Password'),
  birthDate: yup.date().required().label('Birth date'),
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  birthDate: luxon,
};

export default function SignIn() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const hasJwtState = useAppSelector(selectSession).jwt !== null;

  async function handleSubmit({
    firstName,
    lastName,
    email,
    password,
    birthDate,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthDate: string;
  }) {
    setError(null);

    try {
      await signUp(firstName, lastName, email, password, birthDate);
      const jwt = signIn(email, password);

      dispatch(setJwt(jwt));
      router.push(routes.home());
    } catch (err) {
      if (err instanceof AxiosError) {
        const message = err.response?.data.error;
        if (message) setError('- ' + message.join('\n- '));
        else setError('An unexpected error occurred. Please try again later.');
      }
    }
  }

  useEffect(() => {
    if (hasJwtState) router.push(routes.home());
  }, [hasJwtState, router]);

  return (
    <Page title="Sign Up">
      <UserForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormField name="firstName" label="First name" />
        <FormField name="lastName" label="Last name" />
        <FormField name="email" label="Email" />
        <FormField name="password" label="Password" type="password" />
        <FormField name="birthDate" label="Birth date" type="date" />
      </UserForm>
      {error && <AlertUser message={error} severity="error" />}
    </Page>
  );
}
