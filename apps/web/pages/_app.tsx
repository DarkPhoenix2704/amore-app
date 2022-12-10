import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <ChakraProvider>
            <Head>
                <title>Dating App</title>
            </Head>
            <Component {...pageProps} />
        </ChakraProvider>
    );
};

export default MyApp;
