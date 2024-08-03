import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Container,
  InputGroup,
  InputLeftAddon,
  VStack,
  Flex,
  Checkbox,
  Box,
  Card,
  CardBody,
  StackDivider,
} from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import { updateStep1Data, setCurrentStep } from "../state/store";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type FormData = {
  firstName: string
  lastName: string,
  email: string,
  phoneNumber: string,
  terms: boolean
}

const Step1 = () => {
  const navigate = useNavigate();
  const { actions, state } = useStateMachine({ updateStep1Data, setCurrentStep });
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      firstName: state?.step1?.firstName || '',
      lastName: state?.step1?.lastName || '',
      email: state?.step1?.email || '',
      phoneNumber: state?.step1?.phoneNumber || '',
      terms: state?.step1?.terms || false,
    },
  })

  const onSubmit = (data: any) => {
    actions.updateStep1Data(data);
    navigate("/step2");
  };

  useEffect(() => {
    actions.setCurrentStep(1);
  }, [])
  return (
    <Container maxW={560} py={5}>
      <Card>
        <CardBody py={10} px={5}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={3} divider={<StackDivider borderColor='gray.200' />}>
              <VStack spacing={5} mb={5}>

                <Flex gap={3}>
                  <FormControl>
                    <FormLabel htmlFor='firstName'>First name</FormLabel>
                    <Input
                      id='firstName'
                      placeholder='Enter First Name'
                      {...register('firstName')}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor='lastname'>Last name</FormLabel>
                    <Input
                      id='lastName'
                      placeholder='Enter Last Name'
                      {...register('lastName')}
                    />
                  </FormControl>
                </Flex>
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel htmlFor='email'>Email Addesss</FormLabel>
                  <Input
                    id='email'
                    type='email'
                    placeholder='Enter Email address'
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.phoneNumber}>
                  <FormLabel htmlFor='phoneNumber'>Phone Number</FormLabel>
                  <InputGroup>
                    <InputLeftAddon>+1</InputLeftAddon>
                    <Input
                      id='phoneNumber'
                      type='tel'
                      placeholder='Enter Phone Number'
                      {...register('phoneNumber', {
                        required: 'Phone Number is required',
                        pattern: {
                          value: /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,
                          message: 'Invalid phone number. Should be US phone number',
                        },
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.phoneNumber && errors.phoneNumber.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.terms}>
                  <Checkbox colorScheme="brand" color={errors.terms ? 'red' : 'brand'}
                    {...register('terms', {
                      required: 'terms is reqired',
                    })}
                  >
                    I agree with the&nbsp;
                    <Box as='a' color={errors.terms ? 'red' : 'brand.500'} href='https://www.termsfeed.com/live/068be7d2-3424-479d-8e18-8b489be1d7af' target='_blank' fontWeight='bold'>
                      privacy policy
                    </Box>
                    &nbsp;and I'm ready to continue the application
                  </Checkbox>
                </FormControl>
              </VStack>
              <Button w={'full'} mt={4} colorScheme='brand' isLoading={isSubmitting} type='submit'>
                Apply Now
              </Button>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Step1;
