import { useEffect, useState } from "react";

export type TextAreaEvent = React.ChangeEvent<HTMLTextAreaElement>;
type RefTextAreaEvent = React.RefObject<HTMLTextAreaElement>;

const useText = (textRef: RefTextAreaEvent) => {
	const [text, setText] = useState(localStorage.getItem("text") || "");
	const [rows, setRows] = useState(localStorage.getItem("rows") || 2);

	const handleText = (e: TextAreaEvent) => {
		setText(e.target.value);
		localStorage.setItem("text", e.target.value);
	};

	useEffect(() => {
		const controller = new AbortController();
		const areaWidth = textRef.current?.offsetWidth;
		if (areaWidth) {
			setRows((text.length / areaWidth) * 8.2 + 3);
			localStorage.setItem(
				"rows",
				((text.length / areaWidth) * 8.2 + 3).toString(),
			);
		}

		return () => controller.abort();
	}, [text]);

	return { rows, handleText, text };
};

export default useText;
