import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import {
  getBasketDetails,
  getOrderHistory,
} from "../Redux/basketReducer/action";
import { useDispatch, useSelector } from "react-redux";
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
import { getBalance } from "../Redux/authReducer/action";
import Rebalancing from "../Components/BasketDetails/Rebalancing/Rebalancing";

export default function BasketDetails() {
  const [apiLoading, setApiLoading] = useState(true);
  // const [basketData, setBasketData] = useState(null);
  const [brokerage, setBrokerage] = useState(0);
  const [instrumentList, setInstrumentList] = useState([]);

  const token = Cookies.get("login_token_client");

  const { id } = useParams();
  const dispatch = useDispatch();
  const [upsidePotential, setUpsidePotential] = useState(0);
  const [minAmount, setMinAmount] = useState(0);
  const [upsidePotentialPercentage, setUpsidePotentialPercentage] = useState(0);
  const [lineChartData, setLineChartData] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [underlyingIndexLineChart, setUnderlyingIndexLineChart] = useState([]);
  const [rebalancingList, setRebalancingList] = useState([]);

  let userId = Cookies.get("user2Id_client");
  const currentBalance = useSelector((store) => store.authReducer.userBalance);
  const {isLoading,newInstrumentsData,basketData}=useSelector((store) => store.basketReducer);


  useEffect(() => {
    dispatch(getBasketDetails(id, token));

    dispatch(getOrderHistory(id, token))
      .then((res) => {
      
        if (res.data.status === "success") {
          if (res.data.data.orderHistory.length > 0) {
            // Step 1: Group instruments by name
            const groupedInstruments = res.data.data.orderHistory.reduce(
              (acc, instrument) => {
                if (!acc[instrument.instrument]) {
                  acc[instrument.instrument] = [];
                }
                acc[instrument.instrument].push(instrument);
                return acc;
              },
              {}
            );

            // Step 2: Sort by date in descending order and pick the latest date for each name group
            const uniqueInstruments = Object.values(groupedInstruments).map(
              (group) => {
                // Sort by date in descending order (latest first)
                group.sort((a, b) => new Date(b.date) - new Date(a.date));
                // Step 3: Return the instrument with the latest date (first item in the sorted array)
                return group[0];
              }
            );

            setOrderHistory(uniqueInstruments);
          }
        }
      })
      .catch((error) => {
        console.log(error, "Get ORder History Error");
      });

    dispatch(getBalance(token));

  }, [token]);



  useEffect(() => {
    if (basketData && newInstrumentsData) {
      // Calculate the total required fund
      const total = newInstrumentsData.reduce(
        (acc, instrument) => acc + calculateFundREquired(instrument),
        0
      );
  
      // Calculate the sum of all upside potential percentages
      const totalUpsidePotentialPercentage = newInstrumentsData.reduce(
        (acc, instrument) => acc + handleUpsidePotentialPercentage(instrument),
        0
      );
  
      const totalUpsidePotential = newInstrumentsData.reduce(
        (acc, instrument) => acc + handleUpsidePotential(instrument),
        0
      );
  
      // Set the calculated values in the state
      setMinAmount(total);
      setUpsidePotentialPercentage(totalUpsidePotentialPercentage); // Assuming you have a state for upside potential
      setUpsidePotential(totalUpsidePotential);
    }

    if(basketData){
      setApiLoading(false)
    }else{
      setApiLoading(true)
    }

  }, [basketData]);
  
  useEffect(() => {
    const now = new Date(); // Get the current date and time
    
    // Logic to filter out instruments not in orderHistory and that have passed the 12-hour window
    const filteredRebalancingList = newInstrumentsData.filter((newInstrument) => {
      const statusDate = new Date(newInstrument.statusDate); // Convert statusDate to a Date object
  
      // Check if the instrument is not in orderHistory
      const isNotInOrderHistory = !orderHistory.some((order) => order.instrument === newInstrument.instrument);
  
      // Check if the statusDate is within the last 12 hours
      const isWithin12Hours = (now - statusDate) <= 12 * 60 * 60 * 1000; // 12 hours in milliseconds
  
      // Only include instruments that pass both conditions
      return isNotInOrderHistory && isWithin12Hours;
    });
  
    // Check for instruments with both "Entry" and "Exit" in orderHistory
    orderHistory.forEach((order) => {
      const entryOrder = basketData.instrumentList.find((item) =>
        item.instrument === order.instrument && item.orderType === "Entry"
      );
      const exitOrder = basketData.instrumentList.find((item) =>
        item.instrument === order.instrument && item.orderType === "Exit"
      );
  
      if (entryOrder && exitOrder) {
        // If both entry and exit exist, release the entry and store the exit in rebalancing
        filteredRebalancingList.push(exitOrder); // Keep exit order in rebalancingList
      } else if (entryOrder && !exitOrder) {
        // If only entry exists, include it in the rebalancing list
        filteredRebalancingList.push(entryOrder);
      }
    });
  
    // Update the rebalancing list state with the filtered instruments
    setRebalancingList(filteredRebalancingList);
  }, [newInstrumentsData, orderHistory, basketData.instrumentList]);
  


  // Function to generate last 6 months data for both Basket and Underlying Index
  const generateLast6MonthsData = () => {
    const currentDate = new Date();
    const dataBasket = [];
    const dataUnderlying = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setMonth(currentDate.getMonth() - i);
      const month = date.toLocaleString("default", { month: "long" }); // Month name

      // Random values for Basket and Underlying Index
      const basketValue = Math.floor(Math.random() * 100); // Random value for Basket
      const underlyingValue = Math.floor(Math.random() * 100); // Random value for Underlying Index

      dataBasket.push({ month, basketValue });
      dataUnderlying.push({ month, underlyingValue });
    }

    return { dataBasket, dataUnderlying };
  };



  useEffect(() => {
    const { dataBasket, dataUnderlying } = generateLast6MonthsData();
    setLineChartData(dataBasket);
    setUnderlyingIndexLineChart(dataUnderlying);
  }, []);





  const calculateFundREquired = (instrumentListData) => {
    const qty = instrumentListData.quantity;
    const cmp = instrumentListData.currentPrice;
    const fundRequired = cmp * qty;

    return fundRequired;
  };

  const handleUpsidePotentialPercentage = (instrumentListData) => {
    let cmp = Number(instrumentListData.currentPrice);
    let takeProfit = Number(instrumentListData.takeProfit);

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
    let takeProfit = Number(instrumentListData.takeProfit);
    let qty = Number(instrumentListData.quantity);

    let upsidePotential = ((takeProfit - cmp) * qty).toFixed(2);

    return Number(upsidePotential);
  };


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
              <StatsComponent
                basketData={basketData}
                upsidePotential={upsidePotential || 0}
                upsidePotentialPercentage={upsidePotentialPercentage || 0}
                minAmount={minAmount || 0}
              />
              <LineGraph
                lineChartData={lineChartData}
                underlyingIndexLineChart={underlyingIndexLineChart}
                underlyingIndex={basketData.underlyingIndex}
              />

              <InvestmentInfo basketData={basketData} />

              <Divider
                ml={2}
                mr={2}
                m="auto"
                width="350px" // Sets the width
                border="1px solid #BCC1CA" // Adds the solid border with the specified color
                position="relative"
              />

              <BasketConstituents
                basketData={basketData}
                newInstrumentsData={newInstrumentsData}
                orderHistory={orderHistory}
              />



              

              {rebalancingList.length>0?(
                <Box>

<Divider
                ml={2}
                mr={2}
                m="auto"
                width="350px" // Sets the width
                border="1px solid #BCC1CA" // Adds the solid border with the specified color
                position="relative"
              />

              <Rebalancing rebalancingList={rebalancingList}/>


              <Divider
                ml={2}
                mr={2}
                m="auto"
                width="350px" // Sets the width
                border="1px solid #BCC1CA" // Adds the solid border with the specified color
                position="relative"
              />
                </Box>
              )
            :( <Divider
              ml={2}
              mr={2}
              m="auto"
              width="350px" // Sets the width
              border="1px solid #BCC1CA" // Adds the solid border with the specified color
              position="relative"
            />)
            }

              <Activity basketData={basketData} orderHistory={orderHistory} />

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
                basketId={id}
                minReq={minAmount || 0} // Provide a default value if fundRequired is undefined
                basketName={basketData.title || "N/A"} // Provide a default if title is undefined
                currentBalance={Number(currentBalance) || 0} // Provide a default if currentBalance is undefined
                instrumentList={newInstrumentsData || []} // Provide a default if instrumentList is undefined
                upsidePotential={upsidePotential || 0}
                upsidePotentialPercentage={
                  Number(upsidePotentialPercentage) || 0
                }
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
