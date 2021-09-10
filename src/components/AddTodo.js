import { HStack, Input, Button, useToast } from "@chakra-ui/react";
import React from "react";
import { useState } from "react/cjs/react.development";
import { nanoid } from "nanoid";

function AddTodo({ addTodo }) {
  const [content, setContent] = useState("");
  const toast = useToast();

  const onSubmit = (e) => {
    e.preventDefault();

    if (!content) {
      toast({
        position: "bottom",
        title: "No task",
        status: "error",
        duration: 1500,
        isClosable: true,
      });

      return;
    }

    const todo = {
      id: nanoid(),
      body: content,
    };

    addTodo(todo);

    setContent("");
  };

  return (
    <form onSubmit={onSubmit}>
      <HStack my="4">
        <Input
          type="text"
          variant="filled"
          placeholder="Put your task here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit" px="8" colorScheme="green">
          Add Task
        </Button>
      </HStack>
    </form>
  );
}

export default AddTodo;
