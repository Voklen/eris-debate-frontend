export type Argument = {
	id: number;
	body: string;
};

export type TopArgument = {
	title: string;
	opposingID: number;
	arguments: Argument[];
};

export type Topic = {
	name: string;
	for: TopArgument;
	against: TopArgument;
};
