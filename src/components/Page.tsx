import { selectSession, setJwt, clear } from '@/slices/session.slice';
import { useAppDispatch, useAppSelector } from '@/utils/stores';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect } from 'react';
import { isJwtValid } from '@/services/api';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import routes from '../utils/routes';
import Box from '@mui/material/Box';
import Head from 'next/head';
import Link from 'next/link';

const loggedInButtons = [
  {
    label: 'Users',
    href: '/users',
  },
  {
    label: 'Sign out',
    href: '/sign-out',
  },
];
const loggedOutButtons = [
  {
    label: 'Sign in',
    href: '/sign-in',
  },
  {
    label: 'Sign up',
    href: '/sign-up',
  },
];

export default function Page(props: {
  title: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const hasJwtState = useAppSelector(selectSession).jwt !== null;
  const dispatch = useAppDispatch();

  /**
   * When the session state is not set, try to get the JWT from the local storage and check if it is valid.
   * If it is valid, set the session state.
   * If it is not valid, clear the session state and redirect to the sign in page.
   */
  const tryLogin = useCallback(async () => {
    const jwtLocalStorage = localStorage.getItem('jwt');

    if (!hasJwtState && jwtLocalStorage) {
      const isValid = await isJwtValid(jwtLocalStorage);
      if (isValid) {
        dispatch(setJwt(jwtLocalStorage));
      } else {
        dispatch(clear());
        router.push(routes.sign.in());
      }
    }
    return false;
  }, [hasJwtState, dispatch, router]);

  useEffect(() => {
    const jwtLocalStorage = localStorage.getItem('jwt');

    if (!hasJwtState && jwtLocalStorage) tryLogin();
  }, [hasJwtState, tryLogin]);

  return (
    <Box>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Grid container minHeight="100vh" direction="column">
        <Grid item>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {props.title}
              </Typography>
              {(hasJwtState ? loggedInButtons : loggedOutButtons).map(
                (button) => (
                  <Button
                    key={button.label}
                    LinkComponent={Link}
                    href={button.href}
                    color="inherit"
                    sx={{ ml: 2 }}
                  >
                    {button.label}
                  </Button>
                )
              )}
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid
          item
          display="flex"
          flexGrow={1}
          justifyContent="center"
          alignItems="center"
        >
          {props.children}
        </Grid>
      </Grid>
    </Box>
  );
}
