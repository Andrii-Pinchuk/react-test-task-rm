import { Card, CardContent, Typography, Box } from '@mui/material';
import { AccessTime } from '@mui/icons-material';
import type { Episode } from '../types/api';
import { useNavigate, useLocation } from 'react-router-dom';

type EpisodeCardProps = {
  episode: Episode;
};

function EpisodeCard({ episode }: EpisodeCardProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    // Pass current location to preserve page state for back navigation
    void navigate(`/episodes/${episode.id}`, {
      state: { from: `${location.pathname}${location.search}` },
    });
  };

  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
      onClick={handleClick}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Episode Image Placeholder */}
        <Box
          sx={{
            position: 'relative',
            left: '-16px',
            right: '-16px',
            top: '-16px',
            width: 'calc(100% + 32px)',
            height: 100,
            bgcolor: 'primary.main',
          }}
        />

        {/* Episode Info Wrapper (Number and Name) */}
        <Box sx={{ flex: 1 }}>
          {/* Episode Number */}
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {episode.episode}
          </Typography>

          {/* Episode Name */}
          <Typography variant="h6" component="div">
            {episode.name}
          </Typography>
        </Box>

        {/* Air Date with Clock Icon */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
          <AccessTime fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {episode.air_date}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default EpisodeCard;
