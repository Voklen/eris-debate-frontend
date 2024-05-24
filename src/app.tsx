import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { Toaster } from "solid-toast";
import Navbar from "./components/Navbar";

export default function App() {
	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<Title>SolidStart - Basic</Title>
					<Navbar />
					<Suspense>{props.children}</Suspense>
					<Toaster position="bottom-center" />
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
