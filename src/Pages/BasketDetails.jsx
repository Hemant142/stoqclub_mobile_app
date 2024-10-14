import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { getBasketDetails } from "../Redux/basketReducer/action";
import { useDispatch } from "react-redux";
import Loader from "../Components/Loader/Loader";
import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import DesktopWarning from "../Components/BasketDetails/DesktopWarning/DesktopWarning";
import BackArrow from "../Components/BasketDetails/BackArrow/BackArrow";
import BasketComponent from "../Components/BasketDetails/BasketComponent/BasketComponent";
import StatsComponent from "../Components/BasketDetails/StatsComponent/StatsComponent";
import LineGraph from "../Components/BasketDetails/LineGraph/LineGraph";
import InvestmentInfo from "../Components/BasketDetails/InvestmentInfo/InvestmentInfo";
import BasketConstituents from "../Components/BasketDetails/BasketConstituents/BasketConstituents";
import Activity from "../Components/BasketDetails/Activity/Activity";
import AboutCentrum from "../Components/BasketDetails/AboutCentrum/AboutCentrum";
import InvestmentSection from "../Components/BasketDetails/InvestmentSection/InvestmentSection";

export default function BasketDetails() {
  const [apiLoading, setApiLoading] = useState(true);
  const [basketData, setBasketData] = useState(null);
  const [brokerage,setBrokerage]=useState(0)
  
  let token = Cookies.get("login_token_client");
 
  console.log(basketData, "basketData");
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(id, "ID");
  let userId = Cookies.get("user2Id_client");
  let currentBalance=Cookies.get("balance")
console.log(currentBalance,"currentBalance")

  useEffect(() => {
    dispatch(getBasketDetails(userId, id))
        .then((res) => {
            console.log(res.data.data, "getBasketDetails");
            if (res.data.status === "SUCCESS") {
                setApiLoading(false);
                // Store data in cookie in JSON format
                Cookies.set("basketData", JSON.stringify(res.data.data), {
                    expires: 7, // Cookie expires in 7 days
                });
                setBasketData(res.data.data);
            }
        })
        .catch((error) => {
            setApiLoading(false);
            console.log(error, "getBasketDetails error");
        });
}, []);








  return (
    <Box>
      {apiLoading ? (
        <Loader />
      ) : (
        // <InvestmentSection
        // id={basketData._id}
        // minReq={basketData.fundRequired}
        // basketName={basketData.title}
        // currentBalance={basketData.currentBalance}
        // />

        <Box
        color="#fff"
        width="100%"
        overflowX="hidden"
        height="100vh"
        backgroundColor="rgba(23, 26, 31, 1)"
        boxShadow="0px 3px 6px 0px rgba(18, 15, 40, 0.12)"
        paddingBottom="20px"
      >
        {basketData === null ? (
          <Flex
            direction="column"
            justify="center"
            align="center"
            marginTop="5rem"
            height="100%"
          >
            <Text className="no_data_box" fontSize="lg">
              Basket Details Not Available.
            </Text>
          </Flex>
        ) : (
          // Render your basket details here when basketData is available
          <Box>
            <BackArrow />
            <DesktopWarning />
            <BasketComponent basketData={basketData} />
            <StatsComponent basketData={basketData} />
            <LineGraph data={basketData.lineChartData} />
            <InvestmentInfo basketData={basketData} />
            
            <Divider
              ml={2}
              mr={2}
              m="auto"
              width="350px" // Sets the width
              border="1px solid #BCC1CA" // Adds the solid border with the specified color
              position="relative"
            />
            
            <BasketConstituents basketData={basketData} />
      
            <Divider
              ml={2}
              mr={2}
              m="auto"
              width="350px" // Sets the width
              border="1px solid #BCC1CA" // Adds the solid border with the specified color
              position="relative"
            />
      
            <Activity basketData={basketData} />
      
            <Divider
              ml={2}
              mr={2}
              m="auto"
              width="350px" // Sets the width
              border="1px solid #BCC1CA" // Adds the solid border with the specified color
              position="relative"
            />
      
            <AboutCentrum basketData={basketData} id={id} />
      
            <InvestmentSection
              id={id}
              minReq={basketData.fundRequired || 0} // Provide a default value if fundRequired is undefined
              basketName={basketData.title || "N/A"} // Provide a default if title is undefined
              currentBalance={Number(currentBalance) || 0} // Provide a default if currentBalance is undefined
              instrumentList={basketData.instrumentList || []} // Provide a default if instrumentList is undefined
            />
          </Box>
        )}
      </Box>
      
      )}
    </Box>
  );
}
