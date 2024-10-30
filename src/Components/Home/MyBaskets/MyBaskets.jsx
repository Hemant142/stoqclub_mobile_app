import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Button,
  Stack,
  Icon,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const MyBaskets = ({ userInfo }) => {
  if (userInfo.firstTimeClient) {
    return null; // Return null if the user is a first-time client
  }

  return (
    <section className="my-baskets" bg="darkBackground" alignItems={"left"}>
      <Heading size="lg" mb={4} fontFamily={"Helvetica"}>
        My Baskets
      </Heading>
      {userInfo.myBaskets && userInfo.myBaskets.length > 0 ? (
        <Stack spacing={4} mb={4}>
          {userInfo.myBaskets.map((bskt, index) => (
            <Link
              key={`all_basket_${index}`}
              to={`/basket/${bskt.basketId}`}
              style={{ textDecoration: "none" }}
            >
              <Flex
                key={`my_basket_${index}`}
                bg="#262a33"
                border="1px solid #565e6c"
                borderRadius="md"
                p={2}
                alignItems="center"
              >
                <Box
                  width="40px"
                  height="40px"
                  // borderRadius="full"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mr={2}
                >
                  <Image
                    src={bskt.iconUrl}
                    alt={bskt.title}
                    width="34"
                    height="34px"
                  />
                </Box>

                {/* Responsive Flex for Title and Returns */}
                <Flex flexDirection="row" flexGrow={1} mr={2} gap={2}>
                  {" "}
                  {/* Change to row and add gap */}
                  <Heading
                    size="sm"
                    noOfLines={1}
                    fontSize={{ base: "14px", md: "16px" }} // Adjusts font size for mobile and larger screens
                    fontWeight="bold"
                  >
                    {bskt.title.length > 15
                      ? `${bskt.title.slice(0, 15)}...`
                      : bskt.title}
                  </Heading>
                  <Text
                    fontSize={{ base: "12px", md: "14px" }} // Smaller font size for mobile
                    fontWeight="medium"
                     fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
                    color={bskt.returnsFlag === "red" ? "red.500" : "#1DD75B"}
                  >
                    {bskt.avrageReturns}
                    <span
                      style={{
                        color:
                          bskt.returnsFlag === "red" ? "red.500" : "#1DD75B",
                      }}
                    >
                      ({bskt.percentageReturns}%)
                    </span>
                  </Text>
                </Flex>

                {/* Button */}
                <Button
                  variant="outline"
                  color={"#1DD75B"}
                  border={"1px solid #1DD75B"}
                  _hover={{
                    boxShadow: "0 0 10px rgba(29, 215, 91, 0.7)",
                    transform: "scale(1.05)",
                  }}
                  p={{ base: 1, md: 2 }} // Adjust padding for mobile
                  fontSize={{ base: "12px", md: "16px" }} // Adjust button icon size
                >
                  <Icon as={ArrowForwardIcon} w={3} h={4} />
                </Button>
              </Flex>
            </Link>
          ))}
        </Stack>
      ) : (
        <Text className="no_data_box">No Baskets Available</Text>
      )}
    </section>
  );
};

export default MyBaskets;
