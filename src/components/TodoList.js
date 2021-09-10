import React from "react";
import {
  VStack,
  HStack,
  Text,
  IconButton,
  StackDivider,
  Spacer,
  Badge,
  useColorMode,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

function TodoList({ todos, removeTodo }) {
  const { colorMode } = useColorMode();
  if (!todos.length) {
    return (
      <Badge p="4" colorScheme="green" borderRadius="lg">
        Nothing to do !!
      </Badge>
    );
  }

  return (
    <VStack
      // divider={<StackDivider />}
      borderWidth="2px"
      borderColor="gray.200"
      p="2"
      borderRadius="lg"
      w="100%"
      maxW={{ base: "90vw", sm: "70vw", lg: "50vw", xl: "40vw" }}
      alignItems="stretch"
    >
      {todos.map(function (todo) {
        return (
          <HStack
            key={todo.id}
            bgColor={colorMode === "light" ? "gray.200" : "gray.500"}
            p="2"
            borderRadius="lg"
          >
            <Text>{todo.body}</Text>
            <Spacer />
            <IconButton
              icon={<FaTrash />}
              onClick={() => removeTodo(todo.id)}
            />
          </HStack>
        );
      })}
    </VStack>
  );
}

export default TodoList;
