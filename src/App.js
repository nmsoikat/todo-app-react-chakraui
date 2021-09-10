import "./App.css";
import { useState, useEffect } from "react";
import { VStack, IconButton, Heading, useColorMode } from "@chakra-ui/react";
import { FaCloudSun, FaMoon } from "react-icons/fa";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  // const initialTodos = [
  //   { id: 1, body: "One" },
  //   { id: 2, body: "Two" },
  // ];

  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem("todos")) || []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(newTodos);
  };

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  return (
    <VStack p={4}>
      <IconButton
        icon={colorMode === "light" ? <FaCloudSun /> : <FaMoon />}
        alignSelf="flex-end"
        size="lg"
        isRound
        onClick={toggleColorMode}
      />
      <Heading
        size="xl"
        fontWeight="extrabold"
        bgGradient="linear(to-r, blue.500, blue.300, green.500)"
        bgClip="text"
      >
        Todo Application
      </Heading>

      <AddTodo addTodo={addTodo} />

      <TodoList todos={todos} removeTodo={removeTodo} />
    </VStack>
  );
}

export default App;
