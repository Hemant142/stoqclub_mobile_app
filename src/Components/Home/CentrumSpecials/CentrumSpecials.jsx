import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  HStack,
  Image,
  Icon,
  Tooltip,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Stars from "../../../Assets/stars.png";
import SectionLoader from "../../Loader/SectionLoader";

const CentrumSpecials = ({ allBasketsApiLoading, allBaskets }) => {
  // Function to limit the title length
  const truncateTitle = (title, maxLength = 25) => {
    return title.length > maxLength
      ? `${title.substring(0, maxLength)}...`
      : title;
  };

  return (
    <Box textAlign="left" mx="auto" mb={6} p={2} boxShadow="xl">
      {/* Heading Section */}
      <HStack spacing={2} mb={4} fontFamily={"Epilogue"}>
        <Heading
          as="h4"
          size={{ base: "md", md: "lg" }} // Responsive heading size
          color="white"
          fontFamily={"Helvetica"}
          fontWeight="normal"
        >
          Centrum Specials
        </Heading>
        <Image src={Stars} alt="Stars" boxSize={{ base: "24px", md: "28px" }} />
      </HStack>
      <Text
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
        color="rgba(144, 149, 160, 1)"
        fontSize={{ base: "sm", md: "md" }} // Responsive text size
        fontWeight="300"
        mb={4}
      >
        Top performing baskets
      </Text>

      {/* Basket Cards Slider Section */}
      <Box overflowX="auto" mb={4}>
        {allBasketsApiLoading ? (
          <SectionLoader />
        ) : allBaskets.filter((allBskt) => allBskt.specialBasket).length > 0 ? (
          <Flex as="div" gap={6} wrap="nowrap" overflowX="auto" px={2}>
            {allBaskets
              .filter((allBskt) => allBskt.specialBasket)
              .map((bskt, index) => (
                <Box
                  textAlign={"left"}
                  fontFamily={"Epilogue"}
                  key={`spbskt_${index}`}
                  minWidth={{ base: "85%", sm: "65%", md: "45%" }} // Responsive card width
                  bg="rgba(38, 42, 51, 1)"
                  border="1px solid rgba(86, 94, 108, 1)"
                  borderRadius="12px"
                  p={6}
                  position="relative"
                  color="white"
                  transition="transform 0.3s, box-shadow 0.3s"
                  _hover={{
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  {/* Truncated Title with Tooltip for Full Title */}
                  <Tooltip label={bskt.title} fontSize="md" hasArrow>
                    <Heading
                      as="h3"
                      size={{ base: "sm", md: "md" }} // Responsive heading size
                      mb={3}
                      isTruncated
                      fontWeight="normal"
                      fontFamily={"Helvetica"}
                      borderBottom="1px solid #BCC1CA"
                    >
                      {truncateTitle(bskt.title)}
                    </Heading>
                  </Tooltip>

                  {/* Description */}
                  <Text
                    fontWeight="normal"
                    color="rgba(222, 225, 230, 1)"
                    fontSize={{ base: "xs", md: "sm" }} // Responsive text size
                    mb={10}
                    noOfLines={3}
                  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
                  >
                    {bskt.description}
                  </Text>

                  {/* Link to Basket */}
                  <Link to={`/basket/${bskt._id}`}>
                    <Button
                      position="absolute"
                      bottom={4}
                      right={4}
                      color={"#1DD75B"}
                      border={"1px solid #1DD75B"}
                      variant="outline"
                      fontSize={{ base: "xs", md: "sm" }} // Responsive button font size
                      _hover={{
                        boxShadow: "0 0 10px rgba(29, 215, 91, 0.7)",
                        transform: "scale(1.05)",
                      }}
                      _active={{
                        boxShadow: "0 0 15px #1DD75B",
                        transform: "scale(0.95)",
                      }}
                    >
                      <Icon as={ArrowForwardIcon} w={3} h={4} />
                    </Button>
                  </Link>
                </Box>
              ))}
          </Flex>
        ) : (
          <Box
            textAlign="center"
            border="1px solid #565e6c"
            borderRadius="12px"
            fontFamily={"Epilogue"}
            bg="rgba(38, 42, 51, 1)"
            p={4}
            mx="auto"
          >
            <Text color="white">No Baskets Available</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CentrumSpecials;
