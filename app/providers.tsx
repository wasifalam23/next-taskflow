'use client';

import { SessionProvider } from 'next-auth/react';
import { TooltipProvider } from '@/components/ui/tooltip';

type ProvidersProps = {
	children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
	return (
		<SessionProvider>
			<TooltipProvider>{children}</TooltipProvider>
		</SessionProvider>
	);
}
