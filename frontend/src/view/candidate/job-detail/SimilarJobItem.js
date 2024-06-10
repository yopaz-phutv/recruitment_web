import defaultCompanyLogo from "../../../assets/images/default_company_logo.png";
import { MdLocationOn, MdOutlineAttachMoney } from "react-icons/md";
import CTooltip from "../../../components/CTooltip";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";

export default function SimilarJobItem({ className, job }) {
  const nav = useNavigate();

  return (
    <div className={clsx("d-flex px-3 py-2", className)}>
      <div
        className="border d-flex align-items-center px-1"
        style={{ width: "60px", height: "60px" }}
      >
        <img
          src={job.employer.logo || defaultCompanyLogo}
          width="100%"
          alt={job.jname}
        />
      </div>
      <div className="ms-2" style={{ width: "calc(100% - 70px)" }}>
        <CTooltip text={job.jname}>
          <a
            href={`/jobs/${job.id}`}
            className="ts-smd d-block lh-sm fw-bold text-dark text-decoration-none hover-text-main text-truncate"
            target="_blank"
            rel="noreferrer"
          >
            {job.jname}
          </a>
        </CTooltip>
        <CTooltip text={job.employer.name}>
          <Link
            to={`/companies/${job.employer?.id}`}
            className="ts-sm d-block lh-sm text-decoration-none text-secondary hover-text-main text-truncate"
          >
            {job.employer.name}
          </Link>
        </CTooltip>
        <div className="ts-xs">
          <div className="d-flex flex-wrap gap-3">
            <div className="d-flex align-items-center">
              <MdOutlineAttachMoney className="fs-5 text-main" />
              {job.min_salary ? (
                <span>
                  {job.min_salary} - {job.max_salary} triệu VND
                </span>
              ) : (
                <span>Thỏa thuận</span>
              )}
            </div>
            <CTooltip
              text={job.locations?.map((item, index) => (
                <div key={item.id}>
                  {item.name}
                  {index !== job.locations?.length - 1 && ", "}
                </div>
              ))}
            >
              <div className="d-flex align-items-center">
                <MdLocationOn className="fs-5 text-main" />
                {job.locations && job.locations[0].name}
                {job.locations?.length > 1 && "..."}
              </div>
            </CTooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
