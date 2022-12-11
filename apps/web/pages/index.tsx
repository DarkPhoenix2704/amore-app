import { VStack, Text, Box, HStack, Heading, Button, Image } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { BsFillLightningFill } from 'react-icons/bs';

import { BaseLayout } from '../layouts';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
    return (
        <VStack
            paddingInline={{
                base: '16px',
                lg: '38px',
            }}
        >
            <HStack justifyContent="space-between">
                <VStack alignItems="flex-start" spacing="18px">
                    <HStack width="100%">
                        <HStack
                            borderRadius="25px"
                            backgroundColor="white"
                            paddingBlock="5px"
                            paddingInline="15px"
                        >
                            <BsFillLightningFill color="#A65AEC" />
                            <Text
                                fontFamily="Nunito"
                                fontWeight="600"
                                fontSize="16px"
                                color="#A65AEC"
                            >
                                Find Your Match Now!
                            </Text>
                        </HStack>
                    </HStack>
                    <Heading fontSize="48px">It's Never Been Easier To Find Your Match</Heading>
                    <Text fontSize="18px" fontFamily="Nunito" color="#4F4F4F">
                        Verified Profiles, Secure Chat, and More!
                    </Text>
                    <Button
                        paddingBlock="18px"
                        paddingInline="35px"
                        backgroundColor="#A65AEC"
                        borderRadius="36px"
                        border="1px solid #A65AEC"
                        color="#E4E6E5"
                        _hover={{
                            backgroundColor: 'white',
                            color: '#212423',
                            boxShadow: '0px 2px 2px #A65AEC',
                        }}
                        _active={{
                            backgroundColor: 'white',
                            color: '#212423',
                        }}
                    >
                        <Text fontFamily="Nunito" fontSize="12px">
                            Match Now
                        </Text>
                    </Button>
                </VStack>
                <HStack>
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
            </HStack>
        </VStack>
    );
};

Home.getLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>;

export default Home;
