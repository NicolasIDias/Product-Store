import { Container, SimpleGrid, VStack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  //console.log(products)

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack>
        <Text
          fontWeight={"bold"}
          fontSize={30}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          Current Products 🚀
        </Text>
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={'full'}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>
        <Text
          fontWeight={"bold"}
          fontSize={"xl"}
          textAlign={"center"}
          color={"gray.500"}
        >
          No products found 😢{" "}
          <Link to={"/create"}>
            <Text
              as={"span"}
              _hover={{ textDecoration: "underline" }}
              color={"blue.700"}
            >
              Create a product
            </Text>
          </Link>
        </Text>
      </VStack>
    </Container>
  );
};

export default HomePage;
