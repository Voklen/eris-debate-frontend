import { Title } from "@solidjs/meta";
import { createSignal } from "solid-js";
import Stack from "~/components/Stack";
import type { Topic } from "~/utils/types";
import styles from "./Main.module.css";

type Props = {
	topic: Topic;
};

// Main body of the main page
export function Main(props: Props) {
	const [forArgSelected, setForArgSelected] = createSignal<number>();
	const [againstArgSelected, setAgainstArgSelected] = createSignal<number>();

	return (
		<main class={styles.stage}>
			<Stack
				data={props.topic.for}
				responseTo={forArgSelected}
				onArgSelected={setAgainstArgSelected}
			/>
			<div>
				<Title>{props.topic.name} - Eris Debate</Title>
			</div>
			<Stack
				data={props.topic.against}
				responseTo={againstArgSelected}
				onArgSelected={setForArgSelected}
			/>
		</main>
	);
}
