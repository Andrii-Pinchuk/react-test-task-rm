import { useQuery } from '@apollo/client/react';
import { Box, Typography, CircularProgress, Alert, Pagination, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { GET_CHARACTERS } from '../apollo/queries';
import type { CharactersResponse } from '../types/api';
import CharacterCard from '../components/CharacterCard';
import SearchField from '../components/ui/SearchField';
import { usePageSearchParams } from '../hooks/usePageSearchParams.ts';

type Status = 'all' | 'alive' | 'dead' | 'unknown';

function CharactersPage() {
  const { searchParams, setSearchParams, page, searchName } = usePageSearchParams();

  const status = (searchParams.get('status') || 'all') as Status;

  const { loading, error, data } = useQuery<CharactersResponse>(GET_CHARACTERS, {
    variables: {
      page,
      filter: {
        ...(searchName && { name: searchName }),
        ...(status !== 'all' && { status }),
      },
    },
  });

  const handleSearch = (value: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value) {
        newParams.set('name', value);
      } else {
        newParams.delete('name');
      }
      newParams.set('page', '1');
      return newParams;
    });
  };

  const handleStatusChange = (_event: React.MouseEvent<HTMLElement>, newStatus: Status | null) => {
    if (newStatus !== null) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (newStatus !== 'all') {
          newParams.set('status', newStatus);
        } else {
          newParams.delete('status');
        }
        newParams.set('page', '1');
        return newParams;
      });
    }
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('page', value.toString());
      return newParams;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Search and Filter Row */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        {/* Search Field */}
        <SearchField onSearch={handleSearch} label="Search characters by name" defaultValue={searchName} />

        {/* Status Filter */}
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Status
          </Typography>
          <ToggleButtonGroup
            value={status}
            exclusive
            onChange={handleStatusChange}
            color="primary"
            sx={{
              height: '40px',
              '& .MuiToggleButton-root': {
                height: '40px',
              },
            }}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="alive">Alive</ToggleButton>
            <ToggleButton value="dead">Dead</ToggleButton>
            <ToggleButton value="unknown">Unknown</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Error loading characters: {error.message}
        </Alert>
      )}

      {/* Characters Grid */}
      {data?.characters?.results && data.characters.results.length > 0 && (
        <>
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
            {data.characters.results.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </Box>

          {/* Pagination */}
          {data.characters.info && data.characters.info.pages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={data.characters.info.pages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}

      {/* No Results */}
      {data?.characters?.results && data.characters.results.length === 0 && (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          No characters found
        </Typography>
      )}
    </Box>
  );
}

export default CharactersPage;
