import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import { AiOutlinePlus } from "react-icons/ai";
import { BsUpload } from "react-icons/bs";
import { toast } from "react-toastify";
import jobApi from "../../../api/job";
import resumeApi from "../../../api/resume";

export default function AppyingDialog({ show, setShow, job, user, jobId }) {
  const [isUpload, setIsUpload] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [curResume, setCurResume] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getFileInf = (e) => {
    setFile(e.target.files[0]);
  };
  const handleApply = async () => {
    try {
      var next = true;
      const formData = new FormData();
      if (isUpload) formData.append("cv", file);
      if (isOnline) formData.append("cv_link", curResume.image);
      if (isUpload) {
        if (!file) next = false;
      } else if (isOnline) {
        if (!curResume) next = false;
      }

      if (!next) {
        setErrorMsg("Bạn chưa chọn hồ sơ!");
        throw new Error("Resume unselected");
      }
      setIsLoading(true);
      await jobApi.apply(jobId, formData);
      setIsLoading(false);
      window.location.reload();
      toast.success("Ứng tuyển thành công!");
    } catch (error) {
      setIsLoading(false);
      toast.error("Đã có lỗi xảy ra!");
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
                user && user.name.lastname + " " + user.name.firstname
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
                      href={item.image}
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
        <button className="btn btn-danger" onClick={() => setShow(false)}>
          Đóng
        </button>
      </Modal.Footer>
    </Modal>
  );
}
