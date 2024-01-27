import { Button, FormLabel, Heading, Input } from "@chakra-ui/react";
import { FormEvent } from "react";

interface Props {
	email: string;
	pass: string;
	setEmail: (e: string) => void;
	setPass: (e: string) => void;
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
function Form({ email, pass, handleSubmit, setEmail, setPass }: Props) {
	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<Heading>Login to Notebook...</Heading>
			<FormLabel mt={4}>Email</FormLabel>
			<Input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<FormLabel mt={4}>Password</FormLabel>
			<Input
				type="password"
				value={pass}
				onChange={(e) => setPass(e.target.value)}
			/>
			<Button mt={4} colorScheme="blue" type="submit" w="100%">
				Submit
			</Button>
		</form>
	);
}

export default Form;
