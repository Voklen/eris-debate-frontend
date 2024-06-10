import {
	type Accessor,
	type JSX,
	createContext,
	createSignal,
	useContext,
} from "solid-js";
import type { User } from "~/utils/types";

type AuthContextType = [
	user: Accessor<User | null>,
	{ login: (user: User) => void; logout: () => void },
];

type Props = {
	children?: JSX.Element;
};

const AuthContext = createContext<AuthContextType>();

export function AuthProvider(props: Props) {
	const [user, setUser] = createSignal<User | null>(null);

	const login = (user: User) => setUser(user);
	const logout = () => setUser(null);

	return (
		<AuthContext.Provider value={[user, { login, logout }]}>
			{props.children}
		</AuthContext.Provider>
	);
}

export const useAuth = () =>
	useContext(AuthContext) ?? [
		createSignal(null)[0],
		{ login: (_: User) => {}, logout: () => {} },
	];
