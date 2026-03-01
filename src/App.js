import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import TablesList from './components/pages/TablesList';
import TableDetails from './components/pages/TableDetails';
import NotFound from './components/pages/NotFound';
import Header from './components/views/Header';
import Footer from './components/views/Footer';

function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<TablesList />} />
        <Route path="/table/:id" element={<TableDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
