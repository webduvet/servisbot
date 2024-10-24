// __tests__/Search.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Search from '@/app/ui/search'; // Adjust path as needed
import '@testing-library/jest-dom';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

// Mock next/navigation hooks
jest.mock('next/navigation', () => ({
	useRouter: jest.fn(),
	usePathname: jest.fn(),
	useSearchParams: jest.fn(),
}));

// Mock use-debounce
jest.mock('use-debounce', () => ({
	useDebouncedCallback: jest.fn(),
}));

describe('Search Component', () => {
	const mockReplace = jest.fn();
	const mockDebounce = jest.fn((callback) => callback);

	beforeEach(() => {
		jest.clearAllMocks();
		(useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
		(usePathname as jest.Mock).mockReturnValue('/test');
		(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(''));
		(useDebouncedCallback as jest.Mock).mockReturnValue(mockDebounce);
	});

	it('renders the search input with the correct placeholder', () => {
		render(<Search placeholder="Search logs..." />);
		expect(screen.getByPlaceholderText('Search logs...')).toBeInTheDocument();
	});

	xit('updates the query parameter when typing in the input', async () => {
		render(<Search placeholder="Search logs..." />);

		const input = screen.getByPlaceholderText('Search logs...');

		// Simulate typing into the search input
		fireEvent.change(input, { target: { value: 'test query' } });

		// Wait for the debounced function to be called
		await waitFor(() => {
			expect(mockReplace).toHaveBeenCalledWith('/test?page=1&query=test%20query');
		});
	});

	xit('removes the query parameter when the input is cleared', async () => {
		render(<Search placeholder="Search logs..." />);

		const input = screen.getByPlaceholderText('Search logs...');

		// Simulate typing into the search input
		fireEvent.change(input, { target: { value: '' } });

		// Wait for the debounced function to be called
		await waitFor(() => {
			expect(mockReplace).toHaveBeenCalledWith('/test?page=1');
		});
	});
});
