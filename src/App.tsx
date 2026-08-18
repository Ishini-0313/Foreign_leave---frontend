import { Routes , Route} from 'react-router-dom';
import './App.css';
import Login from './pages/login.tsx';
import Register from './pages/register.tsx';
import Register_2 from './pages/register_2.tsx';
import Register_3 from './pages/register_3.tsx';
import Dashboard from './pages/dashboard.tsx';
import MinistryManagement from './pages/minstrymng.tsx';
import DeptManagement from './pages/deptmng.tsx';
import District_offices_mng from './pages/district_offices_mng.tsx';
import Offices_mng from './pages/office_mng.tsx';
import Form from './pages/form.tsx';
import Form2 from './pages/form2.tsx';
import DocumentUpload from './pages/document_upload.tsx';
import SignPage from './pages/signpage.tsx';
import Form_126 from './pages/form_126.tsx';
import Form_16 from './pages/form_16.tsx';
import Leave_category from './pages/leave_category.tsx';
import Personal_leave_category from './pages/personal_leave_category.tsx';
import ApplicationReview from './pages/application_review.tsx';
import ApplicationTracking from './pages/application_tracking.tsx';
import Commenting_pg from './pages/commenting_pg.tsx';
import Documents from './pages/documents.tsx';
import Profile from './pages/profile.tsx';
import Setting from './pages/setting.tsx';
import OfficeForm from './pages/office_form.tsx';
import AmendmentForm from './pages/amendment_form.tsx';
import MyApplications from './pages/myApplications.tsx';
import AmedmentDocumentUpload from './pages/amedment_doc_upload.tsx';
import AmendmentTracking from './pages/amendment_tracking.tsx';
import Amendments from './pages/amendments.tsx';
import ForgotPassword from './pages/forgotPassword.tsx';
import ResetPassword from './pages/resetPassword.tsx';
import Options from './pages/options.tsx';
import MyApplicationReview from './pages/myApplicationReview.tsx';
import AmendmentReview from './pages/amendment_review.tsx';
import UploadedAmendmentDocuments from './pages/uploaded_amd_documents.tsx';
import AmendmentFromReview from './pages/amendmentFromReview.tsx';
import OfficialLeaveCategory from './pages/official_leave_category.tsx';
import OfficeDocs from './pages/office_docs.tsx';
import SignPage2 from './pages/signpage2.tsx';
import NewDocumentUpload from './pages/new_document_upload.tsx';
import CompletedForm16 from './pages/CompletedForm16.tsx';
import CompletedForm126 from './pages/CompletedForm126.tsx';
import OfficerAssignment from './pages/OfficerAssignment.tsx';





function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/register_2" element={<Register_2/>}></Route>
      <Route path="/register_3" element={<Register_3/>}></Route>

      <Route path="/dashboard" element={<Dashboard/>}></Route>

      <Route path="/ministries" element={<MinistryManagement/>}></Route>
      <Route path="/departments/:id" element={<DeptManagement/>}></Route>
      <Route path="/district_offices/:id" element={<District_offices_mng/>}></Route>
      <Route path="/offices/:id" element={<Offices_mng/>}></Route>

      {/* new application */}
      <Route path="/new-application" element={<Leave_category/>}></Route>
      <Route path='/personal-leave-category' element={<Personal_leave_category/>}></Route>
      <Route path='/official-leave-category'element={<OfficialLeaveCategory/>}></Route>
      <Route path='/options' element={<Options/>}></Route>
      <Route path="/form/edit/:id" element={<Form/>}></Route>
      <Route path='/form2/edit/:id' element={<Form2/>}></Route>
      <Route path='/documents/edit/:id' element={<DocumentUpload/>}></Route>
      <Route path='/new-doc/edit/:id' element={<NewDocumentUpload/>}></Route>
      <Route path='/sign/edit/:id' element={<SignPage/>}></Route>
      <Route path='/sign2/edit/:id' element={<SignPage2/>}></Route>


      <Route path="/form-126" element={<Form_126/>}></Route>
      
      
      
      <Route path='/application/:id' element={<ApplicationReview/>}></Route>
      <Route path='/application/:id/form-126' element={<Form_126/>}></Route>
      <Route path='/application/:id/form-16' element={<Form_16/>}></Route>
      <Route path='/application/:id/tracking' element={<ApplicationTracking/>}></Route>
      <Route path='/application/:id/add-comment' element={<Commenting_pg/>}></Route>
      <Route path='/application/:id/documents' element={<Documents/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/setting' element={<Setting/>}></Route>
      <Route path='/application/:id/office-form' element={<OfficeForm/>}></Route>
      <Route path='/application/:id/amendment-form' element={<AmendmentForm/>}></Route>
      <Route path='/my-applications' element={<MyApplications/>}></Route>
      <Route path='/application/:id/amendment_documents' element={<AmedmentDocumentUpload/>}></Route>
      <Route path='/application/:application_id/amendments' element= {<Amendments/>}></Route>
      <Route path='/amendment/:id/tracking' element={<AmendmentTracking/>}></Route>
      
      <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
      <Route path='/reset-password' element={<ResetPassword/>}></Route>
      
      <Route path='/options/:id' element={<Options/>}></Route>
      <Route path='/my-application/:id' element={<MyApplicationReview/>}></Route>
      <Route path='/amendmnet-review/:id' element={<AmendmentReview/>}></Route>
      <Route path='/amendment/:id/documents' element={<UploadedAmendmentDocuments/>}></Route>
      <Route path='/amendment/:id/form' element={<AmendmentFromReview/>}></Route>
      <Route path='/amendment/:id/tracking' element={<AmendmentTracking/>}></Route>
      <Route path='/application/:id/office-documents' element={<OfficeDocs/>}></Route>
      <Route path='/application/:id/completed-form-16' element={<CompletedForm16/>}></Route>
      <Route path='/application/:id/completed-form-126' element={<CompletedForm126/>}></Route>

      <Route path='/admin/officer-assignments' element={<OfficerAssignment/>}></Route>
    </Routes>
  )
}

export default App
