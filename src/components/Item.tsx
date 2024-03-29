import {
	Flex,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { FaEllipsisVertical } from "react-icons/fa6";
import { Page } from "../App";
import "../assets/css/Item.css";

interface Props {
	page: Page;
	addSubPage: (parentPage: Page) => void;
	setActivePage: (page: Page) => void;
	activePage: Page | null;
}

function Item({ page, addSubPage, setActivePage, activePage }: Props) {
	const handleClick = () => {
		setActivePage(page);
	};
	const deletePageHandler = async () => {
		try {
			const data = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/docs/removePage`,
				page,
			);
			console.log("🚀 ~ deletePageHandler ~ data:", data);
		} catch (err) {
			console.log("err", err);
		}
	};

	const isActive = activePage?.uniqueId === page.uniqueId;
	return (
		<VStack spacing={3} align="stretch">
			<Flex
				border="1px solid gray"
				borderRadius={10}
				justify="space-between"
				align="center"
				paddingLeft={5}
				paddingRight={1}
				backgroundColor={isActive ? "gray" : "unset"}
			>
				<Text w="80%" paddingY={2} onClick={handleClick} cursor="pointer">
					{page.title ? page.title : "Untitled Page"}
				</Text>
				<Menu size="sm">
					<MenuButton
						as={IconButton}
						aria-label="Options"
						icon={<FaEllipsisVertical />}
						variant="unclosed"
						size="sm"
					/>
					<MenuList>
						<MenuItem command="⌘N" onClick={() => addSubPage(page)}>
							Add Sub Page
						</MenuItem>
						<MenuItem
							onClick={() => {
								deletePageHandler();
							}}
						>
							Delete
						</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
			<ul className="sidebar-list">
				{page?.subPages?.map((item) => (
					<li key={item.uniqueId}>
						<Item
							page={item}
							addSubPage={addSubPage}
							setActivePage={setActivePage}
							activePage={activePage}
						/>
					</li>
				))}
			</ul>
		</VStack>
	);
}

export default Item;
