import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { AiOutlinePlus } from "react-icons/ai";
import { BsUpload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jobApi from "../../../api/job";

export default function AppyingDialog({ show, setShow, job, user, jobId }) {
  const nav = useNavigate();
  const [isUpload, setIsUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState();

  const getFileInf = (e) => {
    setFile(e.target.files[0]);
  };
  const handleApply = async () => {
    try {
      const formData = new FormData();
      formData.append("cv", file);
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

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="lg"
      fullscreen="sm-down"
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

        <form className="mt-3" style={{ width: "65%" }}>
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
              disabled={isUpload && true}
              onClick={() => {
                nav("/candidate/resumes");
              }}
            >
              <AiOutlinePlus /> Tạo hồ sơ trực tuyến
            </button>
            <button
              className="btn btn-outline-primary mt-3 btn-sm w-100"
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
                  className="form-control form-control-sm mt-3"
                  onChange={getFileInf}
                />
              </div>
            )}
          </div>
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
