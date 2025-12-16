import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import type { Character } from '../types/api';
import { useNavigate, useLocation } from 'react-router-dom';

type CharacterCardProps = {
  character: Character;
};

function CharacterCard({ character }: CharacterCardProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    // Pass current location pathname + search to preserve page state
    void navigate(`/characters/${character.id}`, {
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
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={handleClick}
    >
      <CardMedia component="img" height="300" image={character.image} alt={character.name} />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Typography variant="h6" component="div" gutterBottom>
          {character.name}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CharacterCard;
