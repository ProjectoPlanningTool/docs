import { useState } from "react";

type RefInputEvent = React.RefObject<HTMLInputElement>;
const useHeading = (inputRef: RefInputEvent) => {
	const [heading, setHeading] = useState(
		localStorage.getItem("heading") || "Heading",
	);

	const handleHeadingInput = () => {
		if (inputRef.current) {
			setHeading(inputRef.current?.value);
			localStorage.setItem("heading", inputRef.current?.value);
		}
	};

	return { heading, handleHeadingInput };
};

export default useHeading;
