import { MdOutlineAttachMoney } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import dayjs from "dayjs";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import defaultCompanyLogo from "../../../assets/images/default_company_logo.png";

export default function JobItem({ job }) {
  return (
    <div className="mb-3">
      <div className="d-flex p-2 border hover-border-main hover-shadow-sm bg-white">
        <div
          className="border d-flex align-items-center px-2"
          style={{ width: "100px", height: "100px" }}
        >
          <img
            src={job.employer.logo || defaultCompanyLogo}
            width="100%"
            alt={job.jname}
          />
        </div>
        <div className="ms-2 mt-1" style={{ width: "calc(100% - 125px)" }}>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip className="ts-xs">{job.jname}</Tooltip>}
          >
            <a
              href={`/jobs/${job.id}`}
              className="d-block fw-bold text-dark text-decoration-none hover-text-main text-truncate"
              target="_blank"
              rel="noreferrer"
            >
              {job.jname}
            </a>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip className="ts-xs">{job.employer.name}</Tooltip>}
          >
            <a
              href={`/companies/${job.employer?.id}`}
              className="d-block text-decoration-none ts-smd text-secondary hover-text-main text-truncate"
              target="_blank"
              rel="noreferrer"
            >
              {job.employer.name}
            </a>
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
                {dayjs(job.created_at).format("DD/MM/YYYY")}
              </span>
              <span className="mx-2">-</span>
              <span
                className="rounded-pill bg-disabled"
                style={{ padding: "2.5px 8px" }}
              >
                {dayjs(job.expire_at).format("DD/MM/YYYY")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
