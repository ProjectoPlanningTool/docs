import { useColorMode } from "@chakra-ui/react";
import { Theme } from "emoji-picker-react";

const useThemeKey = () => {
	const { colorMode } = useColorMode();
	const themeKey: keyof typeof Theme =
		colorMode.toUpperCase() as keyof typeof Theme;
	return themeKey;
};

export default useThemeKey;
