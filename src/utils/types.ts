export type Argument = {
	id: number;
	body: string;
};

export type TopArgument = {
	title: string;
	opposingID: number;
	arguments: Argument[];
};

export const emptyTopArgument = {
	title: "",
	opposingID: 0,
	arguments: [],
};
