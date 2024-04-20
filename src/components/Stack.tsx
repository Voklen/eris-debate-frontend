import { For } from "solid-js";
import styles from "./Stack.module.css";
import type { Argument } from "~/routes";
import { Portal } from "solid-js/web";
import Popup from "./Popup";

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
						<div onClick={newLocal} onKeyDown={newLocal} class={styles.arg}>
							{arg.body}
						</div>
					);
				}}
			</For>
			<div class={styles.add}>
				+
				<Popup>
					<h2>Create an argument</h2>
					<h3>{props.title}</h3>
					<textarea />
				</Popup>
			</div>
		</div>
	);
}
