import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { CardComponent } from "../components/CardComponent";
import { Eventos } from "../interfaces/eventos";
import LoaderComponent from "../components/LoaderComponent";
import Masonry from "react-masonry-css";
import FilterSelect from "../components/FilterSelect";
import SearchInput from "../components/SearchInput";
import Paginator from "../components/Paginator";

const Home: React.FC = () => {
  const {
    data,
    page,
    totalPages,
    totalRecords,
    nextPage,
    prevPage,
    isLoading,
    setFilter,
    setSearchQuery,
    goToPage,
  } = useAuth();

  const [filter, setLocalFilter] = useState("all");
  const [searchQuery, setLocalSearchQuery] = useState("");

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setLocalFilter(value);
    setFilter(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalSearchQuery(value);
    setSearchQuery(value);
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    700: 1,
  };

  return (
    <div className="mt-4">
      <h1 className="mb-4">Eventos</h1>

      <div className="d-flex justify-content-between align-items-center">
        <FilterSelect value={filter} onChange={handleFilterChange} />
        <SearchInput value={searchQuery} onChange={handleSearchChange} />
      </div>

      {isLoading ? (
        <LoaderComponent />
      ) : (
        <>
          <div className="mb-3">
            <Paginator
              page={page}
              totalPages={totalPages}
              nextPage={nextPage}
              prevPage={prevPage}
              goToPage={goToPage}
            />
          </div>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {data.map((event: Eventos, index: number) => (
              <div key={event.codi + index} className="masonry-item">
                <CardComponent dataEvent={event} />
              </div>
            ))}
          </Masonry>
          <p>Total registros obtenidos: {totalRecords}</p>
          <Paginator
            page={page}
            totalPages={totalPages}
            nextPage={nextPage}
            prevPage={prevPage}
            goToPage={goToPage}
          />
        </>
      )}
    </div>
  );
};

export default Home;
