import "./style.css";
import { BsSearch } from "react-icons/bs";
import { RiUserSearchFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import Loading from "../../../components/Loading";
import { useSelector } from "react-redux";
import employerApi from "../../../api/employer";
import useGetAllJtypes from "../../../hooks/useGetAllJtypes";
import useGetAllJlevels from "../../../hooks/useGetAllJlevels";
import useGetAllIndustries from "../../../hooks/useGetAllIndustries";
import useGetAllLocations from "../../../hooks/useGetAllLocations";
import EditJobModal from "./EditJobModal";
import CreateJobModal from "./CreateJobModal";

function JobManagement() {
  const nav = useNavigate();

  const isAuth = useSelector((state) => state.employerAuth.isAuth);
  const { register, handleSubmit } = useForm();

  const { jtypes } = useGetAllJtypes();
  const { jlevels } = useGetAllJlevels();
  const { industries } = useGetAllIndustries();
  const { locations } = useGetAllLocations();
  const [jobs, setJobs] = useState([]);
  const [curJob, setCurJob] = useState({ industries: [], locations: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getJobList = async (data) => {
    try {
      setIsLoading(true);
      let searchKey = "";
      if (data) searchKey = data.searchKey;
      const res = await employerApi.getJobList(searchKey);
      setJobs(res);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const handleClickActBtn = (job_inf, type) => {
    setCurJob(job_inf);
    if (type === "EDIT") setShowEditModal(true);
    else if (type === "SEARCH") {
      const stateValue = {
        locationIds: job_inf.locations.map((item) => item.id),
        industryIds: job_inf.industries.map((item) => item.id),
        gender: job_inf.gender,
        jtypeId: job_inf.jtype_id,
        jlevelId: job_inf.jlevel_id,
        yoe: job_inf.yoe,
      };
      nav("/employer/find-candidates", { state: stateValue });
    }
  };
  const handleClickSwitchBtn = async ({ job_id, status, index }) => {
    let temp_jobs = [...jobs];
    const data = { status: status };
    await employerApi.changeJobStatus(job_id, data);
    alert("Cập nhật thành công!");
    temp_jobs[index].is_active = status;
    setJobs(temp_jobs);
  };

  useEffect(() => {
    if (isAuth) getJobList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <>
      <div className="bg-white ms-3 mt-3 pb-3 shadow-sm">
        <div className="pt-3" style={{ marginLeft: "45px" }}>
          <h5 className="text-main">Danh sách việc làm</h5>
          <div className="clearfix my-3" style={{ width: "93%" }}>
            <form
              className="float-start"
              style={{ width: "35%" }}
              onSubmit={handleSubmit(getJobList)}
            >
              <div className="input-group">
                <input
                  type="text"
                  className="form-control form-control-sm border-end-0"
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
              className="float-end d-flex gap-1 align-items-center btn btn-info btn-sm text-white px-4"
              onClick={() => setShowCreateModal(true)}
            >
              <AiOutlinePlus />
              Tạo mới
            </button>
          </div>
          <table
            className="table border text-center shadow-sm"
            style={{ width: "93%" }}
          >
            <thead className="table-primary ts-smd">
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
            {!isLoading && (
              <tbody style={{ fontSize: "14px" }}>
                {jobs.map((item, index) => (
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
                    <td className="ts-17">
                      <MdEdit
                        className="text-primary pointer"
                        onClick={() => handleClickActBtn(item, "EDIT")}
                      />
                      {/* <BsTrash3
                      className="ms-2 text-danger"
                      style={{ cursor: "pointer" }}
                      data-bs-toggle="modal"
                      data-bs-target="#jobDeleting"
                    /> */}
                      <RiUserSearchFill
                        className="ms-1 text-primary pointer"
                        onClick={() => handleClickActBtn(item, "SEARCH")}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {isLoading ? (
            <Loading />
          ) : (
            jobs.length === 0 && <h5>Không có bản ghi nào</h5>
          )}
          {showEditModal && (
            <EditJobModal
              inf={curJob}
              jtypes={jtypes}
              jlevels={jlevels}
              industries={industries}
              locations={locations}
              getJobList={getJobList}
              show={showEditModal}
              setShow={setShowEditModal}
            />
          )}
          {showCreateModal && (
            <CreateJobModal
              jtypes={jtypes}
              jlevels={jlevels}
              industries={industries}
              locations={locations}
              getJobList={getJobList}
              show={showCreateModal}
              setShow={setShowCreateModal}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default JobManagement;
