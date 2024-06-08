import "./index.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import employerApi from "../../../api/employer";
import { IoMdPeople } from "react-icons/io";
import { IoIosLink } from "react-icons/io";
import { MdPhone } from "react-icons/md";
import { BsCalendar2Check, BsCalendarEvent } from "react-icons/bs";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import defaultCompanyLogo from "../../../assets/images/default_company_logo.png";

export default function Company() {
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
    <div id="job-detail-container" style={{ margin: "0 140px" }}>
      {infor.image ? (
        <div className="d-flex justify-content-center">
          <img
            src={infor.image}
            className="mt-3"
            width="100%"
            height="auto"
            alt={infor.name}
          />
        </div>
      ) : (
        <div className="pt-2" />
      )}
      <div className="mt-3">
        <div className="bg-white mx-auto shadow-sm pt-3">
          <h4 style={{ marginLeft: "30px" }} className="text-main fw-600">
            {infor.name}
          </h4>
          <div className="d-flex ps-4 pb-4 pt-1">
            <div
              className="border d-flex align-items-center"
              style={{ height: "130px" }}
            >
              <img
                src={infor.logo || defaultCompanyLogo}
                alt=""
                className="p-1"
                style={{ width: "130px" }}
              />
            </div>
            <div className="ms-3 mt-2">
              <div className="d-flex gap-1 flex-wrap">
                <div className="lh-1 d-flex align-items-center me-3 rounded-pill px-2 py-1 bg-mlight text-main">
                  <IoMdPeople className="fs-5 me-1" />
                  {infor.min_employees ? (
                    <span>
                      {infor.min_employees}
                      {infor.max_employees !== 0
                        ? " - " + infor.max_employees
                        : "+ "}{" "}
                      nhân viên
                    </span>
                  ) : (
                    "Chưa cập nhật"
                  )}
                </div>
                <div className="lh-1 d-flex align-items-center me-4 rounded-pill px-2 py-1 bg-mlight text-main">
                  <MdPhone className="fs-5 me-1" />
                  <span>{infor.phone}</span>
                </div>
                <div className="lh-1 d-flex align-items-center rounded-pill px-2 py-1 bg-mlight text-main">
                  <IoIosLink className="ts-lg me-1" />
                  <a
                    href={infor.website}
                    className="text-main text-decoration-none"
                  >
                    {infor.website}
                  </a>
                </div>
              </div>
              <div className="mt-2 pe-2 whitespace-preline">
                <MdLocationOn className="fs-5 text-main me-1" />
                <span>{infor.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto bg-white mt-4 shadow-sm">
        <h5 className="bg-main text-white p-3">Giới thiệu công ty</h5>
        <div className="whitespace-preline px-3 pb-3">
          {infor.description ? infor.description : "Chưa cập nhật thông tin"}
        </div>
      </div>
      <div className="mt-4">
        <h5 className="bg-main text-white p-3 mb-0">Việc làm đang tuyển</h5>
        {jobs.map((job) => (
          <div className="bg-white border-bottom ps-3 py-1" key={job.id}>
            <div className="d-flex p-3">
              <div
                className="border d-flex align-items-center p-2"
                style={{ width: "110px", height: "110px" }}
              >
                <img src={infor.logo || defaultCompanyLogo} alt="" className="w-100" />
              </div>
              <div className="ms-3 mt-2">
                <Link to={`/jobs/${job.id}`} className="nav-link">
                  <span className="ts-lg fw-600 hover-text-main">
                    {job.jname}
                  </span>
                </Link>
                <div style={{ fontSize: "15px" }}>
                  <div className="d-flex align-items-center">
                    <MdOutlineAttachMoney className="fs-5 text-main" />
                    {job.min_salary ? (
                      <span>
                        {job.min_salary} - {job.max_salary} triệu VND
                      </span>
                    ) : (
                      <span>Thỏa thuận</span>
                    )}
                  </div>
                  <div className="d-flex align-items-center">
                    <MdLocationOn className="fs-5 text-main" />
                    {job.location}
                  </div>
                  <div className="clearfix ms-1">
                    <div className="float-start d-flex gap-1 align-items-center">
                      <BsCalendarEvent fontSize="16px" className="text-main" />
                      {job.postDate ? job.postDate : "06/04/2023"}
                    </div>
                    <div
                      className="float-end d-flex gap-1 align-items-center"
                      style={{ marginLeft: "150px" }}
                    >
                      <BsCalendar2Check fontSize="16px" className="text-main" />
                      {job.deadline}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: "30px" }} />
    </div>
  );
}
