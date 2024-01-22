import { Divider, IconButton, Show, Textarea, VStack } from "@chakra-ui/react";
import React from "react";
import { Page } from "../App";
import useEmoji from "../hooks/useEmoji";
import EmojiPickerEl from "./EmojiPickerEl";

interface Props {
	pageTitle: (pageId: number, title: string) => void;
	pageDescription: (pageId: number, description: string) => void;
	pageContent: (pageId: number, content: string) => void;
	pageEmoji: (pageId: number, emojiString: string) => void;
	pages: Page[];
	activePage: Page | null;
}

function Editor({
	pageTitle,
	pageDescription,
	pageContent,
	pageEmoji,
	pages,
	activePage,
}: Props) {
	const { showEmojiPicker, handleEmojiButton, setEmojiPicker } = useEmoji();

	const renderPage = (page: Page): React.ReactNode => {
		const isPageActive = activePage && page.id === activePage.id;

		return (
			<React.Fragment key={page.id}>
				{isPageActive && (
					<>
						<Show above="lg" ssr={false}>
							<IconButton
								aria-label="emoji"
								size="lg"
								variant="unstyled"
								fontSize="45px"
								icon={<span>{page.emoji}</span>}
								onClick={handleEmojiButton}
								pos="absolute"
							/>
						</Show>
						{showEmojiPicker && (
							<EmojiPickerEl
								onEmojiClick={({ emoji }) => {
									pageEmoji(page.id, emoji);
									setEmojiPicker(false);
								}}
								top="10rem"
							/>
						)}

						<VStack marginX={{ base: 0, lg: "65px" }}>
							<Textarea
								value={page.title}
								placeholder="Untitled Page"
								fontSize="4xl"
								_focusVisible={{ outline: "none" }}
								variant="unstyled"
								fontWeight="bold"
								resize="none"
								onChange={(e) => pageTitle(page.id, e.target.value)}
								rows={3}
							/>
							<Textarea
								value={page.description}
								placeholder="Page Description (Optional)"
								_focusVisible={{ outline: "none" }}
								color="gray.300"
								variant="unstyled"
								resize="none"
								onChange={(e) => pageDescription(page.id, e.target.value)}
							/>
							<Textarea
								placeholder="Enter your content here..."
								_placeholder={{ color: "gray.300" }}
								_focusVisible={{ outline: "none" }}
								variant="unstyled"
								onChange={(e) => pageContent(page.id, e.target.value)}
								value={page.content}
								resize="none"
							/>
							<Divider />
						</VStack>
					</>
				)}
				{page.child?.map((subPage) => (
					<Editor
						key={subPage.id}
						pageTitle={pageTitle}
						pageDescription={pageDescription}
						pageContent={pageContent}
						pageEmoji={pageEmoji}
						pages={[subPage]}
						activePage={activePage}
					/>
				))}
			</React.Fragment>
		);
	};
	return (
		<>
			{pages.map((page) => (
				<React.Fragment key={page.id}>{renderPage(page)}</React.Fragment>
			))}
		</>
	);
}

export default Editor;
