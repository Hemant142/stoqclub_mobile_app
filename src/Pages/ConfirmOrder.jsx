import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Button,
  IconButton,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Divider,
  useToast,
  HStack,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { LuChevronLeftCircle } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { CloseIcon } from "@chakra-ui/icons";
import Cookies from "js-cookie";

import { FaCircleCheck, FaStar } from "react-icons/fa6";
import { CiCircleCheck } from "react-icons/ci";
import CustomToast from "../Components/ConfirmOrder/CustomToast";

const ConfirmOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [brokerage, setBrokerage] = useState(0);
  const [othercharges, setOtherCharges] = useState(0);
  const [total, setTotal] = useState(0);
  const toast = useToast();
  const [tempRating,setTempRating] =useState(0)
  const [rating, setRating] = useState(null);
  const [basketData, setBasketData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  let userName = Cookies.get("user-name");


 

  useEffect(() => {
      // Retrieve the data from the cookie
      const dataFromCookie = Cookies.get('basketData');

      if (dataFromCookie) {
          // Parse the string back to a JSON object
          setBasketData(JSON.parse(dataFromCookie));
      }
  }, []); // This effect will run only once when the component mounts

  console.log(basketData, "basketData InvestmentSection");

  useEffect(() => {
    setBrokerage(345);
    setOtherCharges(237);
  }, []);

  const toTitleCase = (str) => {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Apply the function to your basketName
  const {
    lots,
    amountToInvest,
    basketId,
    currentBalance,
    basketName: originalBasketName,
    instrumentList,
  } = location.state || {};
  const basketName = originalBasketName ? toTitleCase(originalBasketName) : "";
  // Function to convert to title case

  // useEffect to update total when brokerage or othercharges change
  useEffect(() => {
    setTotal(brokerage + othercharges + amountToInvest);
  }, [brokerage, othercharges]);


  const goBack = () => {
    navigate(`/basket/${basketId}`);
  };

  // Use fallback values to prevent errors
const formattedAmountToInvest = (amountToInvest || 0).toLocaleString();
const formattedTotal = (total || 0).toLocaleString();


  // const handleConfirmOrder = () => {
  //   if (total > currentBalance) {
  //     toast({
  //       title: "Warning",
  //       description: "Your total exceeds your current balance.",
  //       status: "warning",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //     return;
  //   }

  //   // Assume sendOrderRequest is a function that sends the order request

  //   toast({
  //     position: "bottom",
  //     render: ({ onClose }) => (
  //       <Box
  //         // width="421px"
  //         // height="316px"
  //         bg="#262A33"
  //         borderRadius="md"
  //         border="1px solid #BCC1CA"
  //         boxShadow="0px 2px 5px rgba(0, 0, 0, 0.2)"
  //         p={4}
  //         position="relative"
  //       >
  //         {/* Close Button */}
  //         <IconButton
  //           aria-label="Close Toast"
  //           icon={<CloseIcon />}
  //           size="sm"
  //           position="absolute"
  //           top="10px"
  //           right="10px"
  //           onClick={onClose} // Close the toast when clicked
  //           variant="ghost" // Optionally style the button
  //         />

  //         {/* Content */}
  //         <Box
  //           display="flex"
  //           alignItems="center"
  //           p={2} // Increased padding for better spacing
  //         >
  //           <HStack spacing={3}>
  //             <Icon as={FaCircleCheck} color="#17A948" boxSize={12} />
  //             <Text
  //               fontFamily="Epilogue"
  //               fontSize="18px" // Slightly larger font size
  //               fontWeight="normal" // Changed to bold for emphasis
  //               lineHeight="28px" // Increased line height for better readability
  //               textAlign="left"
  //               color="white" // Text color to contrast with the background
  //             >
  //               Your order will be placed at the next market open
  //             </Text>
  //           </HStack>
  //         </Box>

  //         {/* <Box border={"1px solid red"} display={"flex"} width={"50%"} margin={"auto"}> */}

  //         <HStack justifyContent="space-between" width="50%" margin="auto">
  //           <Text
  //             fontFamily="Inter"
  //             fontSize="14px"
  //             fontWeight="normal" // Set to 400 as per your specification
  //             lineHeight="22px"
  //             textAlign="left"
  //             color="#9095A0" // Specific color code for 'Status'
  //             width="103px" // Specified width
  //             height="22px" // Specified height
  //             // Specified left position
  //           >
  //             Batch
  //           </Text>

  //           <Text
  //             fontFamily="Inter"
  //             fontSize="14px"
  //             fontWeight="normal" // Set to 400 as per your specification
  //             lineHeight="22px"
  //             textAlign="left"
  //             color="#9095A0" // Specific color code for 'Status'
  //             width="103px" // Specified width
  //             height="22px" // Specified height
  //             // Specified left position
  //           >
  //             Status
  //           </Text>
  //         </HStack>

  //         <HStack justifyContent="space-between" width="50%" margin="auto">
  //           <Text
  //             fontFamily="Inter"
  //             fontSize="16px" // Updated font size to 16px
  //             fontWeight="normal" // Normal weight
  //             lineHeight="26px" // Updated line height to 26px
  //             textAlign="left"
  //             color="white" // Specific color code for 'Batch'
  //             width="103px" // Specified width
  //             height="26px" // Updated height to 26px
  //           >
  //             Invest
  //           </Text>

  //           <Text
  //             fontFamily="Inter"
  //             fontSize="16px" // Updated font size to 16px
  //             fontWeight="normal" // Normal weight
  //             lineHeight="26px" // Updated line height to 26px
  //             textAlign="left"
  //             color="white" // Specific color code for 'Status'
  //             width="103px" // Specified width
  //             height="26px" // Updated height to 26px
  //           >
  //             Pending
  //           </Text>
  //         </HStack>

  //         <Box width={"90%"} margin={"auto"} mt={4}>
  //           <Box display={"flex"} gap={2}>
  //             <Text
  //               fontFamily="Inter"
  //               fontSize="14px"
  //               fontWeight="normal"
  //               lineHeight="22px"
  //               textAlign="left"
  //               color=" #A7ADB7"
  //             >
  //               Well Done,{" "}
  //             </Text>
  //             <Box display={"flex"} gap={2}>
  //               <Text
  //                 fontFamily="Inter"
  //                 fontSize="14px"
  //                 fontWeight="normal"
  //                 lineHeight="22px"
  //                 textAlign="left"
  //                 color="#FFFFFF" // Optional: Adjust text color as needed
  //               >
  //                 {userName}
  //               </Text>

  //               <Icon as={CiCircleCheck} boxSize={6} color="#17A948" />
  //             </Box>
  //           </Box>
  //           <Text
  //             fontFamily="Inter"
  //             fontSize="14px"
  //             fontWeight="normal"
  //             lineHeight="22px"
  //             textAlign="left"
  //             color=" #A7ADB7"
  //           >
  //             Your order's status will be updated once the markets open.
  //           </Text>
  //           <Text
  //             fontFamily="Inter"
  //             fontSize="14px"
  //             fontWeight="normal"
  //             lineHeight="24px"
  //             textAlign="left"
  //             color=" #A7ADB7"
  //           >
  //             You'll be redirected back in 10s
  //           </Text>
  //         </Box>
  //         <Box
  //       width={"90%"}
  //       margin={"auto"}
  //       display="flex"
  //       alignItems="center"
  //       justifyContent="space-between"
  //     >
  //       <Text
  //         mt={4}
  //         color="white"
  //         fontFamily="Inter"
  //         fontSize="14px"
  //         fontWeight="normal"
  //         lineHeight="22px"
  //         textAlign="left"
  //         width="178px"
  //       >
  //         How was your experience?
  //       </Text>

  //       {/* Star rating section */}
  //       <HStack spacing={1}>
  //         {[1, 2, 3, 4, 5].map((star) => (
  //           <Icon
  //             key={star}
  //             as={FaStar}
  //             color={star <= rating ? "#F3C63F" : "#A7ADB7"} // Gold color for selected stars, gray for unselected
  //             boxSize={6}
  //             cursor="pointer"
  //             onClick={() => handleStarClick(star)} // Set rating on click
  //           />
  //         ))}
  //       </HStack>
  //     </Box>
  //       </Box>
  //     ),
  //     duration: null, // Keep the toast open until manually closed
  //     isClosable: true, // Allows the toast to be closable
  //   });
 
  // };

     // sendOrderRequest(total)
    // .then(() => {
    //   toast({
    //     position: "bottom",
    //     render: () => (
    //       <Box
    //         width="421px"
    //         height="316px"
    //         bg="white"
    //         borderRadius="6px 0px 0px 0px"
    //         border="1px solid #BCC1CA"
    //         boxShadow="0px 2px 5px rgba(0, 0, 0, 0.2)"
    //         p={4}
    //       >
    //         <Text
    //           fontFamily="Epilogue"
    //           fontSize="16px"
    //           fontWeight="700"
    //           lineHeight="26px"
    //           textAlign="left"
    //           mb={4}
    //         >
    //           Your Order will be placed in next market open
    //         </Text>
    //         <HStack justifyContent="space-between">
    //           <Text fontWeight="bold">Batch:</Text>
    //           <Text>Pending</Text>
    //         </HStack>
    //         <HStack justifyContent="space-between" mt={2}>
    //           <Text fontWeight="bold">Invest:</Text>
    //           <Text>{total}</Text>
    //         </HStack>
    //         <Text mt={4}>Customer: {userName}</Text>
    //         <Text mt={4}>How was your experience?</Text>
    //         <HStack spacing={1}>
    //           {[1, 2, 3, 4, 5].map((star) => (
    //             <Text
    //               key={star}
    //               fontSize="24px"
    //               cursor="pointer"
    //               color={rating >= star ? "gold" : "gray.300"}
    //               onClick={() => handleStarClick(star)}
    //             >
    //               ★
    //             </Text>
    //           ))}
    //         </HStack>
    //       </Box>
    //     ),
    //     duration: null, // Keep the toast open until manually closed
    //     isClosable: false,
    //   });
    // })
    // .catch((error) => {
    //   console.error("Error placing order:", error);
    //   toast({
    //     title: "Error",
    //     description: "There was a problem placing your order. Please try again.",
    //     status: "error",
    //     duration: 5000,
    //     isClosable: true,
    //   });
    // });

    const handleConfirmOrder = () => {
      if (total > currentBalance) {
        toast({
          title: 'Warning',
          description: "Your total exceeds your current balance.",
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      toast({
        duration: 10000,
        position: 'bottom',
        render: (props) => (
          <CustomToast
            userName={userName}
            rating={rating}
            tempRating={tempRating}
            setTempRating={setTempRating}
            handleStarClick={handleStarClick}
            onClose={props.onClose}
          />
        ),
      });
  

};
  
    const handleStarClick = (starRating) => {
      setRating(starRating); // Set rating immediately
    };

  return (
    <Box borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <Box p={4} pb={0}>
        <IconButton
          aria-label="Go back"
          icon={<LuChevronLeftCircle />}
          onClick={goBack}
          size="30px" // Use the size prop for the icon button
          variant="link" // Use variant="link" to remove button styling
          color="rgba(241, 155, 93, 1)" // Custom color for the icon
          fontSize="24px" // Font size of the icon
          _hover={{ cursor: "pointer" }} // Ensure cursor is a pointer on hover
        />
      </Box>

      <Box
        p={4}
        display="flex"
        // border={"2px solid red"}
        justifyContent="center"
        alignItems="left"
        // Optional: adjust height if you want it to be centered vertically on the full viewport
      >
        <Heading
          as="h4"
          size="md"
          fontFamily="Epilogue"
          fontSize={{ base: "20px", md: "30px" }} // Slightly smaller font: 20px for mobile and 28px for larger screens
          fontWeight="bold"
          lineHeight={{ base: "28px", md: "36px" }} // Adjust line height accordingly
          textAlign="left" // Center the text horizontally
          // mt={4}
        >
          {basketName}
        </Heading>
      </Box>

   
      <Box
        // mt={2}
        width={"100%"}
        bg={"#D3F9E0"}
        display="flex" // Ensure content aligns in one line
        alignItems="center" // Vertically align the text in the center
        padding="7px 12px" // Add padding to give spacing similar to top and left
      >
        <Text
          fontFamily="Inter"
          fontSize="14px"
          fontWeight="400"
          lineHeight="22px"
          textAlign="left"
          color="#117B34"
        >
          Complete your transaction in 5:00 before the session expires
        </Text>
      </Box>

      <Box
        p={4}
        // border={"2px solid red"}
        // justifyContent="center"
        alignItems="left"
        // Optional: adjust height if you want it to be centered vertically on the full viewport
      >
        <Heading
          as="h4"
          size="md"
          fontFamily="Epilogue"
          fontSize={{ base: "20px", md: "30px" }} // Slightly smaller font: 20px for mobile and 28px for larger screens
          fontWeight="bold"
          lineHeight={{ base: "28px", md: "36px" }} // Adjust line height accordingly
          textAlign="left" // Center the text horizontally
          // mt={4}
        >
          Review Order
        </Heading>

        <TableContainer>
          <Table variant="unstyled">
            <Thead>
              <Tr>
                <Th
                  width="29px"
                  height="22px"
                  fontFamily="Inter"
                  fontSize="14px"
                  fontWeight="400"
                  lineHeight="22px"
                  textAlign="left"
                  color="#DEE1E6"
                  borderBottom="2px solid #DEE1E6" // Adding bottom border to create the straight line
                >
                  Constituents
                </Th>
                <Th
                  width="29px"
                  height="22px"
                  fontFamily="Inter"
                  fontSize="14px"
                  fontWeight="400"
                  lineHeight="22px"
                  textAlign="left"
                  color="#DEE1E6"
                  borderBottom="2px solid #DEE1E6" // Adding bottom border to create the straight line
                >
                  Qty
                </Th>
                <Th
                  width="29px"
                  height="22px"
                  fontFamily="Inter"
                  fontSize="14px"
                  fontWeight="400"
                  lineHeight="22px"
                  textAlign="left"
                  color="#DEE1E6"
                  borderBottom="2px solid #DEE1E6" // Adding bottom border to create the straight line
                >
                  Type
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {instrumentList &&
                instrumentList.map((instrument, index) => (
                  <Tr key={index}>
                    <Td
                      width="99px"
                      height="22px"
                      fontFamily="Inter"
                      fontSize="14px"
                      fontWeight="400"
                      lineHeight="22px"
                      textAlign="left"
                      color="#DEE1E6"
                    >
                      {instrument.name}
                    </Td>
                    <Td
                      width="99px"
                      height="22px"
                      fontFamily="Inter"
                      fontSize="14px"
                      fontWeight="400"
                      lineHeight="22px"
                      textAlign="left"
                      color="#DEE1E6"
                    >
                      {instrument.quantity}
                    </Td>
                    <Td
                      width="99px"
                      height="22px"
                      fontFamily="Inter"
                      fontSize="14px"
                      fontWeight="400"
                      lineHeight="22px"
                      textAlign="left"
                      color="#4CE77F"
                    >
                      BUY
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>

        <Divider
          ml={2}
          mr={2}
          m={"auto"}
          width="350px" // Sets the width
          border="1px solid #BCC1CA" // Adds the solid border with the specified color
          position="relative"
        />
      </Box>

      <Box
        p={4}
        mb={2}
        display="flex"
        gap={6}
        // justifyContent="space-between" // Ensures the heading and amountToInvest align on the same line
        alignItems="center" // Vertically align items
        color={"white"} // Ensure the text inside the box is white
        height="30px" // Box height
      >
        <Heading
          as="h4"
          fontFamily="Epilogue"
          fontSize="20px" // Fixed font size for all screens
          fontWeight="700"
          lineHeight="30px"
          textAlign="left"
          color="white" // Ensure heading text color is white
        >
          Investment Amount
        </Heading>

        {/* Displaying the amountToInvest with rupee symbol */}
        <Text
          fontFamily="Inter"
          fontSize="18px"
          fontWeight="400"
          lineHeight="28px"
          textAlign="left"
          // width="66px" // Width for the amountToInvest
          height="28px" // Height for the amountToInvest
          color="white" // Ensure the amountToInvest text is white
        >
          ₹ {formattedAmountToInvest}
        </Text>
      </Box>

      <Divider
        ml={2}
        mr={2}
        m={"auto"}
        width="350px" // Sets the width
        border="1px solid #BCC1CA" // Adds the solid border with the specified color
        position="relative"
      />

      <Box mt={2} p={4}>
        {/* Brokerage Section */}
        <Box
          display="flex"
          gap={6}
          alignItems="center"
          color={"white"}
          width={"60%"}
          justifyContent={"space-between"}
          height="40px"
        >
          <Text
            fontFamily="Inter"
            fontSize="18px"
            fontWeight="normal"
            lineHeight="40px"
            textAlign="left"
            height="40px"
            color="white" // Updated height
          >
            Brokerage
          </Text>

          <Text
            fontFamily="Inter"
            fontSize="18px"
            fontWeight="400"
            lineHeight="40px"
            textAlign="right"
            height="40px"
            color="white" // Ensure the amountToInvest text is white
          >
            {brokerage}
          </Text>
        </Box>

        {/* Other Charges Section */}
        <Box
          mb={4}
          display="flex"
          gap={6}
          alignItems="center"
          color={"white"}
          width={"60%"}
          justifyContent={"space-between"}
          height="40px"
        >
          <Text
            fontFamily="Inter"
            fontSize="18px"
            fontWeight="normal"
            lineHeight="40px"
            textAlign="left"
            height="40px"
            color="white" // Updated height
          >
            Other Charges
          </Text>

          <Text
            fontFamily="Inter"
            fontSize="18px"
            fontWeight="normal"
            lineHeight="40px"
            textAlign="right"
            height="40px"
            color="white" // Ensure the amountToInvest text is white
          >
            {othercharges}
          </Text>
        </Box>

        <Divider
          ml={2}
          mr={2}
          m={"auto"}
          width="350px" // Sets the width
          border="1px solid #BCC1CA" // Adds the solid border with the specified color
          position="relative"
        />

        {/* Total Section */}
        <Box
          mt={4}
          display="flex"
          gap={6}
          alignItems="center"
          color={"white"}
          justifyContent={"space-between"}
          width={"60%"}
          height="40px"
        >
          <Text
            fontFamily="Inter"
            fontSize="18px"
            fontWeight="normal"
            lineHeight="40px"
            textAlign="left"
            height="40px"
            color="white" // Updated height
          >
            Total
          </Text>

          <Text
            fontFamily="Inter"
            fontSize="18px"
            fontWeight="400"
            lineHeight="28px"
            textAlign="right"
            height="28px"
            color="white" // Ensure the amountToInvest text is white
          >
            ₹ {formattedTotal}
          </Text>
        </Box>
      </Box>

      <Box
        border="2px solid #9095A0"
        boxShadow="0px 2px 5px 0px #171A1F17, 0px 0px 2px 0px #171A1F1F"
        p={4}
        alignItems={"center"}
      >
        <Box
          // left="20px"
          p={2}
        >
          <Text
            fontFamily="Inter"
            fontSize="12px"
            fontWeight="noral"
            lineHeight="18px"
            textAlign="left"
            color="#A7ADB7"
          >
            You are placing an order after market hours for these 3 stocks. Your
            order will be executed on next market day.
          </Text>
        </Box>

        <Box
          margin="auto"
          display="flex" // Enable Flexbox
          justifyContent="center" // Center the button horizontally
          alignItems="center" // Center the button vertically
          height="100px" // Set a height to ensure vertical centering
        >
          <Button
           color={"#1DD75B"}
           border={"1px solid #1DD75B"}
            variant="outline"
            width={"80%"}
            height={"60%"}
            _hover={{
              boxShadow: "0 0 10px rgba(29, 215, 91, 0.7)",
              transform: "scale(1.05)",
            }}
            _active={{
              boxShadow: "0 0 15px rgba(29, 215, 91, 1)",
              transform: "scale(0.95)",
            }}
            onClick={handleConfirmOrder}
            isLoading={isSubmitting}
          >
            Confirm Order
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfirmOrder;
