import { ChakraProvider } from '@chakra-ui/react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';
import { authConfig } from '../auth';
import { AuthContext } from '../context';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
    if (typeof window !== 'undefined') {
        SuperTokensReact.init(authConfig());
    }

    const getLayout = Component.getLayout ?? ((page) => page);
    return (
        <ChakraProvider>
            <SuperTokensWrapper>
                <Head>
                    <title>Dating App</title>
                </Head>
                <AuthContext>{getLayout(<Component {...pageProps} />)}</AuthContext>
            </SuperTokensWrapper>
        </ChakraProvider>
    );
};

export default MyApp;
