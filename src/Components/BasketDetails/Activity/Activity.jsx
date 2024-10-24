import React from "react";
import { Box, Text, Flex, Stack, Icon } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { CiCircleCheck } from "react-icons/ci";

const Activity = ({ basketData, orderHistory }) => {


  const historyFormatDate = (dateString) => {
    const date = new Date(dateString);

    const options = { year: "numeric", month: "short", day: "numeric" };

    // Example output: "Oct 23, 2024"
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <Box  p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Activity
      </Text>
      <Box
        backgroundColor="rgba(38, 42, 51, 1)"
        //    boxShadow="0px 2px 5px rgba(23, 26, 31, 0.09), 0px 0px 2px rgba(23, 26, 31, 0.12)"
        //    borderRadius="8px"
        border="1px solid rgba(86, 94, 108, 1)"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
      >
        {basketData?.instrumentList?.length > 0 ? (
          orderHistory?.length > 0 ? (
            orderHistory.map((inst, index) => (
              <Box key={`inst_${index}`} 
              // border={"1px solid red"}
              m={"4%"}
              display="flex" alignItems="center"
              
              gap={2} width="100%">
              {/* Status Icon and Date */}
              <Flex align="center" gap={2} width="30%">
                <Icon
                  as={CiCircleCheck}
                  boxSize={6}
                  color="#1DD75B" // Static color for icon
                />
                <Text
                  fontFamily="Inter"
                  fontSize="12px"
                  fontWeight="400"
                  lineHeight="20px"
                  textAlign="left"
                  width="78px"
                  height="24px"
                >
                  {historyFormatDate(inst?.date)}
                </Text>
              </Flex>
            
              {/* Instrument Name */}
              <Text
                fontFamily="Inter"
                fontSize="12px"
                fontWeight="400"
                lineHeight="20px"
                textAlign="left"
              
                width="30%"  // Increased width for better display
                height="24px"
              >
                {inst?.instrument}
              </Text>
            
              {/* Order Type with Conditional Color */}
              <Text
                fontFamily="Inter"
                fontSize="12px"
                fontWeight="400"
                lineHeight="20px"
                textAlign="left"
                width="30%"  
                // width="100px" // Increased width for better layout
                height="24px"
                color={inst?.orderType === 'Entry' ? '#1DD75B' : inst?.orderType === 'Exit' ? '#E05858' : 'black'}
              >
                Ordertype: {inst?.orderType}
              </Text>
            </Box>
            ))
          ) : (
            basketData.instrumentList.map((inst, index) => (
              <Box key={`inst_${index}`} 
              // border={"1px solid red"}
              m={"4%"}
              display="flex" alignItems="center"
              
              gap={2} width="100%">
              {/* Status Icon and Date */}
              <Flex align="center" gap={2} width="30%">
                <Icon
                  as={CiCircleCheck}
                  boxSize={6}
                  color="#1DD75B" // Static color for icon
                />
                <Text
                  fontFamily="Inter"
                  fontSize="12px"
                  fontWeight="400"
                  lineHeight="20px"
                  textAlign="left"
                  width="78px"
                  height="24px"
                >
                  {historyFormatDate(inst?.statusDate)}
                </Text>
              </Flex>
            
              {/* Instrument Name */}
              <Text
                fontFamily="Inter"
                fontSize="12px"
                fontWeight="400"
                lineHeight="20px"
                textAlign="left"
              
                width="30%"  // Increased width for better display
                height="24px"
              >
                {inst?.instrument}
              </Text>
            
              {/* Order Type with Conditional Color */}
              <Text
                fontFamily="Inter"
                fontSize="12px"
                fontWeight="400"
                lineHeight="20px"
                textAlign="left"
                width="30%"  
                // width="100px" // Increased width for better layout
                height="24px"
                color={inst?.orderType === 'Entry' ? 'green' : inst?.orderType === 'Exit' ? 'red' : 'black'}
              >
                Ordertype: {inst?.orderType}
              </Text>
            </Box>
            
            ))
          )
        ) : (
          <Text className="no_data_box">Please Start Investment</Text>
        )}
      </Box>
    </Box>
  );
};

export default Activity;
