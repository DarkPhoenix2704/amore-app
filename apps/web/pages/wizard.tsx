import { VStack, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';

const Wizard: NextPage = () => {
    return (
        <SessionAuth>
            <VStack>
                <Text>Wizard</Text>
            </VStack>
        </SessionAuth>
    );
};

export default Wizard;
