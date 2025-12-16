import { useQuery } from '@apollo/client/react';
import { Box, Typography, CircularProgress, Alert, Pagination } from '@mui/material';
import { GET_EPISODES } from '../apollo/queries';
import type { EpisodesResponse } from '../types/api';
import EpisodeCard from '../components/EpisodeCard';
import SearchField from '../components/ui/SearchField.tsx';
import { usePageSearchParams } from '../hooks/usePageSearchParams.ts';

function EpisodesPage() {
  const { setSearchParams, page, searchName } = usePageSearchParams();

  const { loading, error, data } = useQuery<EpisodesResponse>(GET_EPISODES, {
    variables: {
      page,
      filter: searchName ? { name: searchName } : undefined,
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
      {/* Search Field */}
      <SearchField onSearch={handleSearch} label="Search episodes by name" defaultValue={searchName} />

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Error loading episodes: {error.message}
        </Alert>
      )}

      {/* Episodes Grid */}
      {data?.episodes?.results && data.episodes.results.length > 0 && (
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
            {data.episodes.results.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </Box>

          {/* Pagination */}
          {data.episodes.info && data.episodes.info.pages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={data.episodes.info.pages}
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
      {data?.episodes?.results && data.episodes.results.length === 0 && (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          No episodes found
        </Typography>
      )}
    </Box>
  );
}

export default EpisodesPage;
