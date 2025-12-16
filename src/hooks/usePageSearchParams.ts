import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

type SearchParamsReturn = {
  searchParams: URLSearchParams;
  setSearchParams: ReturnType<typeof useSearchParams>[1];
  page: number;
  searchName: string;
};

export function usePageSearchParams(): SearchParamsReturn {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize page parameter if missing
  useEffect(() => {
    if (!searchParams.has('page')) {
      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.set('page', '1');
          return newParams;
        },
        { replace: true }
      );
    }
  }, [searchParams, setSearchParams]);

  const page = parseInt(searchParams.get('page') || '1', 10);
  const searchName = searchParams.get('name') || '';

  return {
    searchParams,
    setSearchParams,
    page,
    searchName,
  };
}
