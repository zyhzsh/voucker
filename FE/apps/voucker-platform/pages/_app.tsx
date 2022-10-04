import { AppProps } from 'next/app';
import '/globals.css';
import { store } from '../store';
import { Provider } from 'react-redux';
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </UserProvider>
  );
}

export default MyApp;
