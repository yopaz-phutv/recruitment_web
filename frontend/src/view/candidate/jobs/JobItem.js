import { useNavigate } from "react-router-dom";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import dayjs from "dayjs";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default function JobItem({ job }) {
  const nav = useNavigate();

  return (
    <div
      className="mb-3 pointer"
      onClick={() => nav(`/jobs/${job.id}`)}
    >
      <div className="d-flex p-2 border hover-border-main hover-shadow-sm bg-white">
        <div
          className="border d-flex align-items-center px-2"
          style={{ width: "100px", height: "100px" }}
        >
          <img src={job.employer.logo} width="100%" alt={job.jname} />
        </div>
        <div className="ms-2 mt-1" style={{ width: "calc(100% - 125px)" }}>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip className="ts-xs">{job.jname}</Tooltip>}
          >
            <div
              className="text-truncate fw-bold text-dark text-decoration-none hover-text-main"
              onClick={() => nav(`/jobs/${job.id}`)}
            >
              {job.jname}
            </div>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip className="ts-xs">{job.employer.name}</Tooltip>}
          >
            <div className="ts-smd text-secondary text-truncate">
              {job.employer.name}
            </div>
          </OverlayTrigger>
          <div className="ts-sm">
            <div className="d-flex flex-wrap gap-1">
              <div className="d-flex align-items-center me-3">
                <MdOutlineAttachMoney className="fs-5 text-main" />
                {job.min_salary ? (
                  <span>
                    {job.min_salary} - {job.max_salary} triệu VND
                  </span>
                ) : (
                  <span>Theo thỏa thuận</span>
                )}
              </div>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip className="ts-xs">
                    {job.locations?.map((item, index) => (
                      <div key={`location_${index}`}>
                        {item.name}
                        {index !== job.locations?.length - 1 && ", "}
                      </div>
                    ))}
                  </Tooltip>
                }
              >
                <div className="d-flex align-items-center">
                  <MdLocationOn className="fs-5 text-main" />
                  {job.locations && job.locations[0].name}
                  {job.locations?.length > 1 && "..."}
                </div>
              </OverlayTrigger>
            </div>
            <div className="mt-1">
              <span
                className="rounded-pill bg-disabled"
                style={{ padding: "2.5px 8px" }}
              >
                Còn&nbsp;
                {dayjs().diff(job.expire_at, "day") <= 30
                  ? dayjs(job.expire_at).diff(new Date(), "day")
                  : "30+"}{" "}
                ngày
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
