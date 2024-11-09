import React, { useEffect, useState } from "react";
import { Box, Text, Flex, Icon, Divider } from "@chakra-ui/react";
import Cookies from "js-cookie";
import {
  BsArrowDownLeftCircle,
  BsArrowUpRightCircle,
  BsPatchCheck,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchSymbols } from "../../../Redux/symbolReducer/action";

export default function MyBasketConstituents({ basketData, orderHistory, newInstrumentsData }) {
  // const Symbols = useSelector((store) => store.symbolsReducer.symbols);
  const dispatch = useDispatch();
  const token = Cookies.get("login_token_client");
  // useEffect(()=>{
  //     dispatch(fetchSymbols(token));
  // },[token])

  const handleUpsidePotentialPercentage = (instrumentListData) => {
    let cmp = Number(instrumentListData.currentPrice);
    let takeProfit = Number(instrumentListData.takeProfit) ;

    let upsidePotential = ((takeProfit - cmp) / cmp) * 100;
    let upsidePotentialPercentage = Math.floor(upsidePotential);

    // If the upside potential is less than 0, return 0 to avoid summing a negative value
    if (upsidePotentialPercentage < 0) {
      return 0; // or you can handle this differently based on your requirement
    }

    return upsidePotentialPercentage;
  };

  const handleUpsidePotential = (instrumentListData) => {
    let cmp = Number(instrumentListData.currentPrice);
    let takeProfit = Number(instrumentListData.takeProfit || 985);
    let qty = Number(instrumentListData.quantity);

    let upsidePotential = ((takeProfit - cmp) * qty).toFixed(2);

    return Number(upsidePotential);
  };

  // const handleSymbolName = (symbol) => {
  //   if (symbol !== "" && symbol !== null) {
  //     let filterSymbolName = Symbols.filter((ele) => ele.instrument == symbol);
  //     let result = filterSymbolName[0];

  //     if (result !== undefined) {
  //       return result.name;
  //     }
  //   }

  //   return symbol; // Return an empty string if the symbol is not found or invalid
  // };


  return (
    <Box className="basket-constituents" p={4} >
      <Text fontSize="md" fontWeight="bold" mb={4} fontFamily={"Helvetica"}>
       My Basket Constituents & Weights
      </Text>

      <Divider
        ml={2}
        mr={2}
        mb={4}
        m="auto"
        width="350px"
        border="1px solid #BCC1CA"
        position="relative"
      />

      {basketData?.instrumentList?.length > 0 ? (
        orderHistory?.length > 0 ? (
          orderHistory.map((inst, index) => (
            <Box
              key={`inst_${index}`}
              className="new-constituent-item"
              mb={4}
              p={4}
              mt={4}
              bg={"#262A33"}
              border="1px solid rgba(86, 94, 108, 1)"
              borderRadius="md"
              boxShadow="md"
            >
              <Flex justify="space-between" align="center">
                <Flex align="center" >
                  <Icon
                   fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
                   
                    as={
                      handleUpsidePotentialPercentage(inst) > 0
                        ? BsArrowUpRightCircle
                        : BsArrowDownLeftCircle
                    } // You can change the icon for other flags
                    boxSize={6}
                    color={
                      handleUpsidePotentialPercentage(inst) > 0
                        ? "#1DD75B"
                        : "#E05858"
                    } // Adjust this if needed
                    mr={2}
                  />
                  <Text fontSize="lg" fontWeight="500" 
                    //  fontSize="lg"
                    //  fontWeight="500"
                     lineHeight="24px"
                   fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
                   >
                    {/* {handleSymbolName(inst?.instrument)} */}
                    {inst?.instrument}
                  </Text>
                </Flex>

                <Box display="flex" alignItems="center" gap={2}>
                  <Text
                    fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
                   
                    fontSize="xl"
                    fontWeight="500"
                    lineHeight="22px"
                    textAlign="right"
                    color={
                      handleUpsidePotentialPercentage(inst) > 0
                        ? "#1DD75B"
                        : "#E05858"
                    }
                  >
                    ₹ {handleUpsidePotential(inst).toFixed(2)}{" "}
                    {/* Display the upside potential */}
                  </Text>
                  <Text
                    fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
                   
                    fontSize="xl"
                    fontWeight="500"
                    lineHeight="18px"
                    textAlign="right"
                    color={
                      handleUpsidePotentialPercentage(inst) > 0
                        ? "#1DD75B"
                        : "#E05858"
                    }
                  >
                    ({handleUpsidePotentialPercentage(inst)}%)
                  </Text>
                </Box>
              </Flex>
              <Box
                mt={2}
                display="flex"
                width="100%"
                gap={2}
                justifyContent="flex-end" // Aligns content to the right
                alignItems="center" // Aligns items vertically centered
              >
                <Box display="flex" gap={1} alignItems="center" width={"44%"}>
                  <Text
                    fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
                    fontSize="11px"
                    fontWeight="400"
                    lineHeight="22px"
                    color={"#BCC1CA"}
                  >
                    Weightage:
                  </Text>
                  <Text
                    fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
                    fontSize="11px"
                    fontWeight="400"
                    lineHeight="22px"
                    textAlign="left" // Align text to the left
                  >
                    2%
                  </Text>
                </Box>

                <Box display="flex" gap={1} alignItems="center" width={"44%"}>
                  <Text
                    fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
                    fontSize="11px"
                    fontWeight="400"
                    lineHeight="22px"
                    color={"#BCC1CA"}
                  >
                    Current Price:
                  </Text>
                  <Text
                    fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
                    fontSize="11px"
                    fontWeight="400"
                    lineHeight="22px"
                    textAlign="left" // Align text to the left
                  >
                    {inst?.currentPrice || "N/A"}{" "}
                    {/* Added default value if currentPrice is undefined */}
                  </Text>
                </Box>
              </Box>

              <Box
                mt={2}
                display="flex"
                width="100%"
                gap={2}
                justifyContent="flex-end" // Aligns content to the right
                alignItems="center" // Aligns items vertically centered
              >
                <Box display="flex" gap={1} alignItems="center" width={"44%"}>
                  <Text
                    fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
                   
                    fontSize="11px"
                    fontWeight="400"
                    lineHeight="22px"
                    color={"#BCC1CA"}
                  >
                    Shares :
                  </Text>
                  <Text
                    fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
                    fontSize="11px"
                    fontWeight="400"
                    lineHeight="22px"
                    textAlign="left" // Align text to the left
                  >
                    {inst?.quantity}
                  </Text>
                </Box>

                <Box display="flex" gap={1} alignItems="center" width={"44%"}>
                  <Text
                    fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
                    fontSize="11px"
                    fontWeight="400"
                    lineHeight="22px"
                    color={"#BCC1CA"}
                  >
                    Average Buy price:
                  </Text>
                  <Text
                    fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
                    fontSize="11px"
                    fontWeight="400"
                    lineHeight="22px"
                    textAlign="left" // Align text to the left
                  >
                    8
                  </Text>
                </Box>
              </Box>

       
            </Box>
          ))
        ) : (
            <Text>No constituents available.</Text>
        )
      ) : (
        <Text>No constituents available.</Text>
      )}
    </Box>
  );
};
