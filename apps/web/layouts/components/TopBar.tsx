import { Heading, HStack, Text, Button } from '@chakra-ui/react';
import Link from 'next/link';

const TopBar = ({
    btnText,
    btnFunc,
    showNav,
}: {
    btnText: string;
    btnFunc: () => void;
    showNav: boolean;
}) => {
    return (
        <HStack
            justifyContent="space-between"
            paddingBlock="18px"
            paddingInline={{
                base: '16px',
                lg: '28px',
            }}
        >
            <Heading>amore</Heading>
            {showNav && (
                <HStack spacing="15px">
                    <Link href="/#home">
                        <Text
                            fontFamily="Nunito"
                            fontSize="16px"
                            position="relative"
                            display="inline-block"
                            fontWeight="600"
                            _after={{
                                content: '""',
                                position: 'absolute',
                                bottom: '0',
                                left: '0',
                                width: '100%',
                                transform: 'scaleX(0)',
                                height: '2px',
                                backgroundColor: '#A65AEC',
                                transformOrigin: 'bottom right',
                                transition: 'transform 0.25s ease-out',
                            }}
                            _hover={{
                                _after: {
                                    transform: 'scaleX(1)',
                                    transformOrigin: 'bottom left',
                                },
                            }}
                        >
                            Home
                        </Text>
                    </Link>
                    <Link href="/#features">
                        <Text
                            fontFamily="Nunito"
                            textColor="#4F4F4F"
                            fontSize="16px"
                            position="relative"
                            display="inline-block"
                            fontWeight="600"
                            _after={{
                                content: '""',
                                position: 'absolute',
                                bottom: '0',
                                left: '0',
                                width: '100%',
                                transform: 'scaleX(0)',
                                height: '2px',
                                backgroundColor: '#A65AEC',
                                transformOrigin: 'bottom right',
                                transition: 'transform 0.25s ease-out',
                            }}
                            _hover={{
                                _after: {
                                    transform: 'scaleX(1)',
                                    transformOrigin: 'bottom left',
                                },
                            }}
                        >
                            Features
                        </Text>
                    </Link>
                    <Link href="/#pricing">
                        <Text
                            fontFamily="Nunito"
                            fontSize="16px"
                            position="relative"
                            display="inline-block"
                            textColor="#4F4F4F"
                            fontWeight="600"
                            _after={{
                                content: '""',
                                position: 'absolute',
                                bottom: '0',
                                left: '0',
                                width: '100%',
                                transform: 'scaleX(0)',
                                height: '2px',
                                backgroundColor: '#A65AEC',
                                transformOrigin: 'bottom right',
                                transition: 'transform 0.25s ease-out',
                            }}
                            _hover={{
                                _after: {
                                    transform: 'scaleX(1)',
                                    transformOrigin: 'bottom left',
                                },
                            }}
                        >
                            Pricing
                        </Text>
                    </Link>
                </HStack>
            )}
            {showNav && (
                <Button
                    paddingBlock="6px"
                    paddingInline="12px"
                    backgroundColor="#212423"
                    borderRadius="36px"
                    border="1px solid #212423"
                    color="#E4E6E5"
                    _hover={{
                        backgroundColor: 'white',
                        color: '#212423',
                    }}
                    _active={{
                        backgroundColor: 'white',
                        color: '#212423',
                    }}
                    onClick={btnFunc}
                >
                    <Text>{btnText}</Text>
                </Button>
            )}
        </HStack>
    );
};
export default TopBar;
