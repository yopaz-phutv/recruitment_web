import React, { useEffect, useState } from "react";
import Layout from "./layouts/Layout";
import { Link } from "react-router-dom";
import "./custom.css";
import employerApi from "../../api/employer";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [comKey, setComKey] = useState("");

  const getAllCompany = async () => {
    const res = await employerApi.getAll();
    setCompanies(res);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(comKey);
    const res = await employerApi.search(comKey);
    setCompanies(res);
  };

  const handleChange = (e) => {
    setComKey(e.target.value);
  };

  useEffect(() => {
    getAllCompany();
  }, []);

  return (
    <Layout>
      {/* <h2 className="p-2 mb-3 shadow bg-light">Danh sách công ty</h2> */}
      <form
        className="d-flex pt-3"
        style={{ marginLeft: "75px" }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="form-control"
          style={{ width: "300px" }}
          name="com_key"
          placeholder="Tìm tên công ty..."
          onChange={handleChange}
        />
        <button type="submit" className="ms-1 btn btn-primary">
          Tìm kiếm
        </button>
      </form>
      <div className="container-fluid col-md-11">
        <div className="row mt-3">
          {companies.length > 0 ? (
            companies.map((company) => (
              <div
                className="col-md-4 mb-3"
                key={company.id}
                style={{ cursor: "pointer" }}
              >
                <div className="card abc" style={{ minHeight: "280px" }}>
                  <div
                    className="d-flex border-bottom"
                    style={{ minHeight: "110px" }}
                  >
                    <div className="border-end d-flex align-items-center">
                      <img
                        src={company.logo}
                        className=""
                        style={{ maxWidth: "110px", maxHeight: "110px" }}
                        alt={company.name}
                      />
                    </div>
                    <div className="container-fluid d-flex align-items-center justify-content-center">
                      <span style={{ fontSize: "17px", fontWeight: "bold" }}>
                        {company.name}
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    <div
                      className="card-text text-start"
                      style={{ fontSize: "15px" }}
                    >
                      {company.min_employees && (
                        <span>
                          <span className="fw-bold">Quy mô:</span>
                          {" " + company.min_employees}
                          {company.max_employees !== 0
                            ? " - " + company.max_employees
                            : "+ "}{" "}
                          nhân viên
                          <br />
                        </span>
                      )}
                      <span className="text-multiline">
                        <span className="fw-bold">Địa chỉ:</span>{" "}
                        {company.address}
                      </span>
                      {company.website && (
                        <span className="text-ellipsis">
                          <span className="fw-bold">Website: </span>
                          <a
                            href={company.website}
                            style={{ textDecoration: "none" }}
                          >
                            {company.website}
                          </a>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="card-footer bg-white border-top-0 d-flex justify-content-center mb-1">
                    <Link
                      to={`/companies/${company.id}`}
                      className="btn btn-sm btn-primary"
                    >
                      Chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h4 className="ms-3 text-start">Không có kết quả nào phù hợp!</h4>
          )}
        </div>
      </div>
      <div style={{ minHeight: '25px' }}></div>
    </Layout>
  );
}

export default React.memo(CompanyList);
