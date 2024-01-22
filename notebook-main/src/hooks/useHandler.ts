import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { TextAreaEvent } from "./useText";

export interface Emoji {
	emoji: string;
}

const useHandler = () => {
	const toast = useToast();
	const [title, setTitle] = useState(
		localStorage.getItem("title") || "Untitled Page",
	);
	const [readOnly, setReadOnly] = useState(false);

	const onTitleChange = (e: TextAreaEvent) => {
		setTitle(e.target.value);
		localStorage.setItem("title", e.target.value);
	};

	const handleEditButton = () => {
		setReadOnly((prev) => !prev);
		if (!readOnly) {
			toast({
				title: "Saved Successfully",
				position: "bottom",
				status: "success",
				isClosable: true,
				colorScheme: "blue",
			});
		}
	};

	return {
		title,
		readOnly,
		onTitleChange,
		handleEditButton,
	};
};

export default useHandler;
