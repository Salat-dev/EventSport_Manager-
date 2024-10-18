import { render, screen, waitFor } from '@testing-library/react';
import KarateCalendar from './KarateCalendar';
import { supabase } from './supabaseClient';

jest.mock('./supabaseClient'); // Mock the Supabase client

test('fetches events on mount', async () => {
  supabase.from.mockReturnValueOnce({
    select: jest.fn().mockResolvedValue({
      data: [
        {
          id: 1,
          title: 'Karate Event',
          period_start: '2024-10-10T08:00:00',
          period_end: '2024-10-10T10:00:00',
          is_draft: false,
        },
      ],
      error: null,
    }),
  });

  render(<KarateCalendar />);
  
  await waitFor(() => {
    const eventTitle = screen.getByText('Karate Event');
    expect(eventTitle).toBeInTheDocument();
  });
});
