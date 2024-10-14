import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Flex, Spinner, Link, IconButton } from "@chakra-ui/react";
import { LuChevronLeftCircle } from "react-icons/lu";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Disclosure = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [apiLoading, setApiLoading] = useState(true);
  const [basketData, setBasketData] = useState(null);

  const goBack = () => {
    navigate(`/basket/${id}`);
  };

  const getBasketDetails = (basketId) => {
    const userId = localStorage.getItem("userId");
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://centrum-app-api.vercel.app/api/centrum/STOQCLUB/my-baskets/v2?user_id=${userId}&basket_id=${basketId}`,
    };

    axios
      .request(config)
      .then((response) => {
        setApiLoading(false);
        if (response.data.status === "SUCCESS") {
          setBasketData(response.data.data);
        } else {
          setBasketData(null);
        }
      })
      .catch(() => {
        setApiLoading(false);
      });
  };

  useEffect(() => {
    if (id != null) {
      getBasketDetails(id);
    }
  }, [id]);
  console.log(basketData,"basketData")

  return (
    <Box
      bg="rgba(23, 26, 31, 1)"
      color="white"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
      padding="0"
      width="100%"
      height="auto"
    >
      {apiLoading ? (
        <Flex justify="center" align="center" height="100vh">
          <Spinner size="xl" color="yellow.400" />
        </Flex>
      ) : (
        <Box padding="20px">
          {/* <Flex align="center" onClick={goBack} cursor="pointer" marginBottom="20px">
            <LuChevronLeftCircle />
            <Text marginLeft="10px">Back</Text>
          </Flex> */}
           <IconButton
        aria-label="Go back"
        icon={<LuChevronLeftCircle />}
        onClick={goBack}
        size="30px" // Use the size prop for the icon button
        variant="link" // Use variant="link" to remove button styling
        color="rgba(241, 155, 93, 1)" // Custom color for the icon
        fontSize="24px" // Font size of the icon
        _hover={{ cursor: 'pointer' }} // Ensure cursor is a pointer on hover
      />
      
      <Box
      textAlign="left"
      width="100%"
      alignItems="center"
      backgroundColor="rgba(238, 253, 243, 1)"
      borderWidth="1px"
      borderColor="rgba(184, 245, 205, 1)"
      borderRadius="8px"
      boxShadow="0px 0px 2px rgba(23, 26, 31, 0.12)"
      fontFamily="Epilogue"
      color="black"
      m={"auto"}
      padding={2}
      overflow="hidden" // Prevents overflow
      whiteSpace="nowrap" // Prevents text from wrapping
      textOverflow="ellipsis" // Adds ellipsis for overflow
    >
      <Heading
        as="h2"
        fontSize="18px"
        m={"auto"}
        // marginBottom="20px"
        noOfLines={1} // Ensures the title is truncated after 1 line
      >
        {basketData.title}
      </Heading>
    </Box>


          <Box marginBottom="20px">
        
          </Box>
          <Box
            fontSize="14px"
            fontWeight="300"
            lineHeight="22px"
            textAlign="left"
            color="rgba(144, 149, 160, 1)"
            marginBottom="20px"
            // dangerouslySetInnerHTML={{ __html: basketData.BasketMessage }}
          />
          <Box padding="10px 20px 20px 0px">
            <div
              dangerouslySetInnerHTML={{ __html: basketData.Disclosure }}
            ></div>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Disclosure;
