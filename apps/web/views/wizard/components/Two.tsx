/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { Box, Button, FormLabel, FormControl, FormErrorMessage, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useFormContext, Controller } from 'react-hook-form';
import { Select, AsyncSelect } from 'chakra-react-select';
import { platformAPI } from '../../../config';
import { secondStepSchema } from '../../../validation/registerWizard';
import { InferType } from 'yup';

type FormType = InferType<typeof secondStepSchema>;

interface Clg {
    name: string;
    id: string;
}

const department = [
    { label: 'Computer Science and Engineering', value: 'CSE' },
    { label: 'Electrical and Elecronics Engineering', value: 'EEE' },
    { label: 'Electronics and Communication Engineering', value: 'ECE' },
    { label: 'Mechanical Engineering', value: 'ME' },
    { label: 'Civil Engineering', value: 'CE' },
    { label: 'Cyber Security', value: 'CY' },
    { label: 'Artificial Intelligence', value: 'AI' },
    { label: 'Master of Computer Applications', value: 'MCA' },
    { label: 'Master of Business Administration', value: 'MBA' },
];
const Two = () => {
    const { control } = useFormContext<FormType>();
    const [inputValue, setInputValue] = useState<string>('');

    const getCollege = async (input: string) => {
        const { data } = await platformAPI.get(`/college?search=${input}&limit=20&page=1`);
        const college = data.map((el: Clg) => ({ label: el.name, value: el.id }));
        return college;
    };

    const yearOfPassout = new Array(5).fill(null).map((_val, index) => ({
        label: dayjs().year() + index,
        value: dayjs().year() + index,
    }));

    // handle input change event
    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    return (
        <motion.div
            animate={{ scale: 1, opacity: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
        >
            <VStack mt="30px" spacing={4} align="stretch">
                <Box display="flex" flexDirection="column" justifyContent="space-between">
                    <Controller
                        control={control}
                        name="college"
                        render={({ field, fieldState: { error: collegeErr } }) => (
                            <FormControl label="College" isInvalid={!!collegeErr} id="College">
                                <FormLabel>I currenlty study at</FormLabel>
                                <AsyncSelect
                                    {...field}
                                    isClearable
                                    defaultOptions
                                    loadOptions={getCollege}
                                    onInputChange={handleInputChange}
                                />
                                {collegeErr && (
                                    <FormErrorMessage>Please pick an option</FormErrorMessage>
                                )}
                            </FormControl>
                        )}
                    />
                </Box>
                <Box display="flex" flexDirection="column" justifyContent="space-between">
                    <Controller
                        control={control}
                        name="passYear"
                        render={({ field, fieldState: { error: descError } }) => (
                            <FormControl label="Passout" isInvalid={!!descError} id="Passout">
                                <FormLabel>Year of Passout</FormLabel>
                                <Select options={yearOfPassout} {...field} />
                                {descError && (
                                    <FormErrorMessage>Please pick an option</FormErrorMessage>
                                )}
                            </FormControl>
                        )}
                    />
                </Box>
                <Box display="flex" flexDirection="column" justifyContent="space-between">
                    <Controller
                        control={control}
                        name="department"
                        render={({ field, fieldState: { error: descError } }) => (
                            <FormControl label="Department" isInvalid={!!descError} id="Department">
                                <FormLabel>Department</FormLabel>
                                <Select options={department} {...field} />
                                {descError && (
                                    <FormErrorMessage>Please pick an option</FormErrorMessage>
                                )}
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
export default Two;
