import './App.css';
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import MovieRent from "./components/MovieRent";
import OptionsList from "./components/OptionsList";
import styled from 'styled-components';
import Sidebar from "./components/Sidebar";
import { handleGetOptions } from "./api/Api";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";

const AppWrapper = styled.div`
  display: flex;
`;

function App() {
  const [ sidebarOptions, setSidebarOptions ] = useState([]);
  useEffect(() => {
    //obteniendo la list de opciones
    handleGetOptions()
    .then((response) => response.json())
    .then((data) => setSidebarOptions(data))
    .catch((error) => console.error('Error fetching options:', error));

  }, []);
  //Actualiza la lista de opciones cuando se cambia el estado
  const updateSidebarOptions = (updatedOptions) => {
    setSidebarOptions(updatedOptions);
  };

  return (
    <Router>
      <AppWrapper>
        <Sidebar options={sidebarOptions} />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/pelicula-ingreso" element={<MovieForm />} />
          <Route path="/pelicula-listado" element={<MovieList />} />
          <Route path="/renta-pelicula" element={<MovieRent />} />
          <Route path="/opciones-admin" element={<OptionsList options={sidebarOptions} onUpdateOptions={updateSidebarOptions} />} />
        </Routes>
        </AppWrapper>
    </Router>
    
  );
}

export default App;
