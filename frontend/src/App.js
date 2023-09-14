import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./view/candidate/Home";
import CompanyList from "./view/candidate/CompanyList";
import Company from "./view/candidate/Company";
import JobList from "./view/candidate/JobList";
import Job from "./view/candidate/Job";
import EmployerLayout from "./view/employer/layouts/Layout";
import Login from "./view/employer/auth/Login";
import CandidateList from "./view/employer/candidates/CandidateList";
import JobManagement from "./view/employer/jobs/JobManagement";
import CandidateLayout from "./view/candidate/management/layouts/CandidateLayout";
import AppliedJobs from "./view/candidate/management/AppliedJobs";
import SavedJobs from "./view/candidate/management/SavedJobs";
import Signup from "./view/candidate/auth/Signup";
import Layout from "./view/candidate/layouts/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route exact path="" element={<Home />} />
                <Route path="sign-up" element={<Signup />} />
                <Route path="companies" element={<CompanyList />} />
                <Route path="companies/:id" element={<Company />} />
                <Route path="jobs" element={<JobList />} />
                <Route path="jobs/:id" element={<Job />} />
                <Route
                  path="candidate/*"
                  element={
                    <CandidateLayout>
                      <Routes>
                        <Route path="applied-jobs" element={<AppliedJobs />} />
                        <Route path="saved-jobs" element={<SavedJobs />} />
                      </Routes>
                    </CandidateLayout>
                  }
                />
              </Routes>
            </Layout>
          }
        />
        <Route
          path="employer/*"
          element={
            <EmployerLayout>
              <Routes>
                <Route path="login" element={<Login />} />
                <Route path="candidate-list" element={<CandidateList />} />
                <Route path="job-management" element={<JobManagement />} />
              </Routes>
            </EmployerLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
