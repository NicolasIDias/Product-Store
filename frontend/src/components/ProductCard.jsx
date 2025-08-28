import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useToast,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";
import { FaTrashCan, FaPenToSquare } from "react-icons/fa6";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.800", "gray.100");
  const bg = useColorModeValue("white", "gray.600");

  const { isOpen, onClose, onOpen } = useDisclosure();

  const toast = useToast();

  const { deleteProduct, updateProduct } = useProductStore();

  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleProductUpdate = async () =>{
    await updateProduct(product.id, updatedProduct)
    onClose()
    toast({
      title: "uaf",
      description: "ainf",
      duration: 3000,
      colorScheme: 'success'
    })
  }

  const handleProductDeletion = async (productId) => {
    const response = await deleteProduct(productId);
    const { success, message } = response;
    toast({
      title: success ? "Product Deleted" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      rounded={"20px"}
      shadow={"lg"}
      overflow="hidden"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.priceInCents / 100}
        </Text>
        <HStack>
          <IconButton
            icon={<FaPenToSquare />}
            onClick={onOpen}
            colorScheme="blue"
          />
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit product</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  name="name"
                  placeholder="Product name"
                  value={updatedProduct.name}
                  onChange={(event) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      name: event.target.value,
                    })
                  }
                />

                <Input
                  name="price"
                  type="number"
                  placeholder="Price in cents"
                  value={updatedProduct.priceInCents}
                  onChange={(event) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      priceInCents: event.target.value,
                    })
                  }
                />

                <Input
                  name="image"
                placeholder="Image url"
                  value={updatedProduct.image}
                  onChange={(event) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      image: event.target.value,
                    })
                  }
                />
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={() => handleProductUpdate()}>
                  Apply Changes
                </Button>
                <Button variant="ghost" onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <IconButton
            icon={<FaTrashCan />}
            onClick={() => handleProductDeletion(product.id)}
            colorScheme="red"
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
