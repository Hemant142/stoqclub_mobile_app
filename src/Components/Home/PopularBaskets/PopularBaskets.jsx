import React from "react";
import { Box, Grid, Heading, Image, Text } from "@chakra-ui/react";
import SectionLoader from "../../Loader/SectionLoader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PopularBaskets = ({ allBasketsApiLoading, allBaskets }) => {
  let allSymbols = useSelector((store) => store.symbolReducer.symbols);


  function calculateBasketReturns(basket, allSymbols) {
    let totalCmpValue = 0; // Sum of cmp * quantity
    let totalCurrentPriceValue = 0; // Sum of currentPrice * quantity

    // Iterate over each instrument in the basket
    basket.instrumentList.forEach((instrument) => {
      const { securityId, quantity, currentPrice } = instrument;

      // Find the corresponding cmp from the allSymbols data
      const symbol = allSymbols.find(
        (symbol) => symbol.securityId === securityId
      );
      const cmp = symbol ? symbol.cmp : 0; // Assuming 0 if cmp is not found

      // Calculate total cmp value and total current price value
      totalCmpValue += cmp * quantity;
      totalCurrentPriceValue += currentPrice * quantity;
    });

    // Apply the basket returns formula
    const basketReturns =
      ((totalCmpValue - totalCurrentPriceValue) / totalCurrentPriceValue) * 100 

    return basketReturns.toFixed(2);
  }

  return (
    <Box width="100%" mx="auto" mt="5%" alignItems={"left"} p={2}>
      <Heading
        fontSize="20px"
        fontWeight="500"
        mb="1.4rem"
        textAlign="left"
        fontFamily={"Helvetica"}
      >
        Most Trending Baskets
      </Heading>

      {allBasketsApiLoading ? (
        <SectionLoader />
      ) : (
        <Grid
          gap={4}
          // Set custom grid layout for different screen widths
          templateColumns={{
            base: "repeat(2, 1fr)", // For smaller mobile screens (iPhone 5/SE)
            sm: "repeat(3, 1fr)", // For larger mobile screens (up to 480px)
            md: "repeat(3, 1fr)", // For tablet screens and above
          }}
          // Override breakpoints for custom devices like iPhone 5/SE
          sx={{
            "@media screen and (max-width: 320px)": {
              gridTemplateColumns: "repeat(2, 1fr)", // Force 2 columns on iPhone 5/SE
            },
            "@media screen and (min-width: 321px) and (max-width: 480px)": {
              gridTemplateColumns: "repeat(3, 1fr)", // 3 columns for larger phones
            },
          }}
        >
          {allBaskets.map((bskt, index) => (
            <Link
              key={`all_basket_${index}`}
              to={`/basket/${bskt._id}`}
              style={{ textDecoration: "none" }}
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
                  src={bskt.basketSymbolURL}
                  alt={bskt.title}
                  width="32px"
                  height="32px"
                  mx="auto"
                  mt={3}
                />

                {/* Basket Details */}

                <Box mt={3}>
                  <Text
                     fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
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
                    fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
                    fontSize="sm"
                    fontWeight="normal"
                    color={
                      calculateBasketReturns(bskt, allSymbols) > 0
                        ? "#1DD75B" // Green for positive returns
                        : "red.400" // Red for negative or zero returns
                    }
                    mt={2}
                  >
                    {calculateBasketReturns(bskt, allSymbols)}%{" "}
                    {/* Display basket returns with 2 decimal places */}
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
