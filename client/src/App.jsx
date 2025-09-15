import { BrowserRouter, Route, Routes } from 'react-router'
import { RegisterPage } from './pages/RegisterPage'
import './index.css'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
