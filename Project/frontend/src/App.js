import { useState } from 'react';
import { CircularProgress } from '@mui/material';

import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Clusters from './components/Clusters';

const MAKUP = [{title: "Forrest Gump", imdb_id: "tt0109830"}, {title: "The Batman", imdb_id: "tt1877830"}]

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="clusters/:imdb_id" element={<Clusters />} />
      </Routes>
    </div>
  );
}

export default App;
