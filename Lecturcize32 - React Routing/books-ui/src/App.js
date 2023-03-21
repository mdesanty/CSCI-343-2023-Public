import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Authors from './components/Authors';
import Books from './components/Books';
import NotFound from './components/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
