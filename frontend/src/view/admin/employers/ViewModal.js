import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ViewModal({ show, setShow, employer, curTabInd }) {
  return (
    <Modal
      size="lg"
      fullscreen="lg-down"
      show={show}
      onHide={() => setShow(false)}
    >
      <Modal.Header closeButton className="py-2">
        <Modal.Title className="w-100 text-center">
          Thông tin nhà tuyển dụng
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex">
          <div className="fw-600 w-20">Tên:</div>
          {employer.name}
        </div>
        <div className="d-flex mt-1">
          <div className="fw-600 w-20">Quy mô:</div>
          {employer.min_employees ? (
            <div>
              {employer.min_employees}
              {employer.max_employees !== 0
                ? " - " + employer.max_employees
                : "+ "}{" "}
              nhân viên
            </div>
          ) : (
            "Chưa cập nhật"
          )}
        </div>
        {employer.tax_code && (
          <div className="d-flex mt-1">
            <div className="fw-600 w-20">Mã số thuế:</div>
            {employer.tax_code}
          </div>
        )}
        <div className="d-flex mt-1">
          <div className="fw-600 w-20">Người liên hệ:</div>
          {employer.contact_name}
        </div>
        <div className="d-flex mt-1">
          <div className="fw-600 w-20">Điện thoại:</div>
          {employer.phone}
        </div>
        <div className="d-flex mt-1">
          <div className="fw-600 w-20">Email:</div>
          {employer.email}
        </div>
        {curTabInd === 0 && (
          <div className="d-flex mt-1">
            <div className="fw-600 w-20">Website:</div>
            <a href={employer.website} target="_blank" rel="noreferrer">
              {employer.website}
            </a>
          </div>
        )}
        <div className="d-flex mt-1">
          <div className="fw-600 w-20">Địa chỉ:</div>
          <div className="w-80 whitespace-preline">{employer.address}</div>
        </div>
        {curTabInd === 0 && (
          <div className="">
            <div className="fw-600">Mô tả:</div>
            <div className="ts-smd whitespace-preline">
              {employer.description}
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="py-1">
        <Button variant="secondary" onClick={() => setShow(false)}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
