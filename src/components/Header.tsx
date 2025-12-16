import { AppBar, Toolbar, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import mainLogo from '../assets/rick-and-morty-logo.webp';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentPage = () => {
    if (location.pathname.startsWith('/episodes')) return 'episodes';
    if (location.pathname.startsWith('/characters')) return 'characters';
    return 'episodes';
  };

  const handlePageChange = (_event: React.MouseEvent<HTMLElement>, newPage: string | null) => {
    if (newPage) {
      void navigate(`/${newPage}`);
    }
  };

  const handleLogoClick = () => {
    void navigate('/episodes');
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: { xs: '30px', sm: '35px', md: '40px', lg: '50px' },
            cursor: 'pointer',
          }}
          onClick={handleLogoClick}
        >
          <img src={mainLogo} alt="Rick and Morty" style={{ height: '100%', display: 'block' }} />
        </Box>

        <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <ToggleButtonGroup
            value={getCurrentPage()}
            exclusive
            onChange={handlePageChange}
            aria-label="page navigation"
            color="primary"
            size="small"
            sx={{
              '& .MuiToggleButton-root': {
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                px: { xs: 1, sm: 1.5, md: 2 },
                py: { xs: 0.5, sm: 0.75, md: 1 },
              },
            }}
          >
            <ToggleButton value="characters" aria-label="characters page">
              Characters
            </ToggleButton>
            <ToggleButton value="episodes" aria-label="episodes page">
              Episodes
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
