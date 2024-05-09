import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import ResumePage from './Pages/ResumePage'
import NotFoundPage from './Pages/NotFoundPage'

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/:username' element={<ResumePage/>} />
        <Route path='/not-found' element={<NotFoundPage/>} />
      </Routes>
    </Router>
  )
}

export default App
