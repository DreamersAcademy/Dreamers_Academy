import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import './index.css'
import BookSeat from './pages/Bookseat'
import PaymentPage from './pages/payment'
import {Routes,Route,BrowserRouter} from "react-router-dom"
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='' element={<Home/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/Login' element={<Login/>}></Route>
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/book-seat/:courseTitle" element={<BookSeat />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
