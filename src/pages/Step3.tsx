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
import { updateStep3Data, setCurrentStep } from "../state/store";
import { useNavigate } from 'react-router-dom';
import RadioCard from '../components/RadioCard';
import { useEffect } from 'react';

type FormData = {
  employees: string
}

const Step3 = () => {
  const navigate = useNavigate();
  const { actions, state } = useStateMachine({ updateStep3Data, setCurrentStep });
  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      employees: state?.step3?.employees || '',
    },
  })
  const options = ['1 to 2', '3 to 9', '10 to 49', '50 to 99', '100+']

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'employees',
    defaultValue: state?.step3?.employees || '',
    onChange: (e: any) => setValue("employees", e)
  })

  const group = getRootProps()

  const onSubmit = (data: any) => {
    actions.updateStep3Data(data);
    navigate("/step4");
  };

  useEffect(() => {
    actions.setCurrentStep(3);
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

export default Step3;
