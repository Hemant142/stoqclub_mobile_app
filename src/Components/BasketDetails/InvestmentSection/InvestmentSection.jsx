import React, { useEffect, useState } from "react";
import {
  useToast,
  Box,
  Button,
  Input,
  Text,
  VStack,
  HStack,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Heading,
} from "@chakra-ui/react";
import moment from "moment";
import { BiLike } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { AiOutlineMore } from "react-icons/ai";
import { GiExitDoor } from "react-icons/gi";
import { basket_order_exit } from "../../../Redux/basketReducer/action";
import { useDispatch } from "react-redux";

const InvestmentSection = (props) => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const minReqAmt = parseFloat(props.minReq);
  const currentBalance = parseFloat(props.currentBalance);
 
  const instrumentList = props.instrumentList; // Keep instrumentList as an array, no need to parse it
  const upsidePotential = parseFloat(props.upsidePotential);
  const basketId = props.basketId;
  const upsidePotentialPercentage = parseInt(props.upsidePotentialPercentage);
  const orderHistory = props.orderHistory;
  const [showInvestmentOptions, setShowInvestmentOptions] = useState(false);
  const [amountToInvest, setAmountToInvest] = useState(0);
  const [lots, setLots] = useState(1); // Initial lot size as 1
  const [apiLoader, setApiLoader] = useState(false);
  const [showExitButton, setShowExitButton] = useState(false);
  const token = Cookies.get("login_token_client");
  
  useEffect(()=>{
    setAmountToInvest(minReqAmt)
  },[minReqAmt])

 
  const handleInvestClick = () => {
    setShowInvestmentOptions(true);
    setAmountToInvest(minReqAmt); // Reset amount to minimum requirement
  };

  const handleSuccessfulTransaction = (amt) => {
    toast({
      title: "Invested successfully",
      description: (
        <Box>
          <Text>{moment().format("ddd MMM DD")}</Text>
          <Text>{props.basketName}</Text>
          <Text>Amount: ₹{amt}</Text>
        </Box>
      ),
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-center",
    });
  };

  const handleFailedTransaction = (msg) => {
    toast({
      title: "Transaction Failed",
      description: msg,
      status: "error",
      duration: 4000,
      isClosable: true,
      position: "top-center",
    });
  };

  const handleInsufficientBalance = (msg) => {
    toast({
      title: "Insufficient Balance",
      description: msg,
      status: "warning",
      duration: 3000,
      isClosable: true,
      position: "top-center",
    });
  };

  const handleInvalidAmount = (msg, amt) => {
    toast({
      title: "Invalid Amount",
      description: `${msg} ${amt}`,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top-center",
    });
  };

  const increaseLot = () => {
    const newLots = lots + 1;
    const newAmount = minReqAmt * newLots;

    if (newAmount <= currentBalance) {
      setLots(newLots);
      setAmountToInvest(newAmount);
    } else {
      handleInsufficientBalance("Cannot exceed current balance.");
    }
  };

  const decreaseLot = () => {
    if (lots > 1) {
      const newLots = lots - 1;
      const newAmount = amountToInvest - minReqAmt;
      setLots(newLots);
      setAmountToInvest(newAmount);
    } else {
      handleInvalidAmount("Cannot have less than one lot.", minReqAmt);
    }
  };

  const handleBuyClick = () => {
    if (amountToInvest < minReqAmt) {
      handleInvalidAmount(
        "Invalid Amount, please check min amount, you have entered ₹",
        amountToInvest
      );
      return false;
    } else if (amountToInvest > currentBalance) {
      
      handleInvalidAmount(
        "Insufficient Balance, you have entered ₹",
        amountToInvest
      );
      return false;
    } else {
      // Pass lot and amount to the Confirm Order page
      Cookies.set("lots", lots);
      Cookies.set("basket-state", "Invest");
      Cookies.set('amountToInvest',amountToInvest)
      navigate(`/confirm-order/${basketId}`, {
        state: {
          lots: lots,
          currentBalance: currentBalance,
          amountToInvest: amountToInvest,
          basketId: props.id,
          basketName: props.basketName, // In case you want to pass the basket name too
          instrumentList: props.instrumentList,
        },
      });
    }
    // else {
    //   const userId = localStorage.getItem("userId");
    //   let config = {
    //     method: "post",
    //     maxBodyLength: Infinity,
    //     url: `https://centrum-app-api.vercel.app/api/centrum/STOQCLUB/add-clients/v2?user_id=${userId}&basket_id=${id}&investment_amount=${amountToInvest}`,
    //     headers: {},
    //   };
    //   setApiLoader(true);
    //   axios
    //     .request(config)
    //     .then((response) => {
    //       setApiLoader(false);
    //       if (response.data.status === "SUCCESS") {
    //         handleSuccessfulTransaction(amountToInvest);
    //       } else {
    //         handleInsufficientBalance(response.data.data);
    //       }
    //     })
    //     .catch(() => {
    //       setApiLoader(false);
    //       handleFailedTransaction("Transaction could not be completed.");
    //     });
    // }
  };

  const handleExitBasketClick = () => {

    Cookies.set("lots", lots);
    Cookies.set("basket-state", "Exit");
    navigate(`/confirm-order/${basketId}`, {
      state: {
        lots: lots,
        currentBalance: currentBalance,
        amountToInvest: amountToInvest,
        basketId: props.id,
        basketName: props.basketName, // In case you want to pass the basket name too
        instrumentList: props.instrumentList,
      },
    });

  }
 

  return (
    <Box
      className="investment-section"
      p={5}
      // borderWidth="1px"
      // borderRadius="lg"
      // boxShadow="lg"
    >
      {!showInvestmentOptions &&
        (showExitButton ===false ? (
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text
              fontFamily="Inter"
              fontSize="14px"
              color={"#A7ADB7"}
              fontWeight="normal"
              lineHeight="22px"
              textAlign="left"
            >
              Invest for your future
            </Text>
            {orderHistory === 0 ? (
              <Button
                width="136px"
                height="60px"
                padding="12px 21px 12px 20px"
                color={"#1DD75B"}
                border={"1px solid #1DD75B"}
                variant="outline"
                _hover={{
                  boxShadow: "0 0 10px rgba(29, 215, 91, 0.7)",
                  transform: "scale(1.05)",
                }}
                _active={{
                  boxShadow: "0 0 15px #1DD75B",
                  transform: "scale(0.95)",
                }}
                onClick={handleInvestClick}
              >
                Invest Now
              </Button>
            ) : (
              <Box display="flex" gap={2}>
                {/* Main Invest Now Button */}
                <Button
                  width="136px"
                  height="60px"
                  padding="12px 21px"
                  color="#1DD75B"
                  border="1px solid #1DD75B"
                  variant="outline"
                  _hover={{
                    boxShadow: "0 0 10px rgba(29, 215, 91, 0.7)",
                    transform: "scale(1.05)",
                  }}
                  _active={{
                    boxShadow: "0 0 15px #1DD75B",
                    transform: "scale(0.95)",
                  }}
                  onClick={handleInvestClick}
                >
                  Invest More
                </Button>
                <IconButton
                  icon={<AiOutlineMore />}
                  aria-label="Menu"
                  width="40px"
                  height="60px"
                  fontSize="38px"
                  color="#1DD75B"
                  border="1px solid #1DD75B"
                  variant="outline"
                  borderRadius="md"
                  _hover={{
                    boxShadow: "0 0 10px rgba(29, 215, 91, 0.7)",
                    transform: "scale(1.05)",
                  }}
                  _active={{
                    boxShadow: "0 0 15px #1DD75B",
                    transform: "scale(0.95)",
                  }}
                  onClick={() => setShowExitButton(true)} // Optional: if you want a function to execute on click
                />
              </Box>
            )}
          </Flex>
        ) : (
          <Box
            width="351px"
            height="264px"
            borderRadius="6px"
            border="1px solid #323842"
            background="#262A33"
            p={4}
          >
     <Box display="flex" alignItems="center" gap="12px" mt={4} mb={4} ml={8} mr={8}>
  <Heading
    as="h2"
    fontFamily="Epilogue"
    fontSize="20px"
    fontWeight="700"
    lineHeight="28px"
    textAlign="left"
    color="#DEE1E6"
  >
    Exit
  </Heading>
  <Heading
  as="h2"
  fontFamily="Epilogue"
  fontSize="20px"
  fontWeight="700"
  lineHeight="28px"
  textAlign="left"
  color="#DEE1E6"
>
  ₹ {minReqAmt.toLocaleString('en-IN')}
</Heading>

</Box>
<Box display="flex" alignItems="center" gap={2}  height="22px">
  <BiLike
    size="26px" // Increased size for the icon
    color="#1DD75B"
    style={{
      width: "26px", // Adjusted width to match increased size
      height: "26px", // Adjusted height for consistency
      marginRight: "8px", // Spacing between icon and text
    }}
  />
  <Text
    fontFamily="Inter"
    fontSize="15px"
    fontWeight="400"
    lineHeight="22px"
    textAlign="left"
    color="#DEE1E6"
  >
    Stay Invested & continue to compound
  </Text>
</Box>


<Box display="flex" alignItems="center" mt={4} gap={2} >
  <Box
    width="40px" // Increased width
    height="40px" // Increased height
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <BiLike color="#1DD75B" style={{ width: "100%", height: "100%" }} />
  </Box>
  <Text
    fontFamily="Inter"
    fontSize="15px"
    fontWeight="400"
    lineHeight="22px"
    textAlign="left"
    color="#DEE1E6"
  >
    30% of our users compounded their money by staying invested
  </Text>
</Box>


<Box display="flex" alignItems="center" mt={4} gap={4} >
  <Button
    width="150px" // Increased width for larger button
    height="50px" // Increased height for larger button
    color="#1DD75B"
    border="1px solid #1DD75B"
    variant="outline"
    _hover={{
      boxShadow: "0 0 10px rgba(29, 215, 91, 0.7)",
      transform: "scale(1.05)",
    }}
    _active={{
      boxShadow: "0 0 15px #1DD75B",
      transform: "scale(0.95)",
    }}
    onClick={() => setShowExitButton(false)}
  >
    Return
  </Button>

  <Button
    width="150px" // Increased width for larger button
    height="50px" // Increased height for larger button
    color="#E77E7E"
    border="1px solid #E77E7E"
    variant="outline"
    _hover={{
      boxShadow: "0 0 10px #E77E7E",
      transform: "scale(1.05)",
    }}
    _active={{
      boxShadow: "0 0 15px #E77E7E",
      transform: "scale(0.95)",
    }}
    onClick={handleExitBasketClick}
  >
    Exit basket
  </Button>
</Box>





          </Box>
        ))}
      {showInvestmentOptions && (
        <>
          <Text
            // width="188px"
            height="22px"
            fontFamily="Inter"
            fontSize="14px"
            fontWeight="400"
            lineHeight="22px"
            textAlign="left"
            color="#A7ADB7"
          >
            Basket Min Amount: ₹{minReqAmt.toLocaleString('en-IN')}
          </Text>

          {/* <Box display={"flex"} justifyContent={"space-between"}>
          <Text fontSize="lg" mt={4}>
             Amount: <strong>₹{amountToInvest}</strong>
          </Text>
          <Text fontSize="lg">
            Current Balance: <strong>₹{currentBalance}</strong>
          </Text>
         
          </Box> */}

          <Box display={"flex"} justifyContent={"space-between"}>
            <Text
              fontSize="14px"
              fontFamily="Inter"
              fontWeight="400"
              lineHeight="22px"
              textAlign="left"
              color="#FFFFFF"
              mt={4}
            >
              Amount: ₹{amountToInvest.toLocaleString('en-IN')}
            </Text>
            <Text
              fontSize="14px"
              fontFamily="Inter"
              fontWeight="400"
              lineHeight="22px"
              textAlign="left"
              color="#FFFFFF"
              mt={4}
            >
              Current Balance: ₹{currentBalance.toLocaleString('en-IN')}
            </Text>
          
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center" // Align vertically
            // border="1px solid red"
            mt={2}
            // p={2}  // Padding around the box
          >
            <Box>
            <HStack spacing={2} mt={2}> {/* Reduced spacing from 4 to 2 */}
  <Button
    colorScheme="white"
    variant="outline"
    _hover={{
      boxShadow: "0 0 10px white",
      transform: "scale(1.05)",
    }}
    size="sm"
    _active={{
      boxShadow: "0 0 15px white",
      transform: "scale(0.95)",
    }}
    onClick={decreaseLot}
    disabled={lots <= 1}
  >
    <Icon as={MinusIcon} />
  </Button>

  <Text

    fontWeight="bold"
    fontSize="sm"
 
    textAlign="center"
    width="40px"
  >
    {lots}
  </Text>

  <Button
    size="sm"
    color="#1DD75B"
    border="1px solid #1DD75B"
    _hover={{
      boxShadow: "0 0 10px rgba(29, 215, 91, 0.7)",
      transform: "scale(1.05)",
    }}
    _active={{
      boxShadow: "0 0 15px rgba(29, 215, 91, 1)",
      transform: "scale(0.95)",
    }}
    variant="outline"
    onClick={increaseLot}
    disabled={amountToInvest >= currentBalance}
  >
    <Icon as={AddIcon} />
  </Button>
</HStack>


              <Text
                fontSize="14px"
                fontFamily="Inter"
                fontWeight="400"
                lineHeight="22px"
                textAlign="left"
                color="#FFFFFF"
                mt={2}
              >
                Basket Multiple
              </Text>
            </Box>

            <Box>
      <Button
        color="#1DD75B"
        size="lg"
        height="60px"
        width="160px"
        border="1px solid #1DD75B"
        variant="outline"
        _hover={{
          boxShadow: "0 0 10px rgba(29, 215, 91, 0.7)",
          transform: "scale(1.05)",
        }}
        _active={{
          boxShadow: "0 0 15px rgba(29, 215, 91, 1)",
          transform: "scale(0.95)",
        }}
        onClick={handleBuyClick}
        isLoading={apiLoader}
      >
        Invest
      </Button>
    </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default InvestmentSection;
