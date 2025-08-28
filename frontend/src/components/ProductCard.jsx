import { Box, Heading, HStack, IconButton, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { FaTrashCan, FaPenToSquare } from "react-icons/fa6";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.800", "gray.100");
    const bg = useColorModeValue("white", "gray.600")

  return (
    <Box
      rounded={"20px"}
      shadow={"lg"}
      overflow='hidden'
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
            <IconButton icon={<FaPenToSquare />} colorScheme="blue"/>
            <IconButton icon={<FaTrashCan />} colorScheme="red"/>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
