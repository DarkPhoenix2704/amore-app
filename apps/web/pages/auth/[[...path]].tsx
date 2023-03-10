import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import SuperTokens from 'supertokens-auth-react';
import { redirectToAuth } from 'supertokens-auth-react';

const SuperTokensComponentNoSSR = dynamic(
    new Promise((res) => res(SuperTokens.getRoutingComponent)) as any,
    { ssr: false },
);

export default function Auth() {
    useEffect(() => {
        if (SuperTokens.canHandleRoute() === false) {
            redirectToAuth();
        }
    }, []);

    return <SuperTokensComponentNoSSR />;
}
