import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '@/utils/stores';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Component {...pageProps} />
    </Provider>
  );
}
