import type { AppProps } from 'next/app';
import { Footer } from '/components/footer/Footer';
import '/sass/_scss/main.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>City Search</h1>
      <Component {...pageProps} />
    </>
  );
}
