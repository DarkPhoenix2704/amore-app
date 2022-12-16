import { HStack, Image } from '@chakra-ui/react';

const Side = () => {
    return (
        <HStack
            flex={1}
            display={{
                base: 'none',
                lg: 'flex',
            }}
        >
            <Image
                border="10px solid #EDE8F7"
                position="relative"
                height="400px"
                width="200px"
                objectFit="cover"
                src="/college-01.jpg"
                borderRadius="48px"
            />
            <Image
                border="10px solid #EDE8F7"
                position="relative"
                height="450px"
                top="56px"
                right="70px"
                width="200px"
                objectFit="cover"
                src="/college-02.jpg"
                borderRadius="48px"
            />
            <Image
                border="10px solid #EDE8F7"
                position="relative"
                height="415px"
                right="125px"
                top="-25px"
                width="250px"
                objectFit="cover"
                src="/college-03.jpg"
                borderRadius="48px"
            />
        </HStack>
    );
};

export default Side;
