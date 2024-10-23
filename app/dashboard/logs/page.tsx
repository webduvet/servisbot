import LogTable from '@/app/ui/logs/table';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import Pagination from '@/app/ui/dashboard/pagination';
import { fetchLogsData, fetchBotById, fetchWorkerNameById } from '@/app/lib/data';


export default async function Page(props: {
	searchParams?: Promise<{
		bot_id?: string;
		page?: string;
		worker?: string;
		query?: string;
	}>;
}) {
	const params = await props.searchParams;
	console.log('params', params);
	const botId = params?.bot_id;
	const workerId = params?.worker;
	const page = params?.page;
	const query = params?.query;
	let botName, workerName;
	if (botId) {
		const bot = await fetchBotById(botId);
		botName = bot?.name;
	}
	if (workerId) {
		workerName = await fetchWorkerNameById(workerId);
	}
	// if params is not defined we fetch all workers
	const logsData = await fetchLogsData({ bot: botId, worker: workerId, page, query });
	const totalPages = logsData.pages;
	const logs = logsData.data;
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
		...(botName ? [{ label: botName, href: `/dashboard/logs/?bot_id=${botId}` }] : []),
		...(workerName ? [{ label: workerName, href: `/dashboard/logs/?worker=${workerId}` }] : []),
	];
	return (
		<main>
		<Breadcrumbs
			breadcrumbs={breadcrumbs}
		/>
			<LogTable logs={logs as any}/>
			<div className="mt-5 flex w-full justify-center">
				<Pagination totalPages={totalPages} /> 
			</div>
		</main>
	)
}
