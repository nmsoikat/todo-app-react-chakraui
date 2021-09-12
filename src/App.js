import './App.css';
import { useState, useEffect, createContext } from 'react';
import { VStack, IconButton, Heading, useColorMode } from '@chakra-ui/react';
import { FaCloudSun, FaMoon } from 'react-icons/fa';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

export const EditTodo = createContext();

function App() {
	// chakraui color mode
	const { colorMode, toggleColorMode } = useColorMode();

	//define todos array and initial data form local storage.
	const [ todos, setTodos ] = useState(() => JSON.parse(localStorage.getItem('todos')) || []);
	// edit todo
	const [ editTodo, setEditTodo ] = useState({});

	// Add
	const handelAddTodo = (todo) => {
		if (todo.priority) {
			setTodos([ todo, ...todos ]);
		} else {
			setTodos([ ...todos, todo ]);
		}
	};

	// Update
	const handelUpdateTodo = (data) => {
		const index = todos.findIndex((todo) => todo.id === data.id);
		const existTodos = [ ...todos ];

		//if priority no change
		if (existTodos[index].priority === data.priority) {
			existTodos[index] = data; // update
		} else {
			existTodos[index] = data; // update
			existTodos.sort((a, b) => b.priority - a.priority); // high priority first
		}

		setTodos(existTodos); // update state
		setEditTodo({}); // reset
	};

	// Remove
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
		<VStack p={4} mx="auto" maxW={{ base: '90vw', sm: '80vw', md: '70vw', lg: '600px' }}>
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
				To-Do Application
			</Heading>

			<EditTodo.Provider value={[ editTodo, setEditTodo ]}>
				<AddTodo handelAddTodo={handelAddTodo} handelUpdateTodo={handelUpdateTodo} />

				<TodoList todos={todos} handelRemoveTodo={handelRemoveTodo} />
			</EditTodo.Provider>
		</VStack>
	);
}

export default App;
