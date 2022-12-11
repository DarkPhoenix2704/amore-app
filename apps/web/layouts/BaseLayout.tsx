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

    const profileDirect = () => {
        router.push('/profile');
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
            flexDirection="column"
            justifyContent="space-between"
            minH="100vh"
            p={{ base: '20px', sm: '30px', md: '74px' }}
            pt={{ base: '40px', md: '50px' }}
        >
            <TopBar />
            {children}
            <Footer />
        </Flex>
    );
};
