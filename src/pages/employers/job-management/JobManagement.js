import { BsEye, BsSearch } from "react-icons/bs";
import Layout from "../Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css";
import { useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import JobDetail from "./JobDetail";
import JobCreating from "./JobCreating";

function JobManagement() {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("employer_jwt")}`,
    },
  };
  const [jobs, setJobs] = useState([{}]);
  const [curJob, setCurJob] = useState({ industries: [], locations: [] });
  const [jtypes, setJtypes] = useState([]);
  const [jlevels, setJlevels] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [locations, setLocations] = useState([]);
  const { register, handleSubmit } = useForm();
  const company = JSON.parse(localStorage.getItem("company"));

  const getAllJtypes = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/jtypes")
      .then((res) => {
        setJtypes(res.data.inf);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllJlevels = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/jlevels")
      .then((res) => {
        setJlevels(res.data.inf);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAllIndustries = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/industries")
      .then((res) => {
        setIndustries(res.data.inf);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAllLocations = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/locations")
      .then((res) => {
        setLocations(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getJobList = async (data) => {
    let searchKey = "";
    if (data) searchKey = data.searchKey;
    await axios
      .get(
        `http://127.0.0.1:8000/api/companies/${company.id}/getJobList?keyword=${searchKey}`,
        config
      )
      .then((res) => {
        console.log(res.data);
        setJobs(res.data);
      })
      .catch((error) => {
        console.error("Lỗi:" + error);
      });
  };
  const handleClickActBtn = (job_inf) => {
    setCurJob(job_inf);
  };
  const handleClickSwitchBtn = async ({ job_id, status, index }) => {
    let temp_jobs = [...jobs];
    await axios
      .post(`http://127.0.0.1:8000/api/companies/${job_id}/changeJobStatus`, {
        status: status,
      })
      .then((res) => {
        console.log(res.data);
        alert("Cập nhật thành công!");
        temp_jobs[index].is_active = status;
        setJobs(temp_jobs);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getJobList();
    getAllJtypes();
    getAllJlevels();
    getAllIndustries();
    getAllLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div
        className="bg-white"
        style={{
          height: "94%",
          margin: "17px 18px 0px 18px",
        }}
      >
        <div style={{ marginLeft: "35px" }}>
          <h4 className="pt-3">Danh sách việc làm</h4>
          <div className="clearfix mb-3 mt-4">
            <form
              className="float-start"
              style={{ width: "35%" }}
              onSubmit={handleSubmit(getJobList)}
            >
              <div className="input-group">
                <input
                  type="text"
                  className="form-control border-end-0"
                  placeholder="Nhập tên, hình thức, cấp bậc việc làm"
                  {...register("searchKey")}
                />
                <button type="submit" className="input-group-text bg-white">
                  <BsSearch />
                </button>
              </div>
            </form>
            <button
              type="button"
              className="mt-2 btn btn-info text-white d-flex align-items-center float-end"
              data-bs-toggle="modal"
              data-bs-target="#jobCreating"
              style={{ marginRight: "65px" }}
            >
              <AiOutlinePlus />
              Tạo mới
            </button>
          </div>
          <table className="table border text-center" style={{ width: "96%" }}>
            <thead className="table-danger" style={{ fontSize: "15px" }}>
              <tr>
                <th style={{ width: "25%" }}>Tên</th>
                <th style={{ width: "13%" }}>Hình thức</th>
                <th style={{ width: "13%" }}>Cấp bậc</th>
                <th style={{ width: "15%" }}>Thời gian đăng</th>
                <th style={{ width: "13%" }}>Thời hạn</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "14px" }}>
              {jobs.length > 0 &&
                jobs.map((item, index) => (
                  <tr key={"job" + item.id}>
                    <td>{item.jname}</td>
                    <td>{item.jtype_name}</td>
                    <td>{item.jlevel_name} </td>
                    <td>{item.postTime}</td>
                    <td>{item.deadline}</td>
                    <td>
                      <div className="form-check form-switch">
                        <input
                          type="checkbox"
                          className="form-check-input mx-auto"
                          name="status[]"
                          defaultChecked={item.is_active === 1 ? true : false}
                          onClick={() =>
                            handleClickSwitchBtn({
                              job_id: item.id,
                              status: 1 - item.is_active,
                              index: index,
                            })
                          }
                        />
                      </div>
                    </td>
                    <td style={{ fontSize: "17px" }}>
                      <BsEye
                        className="text-primary"
                        style={{ cursor: "pointer" }}
                        data-bs-toggle="modal"
                        data-bs-target="#jobDetail"
                        onClick={() => handleClickActBtn(item)}
                      />
                      {/* <BsTrash3
                      className="ms-2 text-danger"
                      style={{ cursor: "pointer" }}
                      data-bs-toggle="modal"
                      data-bs-target="#jobDeleting"
                    /> */}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {jobs.length === 0 && <h5>Không có bản ghi nào</h5>}
          <JobDetail
            inf={curJob}
            jtypes={jtypes}
            jlevels={jlevels}
            industries={industries}
            locations={locations}
          />
          <JobCreating
            config={config}
            jtypes={jtypes}
            jlevels={jlevels}
            industries={industries}
            locations={locations}
          />
        </div>
      </div>
    </Layout>
  );
}

export default JobManagement;
