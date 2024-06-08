import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import { AiOutlinePlus } from "react-icons/ai";
import { BsUpload } from "react-icons/bs";
import { toast } from "react-toastify";
import jobApi from "../../../api/job";
import resumeApi from "../../../api/resume";
import { isNullObject } from "../../../common/functions";
import Loading from "../../../components/Loading";

export default function AppyingDialog({
  show,
  setShow,
  job,
  user,
  jobId,
  recommendData,
  isLoadingRecommend,
}) {
  const [isUpload, setIsUpload] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [curResume, setCurResume] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [useRecommendData, setUseRecommendData] = useState(false);

  const getFileInf = (e) => {
    setFile(e.target.files[0]);
  };
  const handleApply = async () => {
    try {
      var next = true;
      const formData = new FormData();

      if (!useRecommendData) {
        if (isUpload) formData.append("cv", file);
        if (isOnline) formData.append("resume_id", curResume.id);
        if (isUpload) {
          if (!file) next = false;
        } else if (isOnline) {
          if (!curResume) next = false;
        }
      } else {
        formData.append("resume_link", recommendData.resume_link);
        formData.append(
          "candidate_bookmark_id",
          recommendData.candidate_bookmark_id
        );
      }
      formData.append("use_suitable_resume", useRecommendData ? 1 : 0);

      if (!next) {
        setErrorMsg("Bạn chưa chọn hồ sơ!");
        throw new Error("Resume unselected");
      }
      setIsLoading(true);
      await jobApi.apply(jobId, formData);
      toast.success("Ứng tuyển thành công!");
      window.location.reload();
    } catch (error) {
      toast.error("Đã có lỗi xảy ra!");
    } finally {
      setIsLoading(false);
    }
  };
  const getResumes = async () => {
    const res = await resumeApi.getByCurrentCandidate();
    setResumes(res);
  };
  const handleUseOnlineResume = () => {
    setIsOnline(true);
    setIsUpload(false);
  };
  const handleUseUpload = () => {
    setIsOnline(false);
    setIsUpload(true);
  };

  useEffect(() => {
    getResumes();
  }, []);

  useEffect(() => {
    if (file || curResume) setErrorMsg(null);
  }, [curResume, file]);

  useEffect(() => {
    setUseRecommendData(!isNullObject(recommendData))
  }, [recommendData])
  
  useEffect(() => {
    console.log({useRecommendData});
  }, [useRecommendData])

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="lg"
      fullscreen="md-down"
      scrollable
    >
      <Modal.Header
        className="modal-header border-bottom-0"
        closeButton
      ></Modal.Header>
      <Modal.Body className="ps-5">
        <div>
          <span style={{ fontSize: "15px" }}>Ứng tuyển vào vị trí</span>
          <br />
          <h4>{job.jname}</h4>
          <span className="text-secondary" style={{ fontSize: "15px" }}>
            {job.employer.name}
          </span>
        </div>
        <form className="mt-3 w-65">
          <div>
            <label htmlFor="fullname">Họ và tên</label>
            <input
              type="text"
              className="form-control"
              name="fullname"
              placeholder={
                user && user.name?.lastname + " " + user.name?.firstname
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
          {isLoadingRecommend ? (
            <Loading />
          ) : !useRecommendData ? (
            <>
              Hồ sơ của bạn:
              {!isNullObject(recommendData) && (
                <div>
                  <span
                    className="text-primary pointer"
                    onClick={() => setUseRecommendData(true)}
                  >
                    Chọn hồ sơ đã được đánh dấu phù hợp
                  </span>{" "}
                  hoặc
                </div>
              )}
              <div className="w-50">
                <button
                  className="btn btn-outline-primary btn-sm mt-2 w-100"
                  onClick={handleUseOnlineResume}
                >
                  <AiOutlinePlus /> Hồ sơ trực tuyến
                </button>
                {isOnline && (
                  <div>
                    {resumes?.map((item) => (
                      <div key={`resume_${item.id}`} className="mt-1">
                        <Form.Check
                          type="radio"
                          name="resume"
                          className="d-inline-block"
                          label={item.title}
                          onClick={() => setCurResume(item)}
                        />
                        <a
                          href={item.resume_link}
                          className="ts-sm ms-5 text-primary pointer"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Xem
                        </a>
                      </div>
                    ))}
                  </div>
                )}
                <button
                  className="btn btn-outline-primary mt-3 btn-sm w-100"
                  onClick={handleUseUpload}
                >
                  <BsUpload /> Tải lên hồ sơ có sẵn
                </button>
                {isUpload && (
                  <div>
                    <input
                      type="file"
                      className="form-control form-control-sm mt-3"
                      onChange={getFileInf}
                    />
                  </div>
                )}
              </div>
              {errorMsg && <div className="text-danger mt-2">{errorMsg}</div>}
            </>
          ) : (
            <>
              <div>
                Hồ sơ bạn đã công khai được nhà tuyển dụng đánh dấu là phù hợp
                cho vị trí này và đã được hệ thống lưu lại.{" "}
                <a
                  href={recommendData?.resume_link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Xem hồ sơ
                </a>
              </div>
              <div>
                Nhấn <strong>"Nộp hồ sơ"</strong> để nộp ngay hồ sơ ứng tuyển
                hoặc{" "}
                <span
                  className="text-primary pointer"
                  onClick={() => setUseRecommendData(false)}
                >
                  Chọn hồ sơ khác
                </span>
              </div>
            </>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="border-top-0">
        <button
          className="btn btn-primary"
          onClick={handleApply}
          disabled={isLoading}
        >
          {isLoading && <Spinner size="sm" className="me-1" />}
          {!isLoading ? "Nộp hồ sơ" : "Đang xử lý"}
        </button>
        <button className="btn btn-secondary" onClick={() => setShow(false)}>
          Đóng
        </button>
      </Modal.Footer>
    </Modal>
  );
}
