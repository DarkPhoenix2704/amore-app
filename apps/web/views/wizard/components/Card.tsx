import { Box } from '@chakra-ui/react';
import { Child } from '../../../types';

const Card = ({ children }: Child) => {
    return (
        <Box
            width="370px"
            padding="20px"
            borderRadius="lg"
            border={{ base: 'none', md: ' .5px solid rgba(200, 200, 200,1)' }}
        >
            {children}
        </Box>
    );
};
export default Card;
