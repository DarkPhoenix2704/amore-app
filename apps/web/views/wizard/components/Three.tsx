/* eslint-disable react/jsx-props-no-spreading */
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Controller, useFormContext } from 'react-hook-form';
import { AsyncSelect, OptionBase, Select } from 'chakra-react-select';
import { InferType } from 'yup';
import { thirdStepSchema } from '../../../validation/registerWizard';
import { platformAPI } from '../../../config';
import { useState } from 'react';

interface Options extends OptionBase {
    label: string;
    value: string;
}
interface interest {
    name: string;
    id: string;
}
const PronounOpt: Options[] = [
    { label: 'He/Him', value: 'He/Him' },
    { label: 'She/Her', value: 'She/Her' },
    { label: 'They/Them', value: 'They/Them' },
];

type FormType = InferType<typeof thirdStepSchema>;

const Three = () => {
    const { control, register } = useFormContext<FormType>();
    const [inputValue, setInputValue] = useState<string>('');

    const getInterests = async () => {
        const { data } = await platformAPI.get(`/interests?limit=20&page=1`);
        const interests = data.map((el: interest) => ({ label: el.name, value: el.id }));
        return interests;
    };

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    return (
        <motion.div
            animate={{ scale: 1, opacity: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
        >
            <VStack spacing={2} align="stretch" mt="30px">
                <Box display="flex" flexDirection="column" justifyContent="space-between">
                    <Controller
                        control={control}
                        name="partnerPronoun"
                        render={({ field, fieldState: { error: proError } }) => (
                            <FormControl label="Pronoun" isInvalid={!!proError} id="Pronoun">
                                <FormLabel fontFamily="Nunito" fontSize="16px">
                                    Interested In
                                </FormLabel>
                                <Select options={PronounOpt} {...field} />
                                {proError && (
                                    <FormErrorMessage fontFamily="Nunito" fontSize="16px">
                                        Please pick an option
                                    </FormErrorMessage>
                                )}
                            </FormControl>
                        )}
                    />
                </Box>
                <Box display="flex" flexDirection="column" justifyContent="space-between">
                    <Controller
                        control={control}
                        name="interest"
                        render={({ field, fieldState: { error: interestError } }) => (
                            <FormControl label="Interest" isInvalid={!!interestError} id="interest">
                                <FormLabel>You are Interested in</FormLabel>
                                <AsyncSelect
                                    {...field}
                                    isClearable
                                    defaultOptions
                                    loadOptions={getInterests}
                                    onInputChange={handleInputChange}
                                    isMulti
                                />
                                {interestError && (
                                    <FormErrorMessage>Pick 5 Interests maximum</FormErrorMessage>
                                )}
                            </FormControl>
                        )}
                    />
                </Box>
                <Box mt="25px">
                    <FormControl label="Bio" id="bio">
                        <FormLabel fontFamily="Nunito" fontSize="16px">
                            Bio
                        </FormLabel>
                        <Textarea placeholder="Tell us about yourself" {...register('bio')} />
                    </FormControl>
                </Box>
                <Box mt="25px">
                    <Button
                        colorScheme="blue"
                        width="100%"
                        type="submit"
                        backgroundColor="rgba(65, 83, 240, 1)"
                        color="white"
                        _hover={{ cursor: 'pointer', bg: '#1328EC' }}
                        marginTop="16px"
                        disabled={false}
                    >
                        Submit
                    </Button>
                </Box>
            </VStack>
        </motion.div>
    );
};
export default Three;
