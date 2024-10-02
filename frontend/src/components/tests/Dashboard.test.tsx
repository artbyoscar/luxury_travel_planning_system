// src/components/tests/Dashboard.test.tsx

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Dashboard from './Dashboard';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

jest.mock('../firebaseConfig', () => ({
  db: {
    collection: jest.fn(),
  },
  getDocs: jest.fn(),
}));

describe('Dashboard Component', () => {
  beforeEach(() => {
    (getDocs as jest.Mock).mockClear();
  });

  it('renders loading state initially', () => {
    render(<Dashboard />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays trips data after fetching', async () => {
    const mockTrips = [
      { id: '1', destination: 'Paris', startDate: '2023-12-01', endDate: '2023-12-10' },
      { id: '2', destination: 'New York', startDate: '2024-01-15', endDate: '2024-01-20' },
    ];
    
    (getDocs as jest.Mock).mockResolvedValue({
      docs: mockTrips.map(trip => ({ id: trip.id, data: () => trip })),
    });

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/paris/i)).toBeInTheDocument();
      expect(screen.getByText(/new york/i)).toBeInTheDocument();
    });
  });

  it('handles error state gracefully', async () => {
    (getDocs as jest.Mock).mockRejectedValue(new Error('Failed to fetch trips'));

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch trips/i)).toBeInTheDocument();
    });
  });
});