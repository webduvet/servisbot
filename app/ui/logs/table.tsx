import { inter } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import {
  FormattedLogTable,
} from '@/app/lib/definitions';
import { formatUnixTimestamp } from '@/app/lib/utils';

function truncate(message: string, length: number) {
  return message.length > length
	? `${message.substring(0, length)}...`
	: message;
}

export default async function LogTable({
  logs,
}: {
  logs: FormattedLogTable[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${inter.className} mb-8 text-xl md:text-2xl`}>
        Logs
      </h1>
      <Search placeholder="Search logs..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="text-sm text-gray-500">
							{truncate(log.message, 30)}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/3 flex-col">
                        <p className="text-xs">Bot</p>
                        <p className="font-medium">{log.botName}</p>
                      </div>
                      <div className="flex w-1/3 flex-col">
                        <p className="text-xs">Worker</p>
                        <p className="font-medium">{log.workerName}</p>
                      </div>
                      <div className="flex w-1/3 flex-col">
                        <p className="text-xs">Created</p>
                        <p className="font-medium">{log.created}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Mesage
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Bot
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Worker
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Created
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {logs.map((log) => (
                    <tr key={log.id} className="group">
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {truncate(log.message, 30)}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {log.botName}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {log.workerName}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {formatUnixTimestamp(log.created)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
