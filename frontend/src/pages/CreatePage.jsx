import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    priceInCents: "",
    image: "",
  });

  const { createProduct } = useProductStore();
  const toast = useToast();

  const handleAddProduct = async () => {
    const response = await createProduct(newProduct);
    const { success, message } = response;
    toast({
      title: success ? "Product Created" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 5000,
      isClosable: true,
    });
    setNewProduct({ name: "", priceInCents: "", image: "" });
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} mb={8} textAlign={"center"}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "grey.800")}
          p={6}
          rounded={"20px"}
        >
          <VStack>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(event) =>
                setNewProduct({ ...newProduct, name: event.target.value })
              }
            />

            <Input
              placeholder="Product Price IN CENTS"
              type="number"
              value={newProduct.priceInCents}
              onChange={(event) => {
                setNewProduct({
                  ...newProduct,
                  priceInCents: event.target.value,
                });
              }}
            />

            <Input
              placeholder="Product Image URL"
              value={newProduct.image}
              onChange={(event) => {
                setNewProduct({ ...newProduct, image: event.target.value });
              }}
            />
            <Button colorScheme="blue" onClick={handleAddProduct}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
