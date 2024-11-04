import React, { useEffect } from "react";
import { Box, Heading, Image } from "@chakra-ui/react";
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

    dispatch(getBalance(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (userId == null && SessionId == null) {
      navigate("/404");
      return;
    } else {
      Cookies.set("userId", `${userId}`);
      let SessionID = btoa(SessionId);
      Cookies.set("SessionId", `${SessionID}`);
    }

    // make your api calls here
    dispatch(getUserInfo(userId));
  }, [dispatch, userId, SessionId, navigate]);

  // Use effect to set the cookie when userDetails changes
  useEffect(() => {
    if (userDetails && userDetails.name) {
      // Store the user's name in a cookie called 'user-name'
      Cookies.set("user-name", userDetails.name, { expires: 7 }); // Set to expire in 7 days
      if (userDetails.balance !== undefined) {
        Cookies.set("balance", userDetails.balance);
      } else {
        Cookies.set("balance", 10000);
      }
    }
  }, [userDetails]); //

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
          
            // p={2}
            mb={10}

            // width="100%" // Ensures the box takes full width
          >
            <Box
              display="flex"
              alignItems="center"
              

              // width="50%" // Adjust as needed for how much space you want the name to take
            >
              <Heading
                as="h2"
                fontFamily={"Helvetica"}
                fontSize="30px"
                fontWeight="normal"
                color="white"
              >
                {`Hi, ${userDetails?.name} !`}
              </Heading>
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
