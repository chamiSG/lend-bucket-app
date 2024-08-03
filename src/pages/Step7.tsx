import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Container,
  VStack,
  Flex,
  Card,
  CardBody,
  StackDivider,
  Select,
  Textarea,
  Checkbox,
} from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import { updateStep6Data, setCurrentStep } from "../state/store";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type FormData = {
  legalFirstName: string,
  legalLastName: string,
  ssn: string,
  dateBirth: string,
  ownerStreet: string,
  ownerCity: string,
  ownerState: string,
  ownerZip: string,
  annualIncome: string,
  ownOrRentHome: string,
  moPaymentHome: string,
  personalSign: string,
  financialLeins: string,
  organizationNumber: string,
  personalCollateral: string,
  ownerName: string,
  date: string,
  policy: boolean
}

const ownOptions = ['Own', 'Rent', 'Mortgage Paid In Full']
const financialLeinsOptions = ['Yes', 'No']

const Step7 = () => {
  const navigate = useNavigate();
  const { actions, state } = useStateMachine({ updateStep6Data, setCurrentStep });
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      legalFirstName: state?.step7?.legalFirstName || '',
      legalLastName: state?.step7?.legalLastName || '',
      ssn: state?.step7?.ssn || '',
      dateBirth: state?.step7?.dateBirth || '',
      ownerStreet: state?.step7?.ownerStreet || '',
      ownerCity: state?.step7?.ownerCity || '',
      ownerState: state?.step7?.ownerState || '',
      ownerZip: state?.step7?.ownerZip || '',
      annualIncome: state?.step7?.annualIncome || '',
      ownOrRentHome: state?.step7?.ownOrRentHome || '',
      moPaymentHome: state?.step7?.moPaymentHome || '',
      personalSign: state?.step7?.personalSign || '',
      financialLeins: state?.step7?.financialLeins || '',
      organizationNumber: state?.step7?.organizationNumber || '',
      personalCollateral: state?.step7?.personalCollateral || '',
      ownerName: state?.step7?.ownerName || '',
      date: state?.step7?.date || '',
      policy: state?.step7?.policy || false,
    },
  })

  const onSubmit = (data: any) => {
    actions.updateStep6Data(data);
    navigate("/step7");
  };

  useEffect(() => {
    actions.setCurrentStep(7);
  }, [])
  return (
    <Container maxW={560} py={5}>
      <Card>
        <CardBody py={10} px={5}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={3} divider={<StackDivider borderColor='gray.200' />}>
              <VStack spacing={5} mb={5}>
                <Flex gap={3}>
                  <FormControl isInvalid={!!errors.legalFirstName}>
                    <FormLabel htmlFor='legalFirstName'>Legal First Name</FormLabel>
                    <Input
                      id='legalFirstName'
                      placeholder='Enter Legal First Name'
                      {...register('legalFirstName', {
                        required: 'Legal First Name is required'
                      })}
                    />
                    <FormErrorMessage>
                      {errors.legalFirstName && errors.legalFirstName.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.legalLastName}>
                    <FormLabel htmlFor='legalLastName'>Legal Last Name</FormLabel>
                    <Input
                      id='legalLastName'
                      placeholder='Enter Legal Last Name'
                      {...register('legalLastName', {
                        required: 'Legal Last Name is required'
                      })}
                    />
                    <FormErrorMessage>
                      {errors.legalLastName && errors.legalLastName.message}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>

                <FormControl isInvalid={!!errors.ssn}>
                  <FormLabel htmlFor='ssn'>SSN</FormLabel>
                  <Input
                    id='ssn'
                    placeholder='Enter SSN address'
                    {...register('ssn', {
                      required: 'SSN is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.ssn && errors.ssn.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.dateBirth}>
                  <FormLabel htmlFor='dateBirth'>Date OF Birth</FormLabel>
                  <Input
                    id='dateBirth'
                    placeholder='Enter Select Date'
                    type='date'
                    {...register('dateBirth', {
                      required: 'Date OF Birth is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.dateBirth && errors.dateBirth.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.ownerStreet}>
                  <FormLabel htmlFor='street'>Home Street Address Address</FormLabel>
                  <Input
                    id='ownerStreet'
                    placeholder='Enter Home Street Address Address'
                    {...register('ownerStreet', {
                      required: 'Home Street Address Address is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.ownerStreet && errors.ownerStreet.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.ownerCity}>
                  <FormLabel htmlFor='ownerCity'>City</FormLabel>
                  <Input
                    id='ownerCity'
                    placeholder='Enter City'
                    {...register('ownerCity', {
                      required: 'City is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.ownerCity && errors.ownerCity.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.ownerState}>
                  <FormLabel htmlFor='ownerState'>State</FormLabel>
                  <Input
                    id='ownerState'
                    placeholder='Enter State'
                    {...register('ownerState', {
                      required: 'State is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.ownerState && errors.ownerState.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.ownerZip}>
                  <FormLabel htmlFor='ownerZip'>Zip Code</FormLabel>
                  <Input
                    id='ownerZip'
                    placeholder='Enter Zip Code'
                    {...register('ownerZip', {
                      required: 'Zip Code is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.ownerZip && errors.ownerZip.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.annualIncome}>
                  <FormLabel htmlFor='annualIncome'>Gross Annual Income</FormLabel>
                  <Input
                    id='annualIncome'
                    placeholder='Enter Your Gross Annual Income'
                    {...register('annualIncome', {
                      required: 'Gross Annual Income is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.annualIncome && errors.annualIncome.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.ownOrRentHome}>
                  <FormLabel htmlFor='ownOrRentHome'>Own Or Rent Home</FormLabel>
                  <Select
                    id='ownOrRentHome'
                    placeholder='Select option'
                    {...register('ownOrRentHome', {
                      required: 'This field is required',
                    })}>
                    {ownOptions?.map((option: any, index: any) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </Select>
                  <FormErrorMessage>
                    {errors.ownOrRentHome && errors.ownOrRentHome.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.moPaymentHome}>
                  <FormLabel htmlFor='moPaymentHome'>Monthly Payment On Home</FormLabel>
                  <Input
                    id='moPaymentHome'
                    placeholder='Enter Monthly Payment On Home'
                    {...register('moPaymentHome', {
                      required: 'Monthly Payment On Home is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.moPaymentHome && errors.moPaymentHome.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.personalSign}>
                  <FormLabel htmlFor='personalSign'>Are you able to sign a personal guarantor?</FormLabel>
                  <Input
                    id='personalSign'
                    placeholder='Enter answer'
                    {...register('personalSign', {
                      required: 'This field is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.personalSign && errors.personalSign.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.financialLeins}>
                  <FormLabel htmlFor='financialLeins'>Do you have any financial judgements or leins against you?</FormLabel>
                  <Select
                    placeholder='Select option'
                    {...register('financialLeins', {
                      required: 'This field is required',
                    })}>
                    {financialLeinsOptions?.map((option: any, index: any) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </Select>
                  <FormErrorMessage>
                    {errors.financialLeins && errors.financialLeins.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.personalCollateral}>
                  <FormLabel htmlFor='personalCollateral'>List Of Personal Collateral</FormLabel>
                  <Textarea 
                    id='personalCollateral'
                    placeholder='Please List Of Personal Collateral '
                    {...register('personalCollateral', {
                      required: 'List Of Personal Collateral is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.personalCollateral && errors.personalCollateral.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.ownerName}>
                  <FormLabel htmlFor='ownerName'>Business Owner Name</FormLabel>
                  <Input
                    id='ownerName'
                    placeholder='Enter Business Owner Name'
                    {...register('ownerName', {
                      required: 'Business Owner Name is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.ownerName && errors.ownerName.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.date}>
                  <FormLabel htmlFor='date'>Please select a date</FormLabel>
                  <Input
                    id='date'
                    type='date'
                    placeholder='Enter Please select a date'
                    {...register('date', {
                      required: 'Please select a date is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.date && errors.date.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.policy}>
                  <Checkbox colorScheme="brand" color={errors.policy ? 'red' : 'brand'}
                    {...register('policy', {
                      required: 'policy is reqired',
                    })}
                  >
                   I agree with the privacy policy and terms and conditions and wish to submit this financial application
                  </Checkbox>
                </FormControl>
              </VStack>
              <Flex w={'full'} justifyContent={'space-between'} gap={3}>
                <Button w={'full'} mt={4} colorScheme='gray' isLoading={isSubmitting} onClick={() => navigate(-1)}>
                  Back
                </Button>
                <Button w={'full'} mt={4} colorScheme='brand' isLoading={isSubmitting} type='submit'>
                  Submit
                </Button>
              </Flex>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Step7;
