import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route } from 'react-router-dom';
import ApplicationLayout from './layouts/ApplicationLayout';

import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Songs from './components/Songs';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';

function App() {
  return (
    <Routes>
      <Route element={<ApplicationLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route element={<AuthenticatedLayout />}>
          <Route path='/songs' element={<Songs />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
