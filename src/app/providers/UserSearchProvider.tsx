import { createContext, useContext, useState } from "react";


interface SearchFilters {
  provider?: string;
  consumer?: string;
  employeeId?: string;
  date?: { from: Date; to: Date; } | null;
  period?: number;
  status?: string | null;
  page?: number;
  size?: number;
  setFilters: (filters: Partial<SearchFilters>) => void;
  getSearchParams: () => { [key: string]: any };
}


const SearchContext = createContext<SearchFilters | null>(null);


export const UserSearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFiltersState] = useState<SearchFilters>({
    provider: "",
    consumer: "",
    employeeId: "",
    date: null,
    period: 0,
    status: null,
    page: 1,
    size: 10,
    setFilters: () => {},
    getSearchParams: () => {  // getSearchParams 구현
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
  
        // date 필터가 있을 경우 처리
        if (date) {
          searchParams.dateFrom = date.from?.toISOString();
          searchParams.dateTo = date.to?.toISOString();
        }
  
        // undefined나 null 값을 가진 프로퍼티는 제외한 객체 반환
        return Object.fromEntries(Object.entries(searchParams).filter(([_, v]) => v != null));
      },
  });

  const setFilters = (newFilters: Partial<SearchFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  };


  return (
    <SearchContext.Provider value={{ ...filters, setFilters }}>
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
