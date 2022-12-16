/* eslint-disable react/jsx-props-no-spreading */
import {
    Box,
    FormLabel,
    FormControl,
    Input,
    Button,
    FormErrorMessage,
    VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { InferType } from 'yup';
import { useFormContext, Controller } from 'react-hook-form';
import { Select, OptionBase } from 'chakra-react-select';
import { firstStepSchema } from '../../../validation/registerWizard';

type FormType = InferType<typeof firstStepSchema>;

interface Options extends OptionBase {
    label: string;
    value: string;
}

const PronounOpt: Options[] = [
    { label: 'He/Him', value: 'He/Him' },
    { label: 'She/Her', value: 'She/Her' },
    { label: 'They/Them', value: 'They/Them' },
];

const One = () => {
    const {
        register,
        setFocus,
        control,
        formState: { errors },
    } = useFormContext<FormType>();

    useEffect(() => {
        setFocus('name');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <motion.div
            animate={{ scale: 1, opacity: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
        >
            <VStack spacing={4} align="stretch" mt="10px">
                <Box display="flex" flexDirection="column" justifyContent="space-between">
                    <FormControl
                        label="Name"
                        fontFamily="Nunito"
                        isInvalid={!!errors.name}
                        id="FullName"
                    >
                        <FormLabel fontSize="16px">Name</FormLabel>
                        <Input
                            fontFamily="Nunito"
                            variant="outline"
                            fontSize="15px"
                            height="45px"
                            placeholder=""
                            backgroundColor="white"
                            _focus={{
                                border: '1px solid #A65AEC',
                            }}
                            _active={{
                                backgroundColor: 'white',
                            }}
                            {...register('name')}
                        />
                        <FormErrorMessage fontSize="16px">{errors.name?.message}</FormErrorMessage>
                    </FormControl>
                </Box>
                <Box display="flex" flexDirection="column" justifyContent="space-between">
                    <FormControl label="Mobile" isInvalid={!!errors.mobile} id="Mobile">
                        <FormLabel fontFamily="Nunito" fontSize="16px">
                            Mobile
                        </FormLabel>
                        <Input
                            fontFamily="Nunito"
                            background="white"
                            fontSize="15px"
                            height="45px"
                            placeholder=""
                            _focus={{
                                border: '1px solid #A65AEC',
                            }}
                            _active={{
                                backgroundColor: 'white',
                            }}
                            {...register('mobile')}
                        />
                        <FormErrorMessage fontFamily="Nunito" fontSize="16px">
                            {errors.mobile?.message}
                        </FormErrorMessage>
                    </FormControl>
                </Box>
                <Box display="flex" flexDirection="column" justifyContent="space-between">
                    <FormControl label="DOB" isInvalid={!!errors.dob} id="DOB">
                        <FormLabel fontFamily="Nunito" fontSize="16px">
                            Date of Birth
                        </FormLabel>
                        <Input
                            type="date"
                            fontFamily="Nunito"
                            variant="outline"
                            fontSize="15px"
                            height="45px"
                            placeholder=""
                            backgroundColor="white"
                            _focus={{
                                border: '1px solid #A65AEC',
                            }}
                            {...register('dob')}
                        />
                        <FormErrorMessage fontFamily="Nunito" fontSize="16px">
                            Please enter a valid date
                        </FormErrorMessage>
                    </FormControl>
                </Box>
                <Box display="flex" flexDirection="column" justifyContent="space-between">
                    <Controller
                        control={control}
                        name="pronoun"
                        render={({ field, fieldState: { error: proError } }) => (
                            <FormControl label="Pronoun" isInvalid={!!proError} id="Pronoun">
                                <FormLabel fontFamily="Nunito" fontSize="16px">
                                    Prefered Pronoun
                                </FormLabel>
                                <Select
                                    focusBorderColor="#A65AEC"
                                    options={PronounOpt}
                                    {...field}
                                />
                                <FormErrorMessage fontFamily="Nunito" fontSize="16px">
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
                        Next
                    </Button>
                </Box>
            </VStack>
        </motion.div>
    );
};
export default One;
