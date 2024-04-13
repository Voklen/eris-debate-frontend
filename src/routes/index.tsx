import { Title } from "@solidjs/meta";
import Counter from "~/components/Counter";
import Stack from "~/components/Stack";
import "./index.css";

export default function Home() {
	return (
		<main>
			<Stack />
			<div>
				<Title>Hello World</Title>
				<h1>Hello world!</h1>
				<Counter />
			</div>
			<Stack />
		</main>
	);
}
