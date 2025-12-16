import { Box, Typography, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { GET_EPISODE } from '../apollo/queries';
import type { EpisodeResponse } from '../types/api';
import CharacterCard from '../components/CharacterCard';
import BackButton from '../components/ui/BackButton';

function EpisodeDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { loading, error, data } = useQuery<EpisodeResponse>(GET_EPISODE, {
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
        <Typography color="error">Error loading episode: {error.message}</Typography>
      </Box>
    );
  }

  if (!data?.episode) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Episode not found</Typography>
      </Box>
    );
  }

  const { episode } = data;

  return (
    <Box sx={{ p: 3 }}>
      {/* Back Button */}
      <BackButton defaultPath="/episodes" />

      {/* Episode Info Section */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        {/* Episode Image Placeholder */}
        <Box
          sx={{
            width: 300,
            height: 300,
            borderRadius: 1,
            bgcolor: 'primary.main',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            p: 2,
          }}
        >
          <Typography variant="h5" align="center" sx={{ mb: 1 }}>
            {episode.name}
          </Typography>
          <Typography variant="body1" align="center">
            {episode.episode}
          </Typography>
        </Box>

        {/* Episode Details */}
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {episode.episode}
          </Typography>
          <Typography variant="h4" gutterBottom>
            {episode.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Air date:{' '}
            <Box component="span" sx={{ fontWeight: 'bold' }}>
              {episode.air_date}
            </Box>
          </Typography>
        </Box>
      </Box>

      {/* Characters Section */}
      {episode.characters && episode.characters.length > 0 && (
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
            Characters
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
              gap: 3,
            }}
          >
            {episode.characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default EpisodeDetailPage;
