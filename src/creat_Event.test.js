import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // pour les matchers comme toBeInTheDocument
import EventForm from './EventForm';

// Mock de Supabase et de la fonction notification d'antd
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    storage: {
      from: jest.fn(() => ({
        upload: jest.fn().mockResolvedValue({ data: { path: 'fake/path/to/logo.png' }, error: null }),
      })),
    },
    from: jest.fn(() => ({
      insert: jest.fn().mockResolvedValue({ error: null }),
    })),
  })),
}));

jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  notification: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('EventForm Component', () => {
  test('renders the event form correctly', () => {
    render(<EventForm />);

    // Vérifier si les éléments du formulaire sont présents
    expect(screen.getByLabelText(/Titre de l'évènement/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Lieu/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Période de l'évènement/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date limite des inscriptions/i)).toBeInTheDocument();
  });

  test('submits the form correctly', async () => {
    render(<EventForm />);

    // Remplir les champs du formulaire
    fireEvent.change(screen.getByLabelText(/Titre de l'évènement/i), { target: { value: 'Tournoi de Karaté' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Un grand tournoi de karaté' } });
    fireEvent.change(screen.getByLabelText(/Lieu/i), { target: { value: 'Paris' } });

    // Remplir la date (on ne va pas tester RangePicker ici, on se concentre sur la soumission)
    fireEvent.click(screen.getByRole('button', { name: /Créer l'évènement/i }));

    // Attendre la soumission et les notifications de succès
    await waitFor(() => {
      expect(screen.getByText(/évènement crée avec succès/i)).toBeInTheDocument();
    });
  });
});
