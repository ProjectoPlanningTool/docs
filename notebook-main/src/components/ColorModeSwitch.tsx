import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const ColorModeSwitch = () => {
	const { toggleColorMode, colorMode } = useColorMode();

	return (
		<IconButton
			aria-label="Color Mode"
			icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
			onClick={toggleColorMode}
		/>
	);
};

export default ColorModeSwitch;
