import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import { getBalance } from "../Redux/authReducer/action";
import {
  basket_order_exit,
  getBasketDetails,
  getOrderHistory,
  OrderPlaced,
} from "../Redux/basketReducer/action";

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
  const [amountToInvest,setAmountToInvest]=useState(0)
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes = 900 seconds

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMarketOpen,setisMarketOpen]=useState(false)
  let userName = Cookies.get("user-name");
  const { id } = useParams();
  const token = Cookies.get("login_token_client");
  const userId=Cookies.get("userId_client");
  const basketState=Cookies.get("basket-state")
  const [bufferAmount,setBufferAmount]=useState(0)
const lots=Number(Cookies.get('lots'))

  const currentBalance = useSelector((store) => store.authReducer.userBalance);
  const {isLoading,newInstrumentsData,basketData}=useSelector((store) => store.basketReducer);


  useEffect(() => {
    dispatch(getBasketDetails(id, token));
    dispatch(getBalance(token));
  }, [token]);


  useEffect(() => {
    if (token) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerId); // Stop the timer when it reaches 0

            // Show toast notification
            toast({
              title: "Session expired",
              description: "Your session has expired due to inactivity.",
              status: "error",
              duration: 5000, // Show toast for 5 seconds
              isClosable: true,
            });
         
navigate(`/basket/${id}`)
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      // Cleanup function to clear interval when component unmounts
      return () => clearInterval(timerId);
    }
  }, [token,toast]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    const checkTimeAndDate = () => {
      const now = new Date();
  
      // Get the current UTC time
      const utcHours = now.getUTCHours();
      const utcMinutes = now.getUTCMinutes();
  
      // Convert UTC time to Indian Standard Time (IST) by adding 5 hours 30 minutes
      const istHours = utcHours + 5;
      const istMinutes = utcMinutes + 30;
  
      // Adjust for overflow if minutes exceed 60
      let currentISTHours = istHours;
      let currentISTMinutes = istMinutes;
      if (istMinutes >= 60) {
        currentISTHours += 1;
        currentISTMinutes = istMinutes - 60;
      }
  
      // Adjust for overflow if hours exceed 24 (next day)
      if (currentISTHours >= 24) {
        currentISTHours = currentISTHours - 24;
      }
  
      // Convert the time to minutes from midnight (IST)
      const currentTimeInMinutes = currentISTHours * 60 + currentISTMinutes;
  
      const marketOpenTime = 9 * 60 + 15; // 9:15 AM IST in minutes
      const marketCloseTime = 15 * 60 + 20; // 3:20 PM IST in minutes
  
      // Get the current day in IST (0 = Sunday, 6 = Saturday)
      const istDay = (now.getUTCDay() + 5 / 24 + 30 / 1440) % 7; // Adjust for IST day offset
  
      // Check if it's a weekday (Monday to Friday)
      if (istDay >= 1 && istDay <= 5) {
        // Check if the current time is between market open and close times in IST
        if (currentTimeInMinutes >= marketOpenTime && currentTimeInMinutes <= marketCloseTime) {
          setisMarketOpen(true);  // Market is open
        } else {
          setisMarketOpen(false);  // Market is closed
        }
      } else {
        setisMarketOpen(false);  // It's a weekend
      }
    };
  
    checkTimeAndDate();
  }, []);


  useEffect(() => {
    setBrokerage(345);
    setOtherCharges(237);
  }, []);

  const toTitleCase = (str) => {
    // Check if the input is a valid string, return empty string or handle accordingly
    if (!str || typeof str !== 'string') {
      return ""; // Return empty string or handle the undefined case as needed
    }
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };
  

  useEffect(() => {
    setTotal(brokerage + othercharges + amountToInvest);
  }, [brokerage, othercharges]);


  const goBack = () => {
    navigate(`/basket/${id}`);
  };

  useEffect(() => {
    if (basketData && newInstrumentsData) {
      // Calculate the total required fund
      const total = newInstrumentsData.reduce(
        (acc, instrument) => acc + calculateFundREquired(instrument),
        0
      );
  
    
  
      // Set the calculated values in the state
      setAmountToInvest(total);

    }
  }, [basketData]);


  
  const calculateFundREquired = (instrumentListData) => {
    const qty = instrumentListData.quantity;
    const cmp = instrumentListData.currentPrice;
    const fundRequired = cmp * qty;

    return fundRequired;
  };

  // Use fallback values to prevent errors
const formattedAmountToInvest = (amountToInvest || 0).toLocaleString();
const formattedTotal = (total || 0).toLocaleString();



const handleConfirmOrder = () => {
  // if (total > currentBalance) {
  //   toast({
  //     title: "Warning",
  //     description: "Your total exceeds your current balance.",
  //     status: "warning",
  //     duration: 5000,
  //     isClosable: true,
  //   });
  //   return;
  // }

  setIsSubmitting(true)
  dispatch(OrderPlaced(id, lots, token))
    .then((res) => {

      if(res.data.status==="failed"){
        setIsSubmitting(false)
        toast({
          title: "",
          description: res.data.message,
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      }


      if (res.data.status === "success") {
      
        toast({
          duration: 10000,
          position: "bottom",
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
      
      
           // Set a timer to navigate back after 10 seconds
           setTimeout(() => {
            setIsSubmitting(false)
            navigate(`/home`)
          }, 10000); // 10 seconds delay
  
      }
      
    })

    .catch((error) => {
      console.log(error, "error confirm order ");
    });

};
  
    const handleStarClick = (starRating) => {
      setRating(starRating); // Set rating immediately
    };



  const handleExitBasket = () => {
    setIsSubmitting(true)
    dispatch(basket_order_exit(id, token))
      .then((res) => {
     

        if (res.data.detail === "There is no order to exit") {
          setIsSubmitting(false)
          toast({
            title: "Warning",
            description: "There is no order to exit",
            status: "warning",
            duration: 3000, // Toast duration in milliseconds
            isClosable: true,
          });
          navigate(
            `/home`
          );
        }
        // Show success toast notification
        if (res.data.status === "success") {
          toast({
            duration: 10000,
            position: "bottom",
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
        
          Cookies.set("basket-state", "");
             // Set a timer to navigate back after 10 seconds
             setTimeout(() => {
              setIsSubmitting(false)
              navigate(`/home`)
            }, 10000); // 10 seconds delay
        }
      })
      .catch((error) => {
        console.log(error, "handleExitBasket Error");

        // Show error toast notification
        toast({
          title: "Exit Failed",
          description: "There was an error exiting the basket.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Box >
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
          {toTitleCase(basketData.title)}
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
        {token && (
        <Text
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
          
          fontSize="14px"
          fontWeight="400"
          lineHeight="22px"
          textAlign="left"
          color="#117B34"
        >
          Complete your transaction in {formatTime(timeLeft)} before the session expires
        </Text>
      )}
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
          <Table variant="unstyled" >
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
              {newInstrumentsData &&
                newInstrumentsData.map((instrument, index) => (
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
                      {instrument.instrument}
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
                    {basketState=="Exit"?(
                         <Td
                         width="99px"
                         height="22px"
                         fontFamily="Inter"
                         fontSize="14px"
                         fontWeight="400"
                         lineHeight="22px"
                         textAlign="left"
                         color="#E05858"
                       >
                         SELL
                       </Td>
                    ):(   <Td
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
                    </Td>)}
                 
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
  boxShadow="px 2px 5px 0px #171A1F17, 0px 0px 2px 0px #171A1F1F"
  p={2}
  margin={"auto"}
  width="98%" // Ensure the container spans full width
  alignItems="center"
>
{ !isMarketOpen && (
    <Box p={2} textAlign="left">
      <Text
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
        fontSize={["10px", "12px"]}
        fontWeight="normal"
        lineHeight={["16px", "18px"]}

        color="#A7ADB7"
      >
        You are placing an{" "}
        <Text as="span" fontWeight="bold"
        fontFamily={"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}
        color="white">
          order after market hours
        </Text>{" "}
        for these {newInstrumentsData.length} stocks. Your order will be executed on the next market day.  Please keep some  
        <Text as="span" fontWeight="bold"
        fontFamily={"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}
        color="white">
        {" "}   buffer amount of {bufferAmount} {" "}
        </Text>
     
        
        
        
        for next day market movement.
      </Text>
    </Box>
  )}


  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100px"
    mt={2}
    width="100%" // Ensure the box spans full width to avoid cutoff
  >{basketState=="Exit"?(
    <Button
      color="#DE3B40"
      border="1px solid #DE3B40"
      variant="outline"
      fontFamily={"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}
      width={["90%", "80%"]} // Responsive width
      height={["50px", "60px"]}
      _hover={{
        boxShadow: "0 0 10px #DE3B40",
        transform: "scale(1.05)",
      }}
      _active={{
        boxShadow: "0 0 15px #DE3B40",
        transform: "scale(0.95)",
      }}
      onClick={handleExitBasket}
      isLoading={isSubmitting}
    >
      Exit basket
    </Button>
  ):(

    <Button
      color="#1DD75B"
      border="1px solid #1DD75B"
      variant="outline"
      fontFamily={"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}
      width={["90%", "80%"]} // Responsive width
      height={["50px", "60px"]}
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
  )}
    
  </Box>
</Box>
    </Box>
  );
};

export default ConfirmOrder;
