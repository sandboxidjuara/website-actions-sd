import React from "react";
import { Container, Box, Stack, Text, Image } from "@chakra-ui/react";
import TextHeader from "../../component/text-heder-section";
import CustomButton from "../../component/custom-button";
import { listKurikulum } from "../../constant";

const Kurikulum = () => {
  return (
    <Box bg="#F6F8FD">
      <Container maxW="7xl" py={24}>
        <TextHeader text="KURIKULUM" width={{ xs: "148px", md: "188px" }} />
        <Stack flexDir={{ xs: "column", md: "row" }} spacing={0} py={20}>
          {listKurikulum.slice(0, 4).map((el) => (
            <Box
              key={el.id}
              flex={1}
              display="flex"
              flexDir="column"
              alignItems="center"
            >
              <Box
                bg={el.bg}
                borderRadius="full"
                w={{ xs: "130px", md: "150px" }}
                h={{ xs: "130px", md: "150px" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src={el.icon}
                  alt="icon"
                  w={{ xs: "50px", md: "60px" }}
                />
              </Box>
              <Text
                fontSize="24px"
                fontWeight="500"
                color="black"
                my={{ xs: 8, md: 10 }}
              >
                {el.header}
              </Text>
              <Text
                fontSize="18px"
                textAlign="center"
                px={{ xs: "50px", md: "0" }}
                mb={10}
                w={{ xs: "50%", md: "70%" }}
              >
                {el.text}
              </Text>
            </Box>
          ))}
        </Stack>
        <CustomButton
          text="LIHAT SEMUA"
          href="/kurikulum"
          bg="primary.600"
          color="white"
          hoverBg="primary.700"
        />
      </Container>
    </Box>
  );
};

export default Kurikulum;
