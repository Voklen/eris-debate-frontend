import { Title } from "@solidjs/meta";
import Counter from "~/components/Counter";
import Stack from "~/components/Stack";

export default function Home() {
	return (
		<main>
			<Title>Hello World</Title>
			<h1>Hello world!</h1>
			<Counter />
			<div>
				<Stack />
			</div>
		</main>
	);
}
