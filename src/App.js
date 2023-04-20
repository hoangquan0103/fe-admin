import { Box, Card, Container } from '@mui/material';
import {
  Route,
  Routes,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import NavChild from './components/NavChild';
import ManagePage from './container/ManagePage';
import HomePage from './container/HomePage';
import AddPageV2 from './container/AddPageV2';
import SignIn from './container/LoginPage';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOption } from './config/toast.config';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        {location.pathname != '/signup' && location.pathname != '/login' ? (
          <Nav />
        ) : (
          <></>
        )}
        <Box sx={{ width: '80%' }}>
          {location.pathname != '/signup' && location.pathname != '/login' ? (
            <Header />
          ) : (
            <></>
          )}
          {location.pathname != '/signup' && location.pathname != '/login' ? (
            <NavChild />
          ) : (
            <></>
          )}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/manage">
              <Route path=":id" element={<ManagePage />} />
            </Route>
            <Route path="/add">
              <Route path=":id" element={<AddPageV2 />} />
            </Route>
            <Route path="/edit">
              <Route path=":book">
                <Route path=":id" element={<AddPageV2 />} />
              </Route>
            </Route>
          </Routes>
        </Box>
      </Box>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
