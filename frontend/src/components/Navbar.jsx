import {
  IconButton,
  Container,
  Flex,
  HStack,
  Text,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaSquarePlus, FaSun, FaMoon } from "react-icons/fa6";

const Navbar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: 22, sm: 28 }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgClip={"text"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <HStack>
          <Link to={"/create"}>
            <IconButton>
              <FaSquarePlus />
            </IconButton>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <FaMoon /> : <FaSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
