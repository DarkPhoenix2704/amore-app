import { useRouter } from 'next/router';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { TopBar, Footer } from './components';
import type { Child } from '../types';
import { useAuthCtx } from '../hooks';

export const BaseLayout = ({ children }: Child) => {
    const router = useRouter();
    const { isUserLoading } = useAuthCtx();

    const redirect = () => {
        router.push('/auth');
    };

    const homeDirect = () => {
        router.push('/home');
    };
    const path = router.pathname;

    const { doesSessionExist } = useSessionContext() as any;

    if (isUserLoading) {
        return (
            <Box>
                <Text>Loading...</Text>
                <Box display="none">{children}</Box>
            </Box>
        );
    }

    return (
        <Flex
            background="linear-gradient(162.36deg, #E5DEF2 -0.64%, #FAFAFA 125.31%)"
            flexDirection="column"
            justifyContent="space-between"
            minH="100vh"
        >
            <TopBar
                btnFunc={doesSessionExist ? homeDirect : redirect}
                btnText={doesSessionExist ? 'Find a Date' : 'Join'}
            />
            {children}
            <Footer />
        </Flex>
    );
};
