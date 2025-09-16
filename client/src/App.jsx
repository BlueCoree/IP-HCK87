import { BrowserRouter, Route, Routes } from 'react-router'
import { RegisterPage } from './pages/RegisterPage'
import './index.css'
import { LoginPage } from './pages/LoginPage'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
