import React, { useState, useEffect } from "react";
import { Box, Button, Text, VStack, useToast } from "@chakra-ui/react";
import { FaStopwatch } from "react-icons/fa";

const Index = () => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (waiting) {
      const timer = setTimeout(
        () => {
          setStartTime(Date.now());
          setWaiting(false);
          toast({
            title: "Click now!",
            description: "Click the button as fast as you can!",
            status: "info",
            duration: 9000,
            isClosable: true,
          });
        },
        Math.floor(Math.random() * 2000) + 1000,
      ); // Random delay between 1-3 seconds

      return () => clearTimeout(timer);
    }
  }, [waiting, toast]);

  const handleButtonClick = () => {
    if (waiting) {
      toast({
        title: "Too soon!",
        description: "Wait for the go signal before clicking.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setWaiting(false);
    } else if (startTime) {
      const endTime = Date.now();
      const reactionTime = endTime - startTime;
      setEndTime(endTime);
      setReactionTime(reactionTime);
      setStartTime(null);
    } else {
      setReactionTime(null);
      setEndTime(null);
      setWaiting(true);
    }
  };

  return (
    <VStack spacing={8} p={5}>
      <Box textAlign="center">
        <Text fontSize="xl" fontWeight="bold">
          Reaction Time Tester
        </Text>
        <Text fontSize="md">Test how fast you can react to the go signal.</Text>
      </Box>
      <Button rightIcon={<FaStopwatch />} colorScheme="teal" size="lg" onClick={handleButtonClick}>
        {waiting ? "Wait for it..." : startTime ? "Click now!" : "Start Test"}
      </Button>
      {reactionTime !== null && (
        <Text fontSize="lg">
          Your reaction time is: <strong>{reactionTime} ms</strong>
        </Text>
      )}
    </VStack>
  );
};

export default Index;
