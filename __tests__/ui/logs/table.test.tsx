/* globals describe, it, expect */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LogTable from '@/app/ui/logs/table';

// Mock necessary external dependencies
jest.mock('@/app/ui/fonts', () => ({
	inter: { className: 'mocked-inter-font' },
}));

jest.mock('@/app/lib/utils', () => ({
	formatUnixTimestamp: jest.fn((timestamp: number) => `Formatted: ${timestamp}`),
}));

const logs = [
	{
		id: '1',
		message: 'This is a test log message',
		botName: 'TestBot1',
		workerName: 'Worker1',
		created: 1634102400, // Example timestamp
	},
	{
		id: '2',
		message: 'Another log message for testing',
		botName: 'TestBot2',
		workerName: 'Worker2',
		created: 1635002400,
	},
];
 
describe('Logs Page', () => {
	xit('renders a heading', async () => {
		render(<LogTable logs={logs} />);

		const heading = await screen.getByRole('heading', { level: 1 })

		expect(heading).toBeInTheDocument()
	})
})
