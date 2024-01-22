import { Box } from "@chakra-ui/react";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import useThemeKey from "../hooks/useThemeKey";
import { Emoji } from "../hooks/useHandler";

interface Props {
	onEmojiClick: ({ emoji }: Emoji) => void;
	top: string;
}

function EmojiPickerEl({ onEmojiClick, top }: Props) {
	const themeKey = useThemeKey();
	return (
		<>
			<Box
				style={{
					position: "absolute",
					top,
					zIndex: "2",
				}}
			>
				<EmojiPicker
					theme={Theme[themeKey]}
					onEmojiClick={onEmojiClick}
					lazyLoadEmojis={true}
					autoFocusSearch={false}
					emojiStyle={EmojiStyle.NATIVE}
				/>
			</Box>
		</>
	);
}

export default EmojiPickerEl;
