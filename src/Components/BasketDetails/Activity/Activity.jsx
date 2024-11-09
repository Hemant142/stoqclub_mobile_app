import React from "react";
import { Box, Text, Flex, Icon } from "@chakra-ui/react";
import { CiCircleCheck } from "react-icons/ci";

const Activity = ({ basketData, orderHistory }) => {
  const historyFormatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}> {/* Reduced from 2xl to xl */}
        Basket Activity
      </Text>
      <Box
        backgroundColor="rgba(38, 42, 51, 1)"
        border="1px solid rgba(86, 94, 108, 1)"
        borderRadius="md"
        boxShadow="md"
      >
        <Box m={"4%"} display="flex" alignItems="center" gap={4} width="100%">
          <Flex align="center" gap={2} width="30%">
            <Icon as={CiCircleCheck} boxSize={5} color="#1DD75B" /> {/* Reduced icon size */}
            <Text fontFamily="Inter" fontSize="12px" fontWeight="500" textAlign="left"> {/* Reduced from 14px to 12px */}
              {historyFormatDate(basketData?.creationDate)}
            </Text>
          </Flex>

          <Text
            fontFamily="Inter"
            fontSize="12px"  // Reduced from 14px to 12px
            fontWeight="500"
            textAlign="left"
            width="50%"
          >
            Basket Created
          </Text>
        </Box>

        {basketData?.instrumentList?.length > 0 ? (
          basketData.instrumentList.map((inst, index) => (
            <Box
              key={`inst_${index}`}
              m={"4%"}
              display="flex"
              alignItems="center"
              gap={4}
              width="100%"
            >
              <Flex align="center" gap={2} width="30%">
                <Icon as={CiCircleCheck} boxSize={5} color="#1DD75B" /> {/* Reduced icon size */}
                <Text fontFamily="Inter" fontSize="12px" fontWeight="500" textAlign="left"> {/* Reduced from 14px to 12px */}
                  {historyFormatDate(inst?.statusDate)}
                </Text>
              </Flex>

              <Text
                fontFamily="Inter"
                fontSize="12px"  // Reduced from 14px to 12px
                fontWeight="500"
                textAlign="left"
                width="60%"
              >
                {inst?.instrument} {inst?.orderType === "Entry" ? "Added" : "Removed"}
              </Text>
            </Box>
          ))
        ) : (
          <Text fontSize="12px" textAlign="center" color="gray.500"> {/* Reduced from 14px to 12px */}
            Please Start Investment
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default Activity;
