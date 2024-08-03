// import { StateMachineProvider, createStore } from 'little-state-machine'

import { Box, Container, Heading, Image, Progress, Text, VStack } from "@chakra-ui/react"
import { useStateMachine } from "little-state-machine";
import { useEffect, useState } from "react";

const pageTitle = [
  { page: 1, title: "Let's Start With Some Information", subTitle: "" },
  { page: 2, title: "How Much Does Your Business Make Per Month?", subTitle: "" },
  { page: 3, title: "How many employees does your company have?", subTitle: "" },
  { page: 4, title: "What Do You Need Financing For?", subTitle: "Select All That Apply" },
  { page: 5, title: "How Much Money Are You Looking For?", subTitle: "" },
  { page: 6, title: "Please Fill Out This Application", subTitle: "We will use this info to determine your eligibility" },
  { page: 7, title: "Owner Info", subTitle: "We will use this info to determine your eligibility" },
  { page: 8, title: "Evaluating your data…", subTitle: "This might take a few seconds." },
  { page: 9, title: "Congratulation's You've Been Approved!", subTitle: "" },
  { page: 10, title: "Congratulation's On Building A Relationship With LendBucket", subTitle: "" },
]

function Header() {
  const { state } = useStateMachine();
  const [percent, setPercent] = useState(0);
  
  useEffect(() => {
    const calcPercent = () => {
      const result = 10 * state.currentStep
      setPercent(result)
    }
    calcPercent()
  }, [state])

  return (
    <VStack
      align='center'
      py={4}
      position={'sticky'}
    >
      <Image src='../original.png' alt='logo' width={132} py={3} />
      <Heading as='h2' size='xl'>
        Let's Get Your Business Funded Within 24 Hours
      </Heading>
      <Container maxW={420} my={5}>
        <Progress w={'full'} value={percent} variant={'main'} colorScheme="brand" />
      </Container>
      {pageTitle?.map((item: any, index: any) => {
        if (item.page !== state.currentStep) {
          return
        }
        return (
          <Box key={index} textAlign={'center'}>
            <Heading as='h3' size='lg'>
              {item.title}
            </Heading>
            {item.subTitle && (
              <Text size='sm'>
                {item.subTitle}
              </Text>
            )}
          </Box>
        )
      })}
    </VStack>
  )
}

export default Header
