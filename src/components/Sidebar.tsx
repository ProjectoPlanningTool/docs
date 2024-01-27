import { Button } from "@chakra-ui/react";
import { Page } from "../App";
import Item from "./Item";
import React from "react";

interface Props {
	addPage: () => void;
	addSubPage: (parentPage: Page) => void;
	pages: Page[];
	setActivePage: (page: Page) => void;
	activePage: Page | null;
}

function Sidebar({
	addPage,
	pages,
	addSubPage,
	setActivePage,
	activePage,
}: Props) {
	
	return (
		<>
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
			<Button w={"100%"} onClick={addPage}>
				Add New Page
			</Button>
		</>
	);
}

export default Sidebar;
