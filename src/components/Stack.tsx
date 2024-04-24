import { type Accessor, For, Suspense, createResource } from "solid-js";
import type { Argument, TopArgument } from "~/utils/types";
import AddArgumentTile from "./AddArgumentTile";
import styles from "./Stack.module.css";

type Props = {
	data: TopArgument;
	responseTo: Accessor<number | undefined>;
	onArgSelected: (id: number) => void;
};

export default function Stack(props: Props) {
	const [args, { mutate }] = createResource(props.responseTo, fetchArg);

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
						const argSelected = () => props.onArgSelected(arg.id);
						return (
							<div
								onClick={argSelected}
								onKeyDown={argSelected}
								class={styles.arg}
							>
								{arg.body}
							</div>
						);
					}}
				</For>
			</Suspense>
			<AddArgumentTile
				opposingID={props.responseTo() ?? props.data.opposingID}
				appendAddedArg={appendArg}
			/>
		</div>
	);
}

async function fetchArg(id?: number) {
	if (id === undefined) return;
	const res = await fetch(`http://127.0.0.1:9000/arguments?id=${id}`);
	const args: { args: Argument[] } = await res.json();
	return args.args;
}
