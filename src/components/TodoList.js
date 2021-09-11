import React from 'react';
import {
	VStack,
	HStack,
	Stack,
	Text,
	IconButton,
	StackDivider,
	Spacer,
	Badge,
	useColorMode,
	Divider,
	Box
} from '@chakra-ui/react';
import { FaTrash, FaEdit } from 'react-icons/fa';

function TodoList({ todos, handelRemoveTodo, handelEditTodo }) {
	const { colorMode } = useColorMode();

	if (!todos.length) {
		return (
			<Badge p="4" colorScheme="green" borderRadius="lg">
				Nothing to do !!
			</Badge>
		);
	}

	return (
		<VStack p="2" w="100%" alignItems="stretch">
			{todos.map(function(todo) {
				return (
					<Stack
						key={todo.id}
						p="2"
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
						<Divider borderColor="gray.400" />
						<Text>{todo.detail}</Text>
						<Spacer />
						<HStack textAlign="right" borderRadius="lg" padding="1" w="100%" justifyContent="space-between">
							<Badge colorScheme={todo.priority ? 'pink' : 'gray'} borderRadius="lg">
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
