import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Signup from './pages/Signup';
import CompanyList from './pages/CompanyList';
import Company from './pages/Company';
import JobList from './pages/JobList';
import Job from './pages/Job';
import Login from './pages/employers/Login';
import EmployerLayout from './pages/employers/Layout';
import CandidateList from './pages/employers/CandidateList';
import JobManagement from "./pages/employers/job-management/JobManagement";
import CandidateLayout from './pages/candidate/CandidateLayout';
import AppliedJobs from './pages/candidate/AppliedJobs';
import SavedJobs from './pages/candidate/SavedJobs';

function App() {
  return (    
      <BrowserRouter>
        <Routes>
          <Route exact path="" element={<Home />} />
          <Route path="sign-up" element={<Signup />} />
          <Route path="companies" element={<CompanyList />} />
          <Route path="companies/:id" element={<Company />} />
          <Route path="jobs" element={<JobList />} />
          <Route path="jobs/:id" element={<Job />} />          

          <Route exact path='employer' element={<EmployerLayout />} />
          <Route path='employer/login' element={<Login />} />
          <Route path='employer/candidate-list' element={<CandidateList />} />
          <Route path='employer/job-management' element={<JobManagement />} /> 

          <Route exact path='candidate' element={<CandidateLayout />} />
          <Route path='candidate/applied-jobs' element={<AppliedJobs />} />   
          <Route path='candidate/saved-jobs' element={<SavedJobs />} />                                       
        </Routes>
      </BrowserRouter>    
  );
}

export default App;
