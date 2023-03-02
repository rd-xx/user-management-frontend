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

const validationSchema = yup.object().shape({
  email: yup.string().email().required().label('E-mail'),
  password: yup.string().min(8).required().label('Password'),
});

const initialValues = {
  email: '',
  password: '',
};

export default function SignIn() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const hasJwtState = useAppSelector(selectSession).jwt !== null;

  async function handleSubmit({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setError(null);

    try {
      const jwt = await signIn(email, password);

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
