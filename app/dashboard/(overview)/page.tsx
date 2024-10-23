import { CardWrapper } from '@/app/ui/dashboard/cards';
import { inter } from '@/app/ui/fonts';
import {
} from '@/app/lib/data';

export default async function Page() {
	return (
		<main>
			<h1 className={`${inter.className} mb-8 text-x md:text-2x1`}>
				Dashboard
			</h1>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<CardWrapper />
			</div>
		</main>
	);
}
