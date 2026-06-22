import { Routes , Route} from 'react-router-dom';
import './App.css';
import Login from './pages/login.tsx';
import Register from './pages/register.tsx';
import Register_2 from './pages/register_2.tsx';
import Register_3 from './pages/register_3.tsx';
import Dashboard from './pages/dashboard.tsx';
import MinistryManagement from './pages/minstrymng.tsx';
import Navbar from './components/navbar.tsx';
import DeptManagement from './pages/deptmng.tsx';
import District_offices_mng from './pages/district_offices_mng.tsx';
import Offices_mng from './pages/office_mng.tsx';
import Form from './pages/form.tsx';
import Form2 from './pages/form2.tsx';
import DocumentUpload from './pages/document_upload.tsx';
import SignPage from './pages/signpage.tsx';
import Form_126 from './pages/form_126.tsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/register_2" element={<Register_2/>}></Route>
      <Route path="/register_3" element={<Register_3/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/ministries" element={<MinistryManagement/>}></Route>
      <Route path="/nav" element={<Navbar/>}></Route>
      <Route path="/departments/:id" element={<DeptManagement/>}></Route>
      <Route path="/district_offices/:id" element={<District_offices_mng/>}></Route>
      <Route path="/offices/:id" element={<Offices_mng/>}></Route>
      <Route path="/new-application" element={<Form/>}></Route>
      <Route path="/form2" element={<Form2/>}></Route>
      <Route path="/documents" element={<DocumentUpload/>}></Route>
      <Route path="/sign" element={<SignPage/>}></Route>
      <Route path="/form-126" element={<Form_126/>}></Route>
    </Routes>
  )
}

export default App
