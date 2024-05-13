import { IoCalendarClear } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import defaultAvt from "../../../assets/images/default-avatar.webp";
import dayjs from "dayjs";
import { isNullObject } from "../../../common/functions";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import employerApi from "../../../api/employer";

export default function CandidateItem({
  infor,
  handleViewDetail,
  setShowSelectJobModal,
  setCurResume,
  updateBookmark
}) {
  const handleSaveCandidate = async () => {
    setCurResume(infor);
    if (infor.is_saved) {
      await employerApi.handleSavingCandidate({
        candidate_id: infor.candidate_id,
        delete: 1,
      });
      updateBookmark(infor.candidate_id)
    } else setShowSelectJobModal(true);
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
              src={
                !infor.avtSrc || isNullObject(infor.avtSrc)
                  ? defaultAvt
                  : infor.avtSrc
              }
              alt=""
              className="w-100 h-100"
              style={{ objectFit: "cover", aspectRatio: "1/1" }}
            />
          </div>
          <div className="flex-fill ts-sm">
            <span className="fw-600 text-capitalize ts-smd">
              {infor.fullname}
            </span>
            <div className="text-secondary">{infor.desired_job} </div>
            <div className="d-flex align-items-center gap-1">
              <IoCalendarClear fontSize="16px" className="text-main" />
              {dayjs(infor.dob).format("DD/MM/YYYY")}
              <div className="d-inline-block ms-3">
                <div className="d-flex align-items-center gap-1">
                  <FaPhoneAlt fontSize="16px" className="text-main" />
                  {infor.phone}
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-1">
              <MdLocationOn fontSize="19px" className="text-main" />
              {infor.location}
            </div>
          </div>
        </div>
        <button
          className="position-absolute border-0 bg-white"
          style={{ top: "4px", right: "9px" }}
          onClick={handleSaveCandidate}
        >
          {infor.is_saved ? (
            <AiFillHeart className="text-danger" />
          ) : (
            <AiOutlineHeart />
          )}
        </button>
      </div>
    </div>
  );
}
