import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AiFillHeart,
  AiOutlineDollarCircle,
  AiOutlineHeart,
  AiOutlinePlus,
} from "react-icons/ai";
import {
  BsCalendar2Check,
  BsCalendarEvent,
  BsFillBriefcaseFill,
  BsFillGeoAltFill,
  BsFillPeopleFill,
  BsFillPersonFill,
  BsPersonWorkspace,
  BsUpload,
} from "react-icons/bs";
import { FaIndustry } from "react-icons/fa";
import { useSelector } from "react-redux";
import jobApi from "../../api/job";
import candidateApi from "../../api/candidate";

function Job() {
  const { id } = useParams();
  const [job, setJob] = useState({
    employer: {},
    jtype: {},
    jlevel: {},
    industries: {},
  });
  const user = useSelector((state) => state.candAuth.current);
  const isAuth = useSelector((state) => state.candAuth.isAuth);
  const [isApplied, setIsApplied] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [file, setFile] = useState();
  const [industries, setIndustries] = useState([]);

  const getJobInf = async () => {
    const res = await jobApi.getById(id);
    setJob(res);
    setIndustries(res.industries);
  };

  const checkApplying = async () => {
    const res = await jobApi.checkApplying(id);
    setIsApplied(res.value);
    console.log("is applying?", res.value);
  };

  const handleApply = async () => {
    const formData = new FormData();
    formData.append("cv", file);
    formData.append("fname", file.name);
    console.log(file);

    await jobApi.apply(id, formData);
    alert("Ứng tuyển thành công!");
    window.location.reload();
  };

  const getFileInf = (e) => {
    setFile(e.target.files[0]);
  };
  const checkLoggedIn = () => {
    if (!isAuth) {
      alert("Vui lòng đăng nhập!");
    }
  };
  const checkJobSaved = async () => {
    const res = await candidateApi.checkJobSaved(id);
    setIsSaved(res.value);
    console.log("save job?:", res.value);
  };
  const handleClickSaveBtn = async (status) => {
    const data = { status: status };
    await candidateApi.processJobSaving(id, data);
    setIsSaved(!isSaved);
    setTimeout(() => {
      alert("Cập nhật thành công!");
    }, 100);
  };

  useEffect(() => {
    getJobInf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (isAuth) {
      checkApplying();
      checkJobSaved();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <>
      <div className="container image-container d-flex justify-content-center">
        <img
          src={job.employer.image}
          className="mx-auto d-block mt-2"
          style={{ maxWidth: "93%", maxHeight: "400px" }}
          alt={"com-img-" + job.employer.id}
        />
      </div>
      <div className="d-flex justify-content-center mt-3">
        <div className="bg-light col-md-9 shadow">
          <div className="d-flex border-bottom ps-4 pe-4">
            <div
              className="d-flex align-items-center border ms-4 mt-4 mb-3"
              style={{ minHeight: "135px" }}
            >
              <img
                src={job.employer.logo}
                alt={"com-logo-" + job.employer.id}
              />
            </div>
            <div
              className="text-start container pt-2"
              style={{ marginLeft: "30px" }}
            >
              <div className="">
                <div className="ms-2">
                  <h4 className="mt-4">{job.jname}</h4>
                  <p className="text-secondary">{job.employer.name}</p>
                </div>
                <div className="ms-1 container clearfix">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle={isAuth ? "modal" : ""}
                    data-bs-target={isAuth ? "#applying_dialog" : ""}
                    disabled={isApplied === true}
                    onClick={checkLoggedIn}
                  >
                    {isApplied === true ? "Đã ứng tuyển" : "Ứng tuyển"}
                  </button>
                  <div
                    className="btn border-danger text-danger"
                    style={{ marginLeft: "120px" }}
                    onClick={() => handleClickSaveBtn(!isSaved)}
                  >
                    {!isSaved ? (
                      <div>
                        <AiOutlineHeart className="fs-5" /> Lưu việc làm
                      </div>
                    ) : (
                      <div>
                        <AiFillHeart className="fs-5" /> Hủy lưu việc làm
                      </div>
                    )}
                  </div>
                  {isAuth && (
                    <div className="modal fade" id="applying_dialog">
                      <div
                        className="modal-dialog modal-lg modal-fullscreen-sm-down modal-dialog-scrollable"
                        style={{ width: "60%" }}
                      >
                        <div className="modal-content">
                          <div className="modal-header border-bottom-0">
                            {/* <h4 className="modal-title">Modal Heading</h4> */}
                            <button
                              type="button"
                              className="btn-close btn btn-sm"
                              data-bs-dismiss="modal"
                            ></button>
                          </div>
                          <div className="modal-body ps-5">
                            <div className="">
                              <span style={{ fontSize: "15px" }}>
                                Ứng tuyển vào vị trí
                              </span>
                              <br />
                              <h4>{job.jname}</h4>
                              <span
                                className="text-secondary"
                                style={{ fontSize: "15px" }}
                              >
                                {job.employer.name}
                              </span>
                            </div>

                            <form className="mt-3" style={{ width: "65%" }}>
                              <div>
                                <label htmlFor="fullname">Họ và tên</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="fullname"
                                  placeholder={
                                    user &&
                                    user.name.lastname +
                                      " " +
                                      user.name.firstname
                                  }
                                  disabled
                                />
                              </div>
                              <div className="mt-2">
                                <label htmlFor="email">Email</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="email"
                                  placeholder={user && user.email}
                                  disabled
                                />
                              </div>
                            </form>
                            <div className="mt-3">
                              Hồ sơ của bạn:
                              <br />
                              <div className="">
                                <button
                                  type="button"
                                  className="btn btn-outline-primary mt-2 w-50"
                                  disabled={isUpload && true}
                                >
                                  <AiOutlinePlus /> Tạo hồ sơ trực tuyến
                                </button>
                                <br />
                                <button
                                  type="button"
                                  className="btn btn-outline-primary mt-3 w-50"
                                  onClick={() => {
                                    setIsUpload(!isUpload);
                                  }}
                                >
                                  <BsUpload /> Tải lên hồ sơ có sẵn
                                </button>
                                {isUpload && (
                                  <div>
                                    <input
                                      type="file"
                                      className="form-control mt-3 w-50"
                                      onChange={getFileInf}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer border-top-0">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleApply}
                            >
                              Nộp hồ sơ
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-bs-dismiss="modal"
                            >
                              Đóng
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginLeft: "120px" }}>
            <div className="d-flex ps-4 pb-3 pt-1">
              <div className="container-fluid ms-5 pt-2 text-start">
                <div className="d-flex">
                  <ul className="list-unstyled">
                    <li className="mt-3">
                      <div>
                        <BsCalendarEvent className="mb-1" />
                        <span className="fw-bold"> Ngày đăng</span> <br />
                        <span className="ms-3">&nbsp;{job.postDate}</span>
                      </div>
                    </li>
                    <li className="mt-3">
                      <div>
                        <BsPersonWorkspace className="mb-1" />
                        <span className="fw-bold"> Hình thức</span> <br />
                        <span className="ms-3">&nbsp;{job.jtype.name}</span>
                      </div>
                    </li>
                    <li className="mt-3">
                      <div>
                        <BsFillPersonFill className="mb-1" />
                        <span className="fw-bold"> Cấp bậc</span> <br />
                        <span className="ms-3">&nbsp;{job.jlevel.name}</span>
                      </div>
                    </li>
                    <li className="mt-3">
                      <div style={{ width: "270px" }}>
                        <FaIndustry className="mb-1" />
                        <span className="fw-bold"> Ngành nghề</span> <br />
                        <div className="ms-3 ps-1">
                          {industries.map((item, index) => (
                            <span key={"industry" + item.id}>
                              <span>{item.name}</span>
                              {index !== industries.length - 1 ? ", " : null}
                            </span>
                          ))}
                        </div>
                      </div>
                    </li>
                  </ul>
                  <ul className="list-unstyled" style={{ marginLeft: "135px" }}>
                    <li className="mt-3">
                      <div>
                        <AiOutlineDollarCircle className="mb-1" />
                        <span className="fw-bold"> Lương</span> <br />
                        <span className="ms-3">
                          &nbsp;
                          {job.min_salary ? (
                            <span>
                              {job.min_salary} - {job.max_salary} triệu VND
                            </span>
                          ) : (
                            <span>Cạnh tranh</span>
                          )}
                        </span>
                      </div>
                    </li>
                    <li className="mt-3">
                      <div>
                        <BsFillBriefcaseFill className="mb-1" />
                        <span className="fw-bold"> Kinh nghiệm</span> <br />
                        <span className="ms-3">
                          &nbsp;
                          {job.yoe ? (
                            <span>{job.yoe} năm</span>
                          ) : (
                            <span>Không yêu cầu</span>
                          )}
                        </span>
                      </div>
                    </li>
                    <li className="mt-3">
                      <div>
                        <BsFillPeopleFill className="mb-1" />
                        <span className="fw-bold"> Số lượng</span> <br />
                        <span className="ms-3">&nbsp;{job.amount}</span>
                      </div>
                    </li>
                    <li className="mt-3">
                      <div>
                        <BsCalendar2Check className="mb-1" />
                        <span className="fw-bold"> Hạn nộp</span> <br />
                        <span className="ms-3">&nbsp;{job.expire_at}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            className="text-start ms-5"
            // style={{ maxWidth: "650px" }}
          >
            <p className="d-flex pb-2">
              <span>
                <BsFillGeoAltFill />
                &nbsp;
                <strong className="pe-1">Địa điểm:</strong>
              </span>
              <span style={{ whiteSpace: "pre-line" }}>{job.address}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <div className="bg-light col-md-9 border mt-4 mb-5 p-4 pt-3 shadow text-start">
          <div className="ps-3">
            <p className="h4 pb-2 border-bottom">Chi tiết về job</p>
            {job.description ? (
              <p style={{ whiteSpace: "pre-line" }}>{job.description}</p>
            ) : (
              "Công ty chưa cập nhật thông tin"
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Job;
