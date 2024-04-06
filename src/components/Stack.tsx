import { For } from "solid-js";

export default function Stack() {
	const args = ["Argument 1", "Argument 2"];
	return <For each={args}>{(arg) => <p>{arg}</p>}</For>;
}
