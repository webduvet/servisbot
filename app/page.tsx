import BotLogo from '@/app/ui/bot-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import clsx from 'clsx';

export default function Page() {
	return (
		<main className="flex min-h-screen flex-col p-6">
			{/*<div className={styles.shape} />*/}
			<div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
				<BotLogo /> 
			</div>
			<div className="mt-4 flex grow flex-col gap-4 md:flex-row">
				<Link
					href="/dashboard"
					className={clsx(
						'flex-grow flex h-10 items-center justify-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
					)}
				>
				Enter
				<ArrowRightIcon className="w-6 h-6 ml-2" />
				</Link>
			</div>
		</main>
	);
}
