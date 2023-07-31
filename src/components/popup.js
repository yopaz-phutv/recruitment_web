import axios from "axios";
import { AiOutlineInfoCircle } from "react-icons/ai";

const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("employer_jwt")}`,
    },
};

function MessagePopup({ message, cand_inf }) {
    const processRequest = async () => {
        await axios
            .post(
                `http://127.0.0.1:8000/api/companies/processApplying`, cand_inf, config
            )
            .then((res) => {
                console.log(res.data);
                alert('Cập nhật thành công!')
            })
            .catch((error) => {
                console.error("Lỗi:" + error);
                alert('Cập nhật thất bại!')
            });
        window.location.reload()
    };

    return (
    <div className="modal fade" id="infModal">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header border-bottom-0">
                    <AiOutlineInfoCircle className="d-block mx-auto text-primary" style={{ fontSize: '45px' }} />
                </div>
                <div className="modal-body text-center" style={{ fontSize: '18px' }}>
                    {message}                    
                </div>
                <div className="modal-footer border-top-0">
                    <button type="button" className="btn btn-primary" onClick={processRequest}>
                        Xác nhận
                    </button>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}

function ProfilePopup({cand_inf})
{
    
    return (
      <div className="modal modal-xl fade" id="profileModal">
        <div className="modal-dialog modal-fullscreen-md-down modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header border-bottom-">
              <h5>Thông tin ứng viên</h5>
              <button
                type="button"
                className="btn btn-sm btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <div
              className="modal-body text-center"
              style={{ fontSize: "18px" }}
            >
              <img src={cand_inf.cv_link} alt="cv" width={"75%"} />            
            </div>
            <div className="modal-footer border-top-0">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export { MessagePopup, ProfilePopup };