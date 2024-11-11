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
import { FaRegCircleCheck } from "react-icons/fa6";

function AccountOverview({ userInfo }) {

  return userInfo.currentHoldings.length === 0 ? (
    <Box mb={8} >
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

            <HStack spacing={1} align="center">
              <Heading
                color="#1DD75B"
                fontSize="xl"
                lineHeight="1"
                verticalAlign="middle"
              >
                ₹
              </Heading>
              <Heading
                fontSize="xl"
                fontWeight="bold"
                lineHeight="1"
                color="white"
              >
                {userInfo.currentBalance!==undefined ? userInfo.currentBalance.toLocaleString('en-IN') :0}
              </Heading>
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

            <HStack spacing={1} align="center">
              <Heading
                color="#1DD75B"
                fontSize="xl"
                lineHeight="1"
                verticalAlign="middle"
              >
                ₹
              </Heading>
              <Heading
                fontSize="xl"
                fontWeight="bold"
                lineHeight="1"
                color="white"
              >
                {userInfo.totalHoldings !==undefined ? userInfo.totalHoldings.toLocaleString('en-IN') : 0}
              </Heading>
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
        <Heading
          color="white"
          fontSize="lg"
          fontFamily={"Helvetica"}
          mb={4}
          fontWeight={500}
        >
          Start your wealth creation journey
        </Heading>
        <List spacing={4}>
          <ListItem display="flex" alignItems="center" fontWeight={300}>
            <Icon as={FaRegCircleCheck} color="green.400" boxSize={5} mr={3} />
            <Text
              color="gray.300"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
            >
              Add balance to your broking account
            </Text>
          </ListItem>
          <ListItem display="flex" alignItems="center" fontWeight={300}>
            <Icon as={FaRegCircleCheck} color="green.400" boxSize={5} mr={3} />
            <Text
              color="gray.300"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
            >
              Invest via curated portfolios
            </Text>
          </ListItem>
          <ListItem display="flex" alignItems="center" fontWeight={300}>
            <Icon as={FaRegCircleCheck} color="green.400" boxSize={5} mr={3} />
            <Text
              color="gray.300"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
            >
              See your wealth grow
            </Text>
          </ListItem>
        </List>
      </Box>
    </Box>
  ) : (
    <Box mb={8}>
      <Box
        bg="#262A33"
        border="1px"
        borderColor="gray.600"
        borderRadius="md"
        p={4}
        fontFamily="Inter"
        // mb={8}
      >
        <Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Text
              sx={{
                fontFamily:
                  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                fontWeight: "normal",
                textAlign: "left",
                color: "#DEE1E6",
              }}
            >
              Invested
            </Text>
            <HStack>
              <Text color="#1DD75B">₹</Text>
              <Text
                sx={{
                  fontFamily:
                    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  lineHeight: "18px",
                  textAlign: "left",
                  color: "white",
                }}
              >
                {userInfo.totalInvestedPrice ? userInfo.totalInvestedPrice.toLocaleString('en-IN'): 0}
              </Text>
            </HStack>
          </Box>

          <Box display={"flex"} justifyContent={"space-between"}>
            <Text
              sx={{
                fontFamily:
                  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                fontWeight: "normal",
                textAlign: "left",
                color: "#DEE1E6",
              }}
            >
              Current Value
            </Text>
            <HStack>
              <Text color="#1DD75B">₹</Text>
              <Text
                sx={{
                  fontFamily:
                    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  lineHeight: "18px",
                  textAlign: "left",
                  color: "white",
                }}
              >
                {userInfo.totalCurrentPrice ? userInfo.totalCurrentPrice.toLocaleString('en-IN') : 0}
              </Text>
            </HStack>
          </Box>
        </Box>

        <Box display={"flex"} justifyContent={"space-between"}   mt={6}>
          <Heading
            sx={{
              width: "134px",
              height: "60px",
            
              fontFamily: "Helvetica",
              fontSize: "20px",
              fontWeight: "500",
              lineHeight: "30px",
              textAlign: "left",
              color: "white",
              marginBottom: "16px", // mb={4} corresponds to 16px in Chakra UI
            }}
          >
            Your Baskets Returns
          </Heading>

       

          <VStack
            bottom={0} // Set to bottom
            right={0} // Optionally align to the right
       
            alignItems={"flex-end"} // Align all items to the right
            spacing={0} // Remove vertical spacing between items
            padding={2} // Optional: Add some padding if needed
          >
          
          <Box display="flex" justifyContent="flex-end" maxH={"2%"} 
          mb={1}>
  <HStack
    spacing={1}
    alignItems="baseline" // Align items based on text baseline
    sx={{ transform: "translateY(-8px)" }} // Moves the percentage upwards like an exponent
  >
    {userInfo.totalPercentageReturns >0 ? (
      <Icon as={FaCaretUp} color="#1DD75B" boxSize="14px" /> // Make the icon smaller
    ) : (
      <Icon as={FaCaretDown} color="#E05858" boxSize="14px" />
    )}
    <Text
      fontSize="12px" // Make the percentage text smaller
      fontWeight="bold"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
      color={
        userInfo.totalPercentageReturns >0 ? "#1DD75B" : "#E05858"
      }
    >
      {userInfo.totalPercentageReturns ? `${userInfo.totalPercentageReturns.toLocaleString('en-IN')}%` : `0%`}
    </Text>
  </HStack>
</Box>

            {/* Portfolio Returns (bigger, like the base in an exponent expression) */}
            <Text
           
              sx={{
                fontFamily:
                  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                fontSize: "24px", // Bigger font size for the main number
                fontWeight: "600",
                lineHeight: "30px",
                textAlign: "right", // Align text to the right
                color:userInfo.totalReturns > 0 ? "#1DD75B" : "white" // Conditional color
              }}
            >
              ₹ {userInfo.totalReturns !==undefined ?userInfo.totalReturns.toLocaleString('en-IN') : 0}
            </Text>
          </VStack>
        </Box>

       

      </Box>

      
    </Box>
  );
}

export default AccountOverview;
