import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { type JSX, Suspense } from "solid-js";
import "./app.css";
import { Toaster } from "solid-toast";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./providers/auth";

export default function App() {
	return (
		<Router root={Root}>
			<FileRoutes />
		</Router>
	);
}

type Props = {
	children?: JSX.Element;
};

function Root(props: Props) {
	return (
		<MetaProvider>
			<AuthProvider>
				<Title>SolidStart - Basic</Title>
				<Navbar />
				<Suspense>{props.children}</Suspense>
				<Toaster position="bottom-center" />
			</AuthProvider>
		</MetaProvider>
	);
}
