import { Routes , Route} from 'react-router-dom';
import './App.css';
import Login from './pages/login.tsx';
import Register from './pages/register.tsx';
import Register_2 from './pages/register_2.tsx';
import Register_3 from './pages/register_3.tsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="register_2" element={<Register_2/>}></Route>
      <Route path="register_3" element={<Register_3/>}></Route>
    </Routes>
  )
}

export default App
