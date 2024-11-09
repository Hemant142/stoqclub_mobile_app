import React from "react";
import { Box, Text, Flex, Icon } from "@chakra-ui/react";
import { CiCircleCheck } from "react-icons/ci";

export default function YourActivity({ basketHistory }) {
  const historyFormatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const formattedTime = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}> {/* Reduced from 2xl to xl */}
        Your Activity
      </Text>
      <Box
        backgroundColor="rgba(38, 42, 51, 1)"
        border="1px solid rgba(86, 94, 108, 1)"
        borderRadius="md"
        boxShadow="md"
      >
        {basketHistory?.length > 0 ? (
          basketHistory.map((inst, index) => (
            <Box
              key={`inst_${index}`}
              m={"4%"}
              display="flex"
              alignItems="center"
              gap={4}
              width="100%"
            >
              <Flex align="center" gap={2} width="50%">
                <Icon as={CiCircleCheck} boxSize={5} color="#1DD75B" /> {/* Reduced icon size */}
                <Text fontFamily="Inter" fontSize="12px" fontWeight="500" textAlign="left"> {/* Reduced from 14px to 12px */}
                  {historyFormatDate(inst?.date)}
                </Text>
              </Flex>

              <Text
                fontFamily="Inter"
                fontSize="12px"  // Reduced from 14px to 12px
                fontWeight="500"
                textAlign="left"
                width="50%"
              >
                {inst?.instrument} {inst?.orderType === "Entry" ? "Added" : "Removed"}
              </Text>
            </Box>
          ))
        ) : (
            <Text fontSize="18px" textAlign="center" color="gray.500">
            You never invested in this basket
          </Text> 
          
        )}
      </Box>
    </Box>
  );
}
