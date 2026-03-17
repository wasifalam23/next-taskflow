"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
	const { data: session } = useSession();

	console.log("🗣️", session);

	if (session) {
		return (
			<>
				<p>Welcome {session.user.name}</p>
				<button onClick={() => signOut()}>Logout</button>
			</>
		);
	}

	return <button onClick={() => signIn("google")}>Login with Google</button>;
}
