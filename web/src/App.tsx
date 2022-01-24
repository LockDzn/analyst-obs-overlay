import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header'

import Home from './pages/Home'
import Games from './pages/Games'

import GamesOverlay from './pages/Overlays/Games'

import './styles/globals.scss'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />

          <Route path="/overlay/games" element={<GamesOverlay />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
