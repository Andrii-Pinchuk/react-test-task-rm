import { Button } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

type BackButtonProps = {
  defaultPath: string;
};

function BackButton({ defaultPath }: BackButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    const state = location.state as { from?: string } | null;
    if (state?.from) {
      void navigate(state.from);
    } else {
      void navigate(defaultPath);
    }
  };

  return (
    <Button
      startIcon={<ChevronLeft />}
      onClick={handleBack}
      sx={{ mb: 3, textTransform: 'none', color: 'text.secondary' }}
    >
      back
    </Button>
  );
}

export default BackButton;
