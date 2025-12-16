import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import EpisodesPage from '../pages/EpisodesPage';
import EpisodeDetailPage from '../pages/EpisodeDetailPage';
import CharactersPage from '../pages/CharactersPage';
import CharacterDetailPage from '../pages/CharacterDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/episodes" replace />,
      },
      {
        path: 'episodes',
        element: <EpisodesPage />,
      },
      {
        path: 'episodes/:id',
        element: <EpisodeDetailPage />,
      },
      {
        path: 'characters',
        element: <CharactersPage />,
      },
      {
        path: 'characters/:id',
        element: <CharacterDetailPage />,
      },
    ],
  },
]);
