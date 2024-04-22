import { For } from "solid-js";
import type { TopArgument } from "~/utils/types";
import AddArgumentTile from "./AddArgumentTile";
import styles from "./Stack.module.css";

type Props = {
	data: TopArgument;
	onArgSelected: (id: number) => void;
};

export default function Stack(props: Props) {
	return (
		<div class={styles.stack}>
			<h2>{props.data.title}</h2>
			<For
				each={props.data.arguments}
				fallback={
					<p class="info">No responces yet! Go ahead and make the first:</p>
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
			<AddArgumentTile opposingID={props.data.opposingID} />
		</div>
	);
}
