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
  Card,
  CardBody,
  StackDivider,
  Select,
  Textarea,
} from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import { updateStep6Data, setCurrentStep, setPlaidLinkStatus } from "../state/store";
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import PlaidLinkButton from '../components/PlaidLinkButton';
import axios from '../utils/api';

type FormData = {
  businessName: string;
  dbaName: string;
  businessType: string;
  formationState: string;
  businessStreet: string;
  businessCity: string;
  businessState: string;
  businessZip: string;
  industry: string;
  annualSales: string;
  startDate: string;
  eIn: string;
  own: string;
  moPayment: string;
  moExpenses: string;
  leins: string;
  organizationNumber: string;
  collateral: string;
  statements: boolean;
  businessEmail: string;
  businessPhoneNumber: string;
}

const businessTypeOptions = [
  'Limited Liability Company (LLC)',
  'Sole Proprietorship',
  'Partnership',
  'S-Corp',
  'C-Crop',
  'Non Profit',
]

const ownOptions = ['Own', 'Rent', 'Mortgage Paid In Full']
const leinsOptions = ['Yes', 'No']

const Step6 = () => {
  const navigate = useNavigate();
  const { actions, state } = useStateMachine({ updateStep6Data, setCurrentStep, setPlaidLinkStatus });
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      businessName: state?.step6?.businessName || '',
      dbaName: state?.step6?.dbaName || '',
      businessType: state?.step6?.businessType || '',
      formationState: state?.step6?.formationState || '',
      businessStreet: state?.step6?.businessStreet || '',
      businessCity: state?.step6?.businessCity || '',
      businessState: state?.step6?.businessState || '',
      businessZip: state?.step6?.businessZip || '',
      industry: state?.step6?.industry || '',
      annualSales: state?.step6?.annualSales || '',
      startDate: state?.step6?.startDate || '',
      eIn: state?.step6?.eIn || '',
      own: state?.step6?.own || '',
      moPayment: state?.step6?.moPayment || '',
      moExpenses: state?.step6?.moExpenses || '',
      leins: state?.step6?.leins || '',
      organizationNumber: state?.step6?.organizationNumber || '',
      collateral: state?.step6?.collateral || '',
      statements: state?.step6?.statements || false,
      businessEmail: state?.step6?.businessEmail || '',
      businessPhoneNumber: state?.step6?.businessPhoneNumber || '',
    },
  })

  const onSubmit = (data: any) => {
    actions.updateStep6Data(data);
    navigate("/step7");
  };

  const getInfo = useCallback(async () => {
    const response = await axios.post("/api/info");
    if (!response) {
      actions.setPlaidLinkStatus({
        backend: false
      })
      return { paymentInitiation: false };
    }
    const data = await response.data;
    const paymentInitiation: boolean = data.products.includes(
      "payment_initiation"
    );
    actions.setPlaidLinkStatus({
      isPaymentInitiation: paymentInitiation
    })
    return { paymentInitiation };
  }, [actions]);

  const generateToken = useCallback(
    async (isPaymentInitiation: any) => {
      // Link tokens for 'payment_initiation' use a different creation flow in your backend.
      const path = isPaymentInitiation
        ? "/api/create_link_token_for_payment"
        : "/api/create_link_token";
      const response = await axios.post(path);
      if (!response) {
        actions.setPlaidLinkStatus({
          linkToken: null
        })
        return;
      }
      const data = await response.data;
      if (data) {
        if (data.error != null) {
          actions.setPlaidLinkStatus({
            linkToken: null,
            linkTokenError: data.error,
          })
          return;
        }
        actions.setPlaidLinkStatus({
          linkToken: data.link_token,
        })
      }
      localStorage.setItem("link_token", data.link_token);
    },
    [actions]
  );

  useEffect(() => {
    const init = async () => {
      const { paymentInitiation } = await getInfo(); // used to determine which path to take when generating token
      // do not generate a new token for OAuth redirect; instead
      // setLinkToken from localStorage
      if (window.location.href.includes("?oauth_state_id=")) {
        actions.setPlaidLinkStatus({
          linkToken: localStorage.getItem("link_token"),
        })
        return;
      }
      generateToken(paymentInitiation);
    };
    init();
  }, [actions, generateToken, getInfo]);


  useEffect(() => {
    actions.setCurrentStep(6);
  }, [])

  useEffect(() => {
    setValue('statements', state.plaid.linkStatus)
  }, [state])
  return (
    <Container maxW={560} py={5}>
      <Card>
        <CardBody py={10} px={5}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={3} divider={<StackDivider borderColor='gray.200' />}>
              <VStack spacing={5} mb={5}>
                <Flex gap={3}>
                  <FormControl isInvalid={!!errors.businessName}>
                    <FormLabel htmlFor='businessName'>Legal Business Name</FormLabel>
                    <Input
                      id='businessName'
                      placeholder='Enter Legal Business Name'
                      {...register('businessName', {
                        required: 'Legal Business Name is required'
                      })}
                    />
                    <FormErrorMessage>
                      {errors.businessName && errors.businessName.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.dbaName}>
                    <FormLabel htmlFor='dbaName'>Business DBA Name</FormLabel>
                    <Input
                      id='dbaName'
                      placeholder='Enter Business DBA Name'
                      {...register('dbaName', {
                        required: 'Business DBA Name is required'
                      })}
                    />
                    <FormErrorMessage>
                      {errors.dbaName && errors.dbaName.message}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
                <FormControl isInvalid={!!errors.businessType}>
                  <FormLabel htmlFor='businessType'>Type Of Business Entity</FormLabel>
                  <Select
                    placeholder='Select option'
                    {...register('businessType', {
                      required: 'Type Of Business Entity is required',
                    })}>
                    {businessTypeOptions?.map((option: any, index: any) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </Select>
                  <FormErrorMessage>
                    {errors.businessType && errors.businessType.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.formationState}>
                  <FormLabel htmlFor='formationState'>State Of Formation</FormLabel>
                  <Input
                    id='formationState'
                    placeholder='Enter State Of Formation address'
                    {...register('formationState', {
                      required: 'State Of Formation is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.formationState && errors.formationState.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.businessStreet}>
                  <FormLabel htmlFor='businessStreet'>Business Street Address</FormLabel>
                  <Input
                    id='businessStreet'
                    placeholder='Enter Business Street Address'
                    {...register('businessStreet', {
                      required: 'Business Street Address is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.businessStreet && errors.businessStreet.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.businessCity}>
                  <FormLabel htmlFor='businessCity'>City</FormLabel>
                  <Input
                    id='businessCity'
                    placeholder='Enter City'
                    {...register('businessCity', {
                      required: 'City is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.businessCity && errors.businessCity.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.businessState}>
                  <FormLabel htmlFor='businessState'>State</FormLabel>
                  <Input
                    id='businessState'
                    placeholder='Enter State'
                    {...register('businessState', {
                      required: 'State is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.businessState && errors.businessState.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.businessZip}>
                  <FormLabel htmlFor='businessZip'>Zip Code</FormLabel>
                  <Input
                    id='businessZip'
                    placeholder='Enter Zip Code'
                    {...register('businessZip', {
                      required: 'Zip Code is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.businessZip && errors.businessZip.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.industry}>
                  <FormLabel htmlFor='industry'>What Industry Is This Business In?</FormLabel>
                  <Input
                    id='industry'
                    placeholder='Enter Your Industry'
                    {...register('industry', {
                      required: 'Industry is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.industry && errors.industry.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.annualSales}>
                  <FormLabel htmlFor='annualSales'>Gross Annual Sales</FormLabel>
                  <Input
                    id='annualSales'
                    placeholder='Enter Gross Annual Sales'
                    {...register('annualSales', {
                      required: 'Gross Annual Sales is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.annualSales && errors.annualSales.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.startDate}>
                  <FormLabel htmlFor='startDate'>Business Start Date</FormLabel>
                  <Input
                    id='startDate'
                    placeholder='Enter Business Start Date'
                    {...register('startDate', {
                      required: 'Business Start Date is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.startDate && errors.startDate.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.eIn}>
                  <FormLabel htmlFor='eIn'>Business Federal Tax ID Number (EIN)</FormLabel>
                  <Input
                    id='eIn'
                    placeholder='Enter Business Federal Tax ID Number (EIN)'
                    {...register('eIn', {
                      required: 'Business Federal Tax ID Number (EIN) is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.eIn && errors.eIn.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.own}>
                  <FormLabel htmlFor='own'>Own Or Rent Business Location</FormLabel>
                  <Select
                    placeholder='Select option'
                    {...register('own', {
                      required: 'This field is required',
                    })}>
                    {ownOptions?.map((option: any, index: any) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </Select>
                  <FormErrorMessage>
                    {errors.own && errors.own.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.moPayment}>
                  <FormLabel htmlFor='moPayment'>Monthly Payment On Location</FormLabel>
                  <Input
                    id='moPayment'
                    placeholder='Enter Monthly Payment On Location'
                    {...register('moPayment', {
                      required: 'Monthly Payment On Location is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.moPayment && errors.moPayment.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.moExpenses}>
                  <FormLabel htmlFor='moExpenses'>Monthly Business Expenses</FormLabel>
                  <Input
                    id='moExpenses'
                    placeholder='Enter Monthly Business Expenses'
                    {...register('moExpenses', {
                      required: 'Monthly Business Expenses is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.moExpenses && errors.moExpenses.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.leins}>
                  <FormLabel htmlFor='leins'>Are There Any Leins On The Business?</FormLabel>
                  <Select
                    placeholder='Select option'
                    {...register('leins', {
                      required: 'This field is required',
                    })}>
                    {leinsOptions?.map((option: any, index: any) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </Select>
                  <FormErrorMessage>
                    {errors.leins && errors.leins.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.organizationNumber}>
                  <FormLabel htmlFor='organizationNumber'>Articles Of Organization Number</FormLabel>
                  <Input
                    id='organizationNumber'
                    placeholder='Enter Articles Of Organization Number'
                    {...register('organizationNumber', {
                      required: 'Articles Of Organization Number is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.organizationNumber && errors.organizationNumber.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.collateral}>
                  <FormLabel htmlFor='collateral'>List Of Business Collateral</FormLabel>
                  <Textarea
                    id='collateral'
                    placeholder='Please List Items and Worth'
                    {...register('collateral', {
                      required: 'List Of Business Collateral is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.collateral && errors.collateral.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.statements}>
                  <FormLabel htmlFor='statements'>Connect Plaid</FormLabel>
                  <PlaidLinkButton />
                  <Input
                    display={'none'}
                    id='statements'
                    {...register('statements', {
                      required: 'You should be connect your Plaid account.',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.statements && errors.statements.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.businessEmail}>
                  <FormLabel htmlFor='businessEmail'>Business Email address</FormLabel>
                  <Input
                    id='businessEmail'
                    type='email'
                    placeholder='Enter Email address'
                    {...register('businessEmail', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.businessEmail && errors.businessEmail.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.businessPhoneNumber}>
                  <FormLabel htmlFor='businessPhoneNumber'>Business Phone number</FormLabel>
                  <InputGroup>
                    <InputLeftAddon>+1</InputLeftAddon>
                    <Input
                      id='businessPhoneNumber'
                      type='tel'
                      placeholder='Enter Business Phone number'
                      {...register('businessPhoneNumber', {
                        required: 'Business Phone number is required',
                        pattern: {
                          value: /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,
                          message: 'Invalid phone number. Should be US phone number',
                        },
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.businessPhoneNumber && errors.businessPhoneNumber.message}
                  </FormErrorMessage>
                </FormControl>
              </VStack>
              <Flex w={'full'} justifyContent={'space-between'} gap={3}>
                <Button w={'full'} mt={4} colorScheme='gray' onClick={() => navigate(-1)}>
                  Back
                </Button>
                <Button w={'full'} mt={4} colorScheme='brand' isLoading={isSubmitting} type='submit'>
                  Continue
                </Button>
              </Flex>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Step6;
