import { dateToString } from '@/src/utils/transformations';
import { selectSession } from '@/src/slices/session.slice';
import TableContainer from '@mui/material/TableContainer';
import { useCallback, useEffect, useState } from 'react';
import TableFooter from '@mui/material/TableFooter';
import { useAppSelector } from '@/src/utils/stores';
import Loader from '@/src/components/ui/Loader';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getUsers } from '@/src/services/api';
import { User } from '@/src/types/api.types';
import Page from '@/src/components/Page';
import { useRouter } from 'next/router';
import routes from '@/src/utils/routes';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import axios from 'axios';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const jwtState = useAppSelector(selectSession).jwt;
  const router = useRouter();

  const fetchUsers = useCallback(async () => {
    setError(null);

    try {
      const response = await getUsers(jwtState!);
      setUsers(response);
    } catch (err) {
      if (err instanceof axios.AxiosError) {
        const message = err.response?.data.error;
        if (message) setError('- ' + message.join('\n- '));
        else setError('An unexpected error occurred. Please try again later.');
      }
    }
  }, [jwtState]);

  const handleClick = (user: User) => {
    router.push(routes.users.read.single(user.id));
  };

  useEffect(() => {
    /**
     * BUG: If the user tries to access this page directly in the URL bar,
     * he will be redirected to the sign-in page.
     * He shouldn't.
     */
    if (!jwtState) router.push(routes.sign.in());
    else if (users.length === 0) fetchUsers();
  }, [fetchUsers, jwtState, router, users.length]);

  /**
   * A loading state is useless here because if the user has access to this page,
   * it means there is AT LEAST one user in the database, so the array should never be empty.
   */
  if (!users.length && error === null) {
    return (
      <Page title="Users">
        <Loader />
      </Page>
    );
  }

  if (error !== null) return <Page title="Users">{error}</Page>;
  else
    return (
      <Page title="Users - Collection">
        <Stack spacing={4} margin="50px" height="100%" justifyContent="center">
          <TableContainer component={Paper} sx={{ maxHeight: 700 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Signed up</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>First name</TableCell>
                  <TableCell>Last name</TableCell>
                  <TableCell>Birth date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    hover
                    onClick={() => handleClick(user)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{dateToString(user.createdAt)}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{dateToString(user.birthDate, false)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={6}>
                    {users.length} user{users.length > 1 ? 's' : ''}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Stack>
      </Page>
    );
}
