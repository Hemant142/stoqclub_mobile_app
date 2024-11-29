import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  Text,
  useToast,
  Link,
  Container,
  useBreakpointValue,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import OtpDrawer from "../Components/Login/OtpDrawer";
import { AiOutlineUser, AiOutlineIdcard, AiOutlineLock, AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"; // Importing user and id card icons
import { MdLock } from "react-icons/md"; // Importing lock icon
import { InfoIcon, RepeatClockIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { clientToken, otpSend } from "../Redux/authReducer/action";
import axios from "axios";
import Logo  from "../Assets/logo.png"

const Login = () => {
  const [userId, setUserId] = useState("");
  const [panCard, setPanCard] = useState("");
  const [authToken, setAuthToken] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [isOTPDrawerOpen, setIsOTPDrawerOpen] = useState(false);
  const [attempts, setAttempts] = useState(
    parseInt(localStorage.getItem('attemps')) || 0
  );
  const [lockoutTimer, setLockoutTimer] = useState(
    parseInt(localStorage.getItem('lockoutTimer')) || 0
  );
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch=useDispatch()
  let clientUserId = Cookies.get('userId')

  let NewURL=process.env.REACT_APP_NewURL;

  // Handle 5-minute lockout timer
  useEffect(() => {
    if (lockoutTimer > 0) {
      const countdown = setInterval(() => {
        setLockoutTimer((prev) => {
          if (prev === 1) {
            setAttempts(0); // Reset attempts to 0 when timer reaches 0
          localStorage.removeItem('attemps')
          localStorage.removeItem('lockoutTimer')
          }
          const newTimer = prev-1;
          localStorage.setItem('lockoutTimer',newTimer);

          return newTimer;
        });
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [lockoutTimer]);

  const handleLogin = () => {
    if (!userId || !panCard) {
      toast({
        title: "Please fill in all fields.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
  
    if (panCard.length < 10) {
      toast({
        title: "PAN Card should have at least 10 characters.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
  
    if (panCard.length > 10) {
      toast({
        title: "PAN Card can have at most 10 characters.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (userId && panCard) {
      const data = {
        userId: userId,
        panCard: panCard,
      };
    
      // Dispatch action and handle the promise
      dispatch(clientToken(data))
        .then((res) => {
     
     Cookies.set('userId',userId)
            // setIsOTPDrawerOpen(true); // Open OTP drawer if login is successful
            if(res.data.status==="failed"){
              toast({
                title: res.data.message,
                position: "bottom",
                status: "error",
                duration: 2000,
                isClosable: true,
              });
            }
            if(res.data.access_token){
              
              let token=res.data.access_token
              setAuthToken(token)
              toast({
                title: "Please Wait",
                position: "bottom",
                status: "success",
                duration: 2000,
                isClosable: true,
              });
    
              // Send OTP request using the Bearer token
            dispatch(otpSend(token))
                .then((otpResponse) => {
                
                  toast({
                    title: "OTP sent to your registered Mobile!",
                    position: "bottom",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                  });
                  setIsOTPDrawerOpen(true)
               
                
                 
                 
                })
                .catch((otpError) => {
                  toast({
                    title: "Failed to send OTP",
                    position: "bottom",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                  });
                });
            }
         
          
        })
        .catch((error) => {
          console.log(error, "Error");
          toast({
            title: "Login failed.",
            description: error.message || "An error occurred.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    } else {
      toast({
        title: "Please fill in all fields.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  

  const handleOTPFailure = () => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
localStorage.setItem('attemps',newAttempts);

    if (newAttempts >= 3) {
      setLockoutTimer(300); // 5 minutes
      localStorage.setItem('lockoutTimer',300)
      setIsOTPDrawerOpen(false);
      toast({
        title: "Maximum attempts reached. Please try again after 5 minutes.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: `Wrong OTP! You have ${3 - newAttempts} attempt${
          newAttempts > 1 ? "s" : ""
        } left.`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container
      height="100vh"
      bg="#171A1F"
      p={4}
      display={"flex"}
      textAlign={"center"}
      alignItems={"center"}
    >



      <VStack alignItems={"center"} margin={"auto"}>
      <Image src={Logo} alt="Logo"  mb={20} />
        <Heading mb={6} textAlign="center" color="white">
          <Text fontSize="lg" textShadow="0 1px 2px rgba(0, 0, 0, 0.5)">
            Hi there,
          </Text>
          <Text
            fontSize="3xl"
            fontWeight="bold"
            textShadow="0 1px 2px rgba(0, 0, 0, 0.5)"
          >
            Welcome Back
          </Text>
        </Heading>

        <VStack spacing={5}>
          <FormControl id="userId" isRequired>
            <FormLabel color="gray.300">UserID</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<AiOutlineUser size={24} />}
              />
              <Input
                value={userId}
                onChange={(e) => setUserId(e.target.value.toUpperCase())}
                placeholder="Enter UserID"
                bg="#000000"
                color="white"
                _placeholder={{ color: "white.500" }}
                focusBorderColor="black"
                borderColor="black.600"
                borderWidth="1px"
                borderRadius="md"
                fontSize={useBreakpointValue({ base: "md", md: "lg" })}
                px={4}
                py={3}
                _hover={{ borderColor: "white.400", bg: "#1C1E22" }} // Add hover effect for the input
              />
            </InputGroup>
          </FormControl>

          <FormControl id="panCard" isRequired>
            <FormLabel color="gray.300">PAN Card Number</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<AiOutlineIdcard size={24} />}
              />
              <Input
                value={panCard}
                onChange={(e) => setPanCard(e.target.value.toUpperCase())}
                placeholder="Enter PAN Card Number"
                bg="#000000"
                color="white"
                _placeholder={{ color: "white.500" }}
                focusBorderColor="black"
                borderColor="black.600"
                borderWidth="1px"
                borderRadius="md"
                fontSize={useBreakpointValue({ base: "md", md: "lg" })}
                px={4}
                py={3}
                _hover={{ borderColor: "white.400", bg: "#1C1E22" }} // Add hover effect for the input
              />
            </InputGroup>
          </FormControl>



          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems="center"
          >
            {lockoutTimer > 0 && (
              <Text
                color="red.500"
                fontWeight="bold"
                textAlign="left"
                display="flex"
                alignItems="center"
              >
                <InfoIcon mr={2} /> {/* Info icon for attempts left */}
                {`You have 0 attempts left.`}
              </Text>
            )}

            {lockoutTimer > 0  && (
              <Text
                color="white.500"
                fontWeight="bold"
                textAlign="left"
                display="flex"
                alignItems="center"
              >
                <RepeatClockIcon mr={2} /> {/* Lock icon for lockout timer */}
                {`${Math.floor(lockoutTimer / 60)}:${String(
                  lockoutTimer % 60
                ).padStart(2, "0")}`}
              </Text>
            )}
          </Box>

          <Button
            leftIcon={<MdLock />} // Add a lock icon to the button
            // colorScheme="green"
            isDisabled={lockoutTimer > 0}
            color={"#1DD75B"}
            border={"1px solid #1DD75B"}
            size="lg"
            w="full"
            variant="outline"
            onClick={handleLogin}
            // isDisabled={!userId || !panCard}
            _hover={{
              // bg: 'rgba(29, 215, 91, 0.1)',
              boxShadow: "0 0 10px #1DD75B", // Glow effect on hover
              transform: "scale(1.05)", // Scale effect on hover
            }}
            _active={{
              boxShadow: "#1DD75B", // Stronger glow effect when active
              transform: "scale(0.95)", // Shrink effect when clicked
            }}
            fontWeight="bold"
            borderRadius="md"
            py={6}
          >
            Get OTP
          </Button>
        </VStack>
      </VStack>

      {isOTPDrawerOpen && (
        <OtpDrawer
          isOpen={isOTPDrawerOpen}
          authToken={authToken}
          onClose={() => setIsOTPDrawerOpen(false)}
          onFailure={handleOTPFailure}
          onSuccess={() => navigate(`/home`)}
          attempts={attempts} // Pass attempts to OtpDrawer
        />
      )}
    </Container>
  );
};

export default Login;
