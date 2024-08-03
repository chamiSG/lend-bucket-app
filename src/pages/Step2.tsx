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
import { updateStep2Data, setCurrentStep } from "../state/store";
import { useNavigate } from 'react-router-dom';
import RadioCard from '../components/RadioCard';
import { useEffect } from 'react';

type FormData = {
  revenue: string
}

const Step2 = () => {
  const navigate = useNavigate();
  const { actions, state } = useStateMachine({ updateStep2Data, setCurrentStep });
  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      revenue: state?.step2?.revenue || '',
    },
  })
  const options = ['$10K-$20K', '$20K-$50K', '$50K-$75K', '$75K-$100K', '$100K+']

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'revenue',
    defaultValue: state?.step2?.revenue || '',
    onChange: (e: any) => setValue("revenue", e)
  })

  const group = getRootProps()

  const onSubmit = (data: any) => {
    actions.updateStep2Data(data);
    navigate("/step3");
  };

  useEffect(() => {
    actions.setCurrentStep(2);
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

export default Step2;
