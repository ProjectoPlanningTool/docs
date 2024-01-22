import { Flex, Grid, GridItem, Show, Spinner } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import Editor from "./components/Editor";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import useHandler from "./hooks/useHandler";
import APIClient from "./services/api-client";

export interface Page {
	id: number;
	title: string;
	description: string;
	content: string;
	parentId: number | null;
	emoji: string;
	child: Page[] | null;
}

interface Credentials {
	email: string;
	password: string;
}

interface User extends Credentials {
	id: string;
	firstName: string;
	lastName: string;
	token: string;
}

function App() {
	const { readOnly, handleEditButton } = useHandler();
	const [loading, setLoading] = useState(false);
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [pages, setPages] = useState<Page[]>([]);
	const [activePage, setActivePage] = useState<Page | null>(null);

	const apiClient = new APIClient<User, Credentials>("/login");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		setLoading(true);
		e.preventDefault();
		try {
			await apiClient.post({ email, password: pass });
			setLoggedIn(true);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	const updateProperty = (
		pages: Page[],
		pageId: number,
		property: "title" | "description" | "content" | "emoji",
		value: string,
	): Page[] => {
		return pages.map((page) => {
			if (page.id === pageId) {
				return { ...page, [property]: value };
			}
			if (page.child && page.child.length > 0) {
				return {
					...page,
					child: updateProperty(page.child, pageId, property, value),
				};
			}
			return page;
		});
	};

	const pageTitle = (pageId: number, title: string) => {
		setPages((prevPages) => updateProperty(prevPages, pageId, "title", title));
	};

	const pageDescription = (pageId: number, description: string) => {
		setPages((prevPages) =>
			updateProperty(prevPages, pageId, "description", description),
		);
	};

	const pageContent = (pageId: number, content: string) => {
		setPages((prevPages) =>
			updateProperty(prevPages, pageId, "content", content),
		);
	};

	const pageEmoji = (pageId: number, emoji: string) => {
		setPages((prevPages) => updateProperty(prevPages, pageId, "emoji", emoji));
	};

	const addPage = () => {
		const newPage: Page = {
			id: Date.now(),
			title: `New Page ${pages.length + 1}`,
			description: "",
			content: "",
			parentId: null,
			emoji: "😀",
			child: [],
		};

		setPages((prevPages) => [...prevPages, newPage]);
		setActivePage(newPage);
	};

	const addSubPage = (parentPage: Page) => {
		if (parentPage?.child) {
			const newSubPage: Page = {
				id: Date.now(),
				title: `Sub Page ${parentPage.child?.length + 1}`,
				description: "",
				content: "",
				parentId: parentPage.id,
				emoji: "😄",
				child: [],
			};
			const updatedPages = [...pages];
			parentPage?.child?.push(newSubPage);
			setPages(updatedPages);
			setActivePage(newSubPage);
		}
	};

	const handleTitleChange = (pageId: number, newTitle: string) => {
		pageTitle(pageId, newTitle);
	};

	const handleDescriptionChange = (pageId: number, newDescription: string) => {
		pageDescription(pageId, newDescription);
	};

	const handleContentChange = (pageId: number, newContent: string) => {
		pageContent(pageId, newContent);
	};

	const handleEmojiChange = (pageId: number, emojiString: string) => {
		pageEmoji(pageId, emojiString);
	};

	return (
		<>
			{loading && (
				<Flex w={"100%"} h={"100vh"} justify={"center"} align={"center"}>
					<Spinner size="xl" />
				</Flex>
			)}
			{!isLoggedIn && (
				<Flex
					p={4}
					w={{ base: "100%", lg: "25%" }}
					h="100vh"
					m="0px auto"
					align="center"
					justify="center"
				>
					<Form
						setEmail={setEmail}
						setPass={setPass}
						email={email}
						pass={pass}
						handleSubmit={(e) => handleSubmit(e)}
					/>
				</Flex>
			)}
			<Grid
				templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "aside main"` }}
				templateColumns={{ base: "1fr", lg: "250px 1fr" }}
				display={!isLoggedIn ? "none" : "grid"}
				gap={{ base: "unset", lg: "0 150px" }}
			>
				<GridItem area="nav">
					<Navbar
						readOnly={readOnly}
						handleEditButton={handleEditButton}
						addPage={addPage}
						pages={pages}
						addSubPage={addSubPage}
						setActivePage={setActivePage}
						activePage={activePage}
					/>
				</GridItem>
				<Show above="lg" ssr={false}>
					<GridItem area="aside" padding={3}>
						<Sidebar
							addPage={addPage}
							pages={pages}
							addSubPage={addSubPage}
							setActivePage={setActivePage}
							activePage={activePage}
						/>
					</GridItem>
				</Show>
				<GridItem area="main" px={4} w={{ base: "100%", lg: "80%" }}>
					<Editor
						pageTitle={handleTitleChange}
						pageDescription={handleDescriptionChange}
						pageContent={handleContentChange}
						pageEmoji={handleEmojiChange}
						pages={pages}
						activePage={activePage}
					/>
				</GridItem>
			</Grid>
		</>
	);
}

export default App;
