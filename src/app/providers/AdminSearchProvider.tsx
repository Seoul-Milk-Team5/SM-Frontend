import { createContext, useContext, useState, ReactNode } from "react";

interface AdminSearchFilters {
  provider?: string;
  consumer?: string;
  employeeId?: string;
  startDate?: Date | undefined;
  endDate?: Date | undefined;
  period?: number | null;
  status?: string | null;
  page?: number;
  size?: number;
}

interface AdminSearchContextType {
  filters: AdminSearchFilters;
  setFilters: (filters: Partial<AdminSearchFilters>) => void;
  getSearchParams: () => { [key: string]: any };
}

const SearchContext = createContext<AdminSearchContextType | null>(null);

export const AdminSearchProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFiltersState] = useState<AdminSearchFilters>({
    provider: "",
    consumer: "",
    employeeId: "",
    startDate: undefined,
    endDate: undefined,
    period: null,
    status: null,
    page: 1,
    size: 10,

  });

  const setFilters = (newFilters: Partial<AdminSearchFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  };

  const getSearchParams = () => {
    const { provider, consumer, employeeId, period, status, page, size, startDate, endDate } = filters;

    const searchParams: { [key: string]: any } = {
      provider,
      consumer,
      employeeId,
      period,
      status,
      page,
      size,
      startDate,
      endDate,
    };

    return Object.fromEntries(Object.entries(searchParams).filter(([_, v]) => v != null));
  };

  return (
    <SearchContext.Provider value={{ filters, setFilters, getSearchParams }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useAdminSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
