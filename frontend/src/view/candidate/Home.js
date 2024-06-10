import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import clsx from "clsx";
import CTooltip from "../../components/CTooltip";
import defaultCompanyLogo from "../../assets/images/default_company_logo.png";
import jobApi from "../../api/job";
import { useSelector } from "react-redux";

function Home() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const poster = process.env.PUBLIC_URL + "/image/poster4.jpg";
  const nav = useNavigate();
  const isAuth = useSelector((state) => state.candAuth.isAuth);
  const [hotJobs, setHotJobs] = useState([{ employer: {}, locations: [] }]);
  const [hotCompanies, setHotCompanies] = useState([]);
  const [page, setPage] = useState({ links: [] });
  const [curPage, setCurPage] = useState(1);
  const [recommendJobs, setRecommendJobs] = useState([]);

  const getHotJobs = async (apiURL) => {
    await axios.get(apiURL).then((res) => {
      setHotJobs(res.data.data);
      delete res.data.data;
      setPage(res.data);
      setCurPage(res.data.current_page);
    });
  };

  const getHotCompanies = async () => {
    await axios.get(`${apiUrl}/api/companies/getHotList`).then((res) => {
      setHotCompanies(res.data);
    });
  };

  const getRecommendJobs = async () => {
    const res = await jobApi.getRecommendJobs();
    setRecommendJobs(res);
  };

  useEffect(() => {
    getHotJobs(`${apiUrl}/api/jobs/getHotList`);
    getHotCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuth) {
      getRecommendJobs();
    }
  }, [isAuth]);

  return (
    <>
      <div>
        <img className="w-100" src={poster} alt="poster" />
      </div>
      <div className="mt-5 mx-4 pb-3 bg-white">
        <h4 className="pt-3 ps-4 text-main">Việc làm nổi bật</h4>
        <hr />
        <div className="row row-cols-lg-2 mx-auto">
          {hotJobs.map((job) => (
            <div key={job.id} className="my-2 d-flex border-bottom">
              <div
                className="border ms-3 mb-3 d-flex justify-content-center"
                style={{ width: "110px", height: "110px" }}
              >
                <img
                  className="align-self-center"
                  style={{ width: "108px" }}
                  src={job.employer.logo || defaultCompanyLogo}
                  alt=""
                />
              </div>
              <div style={{ fontSize: "15.5px", width: "calc(100% - 120px)" }}>
                <div className="ms-4 mt-1 mb-2">
                  <div className="text-truncate">
                    <CTooltip text={job.jname}>
                      <span
                        className="fw-bold hover-text-main pointer"
                        style={{ fontSize: "18.5px" }}
                        onClick={() => nav(`/jobs/${job.id}`)}
                      >
                        {job.jname}
                      </span>
                    </CTooltip>
                  </div>
                  <div className="text-truncate">
                    <CTooltip text={job.employer.name}>
                      <span
                        className="text-secondary hover-text-main pointer"
                        onClick={() => nav(`/companies/${job.employer.id}`)}
                      >
                        {job.employer.name}
                      </span>
                    </CTooltip>
                  </div>
                  <div className="d-flex align-items-center">
                    <MdOutlineAttachMoney className="fs-5 text-main" />
                    {job.min_salary ? (
                      <span>
                        {job.min_salary} - {job.max_salary} triệu VND
                      </span>
                    ) : (
                      "Thỏa thuận"
                    )}
                  </div>
                  <div className="d-flex align-items-center">
                    <MdLocationOn className="fs-5 text-main" />
                    &nbsp;
                    {job.locations.map((item, index) => (
                      <span key={job.id}>
                        {item.name}
                        {index !== job.locations.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center mt-3">
          {page.links.map((item, index) => (
            <button
              key={index}
              className={clsx(
                "btn btn-sm me-2",
                curPage.toString() === item.label
                  ? "bg-main text-white"
                  : "border text-main"
              )}
              style={{ width: "30px", height: "30px" }}
              onClick={() => getHotJobs(item.url)}
            >
              {item.label === "&laquo; Previous" && (
                <FiChevronLeft style={{ marginBottom: "2px" }} />
              )}
              {item.label === "Next &raquo;" && (
                <FiChevronRight style={{ marginBottom: "2px" }} />
              )}
              {item.label !== "&laquo; Previous" &&
              item.label !== "Next &raquo;"
                ? item.label
                : null}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5 mx-4 bg-white">
        <h4 className="pt-3 ps-4 text-main">Top công ty nổi bật</h4>
        <hr />
        <div className="row row-cols-3 row-cols-lg-5 mx-auto px-3 pb-2">
          {hotCompanies.map((company) => (
            <div className="px-2" key={company.id}>
              <div
                className="border rounded mb-3 pb-1 pointer"
                onClick={() => nav(`/companies/${company.id}`)}
              >
                <div
                  className="d-flex justify-content-center mx-auto"
                  style={{ width: "110px", height: "110px" }}
                >
                  <img
                    className="align-self-center"
                    style={{
                      maxHeight: "90px",
                      maxWidth: "90px",
                    }}
                    src={company.logo || defaultCompanyLogo}
                    alt=""
                  />
                </div>
                <div className="text-center mb-2">
                  <CTooltip text={company.name}>
                    <div className="fw-bold mb-1 text-truncate px-3 ts-smd hover-text-main">
                      {company.name}
                    </div>
                  </CTooltip>
                  <small className="rounded px-2 bg-mlight text-main">
                    {company.job_num} việc làm
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isAuth && (
        <div className="mt-5 mx-4 bg-white">
          <h4 className="pt-3 ps-4 text-main">Việc làm gợi ý cho bạn</h4>
          <hr />
          <div className="row row-cols-2 row-cols-lg-3 mx-auto px-3 pb-3">
            {recommendJobs.map((job) => (
              <div key={job.id} className="my-2 d-flex border-bottom">
                <div
                  className="border mb-3 d-flex justify-content-center align-items-center"
                  style={{ width: "73px", height: "73px" }}
                >
                  <img
                    style={{ width: "70px" }}
                    src={job.employer.logo || defaultCompanyLogo}
                    alt=""
                  />
                </div>
                <div
                  className="ms-3 mt-1"
                  style={{ width: "calc(100% - 86px)" }}
                >
                  <div className="text-truncate">
                    <CTooltip text={job.jname}>
                      <span
                        className="fw-bold hover-text-main pointer"
                        onClick={() => nav(`/jobs/${job.id}`)}
                      >
                        {job.jname}
                      </span>
                    </CTooltip>
                  </div>
                  <div className="text-truncate">
                    <CTooltip text={job.employer.name}>
                      <span
                        className="text-secondary hover-text-main ts-smd pointer"
                        onClick={() => nav(`/companies/${job.employer.id}`)}
                      >
                        {job.employer.name}
                      </span>
                    </CTooltip>
                  </div>
                  <div className="d-flex">
                    <div className="d-flex align-items-center ts-sm">
                      <MdOutlineAttachMoney className="fs-5 text-main" />
                      {job.min_salary ? (
                        <span>
                          {job.min_salary} - {job.max_salary} triệu VND
                        </span>
                      ) : (
                        "Thỏa thuận"
                      )}
                    </div>
                    <div className="d-flex align-items-center ts-sm ms-4">
                      <MdLocationOn className="fs-5 text-main" />
                      {job.locations.map((item, index) => (
                        <span key={job.id}>
                          {item.name}
                          {index !== job.locations.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{ height: "40px" }} />
    </>
  );
}
export default Home;
