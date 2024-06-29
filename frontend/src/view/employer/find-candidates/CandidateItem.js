import { IoCalendarClear } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import defaultAvt from "../../../assets/images/default-avatar.webp";
import dayjs from "dayjs";
import { isNullObject } from "../../../common/functions";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function CandidateItem({
  resume,
  handleViewDetail,
  setShowSelectJobModal,
  setCurResume,
}) {
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
            <div className="d-flex align-items-center gap-1">
              <MdLocationOn fontSize="19px" className="text-main" />
              {resume.location}
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
