import { useState } from "react";
import { TextAreaEvent } from "./useText";

const useDescription = () => {
	const [description, setDescription] = useState(
		localStorage.getItem("description") || "",
	);
	const handleDescription = (e: TextAreaEvent) => {
		setDescription(e.target.value);
		localStorage.setItem("description", e.target.value);
	};

	return { description, handleDescription };
};

export default useDescription;
