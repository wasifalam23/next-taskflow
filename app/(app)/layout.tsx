import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarToggleButton from '@/components/SidebarToggleButton';
import { AppSidebar } from '@/components/app-sidebar';

type AppLayoutProps = {
	children: React.ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/login');
	}

	return (
		<SidebarProvider>
			<div className="flex h-screen w-full">
				<AppSidebar />
				<div className="flex flex-col flex-1 min-w-0">
					<main className="flex-1 min-w-0 overflow-y-auto p-6">
						<SidebarToggleButton />
						{children}
					</main>
				</div>
			</div>
		</SidebarProvider>
	);
}
