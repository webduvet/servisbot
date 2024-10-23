import WorkerTable from '@/app/ui/workers/table';
import Pagination from '@/app/ui/dashboard/pagination';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import { fetchWorkersData, fetchBotById } from '@/app/lib/data';


export default async function Page(props: {
	searchParams?: Promise<{
		bot_id?: string;
		page?: string;
	}>;
}) {
	const params = await props.searchParams;
	console.log('params', params);
	const botId = params?.bot_id;
	const page = params?.page;
	let botName;
	if (botId) {
		const bot = await fetchBotById(botId);
		botName = bot?.name;
	}
	// if params is not defined we fetch all workers
	const workersData = await fetchWorkersData({ bot: botId, page });
	const workers = workersData.data;
	const totalPages = workersData.pages;
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
		...(botName ? [{ label: botName, href: `/dashboard/workers/?bot_id=${botId}` }] : []),
	];
	return (
		<main>
		<Breadcrumbs
			breadcrumbs={breadcrumbs}
		/>
			<WorkerTable workers={workers}/>
			<div className="mt-5 flex w-full justify-center">
				<Pagination totalPages={totalPages} /> 
			</div>
		</main>
	)
}
