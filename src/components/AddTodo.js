import { VStack, HStack, Input, Button, useToast, Textarea, Box, useColorMode, Checkbox } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { EditTodo } from '../App';

function AddTodo({ handelAddTodo, handelUpdateTodo }) {
	// global state
	const [ editTodo, setEditTodo ] = useContext(EditTodo);

	// all state
	const [ title, setTitle ] = useState();
	const [ detail, setDetail ] = useState();
	const [ priority, setPriority ] = useState();

	//chakra ui
	const { colorMode } = useColorMode();
	const toast = useToast();

	// edit data
	useEffect(
		() => {
			setTitle(editTodo.title);
			setDetail(editTodo.detail);
			setPriority(editTodo.priority);
		},
		[ editTodo ]
	);

	// Form submit
	const onSubmit = (e) => {
		e.preventDefault();

		// validation
		if (!title) {
			toast({
				position: 'bottom',
				title: 'No task',
				status: 'error',
				duration: 1500,
				isClosable: true
			});

			return;
		}

		// create todo
		const todo = {
			id: !Object.keys(editTodo).length ? nanoid() : editTodo.id,
			title,
			detail,
			priority
		};

		// add or update
		if (!Object.keys(editTodo).length) {
			handelAddTodo(todo);
		} else {
			handelUpdateTodo(todo);
		}

		// reset
		setTitle('');
		setDetail('');
		setPriority(false);
	};

	return (
		<Box
			p="4"
			marginBottom="16px !important"
			w="100%"
			borderRadius="xl"
			boxShadow="md"
			border="2px"
			borderColor={colorMode === 'light' ? 'gray.100' : 'gray.600'}
		>
			<form onSubmit={onSubmit}>
				<VStack my="4">
					<Input
						type="text"
						variant="filled"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<Textarea
						variant="filled"
						onChange={(e) => setDetail(e.target.value)}
						placeholder="Task description"
						value={detail}
					/>
					<HStack w="100%" justifyContent="space-between">
						<Checkbox
							color="pink.400"
							colorScheme="pink"
							fontWeight="bold"
							isChecked={priority || false}
							onChange={(e) => setPriority(e.target.checked)}
						>
							High Priority
						</Checkbox>
						<Button
							type="submit"
							size="sm"
							colorScheme={!Object.keys(editTodo).length ? 'blue' : 'orange'}
							alignSelf="flex-end"
						>
							{!Object.keys(editTodo).length ? 'Add Task' : 'Update Task'}
						</Button>
					</HStack>
				</VStack>
			</form>
		</Box>
	);
}

export default AddTodo;
