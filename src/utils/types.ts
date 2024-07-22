import type { Accessor } from "solid-js";

export type Side = "for" | "against";

export type Argument = {
	id: number;
	body: string;
};

export type SubmitState = "success" | "loading" | "error";

export type ArgumentTile = Argument & {
	state: Accessor<SubmitState>;
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

export type User = {
	username: string;
	roles: string[];
};
