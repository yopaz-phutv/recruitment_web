import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import EmployerDetailView from "../../../components/EmployerDetailView";

export default function ViewModal({ show, setShow, employer, curTabInd }) {
  return (
    <Modal
      size="lg"
      fullscreen="lg-down"
      show={show}
      onHide={() => setShow(false)}
      style={{ fontFamily: "sans-serif" }}
    >
      <Modal.Header closeButton className="py-2">
        <Modal.Title className="w-100 text-center fw-600">
          Thông tin nhà tuyển dụng
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EmployerDetailView
          employer={{ ...employer, user: { email: employer.email } }}
          isFull={curTabInd === 0}
        />
      </Modal.Body>
      <Modal.Footer className="py-1">
        <Button variant="secondary" onClick={() => setShow(false)}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
