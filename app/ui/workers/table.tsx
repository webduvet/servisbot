import { inter } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import {
  FormattedWorkerTable,
} from '@/app/lib/definitions';
import { formatUnixTimestamp } from '@/app/lib/utils';
import {
	FolderIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import clsx from 'clsx';

const getLinks = (id?: string) => ([
	{
		name: 'Logs',
		href: !id ? '/dashboard/logs' : '/dashboard/logs' + '?worker=' + id,
		icon: FolderIcon,
	}
]);

function getLink(name: string, id?: string) {
	const links = getLinks(id);
	const link = links.find((link) => link.name === name);
	console.log('link', link)
	if (!link) {
		return
	}
	const LinkIcon = link.icon;
	return (
		<Link
			key={link.name}
			href={link.href}
			className={clsx(
				"flex h-[32px] grow items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-300 md:flex-none md:justify-start md:p-2 md:px-3"
			)}
				  >
			<LinkIcon className="w-6" />
		</Link>
	)
}

export default async function WorkerTable({
  workers,
}: {
  workers: FormattedWorkerTable[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${inter.className} mb-8 text-xl md:text-2xl`}>
        Workers
      </h1>
      <Search placeholder="Search workers..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {workers?.map((worker) => (
                  <div
                    key={worker.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <p>{worker.name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {worker.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Bot</p>
                        <p className="font-medium">{worker.botName}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Bot Status</p>
                        <p className="font-medium">{worker.created}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>{worker.total_logs}</p>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Description
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Bot
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Created
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Logs
                    </th>
                    <th scope="col" className="px-6 py-5 font-medium">
                      Show Logs
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {workers.map((worker) => (
                    <tr key={worker.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>{worker.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {worker.description}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {worker.botName}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {formatUnixTimestamp(worker.created)}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {worker.total_logs}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {getLink('Logs', worker.id)}
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
