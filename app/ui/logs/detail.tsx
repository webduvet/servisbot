
import { formatUnixTimestamp } from '@/app/lib/utils';
import { Log } from '@/app/lib/definitions';

export function LogDetail({ log, botName, workerName }: { log: Log, botName: String, workerName: String }) {
	return (
		<main>
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
						<p className="bg-gray-100 p-4 rounded-md shadow-sm text-gray-900 break-word">
							{log?.message || "No message available"}
						</p>
					</div>
				</div>
			</div>
		</main>
	)
}
