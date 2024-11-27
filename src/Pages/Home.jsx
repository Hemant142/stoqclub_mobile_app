import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  Circle,
} from "@chakra-ui/react";
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
import LogoutModal from "../Components/Home/Logout/LogoutModal";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const token = Cookies.get("login_token_client");

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

  useEffect(() => {
    if (userDetails && userDetails.username) {
      Cookies.set("user-name", userDetails.username, { expires: 7 });
      if (userDetails.currentBalance !== undefined) {
        Cookies.set("balance", userDetails.currentBalance);
      } else {
        Cookies.set("balance", 10000);
      }
    }
  }, [userDetails]);

  const MAX_NAME_LENGTH = 10;
  const firstName = userDetails?.username?.split(" ")[0] || "";
  const truncatedName =
    firstName.length > MAX_NAME_LENGTH
      ? `${firstName.slice(0, MAX_NAME_LENGTH)}...`
      : firstName;

  const handleLogout = () => {
    setIsLoggingOut(true);
    Cookies.remove("login_token_client");
    Cookies.remove("user-name");
    Cookies.remove("balance");
    navigate("/");
  };

  const getUserInitials = (name) => {
    const names = name?.split(" ") || [];
    return names.map((n) => n[0]).join("").toUpperCase();
  };

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
            {/* Profile Section */}
            <Box display="flex" alignItems="center" gap={4}>
              <Tooltip label={'Logout'} aria-label="Full name tooltip">
              <Circle
  size="40px"
  bgGradient="linear(to-r, #7caee1, #18416b)"
  color="white"
  fontWeight="bold"
  cursor="pointer"
  _hover={{
    bgGradient: "linear(to-r, #18416b, #7caee1)",
    boxShadow: "0 0 10px #7caee1",
  }}
  onClick={onOpen}
>
  {getUserInitials(userDetails.username)}
</Circle>

              </Tooltip>
              <Heading
                as="h2"
                fontFamily="Helvetica"
                fontSize="27px"
                lineHeight="30px"
                fontWeight="500"
                color="white"
              >
                {`Hi, ${truncatedName}!`}
              </Heading>
            </Box>

            {/* Logo */}
            <Box
              width="40%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <img src={Logo} alt="Logo" />
            </Box>
          </Box>

          {/* Components */}
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

          {/* Logout Modal */}
          <LogoutModal
            isOpen={isOpen}
            onClose={onClose}
            handleLogout={handleLogout}
            isLoggingOut={isLoggingOut}
          />
        </Box>
      )}
    </Box>
  );
}
