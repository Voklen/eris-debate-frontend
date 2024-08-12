import { Title } from "@solidjs/meta";
import Stack from "~/components/Stack";
import type { Topic } from "~/utils/types";
import styles from "./Main.module.css";

type Props = {
	topic: Topic;
};

// Main body of the main page
export function Main(props: Props) {
	return (
		<main class={styles.stage}>
			<Stack topArgument={props.topic.for} side="for" />
			<div>
				<Title>{props.topic.name} - Eris Debate</Title>
			</div>
			<Stack topArgument={props.topic.against} side="against" />
		</main>
	);
}
