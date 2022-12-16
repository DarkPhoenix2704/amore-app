import * as Yup from 'yup';
import { OptionalObjectSchema } from 'yup/lib/object';

const PickAnOptionValidator = Yup.object({
    value: Yup.string().required(),
    label: Yup.string().required(),
}).nullable();

export type Option = {
    label: string;
    value: string;
};

const requiredErrorStatement = (value: string): string => `Please type your ${value}`;

export const registerWizardValidator = Yup.object({
    name: Yup.string().required(requiredErrorStatement('Full Name')),
    mobile: Yup.string().required(requiredErrorStatement('Mobile number')),
    bio: Yup.string().required(requiredErrorStatement('Bio')),
    dob: Yup.date()
        .typeError('Please provide a valid Date')
        .required(requiredErrorStatement('DOB')),
    pronoun: PickAnOptionValidator.required('Please pick an option'),
    partnerPronoun: PickAnOptionValidator.required('Please pick an option'),
    interest: Yup.array()
        .max(5, 'Pick 5 Interests')
        .of(
            Yup.object().shape({
                value: Yup.string().required(),
                label: Yup.string().required(),
            }),
        ),
    college: PickAnOptionValidator.required('Please pick an option'),
    passYear: PickAnOptionValidator.required(requiredErrorStatement('Please pick an option')),
    department: PickAnOptionValidator.required('Please pick an option'),
});

export const firstStepSchema = Yup.object({
    name: Yup.string().required(requiredErrorStatement('Full Name')),
    mobile: Yup.string().required(requiredErrorStatement('Mobile number')),
    dob: Yup.date().required(requiredErrorStatement('DOB')),
    pronoun: PickAnOptionValidator.required('Please pick an option'),
});

export const secondStepSchema = Yup.object({
    college: PickAnOptionValidator.required('Please pick an option'),
    department: PickAnOptionValidator.required('Please pick an option'),
    passYear: PickAnOptionValidator.required('Please pick an option'),
});
export const thirdStepSchema = Yup.object({
    partnerPronoun: PickAnOptionValidator.required('Please pick an option'),
    interest: Yup.array()
        .max(5, 'Pick 5 Interests')
        .of(Yup.object().shape({ value: Yup.string().required(), label: Yup.string().required() })),
    bio: Yup.string().required(requiredErrorStatement('Bio')),
});

export const stepByStepValidator: Record<number, OptionalObjectSchema<any>> = {
    1: firstStepSchema,
    2: secondStepSchema,
    3: thirdStepSchema,
};
