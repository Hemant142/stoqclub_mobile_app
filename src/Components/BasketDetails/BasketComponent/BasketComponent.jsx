import { Box } from '@chakra-ui/react';
import BasketHeader from '../BasketHeader/BasketHeader';
import CompanyIntro from '../CompanyIntro/CompanyIntro';
import BackArrow from '../BackArrow/BackArrow';


const BasketComponent = ({ basketData }) => {
  return (
  
        
        <Box
        //  paddingLeft={2}
        //  paddingRight={2}
         pl={4}
         pr={4}
         pb={4}
       
         marginLeft="20px"
         borderRadius="10px"

          mt="0"
         margin="0 auto"
         width="100%"
        >
       
      <BasketHeader basketData={basketData} />
      <CompanyIntro description={basketData.description} />
      </Box>
 
  );
};

export default BasketComponent;
