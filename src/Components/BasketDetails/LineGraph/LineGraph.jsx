import React from "react";
import { Box, Divider, Text } from "@chakra-ui/react";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const LineGraph = ({ lineChartData, underlyingIndexLineChart, underlyingIndex }) => {
  return (
    <Box
      className="chart"
    
      mb={4}
      p={4} // Reduced padding for better fit on mobile
      textAlign="center"
    >
      <ResponsiveContainer height={150} width="100%">
        <LineChart
          data={lineChartData.map((d, i) => ({
            month: d.month,
            basketValue: d.basketValue,
            underlyingValue: underlyingIndexLineChart[i].underlyingValue, // Using the index to align data
          }))}
          margin={{
            top: 5,
            right: 20,
            left: 10,
            bottom: 25,
          }}
        >
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10 }} // Smaller font size for mobile
            interval={0} // Show all ticks
          />
          <Tooltip />
          
          {/* Line for Basket */}
          <Line
            type="monotone"
            dataKey="basketValue"
            stroke="#1DD75B"
            strokeWidth={3}
            name="Basket"
          />
          
          {/* Line for Underlying Index */}
          <Line
            type="monotone"
            dataKey="underlyingValue"
            stroke="#ED7D2D"
            strokeWidth={3}
            name={underlyingIndex}
          />
        </LineChart>
      </ResponsiveContainer>

      <Text
        className="line_inv_text"
        color={"#A7ADB7"}
        fontSize="14px"
        fontWeight="300"
        lineHeight="22px"
        fontFamily={"Helvetica"}
        textAlign="left"
        mb={4}
      >
        In the last 6 months, the <span style={{ color: "#1DD75B" }}>Basket</span>{" "}
        outperformed the <span style={{ color: "#ED7D2D" }}>{underlyingIndex}</span>{" "}
        Index by <span style={{ color: "#1DD75B" }}>8%</span>
      </Text>

      <Divider
        ml={2}
        mr={2}
        m={"auto"}
        width="100%" // Set to 100% for mobile responsiveness
        border="1px solid #BCC1CA"
        position="relative"
      />
    </Box>
  );
};

export default LineGraph;
