import './App.css';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './components/Home';
import Authors from './components/Authors';
import Books from './components/Books';
import NotFound from './components/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/authors' element={<Authors />} />
          <Route path='/books' element={<Books />} />
          <Route path='/*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
