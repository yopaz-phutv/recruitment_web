import defaultAvt from "../../../assets/images/default-avatar.webp";
import dayjs from "dayjs";

export default function CandidateItem({ infor }) {
  return (
    <div className="pe-3 mb-2">
      <div className="border d-flex gap-2 p-2 pointer">
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
          <div>{dayjs(infor.dob).format("DD/MM/YYYY")}
           <span className="ms-3">{infor.phone}</span>
          </div>
          <div> </div>
          <div>{infor.location} </div>
        </div>
      </div>
    </div>
  );
}
