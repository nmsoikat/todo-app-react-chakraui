import { VStack, HStack, Stack, Text, IconButton, Badge, Divider } from '@chakra-ui/react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useContext } from 'react';
import { EditTodo } from '../App';

function TodoList({ todos, handelRemoveTodo }) {
	const [ , setEditTodo ] = useContext(EditTodo); // global state

	// get data for edit
	const handelEditTodo = (id) => {
		setEditTodo(todos.find((todo) => todo.id === id) || {});
	};

	if (!todos.length) {
		return (
			<Badge p="4" colorScheme="green" borderRadius="lg">
				Nothing to do!!
			</Badge>
		);
	}

	return (
		<VStack p="1" w="100%" alignItems="stretch">
			{todos.map(function(todo) {
				return (
					<Stack
						key={todo.id}
						p="1"
						borderRadius="lg"
						border="1px"
						borderColor={todo.priority ? 'pink.300' : 'gray.200'}
					>
						<Text
							as="h3"
							fontWeight="bold"
							textTransform="capitalize"
							color={todo.priority ? 'pink.500' : ''}
						>
							{todo.title}
						</Text>
						<Divider marginTop="4px !important" borderColor="gray.400" />
						<Text marginTop="4px !important">{todo.detail}</Text>
						<HStack
							marginTop="0px !important"
							textAlign="right"
							borderRadius="lg"
							padding="1"
							w="100%"
							justifyContent="space-between"
						>
							<Badge colorScheme={todo.priority ? 'pink' : 'gray'} px="1" borderRadius="md">
								{todo.priority ? 'High' : 'Normal'}
							</Badge>
							<HStack spacing="1">
								<IconButton
									color="blue.500"
									icon={<FaEdit />}
									onClick={() => handelEditTodo(todo.id)}
									size="sm"
								/>
								<IconButton
									color="red.500"
									icon={<FaTrash />}
									onClick={() => handelRemoveTodo(todo.id)}
									size="sm"
								/>
							</HStack>
						</HStack>
					</Stack>
				);
			})}
		</VStack>
	);
}

export default TodoList;
