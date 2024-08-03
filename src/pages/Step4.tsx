import {
  FormControl,
  Button,
  Container,
  VStack,
  useRadioGroup,
  Card,
  CardBody,
  StackDivider,
  Flex,
} from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import { updateStep4Data, setCurrentStep } from "../state/store";
import { useNavigate } from 'react-router-dom';
import RadioCard from '../components/RadioCard';
import { useEffect } from 'react';

type FormData = {
  financing: string
}

const Step4 = () => {
  const navigate = useNavigate();
  const { actions, state } = useStateMachine({ updateStep4Data, setCurrentStep });
  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      financing: state?.step4?.financing || '',
    },
  })
  const options = [
    'Equipment Purchase',
    'Working Capital',
    'Line Of Credit',
    'Invoice Factoring',
    'New Business Purchase',
    'I Want To Establish My Business Credit',
  ]

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'financing',
    defaultValue: state?.step4?.financing || '',
    onChange: (e: any) => setValue("financing", e)
  })

  const group = getRootProps()

  const onSubmit = (data: any) => {
    actions.updateStep4Data(data);
    navigate("/step5");
  };

  useEffect(() => {
    actions.setCurrentStep(4);
  }, [])

  return (
    <Container maxW={560} py={5}>
      <Card>
        <CardBody py={10} px={5}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={3} divider={<StackDivider borderColor='gray.200' />}>
              <FormControl as="fieldset" mb={4} display={'flex'} flexDir={'column'} gap={3} {...group}>
                {options.map((value: any) => {
                  const radio = getRadioProps({ value })
                  return (
                    <RadioCard key={value} {...radio} >
                      {value}
                    </RadioCard>
                  )
                })}
              </FormControl>
              <Flex w={'full'} justifyContent={'space-between'} gap={3}>
                <Button w={'full'} mt={4} colorScheme='gray' isLoading={isSubmitting} onClick={() => navigate(-1)}>
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

export default Step4;
