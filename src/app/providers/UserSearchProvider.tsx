import { createContext, useContext, useState, ReactNode, useMemo } from "react";

interface SearchFilters {
  provider?: string;
  consumer?: string;
  name?: string;
  startDate?: Date | undefined;
  endDate?: Date | undefined;
  period?: number | null;
  status?: string | null;
  page?: number;
  size?: number;
}

interface SearchContextType {
  filters: SearchFilters;
  setFilters: (filters: Partial<SearchFilters>) => void;
  getSearchParams: () => { [key: string]: any };
  isInitialState: () => boolean; // ✅ 함수 타입 유지
}

const SearchContext = createContext<SearchContextType | null>(null);

export const UserSearchProvider = ({ children }: { children: ReactNode }) => {
  
  const initialFilterState: SearchFilters = {
    provider: "",
    consumer: "",
    name: "",
    startDate: undefined,
    endDate: undefined,
    period: null,
    status: null,
    page: 1,
    size: 10,
  };

  const [filters, setFiltersState] = useState<SearchFilters>(initialFilterState);

  const setFilters = (newFilters: Partial<SearchFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  };

  const getSearchParams = () => {
    const { provider, consumer, name, period, status, page, size, startDate, endDate } = filters;

    const searchParams: { [key: string]: any } = {
      provider,
      consumer,
      name,
      period,
      status,
      page,
      size,
      startDate,
      endDate,
    };

    return Object.fromEntries(Object.entries(searchParams).filter(([_, v]) => v != null));
  };

  // ✅ 초기 상태인지 확인하는 함수로 변경
  const isInitialState = useMemo(() => {
    return () => {
      return JSON.stringify(filters) === JSON.stringify(initialFilterState);
    };
  }, [filters]);

  return (
    <SearchContext.Provider value={{ filters, setFilters, getSearchParams, isInitialState }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
