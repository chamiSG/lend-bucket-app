import {
  FormControl,
  Button,
  Container,
  VStack,
  Input,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
  InputGroup,
  InputLeftAddon,
  Card,
  CardBody,
  StackDivider,
  Flex,
} from '@chakra-ui/react'
import { Controller, useForm } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import { updateStep5Data, setCurrentStep } from "../state/store";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type FormData = {
  expectation: number
}

const Step5 = () => {
  const navigate = useNavigate();
  const { actions, state } = useStateMachine({ updateStep5Data, setCurrentStep });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      expectation: state?.step5?.expectation || 100,
    },
  })
  const onSubmit = (data: any) => {
    actions.updateStep5Data(data);
    navigate("/step6");
  };

  useEffect(() => {
    actions.setCurrentStep(5);
  }, [])

  return (
    <Container maxW={560} py={5}>
      <Card>
        <CardBody py={10} px={5}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={3} divider={<StackDivider borderColor='gray.200' />}>
              <FormControl as="fieldset" mb={4} display={'flex'} flexDir={'column'} gap={3}>
                <Controller
                  name="expectation"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputGroup>
                        <InputLeftAddon>Value:</InputLeftAddon>
                        <Input
                          {...field}
                          id="expectation_input"
                          value={`$${field.value.toLocaleString() || 100}`}
                          readOnly
                          mb={4}
                        />
                      </InputGroup>
                      <Slider
                        {...field}
                        id="expectation"
                        defaultValue={Number(field.value) || 100}
                        min={100}
                        max={100000}
                        step={1}
                        onChange={(val) => field.onChange(val)}
                        mb={8}
                        colorScheme={'brand'}
                      >
                        <SliderMark value={100} mt="2" ml="-2.5" fontSize="sm">
                          $100
                        </SliderMark>
                        <SliderMark value={100000} mt="2" ml="-10" fontSize="sm">
                          $100,000
                        </SliderMark>
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <Tooltip
                          hasArrow
                          bg='gray.900'
                          borderRadius={3}
                          px={3}
                          py={1.5}
                          color='white'
                          placement='bottom'
                          isOpen={true}
                          label={`$${field.value.toLocaleString() || 100}`}
                        >
                          <SliderThumb />
                        </Tooltip>
                      </Slider>
                    </>
                  )}
                />
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

export default Step5;
