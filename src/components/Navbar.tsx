import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Editable,
	EditableInput,
	EditablePreview,
	Flex,
	HStack,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Show,
	useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import React from "react";
import {
	FaBars,
	FaEllipsisVertical,
	FaFloppyDisk,
	FaPenToSquare,
} from "react-icons/fa6";
import { ImSphere } from "react-icons/im";
import { Page } from "../App";
import useEmoji from "../hooks/useEmoji";
import useHeading from "../hooks/useHeading";
import ColorModeSwitch from "./ColorModeSwitch";
import EmojiPickerEl from "./EmojiPickerEl";
import Item from "./Item";

interface Props {
	readOnly: boolean;
	handleEditButton: () => void;
	addPage: () => void;
	addSubPage: (parentPage: Page) => void;
	pages: Page[];
	setActivePage: (page: Page) => void;
	activePage: Page | null;
}

function Navbar({
	readOnly,
	handleEditButton,
	addPage,
	pages,
	addSubPage,
	setActivePage,
	activePage,
}: Props) {
	const inputRef = useRef<HTMLInputElement>(null);
	const { heading, handleHeadingInput } = useHeading(inputRef);
	const {
		selectedEmoji1,
		showEmojiPicker,
		handleEmojiButton,
		handleOpenEmoji1,
	} = useEmoji();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef<HTMLButtonElement>(null);

	return (
		<Flex padding={3} marginY={2}>
			<HStack flex={1} align="flex-start">
				<Show above="lg" ssr={false}>
					<IconButton
						aria-label="emoji"
						icon={<span>{selectedEmoji1.emoji}</span>}
						onClick={handleEmojiButton}
					/>

					{showEmojiPicker && (
						<EmojiPickerEl onEmojiClick={handleOpenEmoji1} top="5rem" />
					)}
				</Show>

				<Show below="lg" ssr={false}>
					<IconButton
						aria-label="share"
						ref={btnRef}
						onClick={onOpen}
						icon={<FaBars />}
					/>
					<Drawer
						isOpen={isOpen}
						placement="left"
						onClose={onClose}
						finalFocusRef={btnRef}
					>
						<DrawerOverlay />
						<DrawerContent>
							<DrawerCloseButton />
							<DrawerHeader>Create your Notes 😀</DrawerHeader>

							<DrawerBody>
								{pages?.map((page) => (
									<React.Fragment key={page.uniqueId}>
										<Item
											page={page}
											addSubPage={addSubPage}
											setActivePage={setActivePage}
											activePage={activePage}
										/>
									</React.Fragment>
								))}
							</DrawerBody>

							<DrawerFooter>
								<Button variant="outline" mr={3} onClick={onClose}>
									Cancel
								</Button>
								<Button colorScheme="blue" onClick={addPage}>
									Add New Page
								</Button>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</Show>

				<Editable defaultValue={heading} placeholder="Heading" fontSize="2xl">
					<EditablePreview p={0} />
					<EditableInput
						ref={inputRef}
						onChange={handleHeadingInput}
						_focusVisible={{ outline: "none" }}
						p={0}
					/>
				</Editable>
			</HStack>
			<HStack h="fit-content">
				<Show above="lg" ssr={false}>
					<Button leftIcon={<ImSphere />}>Share</Button>
					<Button
						onClick={handleEditButton}
						leftIcon={readOnly ? <FaPenToSquare /> : <FaFloppyDisk />}
						colorScheme="blue"
					>
						{readOnly ? "Edit" : "Save"}
					</Button>
				</Show>
				<Menu>
					<MenuButton
						as={IconButton}
						aria-label="Options"
						icon={<FaEllipsisVertical />}
					/>
					<MenuList>
						<MenuItem command="⌘T">New Tab</MenuItem>
						<MenuItem command="⌘N">New Window</MenuItem>
						<MenuItem command="⌘⇧N">Open Closed Tab</MenuItem>
						<MenuItem command="⌘O">Open File...</MenuItem>
					</MenuList>
				</Menu>
				<ColorModeSwitch />
			</HStack>
		</Flex>
	);
}

export default Navbar;
