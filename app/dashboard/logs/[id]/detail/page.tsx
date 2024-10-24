
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import { fetchBotById, fetchWorkerNameById, fetchLogById } from '@/app/lib/data';
import { formatUnixTimestamp } from '@/app/lib/utils';
import { Log } from '@/app/lib/definitions';

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

      <div className="mt-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Log Detail</h1>

        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Bot:</span> {botName}
          </p>
          <p>
            <span className="font-semibold">Worker:</span> {workerName}
          </p>
          <p>
            <span className="font-semibold">Created:</span> {formatUnixTimestamp(log.created)}
          </p>

          <div className="mt-6">
            <p className="font-semibold mb-2">Message:</p>
            <p className="bg-gray-100 p-4 rounded-md shadow-sm text-gray-900">
              {log?.message || "No message available"}
            </p>
          </div>
        </div>
      </div>
    </main>
	)
}
