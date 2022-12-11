import { VStack, Text, Heading } from '@chakra-ui/react';
import { NextPage } from 'next';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';

const Wizard: NextPage = () => {
    return (
        <SessionAuth>
            <VStack>
                <Heading>Wizard</Heading>
            </VStack>
        </SessionAuth>
    );
};

export default Wizard;
