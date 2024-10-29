
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import { fetchBotById, fetchWorkerNameById, fetchLogById } from '@/app/lib/data';
import { formatUnixTimestamp } from '@/app/lib/utils';
import { Log } from '@/app/lib/definitions';
import { LogDetail } from '@/app/ui/logs/detail';

export default async function Page(props: { params: Promise<{ id: string }> }) {
	const params = await props.params;
	const id = params.id;

	const log = await fetchLogById(id) as Log;

	const botId = log.bot;
	const workerId = log.worker;
	let botName, workerName;
	if (botId) {
		const bot = await fetchBotById(botId);
		botName = bot?.name;
	}
	if (workerId) {
		workerName = await fetchWorkerNameById(workerId);
	}
	// if params is not defined we fetch all workers
	const breadcrumbs = [
		{
			label: 'Bots',
			href: `/dashboard/bots/`,
			active: true,
		},
		{
			label: 'Workers',
			href: `/dashboard/workers/`,
			active: true,
		},
		{ label: 'Log detail', href: `/dashboard/logs/${id}/detail`, active: true },
	];
	return (
		<main className="max-w-4xl mx-auto py-8 px-4 bg-white shadow-md rounded-lg">
			<Breadcrumbs breadcrumbs={breadcrumbs} />
			<LogDetail log={log} botName={botName} workerName={workerName} />
		</main>
	)
}
