import {
	BanknotesIcon,
	ClockIcon,
	UserGroupIcon,
	InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { getTotalBots, getTotalWorkers, getTotalLogs } from '@/app/lib/data';

const iconMap = {
	collected: BanknotesIcon,
	customers: UserGroupIcon,
	pending: ClockIcon,
	invoices: InboxIcon,
};

export async function CardWrapper() {
	const totalBots = await getTotalBots();
	const totalWorkers = await getTotalWorkers();
	const totalLogs = await getTotalLogs();
	return (
		<>
			<Card title="Bots" value={totalBots} type="collected" />
			<Card title="Workers" value={totalWorkers} type="pending" />
			<Card title="Logs" value={totalLogs} type="invoices" />
		</>
	);
}

export function Card({
	title,
	value,
	type,
}: {
	title: string;
	value: number | string;
	type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
	const Icon = iconMap[type];

	return (
		<div className="rounded-xl bg-gray-50 p-2 shadow-sm">
			<div className="flex p-4">
				{Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
				<h3 className="ml-2 text-sm font-medium">{title}</h3>
			</div>
			<p
				className={`${lusitana.className}
		  truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
			>
				{value}
			</p>
		</div>
	);
}
