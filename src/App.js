import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TablesList from './components/pages/TablesList';
import TableDetails from './components/pages/TableDetails';
import NotFound from './components/pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TablesList />} />
      <Route path="/table/:id" element={<TableDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
