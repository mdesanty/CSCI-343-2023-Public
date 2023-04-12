import 'bootstrap/dist/css/bootstrap.css';

import './App.css';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './components/Home';
import Books from './components/Books';
import NewBook from './components/Books/NewBook';
import Authors from './components/Authors';
import EditAuthor from './components/Authors/EditAuthor';
import NewAuthor from './components/Authors/NewAuthor';
import NotFound from './components/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/books' element={<Books />} />
          <Route path='/books/new' element={<NewBook />} />
          <Route path='/authors' element={<Authors />} />
          <Route path='/authors/new' element={<NewAuthor />} />
          <Route path='/authors/:id/edit' element={<EditAuthor />} />
          <Route path='/*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
