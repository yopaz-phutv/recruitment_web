import { Link } from "react-router-dom";
import { AiTwotoneAppstore } from "react-icons/ai";
import "./layout.css";
import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import candidateApi from "../../../../api/candidate";
import educationApi from "../../../../api/education";
import experienceApi from "../../../../api/experience";
import projectApi from "../../../../api/project";
import skillApi from "../../../../api/skill";
import certificateApi from "../../../../api/certificate";
import prizeApi from "../../../../api/prize";
import activityApi from "../../../../api/activity";
import otherApi from "../../../../api/other";

export const CandidateContext = createContext();

function CandidateLayout(props) {
  const isAuth = useSelector((state) => state.candAuth.isAuth);
  const [personal, setPersonal] = useState({});
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [prizes, setPrizes] = useState([]);
  const [activities, setActivities] = useState([]);
  const [others, setOthers] = useState([]);

  const [cvMode, setCvMode] = useState("CREATE_0");

  const getPersonal = async () => {
    const res = await candidateApi.getCurrent();
    setPersonal(res);
  };
  const getEducations = async () => {
    const res = await educationApi.getByCurrentCandidateProfile();
    setEducations(res);
  };
  const getExperiences = async () => {
    const res = await experienceApi.getByCurrentCandidateProfile();
    setExperiences(res);
  };
  const getProjects = async () => {
    const res = await projectApi.getByCurrentCandidateProfile();
    setProjects(res);
  };
  const getSkills = async () => {
    const res = await skillApi.getByCurrentCandidateProfile();
    setSkills(res);
  };
  const getCertificates = async () => {
    const res = await certificateApi.getByCurrentCandidateProfile();
    setCertificates(res);
  };
  const getPrizes = async () => {
    const res = await prizeApi.getByCurrentCandidateProfile();
    setPrizes(res);
  };
  const getActivities = async () => {
    const res = await activityApi.getByCurrentCandidateProfile();
    setActivities(res);
  };
  const getOthers = async () => {
    const res = await otherApi.getByCurrentCandidateProfile();
    setOthers(res);
  };
  useEffect(() => {
    if (isAuth) {
      getPersonal();
      getEducations();
      getExperiences();
      getProjects();
      getSkills();
      getCertificates();
      getPrizes();
      getActivities();
      getOthers();
    }
  }, [isAuth]);

  return (
    <CandidateContext.Provider
      value={{
        personal,
        setPersonal,
        educations,
        setEducations,
        experiences,
        setExperiences,
        projects,
        setProjects,
        skills,
        setSkills,
        certificates,
        setCertificates,
        prizes,
        setPrizes,
        activities,
        setActivities,
        others,
        setOthers,
        getPersonal,
        getEducations,
        getExperiences,
        getProjects,
        getSkills,
        getCertificates,
        getPrizes,
        getActivities,
        getOthers,
        cvMode,
        setCvMode,
      }}
    >
      <div className="d-flex">
        <div
          className="border-end bg-light"
          style={{ width: "280px", minHeight: "90.9vh" }}
        >
          <ul className="nav flex-column">
            <li>
              <div
                className="border-bottom fw-bold text-center py-4"
                style={{ fontSize: "18px" }}
              >
                Tài khoản của tôi
              </div>
            </li>
            <li className="nav-item border-bottom py-1 cand-item">
              <Link to="/candidate" className="nav-link">
                <span className="ms-4 d-flex align-items-center cand-item-color">
                  <AiTwotoneAppstore style={{ fontSize: "20px" }} />
                  &nbsp;Dashboard
                </span>
              </Link>
            </li>
            <li className="nav-item border-bottom py-1 cand-item">
              <Link to="/candidate/profile" className="nav-link">
                <span className="ms-4 d-flex align-items-center cand-item-color">
                  Profile cá nhân
                </span>
              </Link>
            </li>
            <li className="nav-item border-bottom py-1 cand-item">
              <Link to="/candidate/resumes" className="nav-link">
                <span className="ms-4 d-flex align-items-center cand-item-color">
                  Quản lý hồ sơ
                </span>
              </Link>
            </li>
            {/* <li className="nav-item border-bottom py-1 cand-item">
              <Link to="/candidate/resumes/create" className="nav-link">
                <span className="ms-4 d-flex align-items-center cand-item-color">
                  Tạo hồ sơ trực tuyến
                </span>
              </Link>
            </li> */}
            <li className="nav-item border-bottom py-1 cand-item">
              <Link to="/candidate/applied-jobs" className="nav-link">
                <span className="ms-4 d-flex align-items-center cand-item-color">
                  {/* <AiTwotoneAppstore style={{ fontSize: "20px" }} /> */}
                  Việc làm đã nộp
                </span>
              </Link>
            </li>
            <li className="nav-item border-bottom py-1 cand-item">
              <Link to="/candidate/saved-jobs" className="nav-link">
                <span className="ms-4 d-flex align-items-center cand-item-color">
                  {/* <AiTwotoneAppstore style={{ fontSize: "20px" }} /> */}
                  Việc làm đã lưu
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div style={{ width: "calc(1536px - 280px)" }}>{props.children}</div>
      </div>
    </CandidateContext.Provider>
  );
}

export default CandidateLayout;
