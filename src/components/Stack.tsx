import { type Params, useSearchParams } from "@solidjs/router";
import { For, Suspense, createResource, createSignal, onMount } from "solid-js";
import { backendURL } from "~/utils/config";
import type {
	Argument,
	ArgumentTile,
	Side,
	SubmitState,
	TopArgument,
} from "~/utils/types";
import AddArgumentTile from "./AddArgumentTile";
import styles from "./Stack.module.css";
import toast from "solid-toast";
import { isAdmin } from "~/utils/user";

type Props = {
	data: TopArgument;
	side: Side;
};

export default function Stack(props: Props) {
	const [searchParams, setSearchParams] = useSearchParams();
	const otherArgId = () => getOtherArgId(props.side, searchParams);
	const [args, { mutate }] = createResource(otherArgId, fetchArg);
	const [userIsAdmin, setUserIsAdmin] = createSignal(false);

	onMount(() => {
		setUserIsAdmin(isAdmin());
	});

	function appendArg(arg: ArgumentTile) {
		mutate((args) => {
			if (args === undefined) {
				const defaultArgs = props.data.arguments.map(toTile);
				return [...defaultArgs, arg];
			}
			return [...args, arg];
		});
	}
	async function removeArg(e: MouseEvent, id: number) {
		try {
			await sendDeleteArgRequest(e, id);
		} catch (e) {
			if (e instanceof Error) {
				toast.error(e.message);
			}
		}
	}

	return (
		<div class={styles.stack}>
			<h2>{props.data.title}</h2>
			<Suspense>
				<For
					each={args() ?? props.data.arguments.map(toTile)}
					fallback={
						<p class="info">No responces yet, go ahead and make the first!</p>
					}
				>
					{(arg) => {
						const argSelected = () => setSearchParams({ [props.side]: arg.id });
						const id = arg.id.toString();

						return (
							<div
								onClick={argSelected}
								onKeyDown={argSelected}
								classList={{
									card: true,
									[styles.forSelected]: searchParams.for === id,
									[styles.againstSelected]: searchParams.against === id,
									[arg.state()]: true,
									[styles.showRemoveButton]: userIsAdmin(),
								}}
							>
								{arg.body}
								<br />
								<button
									type="button"
									onClick={async (e) => removeArg(e, arg.id)}
								>
									Remove
								</button>
							</div>
						);
					}}
				</For>
			</Suspense>
			<AddArgumentTile
				opposingID={otherArgId() ?? props.data.opposingID}
				appendAddedArg={appendArg}
			/>
		</div>
	);
}

async function fetchArg(id: number) {
	if (id === 0) return;
	const res = await fetch(`${backendURL}/arguments?id=${id}`);
	const args: { args: Argument[] } = await res.json();
	const argTiles: ArgumentTile[] = args.args.map(toTile);
	return argTiles;
}

function getOtherArgId(side: Side, searchParams: Partial<Params>) {
	switch (side) {
		case "for":
			if (!searchParams.against) return;
			return Number.parseInt(searchParams.against);
		case "against":
			if (!searchParams.for) return;
			return Number.parseInt(searchParams.for);
	}
}

function toTile(argument: Argument): ArgumentTile {
	const state = createSignal<SubmitState>("success")[0];
	return { ...argument, state: state };
}

async function sendDeleteArgRequest(event: MouseEvent, id: number) {
	event.stopPropagation();
	const requestBody = { argument_id: id };
	const res = await fetch(`${backendURL}/arguments`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(requestBody),
	});
	if (res.status !== 200) {
		throw new Error(`${res.status}: ${await res.text()}`);
	}
}
