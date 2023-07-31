import React, { useState, useEffect } from 'react';
import { getMovies } from '../api/Api'; 
import styled from 'styled-components';
import DatePicker from 'react-datepicker';

const MovieCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  margin: 8px;
  flex-basis: calc(25% - 16px);
  flex-grow: 1; 
  box-sizing: border-box;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px; 
  margin: 0 auto;
`;

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(8);
  const [releaseDateFilter, setReleaseDateFilter] = useState(null);
  const [filteredAndPaginatedMovies, setFilteredAndPaginatedMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const moviesData = await getMovies();
      setMovies(moviesData);
      setFilteredAndPaginatedMovies(moviesData);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleReleaseDateFilterChange = (date) => {
    // El componente DatePicker devuelve un objeto Date o null si no se selecciona ninguna fecha.
    setReleaseDateFilter(date);
    setCurrentPage(1);
  };

 
  const handleFilterButtonClick = () => {
    if (!releaseDateFilter) {
      // Si no hay filtro, mostrar todas las películas
      setFilteredAndPaginatedMovies(movies);
    } else {
      // Realiza el filtrado manualmente con el valor actual de releaseDateFilter
      // y actualiza el listado de películas filtradas
      const formattedDate = releaseDateFilter.toISOString().split('T')[0];
      const filteredMovies = movies.filter((movie) =>
        movie.date.includes(formattedDate)
      );

      setFilteredAndPaginatedMovies(filteredMovies);
    }
  };

  const handleClearFilterClick = () => {
    // Limpiar el filtro estableciendo el estado de releaseDateFilter a null
    setReleaseDateFilter(null);
    // Reiniciar la paginación para mostrar todas las películas desde la primera página
    //setCurrentPage(1);
    setFilteredAndPaginatedMovies(movies); 
  };
  

  // Calcular índices para la paginación
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredAndPaginatedMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  return (
    <div>
      <h2>Listado de Películas</h2>

      <label htmlFor="releaseDateFilter">Filtrar por Fecha de Estreno:</label>
      <DatePicker
        id="releaseDateFilter"
        selected={releaseDateFilter}
        onChange={handleReleaseDateFilterChange}
        dateFormat="yyyy-MM-dd"
      />

      <button onClick={handleFilterButtonClick}>Filtrar</button>
      <button onClick={handleClearFilterClick}>Limpiar</button>
      <MovieListContainer>
      {currentMovies.map((movie) => (
        <MovieCard key={movie.id}>
          <h3>{movie.name}</h3>
          <p>Fecha de Estreno: {movie.date}</p>
          <p>Duración: {movie.duration} minutos</p>
          <p>Presupuesto: ${movie.budget}</p>
        </MovieCard>
      ))}
      </MovieListContainer>

      {/* Paginación */}
      <div>
        {Array.from({ length: Math.ceil(filteredAndPaginatedMovies.length / moviesPerPage) }).map(
          (_, index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default MovieList;
