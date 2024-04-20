import { For } from "solid-js";
import styles from "./Stack.module.css";
import type { Argument } from "~/routes";

type Props = {
	title: string;
	args: Argument[];
	onArgSelected: (id: number) => void;
};

export default function Stack(props: Props) {
	return (
		<div class={styles.stack}>
			<h2>{props.title}</h2>
			<For each={props.args} fallback={<p>Loading…</p>}>
				{(arg) => {
					const newLocal = () => props.onArgSelected(arg.id);
					return (
						<div onClick={newLocal} onKeyDown={newLocal}>
							{arg.body}
						</div>
					);
				}}
			</For>
		</div>
	);
}
