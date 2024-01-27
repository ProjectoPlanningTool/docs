import { useState } from "react";
import { Emoji } from "../hooks/useHandler";

const useEmoji = () => {
	const [selectedEmoji1, setSelectedEmoji1] = useState<Emoji>({
		emoji: localStorage.getItem("emoji1") || "😆",
	});
	const [selectedEmoji2, setSelectedEmoji2] = useState<Emoji>({
		emoji: localStorage.getItem("emoji2") || "😆",
	});
	const [showEmojiPicker, setEmojiPicker] = useState(false);

	const handleEmojiButton = () => {
		setEmojiPicker((prev) => !prev);
	};

	const handleOpenEmoji1 = ({ emoji }: Emoji) => {
		setSelectedEmoji1({ emoji });
		setEmojiPicker(false);
		localStorage.setItem("emoji1", emoji);
	};

	const handleOpenEmoji2 = ({ emoji }: Emoji) => {
		setSelectedEmoji2({ emoji });
		setEmojiPicker(false);
		localStorage.setItem("emoji2", emoji);
	};

	return {
		selectedEmoji1,
		selectedEmoji2,
		showEmojiPicker,
		handleEmojiButton,
		handleOpenEmoji1,
		handleOpenEmoji2,
		setEmojiPicker,
	};
};

export default useEmoji;
