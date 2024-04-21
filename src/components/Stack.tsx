import { For } from "solid-js";
import styles from "./Stack.module.css";
import type { Argument } from "~/routes";
import AddArgumentTile from "./AddArgumentTile";

type Props = {
	title: string;
	args: Argument[];
	opposingID: number;
	onArgSelected: (id: number) => void;
};

export default function Stack(props: Props) {
	return (
		<div class={styles.stack}>
			<h2>{props.title}</h2>
			<For each={props.args} fallback={<p>Loading…</p>}>
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
			<AddArgumentTile opposingID={props.opposingID} />
		</div>
	);
}
