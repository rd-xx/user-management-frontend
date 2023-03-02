import { useAppDispatch, useAppSelector } from '@/utils/stores';
import { selectSession, setJwt } from '@/slices/session.slice';
import FormField from '@/components/ui/FormField';
import AlertUser from '@/components/ui/Alert';
import UserForm from '@/components/ui/Form';
import { useEffect, useState } from 'react';
import { signIn } from '@/services/api';
import { useRouter } from 'next/router';
import Page from '@/components/Page';
import routes from '@/utils/routes';
import { AxiosError } from 'axios';
import * as yup from 'yup';
import { SignInParameters } from '@/types/api.types';

const validationSchema = yup.object().shape({
    email: yup.string().email().required().label('E-mail'),
    password: yup.string().min(8).required().label('Password')
  }),
  initialValues = {
    email: '',
    password: ''
  };

export default function SignIn() {
  const dispatch = useAppDispatch(),
    router = useRouter(),
    [error, setError] = useState<string | null>(null),
    hasJwtState = useAppSelector(selectSession).jwt !== null;

  async function handleSubmit(parameters: SignInParameters) {
    setError(null);

    try {
      const jwt = await signIn(parameters);

      dispatch(setJwt(jwt));
      await router.push(routes.home());
    } catch (err) {
      if (err instanceof AxiosError) {
        const message = err.response?.data.error;
        if (message)
          setError(
            typeof message === 'string'
              ? message
              : '- ' + (message as string[]).join('\n- ')
          );
        else setError('An unexpected error occurred. Please try again later.');
      }
    }
  }

  useEffect(() => {
    if (hasJwtState) void router.push(routes.home());
  }, [hasJwtState, router]);

  return (
    <Page title="Sign in">
      <UserForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormField name="email" label="Email" />
        <FormField name="password" label="Password" type="password" />
      </UserForm>
      {error && <AlertUser message={error} severity="error" />}
    </Page>
  );
}
