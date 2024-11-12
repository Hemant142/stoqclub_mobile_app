import React, { useEffect } from "react";
import { Box, Heading, Image, Tooltip } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getBalance, getUserInfo } from "../Redux/authReducer/action";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import Logo from "../Assets/logo.png";
import AccountOverview from "../Components/Home/AccountOverview/AccountOverview";
import MyBaskets from "../Components/Home/MyBaskets/MyBaskets";
import { getAllBaskets } from "../Redux/basketReducer/action";
import CentrumSpecials from "../Components/Home/CentrumSpecials/CentrumSpecials";
import PopularBaskets from "../Components/Home/PopularBaskets/PopularBaskets";
import { fetchSymbols } from "../Redux/symbolReducer/action";
// import CentrumSpecials from "../Components/Home/CentrumSpecials/CentrumSpecials";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const userId = params.get("UserId");
  const SessionId = params.get("SessionId");

  const token = Cookies.get("login_token_client");

  //  Cookies.set("user2Id_client", userId);
  let userDetails = useSelector((store) => store.authReducer.userdata);
  let Allbaskets = useSelector((store) => store.basketReducer);

  let allBasketsApiLoading = Allbaskets.isLoading;
  let allBaskets = Allbaskets.baskets;

  useEffect(() => {
    dispatch(getAllBaskets(token));
    dispatch(fetchSymbols(token));
    dispatch(getUserInfo(token));
    dispatch(getBalance(token));
  }, [dispatch, token]);

  // useEffect(() => {
  // if (userId == null && SessionId == null) {
  //   navigate("/404");
  //   return;
  // } else {
  //   Cookies.set("userId", `${userId}`);
  //   let SessionID = btoa(SessionId);
  //   Cookies.set("SessionId", `${SessionID}`);
  // }

  // make your api calls here
  // dispatch(getUserInfo(userId));
  // }, [dispatch, userId, SessionId, navigate]);

  // Use effect to set the cookie when userDetails changes
  useEffect(() => {
    if (userDetails && userDetails.username) {
      // Store the user's name in a cookie called 'user-name'
      Cookies.set("user-name", userDetails.username, { expires: 7 }); // Set to expire in 7 days
      if (userDetails.currentBalance !== undefined) {
        Cookies.set("balance", userDetails.currentBalance);
      } else {
        Cookies.set("balance", 10000);
      }
    }
  }, [userDetails]); //

  // Define the character limit for the first name display
  const MAX_NAME_LENGTH = 10;

  const firstName = userDetails?.username?.split(" ")[0] || ""; // Extract the first name
  const truncatedName =
    firstName.length > MAX_NAME_LENGTH
      ? `${firstName.slice(0, MAX_NAME_LENGTH)}...`
      : firstName; // Truncate if longer than the limit

 
  return (
    <Box>
      {Object.keys(userDetails).length === 0 ? (
        <Loader />
      ) : (
        <Box p={4} bg="darkBackground" color="white">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={10}
         
          >
            <Box display="flex" alignItems="center" >
              <Tooltip label={firstName} aria-label="Full name tooltip">
                <Heading
                  as="h2"
                  fontFamily="Helvetica"
                  fontSize="27px"
                  lineHeight="30px"
                  fontWeight="500"
                  color="white"
                >
                  {`Hi, ${truncatedName} !`}
                </Heading>
              </Tooltip>
            </Box>

            <Box
              width="40%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Image src={Logo} alt="Logo" />
            </Box>
          </Box>

          <AccountOverview userInfo={userDetails} />
          <MyBaskets userInfo={userDetails} />
          <CentrumSpecials
            allBasketsApiLoading={allBasketsApiLoading}
            allBaskets={allBaskets}
          />
          <PopularBaskets
            allBasketsApiLoading={allBasketsApiLoading}
            allBaskets={allBaskets}
          />
        </Box>
      )}
    </Box>
  );
}
