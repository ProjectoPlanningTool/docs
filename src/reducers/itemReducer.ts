interface PageItem {
	id: string;
	title: string;
	child: PageItem[];
	parent: { title: string; child: PageItem[] } | null;
}

interface NewPageAction {
	type: "ADD_NEW_PAGE";
}

interface SubPageAction {
	type: "ADD_SUB_PAGE";
	parentId: string;
}

type ItemAction = NewPageAction | SubPageAction;

const itemReducer = (state: PageItem[], action: ItemAction): PageItem[] => {
	const generateUniqueId = (parentId: string | undefined, index: number) => {
		if (parentId) {
			return `${parentId}${String.fromCharCode(97 + index)}`;
		}
		return `${index + 1}`;
	};
	switch (action.type) {
		case "ADD_NEW_PAGE": {
			const newPage: PageItem = {
				id: `page-${state.length + 1}`,
				title: `New Page ${state.length + 1}`,
				child: [],
				parent: null,
			};
			return [...state, newPage];
		}
		case "ADD_SUB_PAGE":
			return state.map((item) => {
				if (item.id === action.parentId) {
					const subPage = {
						id: generateUniqueId(item.id, item.child.length),
						title: `Sub Page ${item.child.length + 1}`,
						child: [],
						parent: { title: item.title, child: item.child } || null,
					};
					return {
						...item,
						child: [...item.child, subPage],
					};
				}
				return item;
			});

		default:
			return state;
	}
};

export default itemReducer;
