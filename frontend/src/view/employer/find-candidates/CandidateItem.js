import { IoCalendarClear } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import defaultAvt from "../../../assets/images/default-avatar.webp";
import dayjs from "dayjs";

export default function CandidateItem({ infor }) {
  return (
    <div className="pe-3 mb-2">
      <div className="border d-flex gap-2 p-2 pointer hover-border-main hover-shadow-sm">
        <div className="w-25">
          <img
            src={infor.avtSrc || defaultAvt}
            alt=""
            className="w-100 h-100"
            style={{ objectFit: "cover", aspectRatio: "1/1" }}
          />
        </div>
        <div className="flex-fill ts-sm">
          <div className="fw-600 text-capitalize ts-smd">{infor.fullname}</div>
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
    </div>
  );
}
