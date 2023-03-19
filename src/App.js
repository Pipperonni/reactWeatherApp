import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Profile from './views/Profile'
import WeatherDetails from './views/WeatherDetails';
import Protected from './components/Protected';

function App() {
  return(
    <BrowserRouter>
      <div></div>
      <Routes>
        <Route path="/" element={<Profile/>}/>
        <Route path="/post/:uid/:id" element={<Protected><WeatherDetails/></Protected>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

