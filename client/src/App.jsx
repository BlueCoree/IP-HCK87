import { BrowserRouter, Outlet, Route, Routes } from 'react-router'
import { RegisterPage } from './pages/RegisterPage'
import './index.css'
import { LoginPage } from './pages/LoginPage'
import { HomePage } from './pages/HomePage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/*' element={<MainRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

function MainLayout() {
  return (
    <div>
      <Outlet />
    </div>
  )
}

function MainRoutes() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export default App
