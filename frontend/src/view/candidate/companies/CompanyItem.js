import { useNavigate } from "react-router-dom";
import { IoMdPeople } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import defaultCompanyLogo from "../../../assets/images/default_company_logo.png"

export default function CompanyItem({ company }) {
  const nav = useNavigate();
  return (
    <div
      className="col-sm-12 col-lg-4 mb-3 pointer"
      key={company.id}
    >
      <div
        className="card border hover-border-main hover-shadow-sm"
        style={{ minHeight: "240px" }}
        onClick={() => nav(`/companies/${company.id}`)}
      >
        <div
          className="d-flex border-bottom px-2"
          style={{ minHeight: "110px" }}
        >
          <div className="d-flex align-items-center">
            <img
              src={company.logo || defaultCompanyLogo}
              style={{ maxWidth: "110px", maxHeight: "110px" }}
              alt={company.name}
            />
          </div>
          <div className="container-fluid d-flex align-items-center justify-content-start ps-4 fw-bold">
            <span>{company.name}</span>
          </div>
        </div>
        <div className="card-body">
          <div className="card-text text-start ts-smd">
            <div className="d-flex align-items-center gap-1">
              <IoMdPeople className="fs-5 text-main" />
              {company.min_employees ? (
                <span>
                  {company.min_employees}
                  {company.max_employees !== 0
                    ? " - " + company.max_employees
                    : "+ "}{" "}
                  nhân viên
                </span>
              ) : (
                "Chưa cập nhật"
              )}
            </div>
            <div className="text-multiline">
              <MdLocationOn className="fs-5 text-main me-1" />
              {company.address}
            </div>
            {company.website && (
              <span className="text-ellipsis">
                <IoIosLink className="ts-lg text-main me-1" />
                <a
                  href={company.website}
                  className="hover-link text-secondary text-decoration-none"
                >
                  {company.website}
                </a>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
