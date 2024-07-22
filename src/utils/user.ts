import type { User } from "./types";

/**
 * Fetches the user from localstorage so will have to be ran after page load, for example using `onMount`.
 */
export function getUser(): User | null {
	const user = localStorage.getItem("user");
	return user ? JSON.parse(user) : null;
}

/**
 * Fetches the user from localstorage so will have to be ran after page load, for example using `onMount`.
 * Returns false if user is not logged in.
 */
export function isAdmin(): boolean {
	const user = getUser();
	return user ? user.roles.includes("admin") : false;
}
