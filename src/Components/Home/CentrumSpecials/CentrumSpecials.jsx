import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  HStack,
  Image,
  SimpleGrid,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
// import SectionLoader from "../Loader/SectionLoader";
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
    <Box
      textAlign="left"
      
      mx="auto"
    //   width={{ base: "90%", md: "85%" }}
      mb={6}
      p={2}
   
      boxShadow="xl"
    >
      {/* Heading Section */}
      <HStack spacing={2} mb={4} fontFamily={"Epilogue"}>
        <Heading  as='h4' size='lg' color="white" fontFamily={"Epilogue"} fontWeight="normal">
          Centrum Specials
        </Heading>
        <Image src={Stars} alt="Stars" boxSize="28px" />
      </HStack>
      <Text
      fontFamily={"Epilogue"}
    
        color="rgba(144, 149, 160, 1)"
        fontSize="md"
        fontWeight="300"
        mb={4}
      >
        Top performing baskets
      </Text>

      {/* Basket Cards Section */}
      <Box overflowX="auto" mb={4}   >
        {allBasketsApiLoading ? (
          <SectionLoader />
        ) : allBaskets.filter((allBskt) => allBskt.specialBasket).length > 0 ? (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}  >
            {allBaskets
              .filter((allBskt) => allBskt.specialBasket)
              .map((bskt, index) => (
                <Box
                
                textAlign={"left"}
                fontFamily={"Epilogue"}
                  key={`spbskt_${index}`}
                  width={{ base: "75%", md: "85%" }}
                  bg="rgba(38, 42, 51, 1)"
                  border="1px solid rgba(86, 94, 108, 1)"
                  borderRadius="12px"
                  p={6}
                  position="relative"
                  color="white"
                  transition="transform 0.3s, box-shadow 0.3s"
                  // _hover={{
                  //   boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
                  //   // transform: "translateY(-3px)",
                  // }}
                >
                  {/* Truncated Title with Tooltip for Full Title */}
                  <Tooltip label={bskt.title} fontSize="md" hasArrow>
                    <Heading
                      as="h3"
                      size="md"
                      mb={3}
                      isTruncated
                      fontWeight="normal"
                      fontFamily={"Epilogue"}
                      borderBottom="1px solid #BCC1CA"
                    >
                      {truncateTitle(bskt.title)}
                    </Heading>
                  </Tooltip>

                  {/* Description */}
                  <Text
                  fontWeight="normal"
                    color="rgba(222, 225, 230, 1)"
                    fontSize="sm"
                    mb={10}
                    noOfLines={3}
                    fontFamily={"Epilogue"}
                  >
                    {bskt.description}
                  </Text>

                  {/* Link to Basket */}
                  <Link to={`/basket/${bskt.basketId}`}>
                    <Button
                      position="absolute"

                      bottom={4} // Positions the button a little above the bottom edge
                      right={4} // Positions the button slightly away from the right edge
                      color={"#1DD75B"}
                      border={"1px solid #1DD75B"}
                      variant="outline"
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
          </SimpleGrid>
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




// import React from "react";
// import {
//   Box,
//   Heading,
//   Text,
//   Button,
//   HStack,
//   Image,
//   SimpleGrid,
//   Icon,
//   Tooltip,
// } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import { ArrowForwardIcon } from "@chakra-ui/icons";
// import SectionLoader from "../../Loader/SectionLoader";
// import Stars from "../../../Assets/stars.png";

// const CentrumSpecials = ({ allBasketsApiLoading, allBaskets }) => {
//   // Function to limit the title length
//   const truncateTitle = (title, maxLength = 15) => {
//     return title.length > maxLength
//       ? `${title.substring(0, maxLength)}...`
//       : title;
//   };

//   return (
//     <Box
//       textAlign="left"
//       mx="auto"
//       bg="darkBackground"
//     //   width={{ base: "90%", md: "85%" }}
//       mb={6}
//       p={4}
//     //   borderRadius="12px"
//     //   bg="rgba(28, 32, 40, 1)"
//       // boxShadow="xl"
//     >
//       {/* Heading Section */}
//       <HStack spacing={2} mb={4}>
//         <Heading as="h2" size="lg" fontWeight="600" color="white">
//           Centrum Specials
//         </Heading>
//         <Image src={Stars} alt="Stars" boxSize="28px" />
//       </HStack>
//       <Text
    
//         color="rgba(144, 149, 160, 1)"
//         fontSize="md"
//         fontWeight="300"
//         mb={4}
//       >
//         Top performing baskets
//       </Text>

//       {/* Basket Cards Section */}
//       <Box overflowX="auto" mb={4} >
//         {allBasketsApiLoading ? (
//           <SectionLoader />
//         ) : allBaskets.filter((allBskt) => allBskt.specialBasket).length > 0 ? (
//           <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
//             {allBaskets
//               .filter((allBskt) => allBskt.specialBasket)
//               .map((bskt, index) => (
//                 <Box
//                   key={`spbskt_${index}`}
//                   width={{ base: "85%", md: "80%" }}
//                 //   bg="rgba(38, 42, 51, 1)"
//                   bgGradient="linear(to-r, gray.800, gray.700)"
//                   border="1px solid rgba(86, 94, 108, 1)"
//                   borderRadius="12px"
//                   p={6}
//                   position="relative"
//                   color="white"
//                   transition="transform 0.3s, box-shadow 0.3s"
//                   _hover={{
//                     boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
//                     // transform: "translateY(-8px)",
//                   }}
//                 >
//                   {/* Truncated Title with Tooltip for Full Title */}
//                   <Tooltip label={bskt.title} fontSize="md" hasArrow>
//                     <Heading
//                       as="h3"
//                       size="md"
//                       mb={3}
//                       isTruncated
//                       borderBottom="1px solid #BCC1CA"
//                     >
//                       {truncateTitle(bskt.title)}
//                     </Heading>
//                   </Tooltip>

//                   {/* Description */}
//                   <Text
//                     color="rgba(222, 225, 230, 1)"
//                     fontSize="sm"
//                     mb={8}
//                     noOfLines={3}
//                   >
//                     {bskt.description}
//                   </Text>

//                   {/* Link to Basket */}
//                   <Link to={`/basket/${bskt.basketId}`}>
//                     <Button
//                       position="absolute"
//                       bottom={4} // Positions the button a little above the bottom edge
//                       right={4} // Positions the button slightly away from the right edge
//                       colorScheme="green"
//                       boxShadow={"0 0 4px rgba(29, 215, 91, 0.7)"}
//                       variant="outline"
//                       _hover={{
//                         boxShadow: "0 0 10px rgba(29, 215, 91, 0.7)",
//                         transform: "scale(1.05)",
//                       }}
                      
//                       _active={{
//                         boxShadow: "0 0 15px rgba(29, 215, 91, 1)",
//                         transform: "scale(0.95)",
//                       }}
//                     >
//                       <Icon as={ArrowForwardIcon} w={3} h={4} />
//                     </Button>
//                   </Link>
//                 </Box>
//               ))}
//           </SimpleGrid>
//         ) : (
//           <Box
//             textAlign="center"
//             border="1px solid #565e6c"
//             borderRadius="12px"
//             bg="rgba(38, 42, 51, 1)"
//             p={4}
//             mx="auto"
//           >
//             <Text color="white">No Baskets Available</Text>
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default CentrumSpecials;
