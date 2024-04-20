import { For, Show, createSignal } from "solid-js";
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
						<div onClick={newLocal} onKeyDown={newLocal} class={styles.arg}>
							{arg.body}
						</div>
					);
				}}
			</For>
			<AddArgumentTile />
		</div>
	);
}
function AddArgumentTile() {
	const [isCreating, setIsCreating] = createSignal(false);

	const openInput = () => setIsCreating(true);
	return (
		<div class={styles.add}>
			<Show
				when={isCreating()}
				fallback={
					<div onClick={openInput} onKeyPress={openInput}>
						+
					</div>
				}
			>
				<form class={styles.addForm}>
					<h2>Create an argument</h2>
					<textarea placeholder="Let’s get some good discussion going…" />
				</form>
			</Show>
		</div>
	);
}
