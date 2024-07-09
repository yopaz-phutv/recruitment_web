import { IoCalendarClear } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import defaultAvt from "../../../assets/images/default-avatar.webp";
import dayjs from "dayjs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaInfoCircle } from "react-icons/fa";
import { useState } from "react";
// import CTooltip from "../../../components/CTooltip";

export default function CandidateItem({
  resume,
  handleViewDetail,
  setShowSelectJobModal,
  setCurResume,
  jobs,
}) {
  const [showInfor, setShowInfor] = useState(false);

  const handleSaveCandidate = async () => {
    setCurResume(resume);
    setShowSelectJobModal(true);
  };

  return (
    <div className="pe-3 mb-2">
      <div className="position-relative">
        <div
          className="border d-flex gap-2 p-2 hover-border-main hover-shadow-sm pointer"
          onClick={handleViewDetail}
        >
          <div className="w-25">
            <img
              src={resume.avatar_url || defaultAvt}
              alt=""
              className="w-100 h-100"
              style={{ objectFit: "cover", aspectRatio: "1/1" }}
            />
          </div>
          <div className="flex-fill ts-sm">
            <span className="fw-600 text-capitalize ts-smd">
              {resume.fullname}
            </span>
            <div className="text-secondary">{resume.desired_job} </div>
            <div className="d-flex align-items-center gap-1">
              <IoCalendarClear fontSize="16px" className="text-main" />
              {dayjs(resume.dob).format("DD/MM/YYYY")}
              <div className="d-inline-block ms-3">
                <div className="d-flex align-items-center gap-1">
                  <FaPhoneAlt fontSize="16px" className="text-main" />
                  {resume.phone}
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-1">
                <MdLocationOn fontSize="19px" className="text-main" />
                {resume.location}
              </div>
              {resume.applying && (
                <div className="position-relative">
                  <FaInfoCircle
                    className="text-primary me-2"
                    onMouseEnter={() => setShowInfor(true)}
                    onMouseLeave={() => setShowInfor(false)}
                  />
                  {showInfor && (
                    <div
                      className="z-index-1 position-absolute bottom-100 bg-white shadow-sm border border-primary rounded px-2 py-1"
                      style={{ width: "200px", left: "-100px" }}
                    >
                      Ứng viên này đã nộp hồ sơ lần gần nhất vào{" "}
                      <span className="text-danger">
                        {dayjs(resume?.applying.created_at).format(
                          "DD/MM/YYYY"
                        )}
                      </span>
                      , vị trí{" "}
                      <span className="text-danger">
                        {jobs.find((job) => job.id === resume?.applying.job_id)?.jname}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <button
          className="position-absolute border-0 bg-white"
          style={{ top: "4px", right: "9px" }}
          onClick={handleSaveCandidate}
        >
          {resume.candidate_bookmark_id ? (
            <AiFillHeart className="text-danger" />
          ) : (
            <AiOutlineHeart />
          )}
        </button>
      </div>
    </div>
  );
}
