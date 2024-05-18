import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";
import { ToastContainer } from "react-toastify";

import Pusher from "pusher-js";

import Home from "./view/candidate/Home";
import CompanyList from "./view/candidate/companies";
import Company from "./view/candidate/company-detail";
import JobList from "./view/candidate/jobs";
import Job from "./view/candidate/jobs/JobDetail";
import EmployerLayout from "./view/employer/layouts";
import EmployerLogin from "./view/employer/auth/Login";
import CandidateList from "./view/employer/candidates/CandidateList";
import JobManagement from "./view/employer/jobs";
import CandidateLayout from "./view/candidate/management/layouts/CandidateLayout";
import AppliedJobs from "./view/candidate/management/AppliedJobs";
import SavedJobs from "./view/candidate/management/SavedJobs";
import Signup from "./view/candidate/auth/Signup";
import Layout from "./view/candidate/layouts";
import Profile from "./view/candidate/management/profile";
import Resume from "./view/candidate/management/resumes";
import Template from "./view/candidate/management/resumes/resume_templates/common";
import TemplateList from "./view/candidate/management/resumes/resume_templates";
import EmployerSignup from "./view/employer/auth/Signup";
import AdminLogin from "./view/admin/auth/Login";
import AdminLayout from "./view/admin/layouts";
import EmployerList from "./view/admin/employers";
import EmployerDetail from "./view/employer/detail";
import FindingCandidates from "./view/employer/find-candidates";
import AdminCandidateList from "./view/admin/candidates";
import SavedCandidates from "./view/employer/saved-candidates";

export const AppContext = createContext();

function App() {
  const [curUrl, setCurUrl] = useState("/");
  let pusher = new Pusher("5b0ac1136aca9c77eadb", {
    cluster: "ap1",
    encrypted: true,
  });

  return (
    <AppContext.Provider value={{ curUrl, setCurUrl, pusher }}>
      <ToastContainer autoClose={500} position="bottom-right" />
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
                          <Route
                            path="applied-jobs"
                            element={<AppliedJobs />}
                          />
                          <Route path="saved-jobs" element={<SavedJobs />} />
                          <Route path="profile" element={<Profile />} />
                          <Route path="resumes" element={<Resume />} />
                          <Route path="templates" element={<TemplateList />} />
                          <Route path="resumes/create" element={<Template />} />
                          <Route path="resumes/:id" element={<Template />} />
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
                  <Route path="candidates" element={<CandidateList />} />
                  <Route path="jobs" element={<JobManagement />} />
                  <Route path="find-candidates" element={<FindingCandidates />} />
                  <Route path="saved-candidates" element={<SavedCandidates />} />
                  <Route path="detail" element={<EmployerDetail />} />
                </Routes>
              </EmployerLayout>
            }
          />
          <Route path="employer/login" element={<EmployerLogin />} />
          <Route path="employer/signup" element={<EmployerSignup />} />
          <Route
            path="admin/*"
            element={
              <AdminLayout>
                <Routes>
                  <Route path="employers" element={<EmployerList />} />
                  <Route path="candidates" element={<AdminCandidateList />} />
                </Routes>
              </AdminLayout>
            }
          />
          <Route path="admin/login" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
