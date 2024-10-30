import {
  Box,
  Text,
  Heading,
  Flex,
  HStack,
  VStack,
  List,
  ListItem,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons"; // Chakra's built-in check icon
import { FaCaretUp, FaCaretDown } from "react-icons/fa"; // For the caret icons
import { CiCircleCheck } from "react-icons/ci";

function AccountOverview({ userInfo }) {
  return userInfo.firstTimeClient ? (
    <Box mb={8}>
      <Box
        bg="#262A33"
        border="1px"
        borderColor="gray.600"
        borderRadius="md"
        p={4}
        mb={8}
      >
        <Heading
         fontFamily={"Helvetica"}
          fontSize="20px"
          fontWeight="normal"
          lineHeight="30px"
          textAlign="left"
          color="white"
          width="247px"
          height="30px"
          mb={4} // for spacing below the heading
        >
          Your Account Overview
        </Heading>

        <Flex justifyContent="space-between">
          <VStack align="start">
            <Text
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
              fontSize="20px"
              fontWeight="normal"
              lineHeight="30px"
              textAlign="left"
              color="gray.300"
              width="82px"
              height="30px"
            >
              Balance
            </Text>

            <HStack>
              <Text color="green.400" 
               fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
              fontSize="xl" position="relative" top={1}>
                {" "}
                {/* Adjust this value as needed */}₹
              </Text>

              <Text
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
                fontSize="21px"
                fontWeight="normal"
                lineHeight="32px"
                textAlign="left"
                color="white"
                height="32px"
              >
                {userInfo.balance}
              </Text>
            </HStack>
          </VStack>
          <VStack align="end">
            <Text
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
              fontSize="20px"
              fontWeight="normal"
              lineHeight="30px"
              textAlign="left"
              color="gray.300"
              // width="82px"
              height="30px"
            >
              Your holding
            </Text>

            <HStack>
              <Text color="green.400" 
               fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
              fontSize="xl" position="relative" top={1}>
                {" "}
                {/* Adjust this value as needed */}₹
              </Text>
              <Text
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
                fontSize="21px"
                fontWeight="normal"
                lineHeight="32px"
                textAlign="left"
                color="white"
                height="32px"
              >
                {userInfo.holdings}
              </Text>
            </HStack>
          </VStack>
        </Flex>
      </Box>

      <Box
        bg="#262A33"
        border="1px"
        borderColor="gray.600"
        borderRadius="md"
        textAlign={"left"}
        p={4}
        mb={8}
        fontFamily="Inter"
      >
        <Heading color="white" fontSize="lg" fontFamily={"Helvetica"} mb={4} fontWeight={500}>
          Start your wealth creation journey
        </Heading>
        <List spacing={4}>
          <ListItem display="flex" alignItems="center" fontWeight={300}>
            <Icon as={CiCircleCheck} color="green.400" boxSize={5} mr={3} />
            <Text color="gray.300"  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif">Add balance to your broking account</Text>
          </ListItem>
          <ListItem display="flex" alignItems="center" fontWeight={300}>
            <Icon as={CiCircleCheck} color="green.400" boxSize={5} mr={3} />
            <Text color="gray.300"  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif">Invest via curated portfolios</Text>
          </ListItem>
          <ListItem display="flex" alignItems="center" fontWeight={300}>
            <Icon as={CiCircleCheck} color="green.400" boxSize={5} mr={3} />
            <Text color="gray.300"  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif">See your wealth grow</Text>
          </ListItem>
        </List>
      </Box>
    </Box>
  ) : (
    <Box mb={8} >
      <Box
        bg="#262A33"
        border="1px"
        borderColor="gray.600"
        borderRadius="md"
        p={4}
        fontFamily="Inter"
        mb={8}
      >
        <Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Text
              sx={{
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                fontWeight: "normal",
                textAlign: "left",
                color: "#DEE1E6",
              }}
            >
              Invested
            </Text>
            <HStack>
              <Text color="#4CE77F">₹</Text>
              <Text
                sx={{
                  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  lineHeight: "18px",
                  textAlign: "left",
                  color: "white",
                }}
              >
                {userInfo.investment}
              </Text>
            </HStack>
          </Box>

          <Box display={"flex"} justifyContent={"space-between"}>
            <Text
              sx={{
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                fontWeight: "normal",
                textAlign: "left",
                color: "#DEE1E6",
              }}
            >
              Current Value
            </Text>
            <HStack>
              <Text color="#4CE77F">₹</Text>
              <Text
                sx={{
                  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  lineHeight: "18px",
                  textAlign: "left",
                  color: "white",
                }}
              >
                {userInfo.currentValue}
              </Text>
            </HStack>
          </Box>
        </Box>

        <Box
          display={"flex"}
        
          justifyContent={"space-between"}
          mt={6}
        >
          <Heading
            sx={{
              width: "134px",
              height: "60px",
              fontFamily:"Helvetica",
              fontSize: "20px",
              fontWeight: "500",
              lineHeight: "40px",
              textAlign: "left",
              color: "white",
              marginBottom: "16px", // mb={4} corresponds to 16px in Chakra UI
            }}
          >
            Your Baskets Returns
          </Heading>

          {/* <VStack border={"2px solid green"}>
            <HStack alignItems={"right"}>
              {userInfo.returnsState === "green" ? (
                <Icon as={FaCaretUp} color="#1DD75B" />
              ) : (
                <Icon as={FaCaretDown} color="red.400" />
              )}
              <Text
                color={
                  userInfo.returnsState === "green" ? "#1DD75B" : "red.400"
                }
              >
                {userInfo.percentageReturns}%
              </Text>
            </HStack  >
            <Text
              alignItems={"left"}
              sx={{
                width: "134px",
                height: "60px",
                fontFamily: "Inter",
                fontSize: "20px",
                fontWeight: "500",
                lineHeight: "40px",
                textAlign: "left",
                color: "#1DD75B",
                marginBottom: "16px", // mb={4} corresponds to 16px in Chakra UI
              }}
            >
              {" "}
              ₹{userInfo.protfolioReturns}
            </Text>
          </VStack> */}

<VStack 
  bottom={0} // Set to bottom
  right={0} // Optionally align to the right
  // border={"1px solid green"}
  alignItems={"flex-end"} // Align all items to the right
  spacing={0} // Remove vertical spacing between items
  padding={4} // Optional: Add some padding if needed
>
  {/* Percentage Returns (small, positioned like an exponent) */}
  <HStack 
    spacing={1} 
    alignItems="baseline" // Align items based on text baseline
    sx={{ transform: "translateY(-8px)" }} // Moves the percentage upwards like an exponent
  >
    {userInfo.returnsState === "green" ? (
      <Icon as={FaCaretUp} color="#1DD75B" boxSize="14px" /> // Make the icon smaller
    ) : (
      <Icon as={FaCaretDown} color="red.400" boxSize="14px" />
    )}
    <Text
      fontSize="12px" // Make the percentage text smaller
      fontWeight="bold"
       fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
      color={userInfo.returnsState === "green" ? "#1DD75B" : "red.400"}
    >
      {userInfo.percentageReturns}%
    </Text>
  </HStack>

  {/* Portfolio Returns (bigger, like the base in an exponent expression) */}
  <Text
    sx={{
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      fontSize: "24px", // Bigger font size for the main number
      fontWeight: "600",
      lineHeight: "30px",
      textAlign: "right", // Align text to the right
      color: "#1DD75B",
    }}
  >
    ₹ {userInfo.protfolioReturns}
  </Text>
</VStack>

        </Box>

        {/* <Heading color="white" fontSize="lg" mb={4} fontWeight={500}>
          Your Portfolio Returns
        </Heading>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          fontWeight={300}
        >
          <Text
            color={userInfo.returnsState === "green" ? "green.400" : "red.400"}
            fontSize="lg"
            fontWeight="bold"
          >
            ₹{userInfo.protfolioReturns}
          </Text>
          <HStack>
            {userInfo.returnsState === "green" ? (
              <Icon as={FaCaretUp} color="green.400" />
            ) : (
              <Icon as={FaCaretDown} color="red.400" />
            )}
            <Text color="white">{userInfo.percentageReturns}%</Text>
          </HStack>
        </Flex> */}

        {/* <Divider my={4} borderColor="gray.600" /> */}
      </Box>

      {/* <Box
        bg="#262A33"
        border={"2px solid red"}
        // border="1px"
        borderColor="gray.600"
        fontFamily="Inter"
        borderRadius="md"
        p={4}
      >
        <Flex
     
          justifyContent="space-between"
          alignItems="center"
          fontWeight={300}
        >
          <Text color="white" fontWeight="bold" fontSize="lg">
            Investment Score
          </Text>
          <Text color="green.400" fontWeight="bold" fontSize="3xl">
            {userInfo.investmentScore}
          </Text>
        </Flex>
        <Text color="gray.300" mt={4}>
          {userInfo.investmentScoreCardInfo}
        </Text>
      </Box> */}
    </Box>
  );
}

export default AccountOverview;
