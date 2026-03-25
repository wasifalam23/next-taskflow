import GoogleProvider from 'next-auth/providers/google';
import { connectDB } from '@/lib/mongoose';
import User from '@/models/User';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],

	callbacks: {
		async signIn({ user }) {
			await connectDB();

			const existingUser = await User.findOne({ email: user.email });

			if (!existingUser) {
				await User.create({
					name: user.name,
					email: user.email,
					image: user.image,
				});
			}

			return true;
		},

		async jwt({ token, user }) {
			if (user) {
				await connectDB();

				const dbUser = await User.findOne({ email: user.email });
				token.id = dbUser._id.toString();
			}

			return token;
		},

		async session({ session, token }) {
			if (token) {
				session.user.id = token.id as string;
			}

			return session;
		},
	},
};
