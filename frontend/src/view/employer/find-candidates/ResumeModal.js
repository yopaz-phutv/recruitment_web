import Modal from "react-bootstrap/Modal";
import { toSrcFromGgImgLink } from "../../../common/functions";

export default function ResumeModal({ show, setShow, imageSrc }) {

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      scrollable
      size="xl"
      fullscreen="lg-down"
    >
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">Hồ sơ ứng viên</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={toSrcFromGgImgLink(imageSrc)} alt="" className="d-block mx-auto" />
      </Modal.Body>
    </Modal>
  );
}
