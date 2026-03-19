"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session) {
			router.push("/tasks");
		}
	}, [session, router]);

	return (
		<div className="flex h-screen items-center justify-center">
			<Button
				size="lg"
				onClick={() => signIn("google")}
				className="cursor-pointer">
				Login with Google
			</Button>
		</div>
	);
}
