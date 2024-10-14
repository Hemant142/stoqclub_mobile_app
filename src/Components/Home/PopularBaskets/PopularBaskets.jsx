import React from 'react';
import { Box, Grid, Heading, Image, Text } from '@chakra-ui/react';
import SectionLoader from '../../Loader/SectionLoader';
import { Link } from "react-router-dom";

const PopularBaskets = ({ allBasketsApiLoading, allBaskets }) => {
  console.log(allBaskets,"allBaskets")
  return (
    <Box width="100%" mx="auto" mt="5%"alignItems={"left"} p={2} >
      <Heading fontSize="20px" fontWeight="500" mb="1.4rem" textAlign="left" fontFamily={"Epilogue"}>
        Most Trending Baskets
      </Heading>

      {allBasketsApiLoading ? (
        <SectionLoader />
      ) : (
        <Grid
          gap={4}
          // Set custom grid layout for different screen widths
          templateColumns={{
            base: 'repeat(2, 1fr)', // For smaller mobile screens (iPhone 5/SE)
            sm: 'repeat(3, 1fr)',  // For larger mobile screens (up to 480px)
            md: 'repeat(3, 1fr)',  // For tablet screens and above
          }}
          // Override breakpoints for custom devices like iPhone 5/SE
          sx={{
            '@media screen and (max-width: 320px)': {
              gridTemplateColumns: 'repeat(2, 1fr)', // Force 2 columns on iPhone 5/SE
            },
            '@media screen and (min-width: 321px) and (max-width: 480px)': {
              gridTemplateColumns: 'repeat(3, 1fr)', // 3 columns for larger phones
            },
          }}
        >
          {allBaskets.map((bskt, index) => (
            <Link
              key={`all_basket_${index}`}
              to={`/basket/${bskt.basketId}`}
              style={{ textDecoration: 'none' }}
            >
              <Box
                width="95px"
                height="112px"
                bg="rgba(38, 42, 51, 1)"
                textAlign="center"
                borderRadius="8px"
                boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
                border="1px solid rgba(86, 94, 108, 1)"
                color="white"
                fontFamily={"Epilogue"}
                p={2}
              >
                {/* Basket Icon */}
                <Image
                  src={bskt.iconUrl}
                  alt={bskt.title}
                  width="32px"
                  height="32px"
                  mx="auto"
                  mt={3}
                />

                {/* Basket Details */}
                
                <Box mt={3}>
                  <Text
                  fontFamily={"Epilogue"}
                    fontSize="14px"
                   fontWeight="normal"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    textAlign="center"
                  >
                    {bskt.title}
                  </Text>

                  {/* Returns Percentage */}
                  <Text
                  fontFamily={"Epilogue"}
                    fontSize="sm"
                   fontWeight="normal"
                    color={
                      bskt.returnsFlag === 'green'
                        ? '#1DD75B'
                        : 'red.400'
                    }
                    mt={2}
                  >
                    {bskt.totalReturns}%
                  </Text>
                </Box>
              
              </Box>
            </Link>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default PopularBaskets;


// import React, { useEffect, useRef, useState } from 'react';
// import { Box, Grid, Heading, Image, Link, Text } from '@chakra-ui/react';
// import { motion } from 'framer-motion'; 
// import SectionLoader from '../../Loader/SectionLoader';

// const PopularBaskets = ({ allBasketsApiLoading, allBaskets }) => {
//   const [inView, setInView] = useState(false);
//   const observerRef = useRef(null);

//   // Motion variants for animation
//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   // Intersection observer callback
//   const handleObserver = (entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         setInView(true);
//         observerRef.current.disconnect(); // Stop observing after the cards are in view
//       }
//     });
//   };

//   useEffect(() => {
//     observerRef.current = new IntersectionObserver(handleObserver, {
//       threshold: 0.1, // Adjust this value to control when the callback is fired
//     });

//     const currentRef = observerRef.current;
//     const target = document.querySelector('#popular-baskets');
//     if (target) {
//       currentRef.observe(target); // Start observing the target
//     }

//     return () => {
//       if (target) {
//         currentRef.unobserve(target); // Clean up the observer on unmount
//       }
//     };
//   }, []);

//   return (
//     <Box mx="auto" mt="5%" id="popular-baskets" bg="darkBackground"  p={4}>
//       <Heading fontSize="20px" fontWeight="600" mb="1.4rem" textAlign="left">
//         Most Popular Baskets
//       </Heading>

//       {allBasketsApiLoading ? (
//         <SectionLoader />
//       ) : (
//         <Grid
//           gap={4}
//           templateColumns={{
//             base: 'repeat(2, 1fr)',
//             sm: 'repeat(3, 1fr)',  
//             md: 'repeat(5, 1fr)',
//           }}
//           sx={{
//             '@media screen and (max-width: 320px)': {
//               gridTemplateColumns: 'repeat(2, 1fr)', 
//             },
//             '@media screen and (min-width: 321px) and (max-width: 480px)': {
//               gridTemplateColumns: 'repeat(3, 1fr)', 
//             },
//           }}
//         >
//           {allBaskets.map((bskt, index) => (
//             <motion.div
//               key={`all_basket_${index}`}
//               variants={cardVariants}
//               initial="hidden"
//               animate={inView ? "visible" : "hidden"}
//               transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered effect
//             >
//               <Link
//                 to={`/basket/${bskt.basketId}`}
//                 style={{ textDecoration: 'none' }}
//               >
//                 <Box
//                   width="95px"
//                   height="120px"
//                   bgGradient="linear(to-r, gray.800, gray.700)"
//                   textAlign="center"
//                   borderRadius="8px"
//                   boxShadow="0 0 6px rgb(255, 255, 255);, 0 10px 20px rgba(0, 0, 0, 0.2)"
//                   border="1px solid rgba(86, 94, 108, 1)"
//                   color="white"
//                   p={2}
//                   transition="transform 0.3s ease, box-shadow 0.3s ease"
//                   _hover={{
//                     transform: 'scale(1.05)',
//                     boxShadow: '0 10px 12px rgb(252, 250, 250), 0 16px 32px rgba(0, 0, 0, 0.2)',
//                   }}
//                 >
//                   {/* Basket Icon */}
//                   <Image
//                     src={bskt.iconUrl}
//                     alt={bskt.title}
//                     width="36px"
//                     height="36px"
//                     mx="auto"
//                     mt={3}
//                   />

//                   {/* Basket Details */}
//                   <Box mt={3}>
//                     <Text
//                       fontSize="14px"
//                       fontWeight="700"
//                       whiteSpace="nowrap"
//                       overflow="hidden"
//                       textOverflow="ellipsis"
//                       textAlign="center"
//                     >
//                       {bskt.title}
//                     </Text>

//                     {/* Returns Percentage */}
//                     <Text
//                       fontSize="sm"
//                       fontWeight="bold"
//                       color={bskt.returnsFlag === 'green' ? 'green.400' : 'red.400'}
//                       mt={2}
//                     >
//                       {bskt.totalReturns}%
//                     </Text>
//                   </Box>
//                 </Box>
//               </Link>
//             </motion.div>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default PopularBaskets;



