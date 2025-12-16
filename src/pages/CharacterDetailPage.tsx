import { Box, Typography, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { GET_CHARACTER } from '../apollo/queries';
import type { CharacterResponse } from '../types/api';
import EpisodeCard from '../components/EpisodeCard';
import BackButton from '../components/ui/BackButton';

function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { loading, error, data } = useQuery<CharacterResponse>(GET_CHARACTER, {
    variables: { id },
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Error loading character: {error.message}</Typography>
      </Box>
    );
  }

  if (!data?.character) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Character not found</Typography>
      </Box>
    );
  }

  const { character } = data;

  return (
    <Box sx={{ p: 3 }}>
      {/* Back Button */}
      <BackButton defaultPath="/characters" />

      {/* Character Info Section */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        {/* Character Image */}
        <Box
          component="img"
          src={character.image}
          alt={character.name}
          sx={{
            width: 300,
            height: 300,
            borderRadius: 1,
            objectFit: 'cover',
          }}
        />

        {/* Character Details */}
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography variant="h4" gutterBottom>
            {character.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Gender:</strong> {character.gender}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Species:</strong> {character.species}
          </Typography>
          {character.type && (
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Type:</strong> {character.type}
            </Typography>
          )}
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Origin:</strong> {character.origin.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Location:</strong> {character.location.name}
          </Typography>
        </Box>
      </Box>

      {/* Episodes Section */}
      {character.episode && character.episode.length > 0 && (
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
            Episodes
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
              gap: 2,
            }}
          >
            {character.episode.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default CharacterDetailPage;
