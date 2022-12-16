/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import { yupResolver } from '@hookform/resolvers/yup';
import { NextPageWithLayout } from './_app';
import { InferType } from 'yup';
import { BaseLayout } from '../layouts';

import { platformAPI } from '../config';
import { Form } from '../types';
import { registerWizardValidator, stepByStepValidator } from '../validation/registerWizard';
import { Center, Heading, VStack, Text } from '@chakra-ui/react';
import { Card, Final, One, Three, Two } from '../views/wizard';

type FormType = InferType<typeof registerWizardValidator>;

const Wizard: NextPageWithLayout = () => {
    const [user, setAuthUser] = useState<Form | null>(null);
    const [step, setStep] = useState<number>(1);
    const methods = useForm<FormType>({
        mode: 'all',
        resolver: yupResolver(stepByStepValidator[step]),
    });
    const [formError, setFormError] = useState<boolean>(false);

    const isReadyForSubmission = step === 3;
    const stepAdd = (): void => {
        setStep((ste) => ste + 1);
    };

    const stepSub = (): void => {
        setStep((ste) => ste - 1);
    };
    const handleData: SubmitHandler<FormType> = async (val) => {
        if (isReadyForSubmission) {
            const Dummey: string[] = [];
            const interestArray: string[] = val.interest!.map((el) => el.value);

            const Dbdata = {
                name: val.name,
                dob: new Date(val.dob),
                mobile: val.mobile,
                bio: val.bio,
                pronoun:
                    val.pronoun.value === 'He/Him'
                        ? 'HE'
                        : val.pronoun.value === 'She/Her'
                        ? 'SHE'
                        : 'THEY',
                partnerPronoun:
                    val.partnerPronoun.value === 'He/Him'
                        ? 'HE'
                        : val.partnerPronoun.value === 'She/Her'
                        ? 'SHE'
                        : 'THEY',
                interests: interestArray || Dummey,
                collegeId: val.college.value,
                passYear: val.passYear.value,
                department: val.department.value,
            };
            try {
                const { data } = await platformAPI.post('/users/profile', Dbdata);
                if (!data.Success) throw new Error(data.message);
                setAuthUser(data.data);
                stepAdd();
            } catch (e) {
                setFormError(true);
            }
        } else {
            stepAdd();
        }
    };

    if (step === 4) {
        return (
            <SessionAuth>
                <Center mb="60px">
                    <Final />
                </Center>
            </SessionAuth>
        );
    }

    return (
        <SessionAuth>
            {step === 1}
            <VStack>
                <Card>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(handleData)}>
                            <Heading>Complete your Profile</Heading>
                            <Text
                                fontFamily="Nunito"
                                fontSize="16px"
                                color="#4F4F4F"
                                style={{
                                    marginTop: '5px',
                                }}
                            >
                                Complete your profile to help us find the best matches for you
                            </Text>
                            {step === 1 && <One />}
                            {step === 2 && <Two />}
                            {step === 3 && <Three />}
                        </form>
                    </FormProvider>
                </Card>
            </VStack>
        </SessionAuth>
    );
    /* 
    return (
        <SessionAuth>
            <VStack
                alignItems="flex-start"
                paddingInline={{
                    base: '16px',
                    lg: '38px',
                }}
            >
                
                <HStack width="full">
                    <VStack flex={1}>
                        <form>
                            <VStack spacing={6} align="stretch" marginBlockStart="5px">
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="space-between"
                                >
                                    <FormControl
                                        label="Name"
                                        isInvalid={!!errors.name}
                                        id="FullName"
                                    >
                                        <FormLabel fontFamily="Nunito" fontSize="16px">
                                            Name
                                        </FormLabel>
                                        <Input
                                            width="350px"
                                            height="45px"
                                            variant="solid"
                                            placeholder="Full Name"
                                            _focus={{
                                                border: '1px solid #A65AEC',
                                            }}
                                            {...register('name')}
                                        />
                                        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                                    </FormControl>
                                </Box>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="space-between"
                                >
                                    <FormControl label="DOB" isInvalid={!!errors.dob} id="DOB">
                                        <FormLabel fontFamily="Nunito" fontSize="16px">
                                            Date of Birth
                                        </FormLabel>
                                        <Input
                                            {...register('dob')}
                                            type="date"
                                            width="350px"
                                            height="45px"
                                            variant="solid"
                                            _focus={{
                                                border: '1px solid #A65AEC',
                                            }}
                                        />
                                        <FormErrorMessage>{errors.dob?.message}</FormErrorMessage>
                                    </FormControl>
                                </Box>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="space-between"
                                >
                                    <Controller
                                        control={control}
                                        name="pronoun"
                                        render={({ field, fieldState: { error: proError } }) => (
                                            <FormControl
                                                label="Pronoun"
                                                isInvalid={!!proError}
                                                id="Pronoun"
                                            >
                                                <FormLabel fontFamily="Nunito" fontSize="16px">
                                                    Pronoun
                                                </FormLabel>
                                                <Select
                                                    focusBorderColor="#A65AEC"
                                                    options={PronounOpt}
                                                    {...field}
                                                />
                                                <FormErrorMessage>
                                                    Please pick an option
                                                </FormErrorMessage>
                                            </FormControl>
                                        )}
                                    />
                                </Box>
                                <Box>
                                    <Button
                                        colorScheme="blue"
                                        width="100%"
                                        marginTop="16px"
                                        type="submit"
                                        backgroundColor="rgba(65, 83, 240, 1)"
                                        _hover={{ cursor: 'pointer', bg: '#1328EC' }}
                                        disabled={false}
                                        color="white"
                                    >
                                        Complete Profile
                                    </Button>
                                </Box>
                            </VStack>
                        </form>
                    </VStack>
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
                </HStack>
            </VStack>
        </SessionAuth>
    ); */
};

Wizard.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default Wizard;
