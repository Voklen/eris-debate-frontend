import { MetaProvider, Title } from "@solidjs/meta";
import { type RouteSectionProps, Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { type Component, Suspense } from "solid-js";
import "./app.css";
import { Toaster } from "solid-toast";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./providers/auth";

export default function App() {
	return (
		<Router root={root}>
			<FileRoutes />
		</Router>
	);
}

const root: Component<RouteSectionProps> = (props) => (
	<MetaProvider>
		<AuthProvider>
			<Title>SolidStart - Basic</Title>
			<Navbar />
			<Suspense>{props.children}</Suspense>
			<Toaster position="bottom-center" />
		</AuthProvider>
	</MetaProvider>
);
