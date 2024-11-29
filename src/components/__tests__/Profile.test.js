import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Profile from '../Profile';
import { auth } from '../../firebase';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';

// Mock Firebase
jest.mock('../../firebase', () => ({
  auth: {
    currentUser: {
      uid: 'test-user-id'
    }
  },
  db: {
    collection: jest.fn(),
    doc: jest.fn(),
  }
}));

// Mock Firestore
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn()
}));

describe('Profile Component', () => {
  const mockTrips = [
    {
      id: '1',
      destination: 'Paris',
      budget: 'medium',
      duration: '7 days',
      userId: 'test-user-id'
    },
    {
      id: '2',
      destination: 'Tokyo',
      budget: 'high',
      duration: '10 days',
      userId: 'test-user-id'
    }
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Mock the Firebase query chain
    getDocs.mockResolvedValue({
      docs: mockTrips.map(trip => ({
        id: trip.id,
        data: () => trip
      }))
    });
  });

  test('renders loading state initially', () => {
    render(<Profile />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders trips after loading', async () => {
    render(<Profile />);
    
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Tokyo')).toBeInTheDocument();
  });

  test('displays correct budget labels', async () => {
    render(<Profile />);
    
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText('Budget: MEDIUM')).toBeInTheDocument();
    expect(screen.getByText('Budget: HIGH')).toBeInTheDocument();
  });

  test('handles trip deletion', async () => {
    deleteDoc.mockResolvedValue();
    
    render(<Profile />);
    
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByText(/delete/i);
    await userEvent.click(deleteButtons[0]);

    expect(deleteDoc).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.queryByText('Paris')).not.toBeInTheDocument();
    });
  });

  test('handles trip deletion error', async () => {
    const mockError = new Error('Failed to delete');
    deleteDoc.mockRejectedValue(mockError);
    
    render(<Profile />);
    
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByText(/delete/i);
    await userEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/failed to delete trip/i)).toBeInTheDocument();
    });
  });

  test('displays message when no trips are available', async () => {
    getDocs.mockResolvedValue({ docs: [] });
    
    render(<Profile />);
    
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/no trips planned yet/i)).toBeInTheDocument();
  });

  test('handles error when fetching trips', async () => {
    const mockError = new Error('Failed to fetch');
    getDocs.mockRejectedValue(mockError);
    
    render(<Profile />);
    
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/error fetching trips/i)).toBeInTheDocument();
  });
});
