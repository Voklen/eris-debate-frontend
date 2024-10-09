import {
	type NavigateOptions,
	type Params,
	type SetParams,
	useSearchParams,
} from "@solidjs/router";
import { For, Show, Suspense, createResource, createSignal } from "solid-js";
import { backendURL } from "~/utils/config";
import type {
	Argument,
	ArgumentTile,
	Side,
	SubmitState,
	TopArgument,
} from "~/utils/types";
import AddArgumentTile from "./AddArgumentTile";
import ArgumentTileElement from "./ArgumentTile";
import EditPopup from "./EditPopup";
import styles from "./Stack.module.css";

type Props = {
	topArgument: TopArgument;
	side: Side;
};

export default function Stack(props: Props) {
	const [searchParams, setSearchParams] = useSearchParams();
	const otherArgId = () =>
		getOtherArgId(props.side, props.topArgument, searchParams, setSearchParams);
	const [args, { mutate }] = createResource(otherArgId, fetchArg);
	const [showPopup, setShowPopup] = createSignal<Argument | null>(null);

	function appendArg(arg: ArgumentTile) {
		mutate((args) => {
			if (args === undefined) {
				const defaultArgs = props.topArgument.arguments.map(toTile);
				return [...defaultArgs, arg];
			}
			return [...args, arg];
		});
	}

	return (
		<div class={styles.stack}>
			<h2>{props.topArgument.title}</h2>
			<Suspense>
				<Show when={showPopup()}>
					<EditPopup arg={showPopup()!} closePopup={() => setShowPopup(null)} />
				</Show>
				<For
					each={args() ?? props.topArgument.arguments.map(toTile)}
					fallback={
						<p class="info">No responces yet, go ahead and make the first!</p>
					}
				>
					{(arg) => {
						return (
							<ArgumentTileElement
								arg={arg}
								side={props.side}
								showPopup={setShowPopup}
							/>
						);
					}}
				</For>
			</Suspense>
			<AddArgumentTile
				opposingID={otherArgId() ?? props.topArgument.opposingID}
				appendAddedArg={appendArg}
			/>
		</div>
	);
}

async function fetchArg(id: number) {
	if (id === 0) return;
	const res = await fetch(`${backendURL}/arguments/${id}`);
	const args: { args: Argument[] } = await res.json();
	const argTiles: ArgumentTile[] = args.args.map(toTile);
	return argTiles;
}

type SearchParams = Partial<Params>;
type SetSearchParams = (
	params: SetParams,
	options?: Partial<NavigateOptions>,
) => void;

function getOtherArgId(
	side: Side,
	topArgument: TopArgument,
	searchParams: SearchParams,
	setSearchParams: SetSearchParams,
) {
	switch (side) {
		case "for":
			if (!searchParams.against)
				setSearchParams({ against: 0 }, { replace: true });
			if (!searchParams.against || searchParams.against === "0")
				return topArgument.opposingID;
			return Number.parseInt(searchParams.against);
		case "against":
			if (!searchParams.for) setSearchParams({ for: 0 }, { replace: true });
			if (!searchParams.for || searchParams.for === "0")
				return topArgument.opposingID;
			return Number.parseInt(searchParams.for);
	}
}

function toTile(argument: Argument): ArgumentTile {
	const state = createSignal<SubmitState>("success")[0];
	return { ...argument, state: state };
}
