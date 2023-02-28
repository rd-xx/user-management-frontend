import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Head from 'next/head';

export default function Page(props: {
  title: string;
  children: React.ReactNode;
}) {
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
              <Button color="inherit">Sign in</Button>
              <Button color="inherit">Sign up</Button>
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
