import FormField from '../components/ui/FormField';
import { useAppDispatch } from '../utils/stores';
import UserForm from '../components/ui/Form';
import { signIn } from '../services/api';
import { useRouter } from 'next/router';
import Page from '../components/Page';
import * as yup from 'yup';
import { setJwt } from '../slices/session.slice';
import routes from '../utils/routes';

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

  async function handleSubmit({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    console.log('inside submit');

    const jwt = await signIn(email, password);

    console.log(jwt);

    dispatch(setJwt(jwt));
    router.push(routes.home());
  }

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
    </Page>
  );
}
