import './App.css';
import { useState, useEffect, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Ranking from './pages/Ranking';
import Scoreboard from './pages/Scoreboard';
import Challenge from './pages/Challenge';
import ProblemDetail from './pages/ProblemDetail';
import MyPage from './pages/MyPage';
import AdminLogin from './pages/AdminLogin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import AdminAuth from './api/AdminAuth';
import Loading from './components/Loading';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedLoginStatus = localStorage.getItem('isLoggedIn');
    return savedLoginStatus === 'true';
  });

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loginStatus);
  }, []);

  return (
    <Router>
      <Header />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/ranking'
            element={isLoggedIn ? <Ranking /> : <Navigate to='/login' />}
          />
          <Route
            path='/scoreboard'
            element={isLoggedIn ? <Scoreboard /> : <Navigate to='/login' />}
          />
          <Route
            path='/challenge'
            element={isLoggedIn ? <Challenge /> : <Navigate to='/login' />}
          />
          <Route path='/problem/:id' element={<ProblemDetail />} />
          <Route
            path='/myPage'
            element={isLoggedIn ? <MyPage /> : <Navigate to='/login' />}
          />
          <Route path='/adminLogin' element={<AdminLogin />} />
          <Route
            path='/login'
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path='/signup' element={<Signup />} />
          <Route
            path='/adminPage'
            element={
              <AdminAuth>
                <Admin />
              </AdminAuth>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
