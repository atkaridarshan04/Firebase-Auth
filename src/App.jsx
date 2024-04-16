import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>}/>
        <Route path="/sign-up" element={<Signup/>}/>
        <Route path="/sign-in" element={<Signin/>}/>
      </Routes>
    </BrowserRouter>
  )
}