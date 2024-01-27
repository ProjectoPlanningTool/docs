import {
  Divider,
  IconButton,
  Show,
  Button,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
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
  const [isEditing, setIsEditing] = useState(false);
  const pageHandler = async (page) => {
    if (isEditing) {
      console.log("currentPage", page);
      try {
        const data = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/docs/editPage`,
          page
        );
        console.log("🚀 ~ pageHandler ~ data:", data);
      } catch (err) {
        console.log("error", err);
      }
    } else {
      setIsEditing(true);
    }
  };

  const renderPage = (page: Page): React.ReactNode => {
    const isPageActive = activePage && page.uniqueId === activePage.uniqueId;
    return (
      <React.Fragment key={page.uniqueId}>
        {isPageActive && (
          <>
            <Button
              onClick={() => {
                pageHandler(page);
              }}
            >
              {!isEditing ? "edit" : "save"}
            </Button>
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
                disabled={!isEditing}
                value={page.title}
                placeholder="Untitled Page"
                fontSize="4xl"
                _focusVisible={{ outline: "none" }}
                variant="unstyled"
                fontWeight="bold"
                resize="none"
                onChange={(e) => pageTitle(page.uniqueId, e.target.value)}
                rows={3}
              />
              <Textarea
                disabled={!isEditing}
                value={page.description}
                placeholder="Page Description (Optional)"
                _focusVisible={{ outline: "none" }}
                color="gray.300"
                variant="unstyled"
                resize="none"
                onChange={(e) => pageDescription(page.uniqueId, e.target.value)}
              />
              <Textarea
                disabled={!isEditing}
                placeholder="Enter your content here..."
                _placeholder={{ color: "gray.300" }}
                _focusVisible={{ outline: "none" }}
                variant="unstyled"
                onChange={(e) => pageContent(page.uniqueId, e.target.value)}
                value={page.content}
                resize="none"
              />
              <Divider />
            </VStack>
          </>
        )}
        {page?.subPages?.map((subPage) => (
          <Editor
            key={subPage.uniqueId}
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
      {pages?.map((page) => (
        <React.Fragment key={page.uniqueId}>{renderPage(page)}</React.Fragment>
      ))}
    </>
  );
}

export default Editor;
