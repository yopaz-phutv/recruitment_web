import axios from "axios";
import { AiOutlineInfoCircle } from "react-icons/ai";

function SavedJobPopup({ config, job_id }) {
  const deleteSavedJob = async () => {
    await axios
      .post(
        `http://127.0.0.1:8000/api/candidates/${job_id}/processJobSaving`,
        { status: 0 },
        config
      )
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="modal fade" id="jobDeleting">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body text-center" style={{ fontSize: "18px" }}>
            <AiOutlineInfoCircle
              className="d-block mx-auto text-primary my-3"
              style={{ fontSize: "45px" }}
            />
            Bạn có muốn xóa việc làm này khỏi danh sách không?
          </div>
          <div className="modal-footer border-top-0">
            <button
              type="button"
              className="btn btn-primary"
              onClick={deleteSavedJob}
            >
              Xác nhận
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedJobPopup;
