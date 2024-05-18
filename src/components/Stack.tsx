import { type Params, useSearchParams } from "@solidjs/router";
import { For, Suspense, createResource } from "solid-js";
import type { Argument, TopArgument } from "~/utils/types";
import AddArgumentTile from "./AddArgumentTile";
import styles from "./Stack.module.css";

type Side = "for" | "against";

type Props = {
	data: TopArgument;
	side: Side;
};

export default function Stack(props: Props) {
	const [searchParams, setSearchParams] = useSearchParams();
	const otherArgId = () => getOtherArgId(props.side, searchParams);
	const [args, { mutate }] = createResource(otherArgId, fetchArg);

	function appendArg(arg: Argument) {
		mutate((args) => {
			if (args === undefined) return [...props.data.arguments, arg];
			return [...args, arg];
		});
	}

	return (
		<div class={styles.stack}>
			<h2>{props.data.title}</h2>
			<Suspense>
				<For
					each={args() ?? props.data.arguments}
					fallback={
						<p class="info">No responces yet, go ahead and make the first!</p>
					}
				>
					{(arg) => {
						const argSelected = () => setSearchParams({ [props.side]: arg.id });
						return (
							<div onClick={argSelected} onKeyDown={argSelected} class="card">
								{arg.body}
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
	const res = await fetch(`http://127.0.0.1:9000/arguments?id=${id}`);
	const args: { args: Argument[] } = await res.json();
	return args.args;
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
