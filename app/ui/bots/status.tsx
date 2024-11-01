import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function BotStatus({ status }: { status: string }) {
	return (
		<span
			className={clsx(
				'inline-flex items-center rounded-full px-2 py-1 text-xs',
				{
					'bg-gray-100 text-gray-500': status === 'paused',
					'bg-green-500 text-white': status === 'enabled',
					'bg-red-500 text-white': status === 'disabled',
			},
			)}
		>
			{status === 'paused' ? (
				<>
					Paused
					<ClockIcon className="ml-1 w-4 text-gray-500" />
				</>
			) : null}
			{status === 'enabled' ? (
				<>
					Enabled
					<CheckIcon className="ml-1 w-4 text-white" />
				</>
			) : null}
			{status === 'disabled' ? (
				<>
					disabled
					<CheckIcon className="ml-1 w-4 text-white" />
				</>
			) : null}
		</span>
	);
}
