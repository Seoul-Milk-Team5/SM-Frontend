import { createContext, useContext, useState, ReactNode } from "react";

interface SearchFilters {
  provider?: string;
  consumer?: string;
  employeeId?: string;
  date?: { from: Date; to: Date } | null;
  period?: number;
  status?: string | null;
  page?: number;
  size?: number;
}

interface SearchContextType {
  filters: SearchFilters;
  setFilters: (filters: Partial<SearchFilters>) => void;
  getSearchParams: () => { [key: string]: any };
}

const SearchContext = createContext<SearchContextType | null>(null);

export const UserSearchProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFiltersState] = useState<SearchFilters>({
    provider: "",
    consumer: "",
    employeeId: "",
    date: null,
    period: 0,
    status: null,
    page: 1,
    size: 10,
  });

  const setFilters = (newFilters: Partial<SearchFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  };

  const getSearchParams = () => {
    const { provider, consumer, employeeId, date, period, status, page, size } = filters;

    const searchParams: { [key: string]: any } = {
      provider,
      consumer,
      employeeId,
      period,
      status,
      page,
      size,
    };

    if (date) {
      searchParams.dateFrom = date.from?.toISOString();
      searchParams.dateTo = date.to?.toISOString();
    }

    return Object.fromEntries(Object.entries(searchParams).filter(([_, v]) => v != null));
  };

  return (
    <SearchContext.Provider value={{ filters, setFilters, getSearchParams }}>
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
