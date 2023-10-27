import { useState, useEffect, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import HuntLog from './routes/HuntLog'
import MiniDrawer from './muiComponents/MiniDrawer'
import Home from './routes/Home'
import Login from './routes/Login'
import StartHere from './routes/StartHere'
import UserProfile from './routes/UserProfile'
import Scoring from './routes/Scoring'
import FinishLog from './routes/FinishLog'
import CoinDetails from './routes/CoinDetails'
import { useNavigate } from 'react-router-dom';




const CoinsContext = createContext();
export const CoinContext = createContext();



function App() {

const [foundCoins, setFoundCoins] = useState([])

const [formData, setFormData] = useState({ username: '', password: '' });
const [userToken, setUserToken] = useState(null)
const [checked, setChecked] = useState(false)
const [signUp, setSignUp ] = useState(false)

useEffect( () => {
  const token = localStorage.getItem("token")
  console.log(token)
  if(token) {
    setUserToken(token)
  }

}, [])

const handleToken = (token) => {
  setFormData({ username: '', password: '' })
  localStorage.setItem("token", token)
  setUserToken(token)
}

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

const handleOnClick = () => {
  setChecked(prev => !prev);
}

const handleLogout = () => {
  var keyToRemove = 'token';
localStorage.removeItem(keyToRemove);
setUserToken(null)
}

const handleSignUp = () => {
  setSignUp(true)
}

  return (
    <>
    <div className="app-container">
      
    <Router>
    <MiniDrawer handleLogout={handleLogout} userToken={userToken} />
    

        <CoinContext.Provider value={{ foundCoins, setFoundCoins }}>
     <Routes>
      <Route path="/login" element={<Login checked={checked} handleOnClick={handleOnClick} handleInputChange={handleInputChange} formData={formData} handleToken={handleToken} signUp={signUp} handleSignUp={handleSignUp} userToken={userToken} />} />
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<UserProfile userToken={userToken} />} />
      <Route path="/hunt-log" element={<HuntLog userToken={userToken} />} />
      <Route path="/scoring" element={<Scoring />} />
      <Route path="/start-here" element={<StartHere />} />
      <Route path="/finishlog" element={<FinishLog />} />
      <Route path="/coin/:id/details/" element={<CoinDetails />} />
     </Routes>
     </CoinContext.Provider>
     </Router>
     </div>
    </>
  )
}

export default App