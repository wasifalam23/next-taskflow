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
		<div className="flex h-screen items-center justify-center bg-linear-to-br from-gray-50 to-gray-100">
			<div className="bg-white p-10 rounded-2xl shadow-lg w-95 text-center space-y-6">
				<h1 className="text-2xl font-bold tracking-tight">TaskFlow</h1>

				<p className="text-sm text-muted-foreground">
					Welcome back! Sign in to continue
				</p>

				<Button
					size="lg"
					onClick={() => signIn("google")}
					className="w-full flex items-center justify-center gap-3 bg-white text-black border border-gray-300 hover:bg-gray-100 shadow-sm cursor-pointer">
					{/* Google SVG */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 48 48"
						className="w-5 h-5">
						<path
							fill="#EA4335"
							d="M24 9.5c3.54 0 6.69 1.22 9.18 3.6l6.85-6.85C35.68 2.54 30.2 0 24 0 14.64 0 6.48 5.48 2.56 13.44l7.98 6.2C12.3 13.1 17.7 9.5 24 9.5z"
						/>
						<path
							fill="#4285F4"
							d="M46.1 24.5c0-1.63-.15-3.2-.43-4.72H24v9h12.4c-.54 2.9-2.18 5.36-4.66 7.02l7.2 5.6C43.98 36.9 46.1 31.1 46.1 24.5z"
						/>
						<path
							fill="#FBBC05"
							d="M10.54 28.64A14.5 14.5 0 0 1 9.5 24c0-1.62.28-3.2.77-4.64l-7.98-6.2A23.94 23.94 0 0 0 0 24c0 3.87.93 7.53 2.56 10.84l7.98-6.2z"
						/>
						<path
							fill="#34A853"
							d="M24 48c6.2 0 11.4-2.05 15.2-5.56l-7.2-5.6c-2 1.35-4.56 2.16-8 2.16-6.3 0-11.7-3.6-13.46-8.64l-7.98 6.2C6.48 42.52 14.64 48 24 48z"
						/>
					</svg>
					Continue with Google
				</Button>
			</div>
		</div>
	);
}
