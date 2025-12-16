import { useState, useRef, useCallback } from 'react';
import { Box, TextField, Typography } from '@mui/material';

type SearchFieldProps = {
  onSearch: (value: string) => void;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
};

const DEBOUNCE_DELAY = 300;

function SearchField({ onSearch, label = 'Search', placeholder, defaultValue = '' }: SearchFieldProps) {
  const [searchInput, setSearchInput] = useState(defaultValue);

  const debounceTimeout = useRef<number | null>(null);

  const debounce = useCallback((callback: () => void, delay: number) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(callback, delay);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInput(value);

    debounce(() => {
      onSearch(value);
    }, DEBOUNCE_DELAY);
  };

  return (
    <Box sx={{ mb: 3, maxWidth: 326 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Search
      </Typography>
      <TextField
        fullWidth
        label={label}
        placeholder={placeholder}
        variant="outlined"
        value={searchInput}
        onChange={handleSearchChange}
        size={'small'}
      />
    </Box>
  );
}

export default SearchField;
