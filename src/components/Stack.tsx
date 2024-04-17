import { For } from "solid-js";
import styles from "./Stack.module.css";
import type { Argument } from "~/routes";

type Props = {
	title: string;
	args: Argument[];
};

export default function Stack(props: Props) {
	return (
		<div class={styles.stack}>
			<h2>{props.title}</h2>
			<For each={props.args} fallback={<p>Loading…</p>}>
				{(arg) => <div>{arg.body}</div>}
			</For>
		</div>
	);
}
