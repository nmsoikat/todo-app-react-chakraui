import './App.css';
import { useState, useEffect } from 'react';
import { VStack, IconButton, Heading, useColorMode, Box } from '@chakra-ui/react';
import { FaCloudSun, FaMoon } from 'react-icons/fa';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

function App() {
	// const initialTodos = [
	//   { id: 1, body: "One" },
	//   { id: 2, body: "Two" },
	// ];

	// chakraui color mode
	const { colorMode, toggleColorMode } = useColorMode();

	//define todos array and initial data form local storage.
	const [ todos, setTodos ] = useState(() => JSON.parse(localStorage.getItem('todos')) || []);
	const [ editTodo, setEditTodo ] = useState({});

	// add data to state
	const addTodo = (todo) => {
		if (todo.priority) {
			setTodos([ todo, ...todos ]);
		} else {
			setTodos([ ...todos, todo ]);
		}
	};

	// get data for edit
	const handelEditTodo = (id) => {
		let todo = {
			title: '',
			detail: '',
			priority: false
		};

		setEditTodo(todos.find((todo) => todo.id === id) || todo);
	};

	// update from state
	const updateTodo = (data) => {
		const index = todos.findIndex((todo) => todo.id === data.id);
		const newTodos = [ ...todos ];
		newTodos[index] = data;
		setTodos(newTodos);

		setEditTodo({});
	};

	// remove from state
	const handelRemoveTodo = (id) => {
		const newTodos = todos.filter((todo) => {
			return todo.id !== id;
		});

		setTodos(newTodos);
	};

	// set data to local storage depend on todos changes.
	useEffect(
		() => {
			localStorage.setItem('todos', JSON.stringify(todos));
		},
		[ todos ]
	);

	return (
		<VStack p={4} mx="auto" maxW={{ base: '90vw', sm: '70vw', lg: '40vw', xl: '30vw' }}>
			<IconButton
				icon={colorMode === 'light' ? <FaCloudSun /> : <FaMoon />}
				alignSelf="flex-end"
				size="lg"
				isRound
				onClick={toggleColorMode}
			/>
			<Heading
				as="h1"
				size="xl"
				fontWeight="extrabold"
				bgGradient="linear(to-r, blue.500, blue.300, green.500)"
				bgClip="text"
				marginBottom="16px !important"
			>
				Todo Application
			</Heading>

			<AddTodo addTodo={addTodo} editTodo={editTodo} updateTodo={updateTodo} />

			<TodoList todos={todos} handelEditTodo={handelEditTodo} handelRemoveTodo={handelRemoveTodo} />
		</VStack>
	);
}

export default App;
