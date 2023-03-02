import { useState, useCallback, useEffect } from 'react';
import { selectSession } from '@/slices/session.slice';
import { dateToString } from '@/utils/transformations';
import DisplayInfo from '@/components/ui/Display';
import Typography from '@mui/material/Typography';
import { GetServerSidePropsContext } from 'next';
import { useAppSelector } from '@/utils/stores';
import Loader from '@/components/ui/Loader';
import { getUser } from '@/services/api';
import { User } from '@/types/api.types';
import { useRouter } from 'next/router';
import Stack from '@mui/material/Stack';
import Page from '@/components/Page';
import axios from 'axios';

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      params: ctx.params
    }
  };
};

export default function SingleUser(props: { params: { userId: string } }) {
  const userId = props.params.userId,
    [user, setUser] = useState<User | null>(null),
    [error, setError] = useState<string | null>(null),
    jwtState = useAppSelector(selectSession).jwt,
    router = useRouter(),
    fetchUser = useCallback(async () => {
      setError(null);

      try {
        if (!jwtState) throw new Error('No JWT found.');

        const response = await getUser(jwtState, userId);
        setUser(response);
      } catch (err) {
        if (err instanceof axios.AxiosError) {
          const message = err.response?.data.error;
          if (message)
            setError(
              typeof message === 'string'
                ? message
                : '- ' + (message as string[]).join('\n- ')
            );
          else
            setError('An unexpected error occurred. Please try again later.');
        }
      }
    }, [jwtState, userId]);

  useEffect(() => {
    /**
     * BUG: If the user tries to access this page directly in the URL bar,
     * he will be redirected to the sign-in page.
     * He shouldn't.
     */
    if (!jwtState) {
      console.log('redirecting to sign in');
      console.log(jwtState, user);

      // router.push(routes.sign.in());
    } else if (user === null) void fetchUser();
  }, [fetchUser, jwtState, router, user]);

  /**
   * A loading state is useless here because if the user has access to this page,
   * it means there is AT LEAST one user in the database, so the array should never be empty.
   */
  if (error !== null) return <Page title="Users">{error}</Page>;
  else if (user === null)
    return (
      <Page title="Users">
        <Loader />
      </Page>
    );

  return (
    <Page title={`Users - ${user.firstName}`}>
      <Stack spacing={4} margin="50px" justifyContent="center">
        <Typography variant="h5">
          Viewing accounts details of {user.firstName}
        </Typography>
        <DisplayInfo label="Id" value={user.id} />
        <DisplayInfo
          label="Account created at"
          value={dateToString(user.createdAt, false)}
        />
        <DisplayInfo label="Email" value={user.email} />
        <DisplayInfo label="First name" value={user.firstName} />
        <DisplayInfo label="Last name" value={user.lastName} />
        <DisplayInfo
          label="Birth date"
          value={dateToString(user.birthDate, false)}
        />
      </Stack>
    </Page>
  );
}
