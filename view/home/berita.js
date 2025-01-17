import { useEffect, useState } from "react";
import {
  Box,
  Container,
  InputGroup,
  Input,
  Text,
  Stack,
  Image,
  InputRightElement,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Search2Icon } from "@chakra-ui/icons";
import { Row, Col } from "react-grid-system";
import { useDebounce } from "use-debounce";
import CustomButton from "../../component/custom-button";
import CardBerita from "../../view/berita/card-berita";
import TextHeader from "../../component/text-heder-section";
import axios from "axios";
import ReactPlayer from "react-player";

const Berita = ({ listKategoriBerita, listBerita }) => {
  const { register, watch } = useForm();
  const [data, setData] = useState(null);
  const toast = useToast();
  const [dataSearch, setDataSearch] = useState("");
  const router = useRouter();
  const watchSearch = watch("search", null);
  const [idKategori, setIdKategori] = useState(null);
  const [debonceSearch] = useDebounce(watchSearch, 1000);

  useEffect(() => {
    if (typeof idKategori === "number") {
      axios({
        method: "get",
        url: `https://actions-api-sd.sandboxindonesia.id/api/kategori-berita/${idKategori}`,
        headers: {
          Accept: "application/json",
        },
      }).then((res) => setData(res.data.data.berita));
    }
  }, [idKategori]);

  useEffect(() => {
    if (debonceSearch) {
      setIdKategori(null);
      axios({
        method: "get",
        url: `https://actions-api-sd.sandboxindonesia.id/api/berita/?search=${debonceSearch}`,
        headers: {
          Accept: "application/json",
        },
      })
        .then((res) => setDataSearch(res.data.data))
        .catch((err) =>
          toast({
            description: `Data tidak di temukan !`,
            status: "warning",
            duration: 9000,
            position: "top",
            isClosable: true,
          })
        );
    }
  }, [debonceSearch]);

  const dataBerita =
    idKategori !== null ? data : debonceSearch ? dataSearch : listBerita;

  return (
    <Box as="section" px={{ xs: 5, md: 0 }}>
      {/* SUBSTRACT BACKGROUND */}

      <Box id="berita">
        <TextHeader textLine text="BERITA" width="78px" />
      </Box>

      {/* BERITA */}

      <Box mt={20} maxW="7xl" as={Container}>
        <Box as={Row}>
          <Box sm={12} md={8} lg={8} as={Col}>
            {dataBerita?.length === 0 ? (
              <Text
                fontSize={"24px"}
                textAlign={"center"}
                fontWeight={600}
                color="secondary.700"
              >
                Oops... Data Tidak di Temukan
              </Text>
            ) : (
              dataBerita
                ?.slice(0, 3)
                .map((el, idx) => <CardBerita {...el} idx={idx} key={el.id} />)
            )}
          </Box>

          <Box sm={12} md={8} lg={4} as={Col}>
            <Box color="secondary.600">
              <InputGroup>
                <Input
                  {...register("search")}
                  borderRadius="10px"
                  placeholder="Cari Berita"
                />
                <InputRightElement>
                  <Search2Icon color="green.500" />
                </InputRightElement>
              </InputGroup>
              <Box
                borderRadius="10px"
                borderWidth="1px"
                lineHeight="35px"
                px={5}
                py={5}
                mt={5}
              >
                <Text fontSize="1.125rem" fontWeight="600">
                  Kategori
                </Text>
                {listKategoriBerita?.map((el) => (
                  <Box
                    key={el.id}
                    display="flex"
                    flexDir="row"
                    justifyContent="space-between"
                    fontWeight="300"
                    onClick={() => setIdKategori(el?.id)}
                    cursor={"pointer"}
                    _hover={{ color: "info.500" }}
                  >
                    <Text fontWeight="300">{el.nama}</Text>
                    <Text>{`( ${el.berita_count} )`}</Text>
                  </Box>
                ))}
              </Box>
              <Box
                borderRadius="10px"
                borderWidth="1px"
                lineHeight="35px"
                p={5}
                mt={5}
                height="100%"
                as={Tabs}
                variant="rounded"
              >
                <Stack
                  direction="row"
                  spacing={10}
                  display="flex"
                  align="center"
                  justifyContent="center"
                  pb={3}
                  borderBottomWidth="3px"
                >
                  <TabList>
                    <Tab _focus={{ boxShadow: "none" }} px={8}>
                      <Image
                        src="/assets/icon/icon-ig.png"
                        alt="icon-sosmed"
                        w="10"
                        _hover={{ w: "12", transition: "0.2s" }}
                      />
                    </Tab>
                    <Tab
                      _focus={{ boxShadow: "none" }}
                      px={8}
                      borderRightWidth="3px"
                      borderLeftWidth="3px"
                    >
                      <Image
                        _hover={{ w: "12", transition: "0.2s" }}
                        src="/assets/icon/icon-fb.png"
                        alt="icon-sosmed"
                        w="10"
                      />
                    </Tab>
                    <Tab _focus={{ boxShadow: "none" }} px={8}>
                      <Image
                        _hover={{ w: "14", transition: "0.2s" }}
                        src="/assets/icon/icon-yt.png"
                        alt="icon-sosmed"
                        w="12"
                      />
                    </Tab>
                  </TabList>
                </Stack>
                <Box py={2}>
                  <TabPanels>
                    <TabPanel>
                      <iframe
                        src="https://www.instagram.com/p/CWpWLz9v5CX/embed"
                        width="100%"
                        height="450"
                        frameBorder="0"
                        allowtransparency="true"
                        allowFullScreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      ></iframe>
                    </TabPanel>
                    <TabPanel>
                      <iframe
                        src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fsdmuhammadiyah.klatenutara%2Fposts%2F3642347805829409&show_text=true&width=500"
                        width="100%"
                        height="699"
                        scrolling="no"
                        frameborder="0"
                        allowfullscreen="true"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      ></iframe>
                    </TabPanel>
                    <TabPanel>
                      <ReactPlayer
                        width="100%"
                        height="450"
                        url="https://www.youtube.com/watch?v=hfPrVBAT6Vc"
                      />
                    </TabPanel>
                  </TabPanels>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <CustomButton
          text="LIHAT SEMUA"
          href="/lihat-semua-berita"
          bg="primary.600"
          color="white"
          hoverBg="primary.700"
        />
      </Box>
    </Box>
  );
};

export default Berita;
