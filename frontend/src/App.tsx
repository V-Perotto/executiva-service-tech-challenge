import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './HOC/PrivateRoute';
import AuthProvider from './context/auth/AuthProvider';
import TodoProvider from './context/todo/TodoProvider';
import { Login, Register, TodoLayout, Page404 } from './components';
import PublicRoute from './HOC/PublicRoute';

function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        <Router>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route element={<TodoLayout />} path='/' />
            </Route>
            <Route element={<PublicRoute />}>
              <Route path='/user/login' element={<Login />} />
              <Route path='/user/register' element={<Register />} />
            </Route>
            <Route path='*' element={<Page404 />} />
          </Routes>
        </Router>
      </TodoProvider>
    </AuthProvider>
  );
}

export default App;
