import { createContext, ReactNode, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { fetchData } from "../services/dataService";
import { Eventos, eventKeys, EventKey } from "../interfaces/eventos";

export interface AuthContextType {
  data: Eventos[];
  page: number;
  totalPages: number;
  totalRecords: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (pageNumber: number) => void;
  isLoading: boolean;
  setFilter: (filter: string) => void;
  setSearchQuery: (query: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(initialPage);
  const [totalRecords, setTotalRecords] = useState(0);
  const [filteredData, setFilteredData] = useState<Eventos[]>([]);
  const [allData, setAllData] = useState<Eventos[]>([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const recordsPerPage = 25;

  const { data, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: fetchData,
    staleTime: 5000,
  });

  useEffect(() => {
    if (data) {
      const now = new Date();
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(now.getMonth() - 3);
      const oneYearLater = new Date();
      oneYearLater.setFullYear(now.getFullYear() + 1);

      const filtered = data.data.filter((event: Eventos) => {
        const dataInici = new Date(event.data_inici);

        if (
          filter === "thisYear" &&
          dataInici.getFullYear() !== now.getFullYear()
        ) {
          return false;
        }

        return (
          event.data_inici !== "9999-09-09T00:00:00.000" &&
          dataInici >= threeMonthsAgo &&
          dataInici <= oneYearLater
        );
      });

      setAllData(filtered);
      setFilteredData(filtered);
      setTotalRecords(filtered.length);
    }
  }, [data, filter]);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(allData);
    } else {
      setFilteredData(
        allData.filter((event) =>
          eventKeys.some((field: EventKey) =>
            event[field]?.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
      );
    }
  }, [searchQuery, allData]);

  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const nextPage = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      setSearchParams({ page: newPage.toString() });
    }
  };

  const prevPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      setSearchParams({ page: newPage.toString() });
    }
  };

  const goToPage = (pageNumber: number) => {
    setPage(pageNumber);
    setSearchParams({ page: pageNumber.toString() });
  };

  const paginatedData = filteredData.slice(
    (page - 1) * recordsPerPage,
    page * recordsPerPage
  );

  return (
    <AuthContext.Provider
      value={{
        data: paginatedData,
        page,
        totalPages,
        totalRecords,
        nextPage,
        prevPage,
        goToPage,
        isLoading,
        setFilter,
        setSearchQuery,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
