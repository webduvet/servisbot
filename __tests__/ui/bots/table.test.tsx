/* globals describe, it, expect */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BotTable from '@/app/ui/bots/table';
import { FormattedBotTable } from '@/app/lib/definitions';
import { Suspense } from 'react';

const bots: FormattedBotTable[] = [
  {
    id: '1',
    name: 'Bot One',
    description: 'First bot description',
    total_workers: 5,
    status: 'active',
    created: 1634102400, // Example timestamp
    total_logs: 10,
  },
  {
    id: '2',
    name: 'Bot Two',
    description: 'Second bot description',
    total_workers: 3,
    status: 'inactive',
    created: 1635002400,
    total_logs: 5,
  },
];
 
describe('Page', () => {
	xit('renders a heading', async () => {
		shallow(
			await (async () => await BotTable({bots}))()
		)
		//render(
			//<Suspense>
			//<BotTable bots={bots}/>
			//</Suspense>
		//)

		const heading = await screen.getByRole('heading', { level: 1 })

		expect(heading).toBeInTheDocument()
	})
})
