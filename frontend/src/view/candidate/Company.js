import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./custom.css";
import employerApi from "../../api/employer";

function Company() {
  const { id } = useParams();
  const [infor, setInfor] = useState({});
  const [jobs, setJobs] = useState([{}]);

  const getCompanyInfor = async () => {
    const res = await employerApi.getById(id);
    setInfor(res);    
  };

  const getCompanyJobs = async () => {
    const res = await employerApi.getComJobs(id);
    setJobs(res);
  };

  useEffect(() => {
    getCompanyInfor();
    getCompanyJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container image-container d-flex justify-content-center">
        <img
          src={infor.image}
          className="mt-2"
          style={{ maxWidth: "93%", maxHeight: "400px" }}
          alt={infor.name}
        />
        {/* <div className="" style={{ height: '40%' }}>kkk</div> */}
      </div>
      <div className="d-flex justify-content-center mt-3">
        <div className="bg-light col-md-9 shadow">
          <h4
            className="pt-3"
            style={{ marginLeft: "30px", textAlign: "left" }}
          >
            {infor.name}
          </h4>
          <div className="d-flex ps-4 pb-4 pt-1">
            <div
              className="border d-flex align-items-center"
              style={{ height: "130px" }}
            >
              <img
                src={infor.logo}
                style={{ maxHeight: "130px", maxWidth: "130px" }}
                alt={infor.name}
              />
            </div>
            <div
              className="container-fluid ms-3 pt-2"
              style={{ textAlign: "left" }}
            >
              <span className="fw-bold">Địa chỉ</span>:&nbsp;
              <span>{infor.address}</span> <br />
              {infor.min_employees && (
                <span>
                  <span className="fw-bold">Quy mô</span>:&nbsp;
                  {infor.min_employees}
                  {infor.max_employees === 0
                    ? "+"
                    : " - " + infor.max_employees}
                  &nbsp;nhân viên <br />
                </span>
              )}
              <span className="fw-bold">Phone</span>:&nbsp;
              <span>{infor.phone}</span> <br />
              <span className="fw-bold">Website</span>:&nbsp;
              <a href={infor.website} style={{ textDecoration: "none" }}>
                {infor.website}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <p
          className="bg-light col-md-9 border mt-4 p-4 shadow"
          style={{ textAlign: "left" }}
        >
          <span className="h5">Giới thiệu công ty:</span> <br />
          {infor.description
            ? infor.description
            : "Công ty chưa cập nhật thông tin"}
        </p>
      </div>

      <div className="d-flex justify-content-center mt-3">
        <div className="col-md-9 mb-5">
          <div
            className="bg-light border-bottom col-md-9 text-start p-3 ps-4 shadow"
            style={{ fontSize: "23px" }}
          >
            Việc làm đang tuyển
          </div>
          {jobs.map((job) => (
            <div
              className="bg-light border-bottom col-md-9 ps-3 py-1 shadow"
              key={"job" + job.id}
            >
              <div className="d-flex p-3">
                <div className="border d-flex align-items-center">
                  <img
                    src={infor.logo}
                    style={{ maxHeight: "130px", maxWidth: "130px" }}
                    alt={infor.name}
                  />
                </div>
                <div className="container-fluid ms-3 mt-1 text-start">
                  <Link to={`/jobs/${job.id}`} className="nav-link">
                    <span className="h5">{job.jname}</span>
                  </Link>
                  <span className="text-secondary">{infor.name}</span>
                  <br />
                  <div style={{ fontSize: "15.5px" }}>
                    <span className="fw-bold">Mức lương:</span>&nbsp;
                    {job.min_salary ? (
                      <span>
                        {job.min_salary} - {job.max_salary} triệu VND
                      </span>
                    ) : (
                      <span>Cạnh tranh</span>
                    )}
                    <br />
                    <span className="fw-bold">Địa điểm:</span>&nbsp;
                    {job.location}
                    <div className="clearfix">
                      <span>
                        <strong>Ngày đăng: </strong>
                        {job.postDate ? job.postDate : "06/04/2023"}
                      </span>
                      <span className="" style={{ marginLeft: '150px' }}>
                        <strong>Hạn nộp: </strong>
                        {job.deadline}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Company;
